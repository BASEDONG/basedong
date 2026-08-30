#!/usr/bin/env bash
# Redemption seam (BASEDONG/basedong#5): compliance → create code → redeem → 额度↑
# + negatives: invalid / already-used codes
#
# Usage:
#   BASEDONG_API_BASE=http://localhost:3000 ./scripts/probe-redeem.sh
set -euo pipefail

BASE="${BASEDONG_API_BASE:-http://localhost:3000}"
BASE="${BASE%/}"
USER="d$(date +%s | tail -c 7)$((RANDOM % 1000))"
PASS="ProbePass123!"
ROOT_USER="rootprobe"
ROOT_PASS="RootPass123!"
FACE_QUOTA=5000

json_str() {
  local key="$1"
  sed -n "s/.*\"${key}\"[[:space:]]*:[[:space:]]*\"\([^\"]*\)\".*/\1/p" | head -n1
}

json_num() {
  local key="$1"
  sed -n "s/.*\"${key}\"[[:space:]]*:[[:space:]]*\([0-9][0-9]*\).*/\1/p" | head -n1
}

echo "ensure setup"
setup_json="$(curl -fsS "$BASE/api/setup" || true)"
if echo "$setup_json" | grep -q '"status"[[:space:]]*:[[:space:]]*false\|"status"[[:space:]]*:[[:space:]]*0'; then
  curl -fsS -X POST "$BASE/api/setup" \
    -H 'Content-Type: application/json' \
    -d "{\"username\":\"$ROOT_USER\",\"password\":\"$ROOT_PASS\",\"confirmPassword\":\"$ROOT_PASS\",\"SelfUseModeEnabled\":false,\"DemoSiteEnabled\":false}" \
    | grep -q '"success"[[:space:]]*:[[:space:]]*true'
else
  curl -fsS -X POST "$BASE/api/setup" \
    -H 'Content-Type: application/json' \
    -d "{\"username\":\"$ROOT_USER\",\"password\":\"$ROOT_PASS\",\"confirmPassword\":\"$ROOT_PASS\",\"SelfUseModeEnabled\":false,\"DemoSiteEnabled\":false}" \
    >/tmp/setup-redeem.out || true
fi

echo "register $USER"
reg_out="$(curl -sS -X POST "$BASE/api/user/register" \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"$USER\",\"password\":\"$PASS\"}")"
echo "$reg_out" | grep -q '"success"[[:space:]]*:[[:space:]]*true' || {
  echo "register failed: $reg_out" >&2
  exit 1
}

user_login="$(curl -fsS -X POST "$BASE/api/user/login" \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"$USER\",\"password\":\"$PASS\"}")"
user_token="$(echo "$user_login" | json_str access_token)"
test -n "$user_token"

root_login="$(curl -fsS -X POST "$BASE/api/user/login" \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"$ROOT_USER\",\"password\":\"$ROOT_PASS\"}")"
root_token="$(echo "$root_login" | json_str access_token)"
test -n "$root_token"

echo "confirm payment compliance (enables redemption)"
comp="$(curl -sS -X POST "$BASE/api/option/payment_compliance" \
  -H "Authorization: Bearer $root_token" \
  -H 'Content-Type: application/json' \
  -d '{"confirmed":true}')"
echo "compliance: $comp"
echo "$comp" | grep -q '"success"[[:space:]]*:[[:space:]]*true' || {
  echo "payment compliance confirm failed" >&2
  exit 1
}

echo "admin create redemption code quota=$FACE_QUOTA"
create_out="$(curl -sS -X POST "$BASE/api/redemption/" \
  -H "Authorization: Bearer $root_token" \
  -H 'Content-Type: application/json' \
  -d "{\"name\":\"probe\",\"quota\":$FACE_QUOTA,\"count\":1,\"expired_time\":0}")"
echo "create: $create_out"
echo "$create_out" | grep -q '"success"[[:space:]]*:[[:space:]]*true' || {
  echo "redemption create failed" >&2
  exit 1
}
# data is a JSON array of keys; extract first quoted token after "data"
code="$(echo "$create_out" | sed -n 's/.*"data"[[:space:]]*:[[:space:]]*\[\s*"\([^"]*\)".*/\1/p' | head -n1)"
if [ -z "$code" ]; then
  # fallback: first UUID-like 32-hex inside response
  code="$(echo "$create_out" | grep -oE '[0-9a-fA-F]{32}' | head -n1)"
fi
test -n "$code"
echo "code_len=${#code}"

before="$(curl -fsS "$BASE/api/user/self" -H "Authorization: Bearer $user_token")"
quota_before="$(echo "$before" | json_num quota)"
echo "quota_before=$quota_before"
test -n "$quota_before"

echo "redeem happy path"
redeem_out="$(curl -sS -X POST "$BASE/api/user/topup" \
  -H "Authorization: Bearer $user_token" \
  -H 'Content-Type: application/json' \
  -d "{\"key\":\"$code\"}")"
echo "redeem: $redeem_out"
echo "$redeem_out" | grep -q '"success"[[:space:]]*:[[:space:]]*true' || {
  echo "redeem failed" >&2
  exit 1
}
added="$(echo "$redeem_out" | json_num data)"
# data may be bare number after "data":
if [ -z "$added" ]; then
  added="$(echo "$redeem_out" | sed -n 's/.*"data"[[:space:]]*:[[:space:]]*\([0-9][0-9]*\).*/\1/p' | head -n1)"
fi
echo "quota_added=$added"
test "$added" = "$FACE_QUOTA"

after="$(curl -fsS "$BASE/api/user/self" -H "Authorization: Bearer $user_token")"
quota_after="$(echo "$after" | json_num quota)"
echo "quota_after=$quota_after"
expected=$((quota_before + FACE_QUOTA))
if [ "$quota_after" -ne "$expected" ]; then
  echo "expected quota $expected got $quota_after" >&2
  exit 1
fi

echo "negative: invalid code"
bad="$(curl -sS -X POST "$BASE/api/user/topup" \
  -H "Authorization: Bearer $user_token" \
  -H 'Content-Type: application/json' \
  -d '{"key":"not-a-real-redemption-code"}')"
echo "invalid: $bad"
if echo "$bad" | grep -q '"success"[[:space:]]*:[[:space:]]*true'; then
  echo "invalid code must not succeed" >&2
  exit 1
fi
quota_mid="$(curl -fsS "$BASE/api/user/self" -H "Authorization: Bearer $user_token" | json_num quota)"
test "$quota_mid" = "$quota_after"

echo "negative: reuse same code"
reuse="$(curl -sS -X POST "$BASE/api/user/topup" \
  -H "Authorization: Bearer $user_token" \
  -H 'Content-Type: application/json' \
  -d "{\"key\":\"$code\"}")"
echo "reuse: $reuse"
if echo "$reuse" | grep -q '"success"[[:space:]]*:[[:space:]]*true'; then
  echo "used code must not succeed" >&2
  exit 1
fi
quota_end="$(curl -fsS "$BASE/api/user/self" -H "Authorization: Bearer $user_token" | json_num quota)"
test "$quota_end" = "$quota_after"

echo "ok: redemption (create → redeem → 额度 + negatives)"
