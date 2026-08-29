#!/usr/bin/env bash
# Black-box auth + API Key seam (issues #3 / #4).
# Usage: BASEDONG_API_BASE=http://localhost:3000 ./scripts/probe-auth.sh
set -euo pipefail

BASE="${BASEDONG_API_BASE:-http://localhost:3000}"
BASE="${BASE%/}"
# Username max 20 (model validate); keep unique across back-to-back CI steps
USER="a$(date +%s | tail -c 7)$((RANDOM % 1000))"
PASS="ProbePass123!"
ROOT_USER="rootprobe"
ROOT_PASS="RootPass123!"

echo "ensure setup"
setup_json="$(curl -fsS "$BASE/api/setup")"
if echo "$setup_json" | grep -q '"status"[[:space:]]*:[[:space:]]*false\|"status"[[:space:]]*:[[:space:]]*0'; then
  echo "running initial setup"
  curl -fsS -X POST "$BASE/api/setup" \
    -H 'Content-Type: application/json' \
    -d "{\"username\":\"$ROOT_USER\",\"password\":\"$ROOT_PASS\",\"confirmPassword\":\"$ROOT_PASS\",\"SelfUseModeEnabled\":false,\"DemoSiteEnabled\":false}" \
    | grep -q '"success"[[:space:]]*:[[:space:]]*true'
elif ! echo "$setup_json" | grep -q '"status"[[:space:]]*:[[:space:]]*true'; then
  # Fresh DB: status may be absent / falsey — try setup; ignore if already done
  curl -fsS -X POST "$BASE/api/setup" \
    -H 'Content-Type: application/json' \
    -d "{\"username\":\"$ROOT_USER\",\"password\":\"$ROOT_PASS\",\"confirmPassword\":\"$ROOT_PASS\",\"SelfUseModeEnabled\":false,\"DemoSiteEnabled\":false}" \
    >/tmp/setup.out || true
  if grep -q '"success"[[:space:]]*:[[:space:]]*true' /tmp/setup.out 2>/dev/null; then
    echo "setup completed"
  else
    echo "setup skipped/already done: $(cat /tmp/setup.out 2>/dev/null || true)"
  fi
fi

echo "register $USER"
reg_out="$(curl -sS -X POST "$BASE/api/user/register" \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"$USER\",\"password\":\"$PASS\"}")"
echo "$reg_out" | grep -q '"success"[[:space:]]*:[[:space:]]*true' || {
  echo "register failed: $reg_out" >&2
  exit 1
}

echo "login $USER"
login_json="$(curl -fsS -X POST "$BASE/api/user/login" \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"$USER\",\"password\":\"$PASS\"}")"
echo "$login_json" | grep -q '"success"[[:space:]]*:[[:space:]]*true'
token="$(echo "$login_json" | sed -n 's/.*"access_token"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p')"
test -n "$token"

echo "self"
curl -fsS "$BASE/api/user/self" -H "Authorization: Bearer $token" | grep -q '"success"[[:space:]]*:[[:space:]]*true'

echo "create API Key"
curl -fsS -X POST "$BASE/api/token/" \
  -H "Authorization: Bearer $token" \
  -H 'Content-Type: application/json' \
  -d '{"name":"probe-key","remain_quota":0,"expired_time":-1,"unlimited_quota":true,"model_limits_enabled":false,"model_limits":"","allow_ips":"","group":""}' \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true'

echo "list API Keys"
list_json="$(curl -fsS "$BASE/api/token/?p=1&size=10" -H "Authorization: Bearer $token")"
echo "$list_json" | grep -q '"success"[[:space:]]*:[[:space:]]*true'
key_id="$(echo "$list_json" | sed -n 's/.*"id"[[:space:]]*:[[:space:]]*\([0-9][0-9]*\).*/\1/p' | head -n1)"
test -n "$key_id"

echo "fetch API Key secret id=$key_id"
curl -fsS -X POST "$BASE/api/token/${key_id}/key" \
  -H "Authorization: Bearer $token" | grep -q '"key"'

echo "ok: setup → register → login → self → API Key"
