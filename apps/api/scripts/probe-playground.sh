#!/usr/bin/env bash
# Playground seam (BASEDONG/basedong#7):
# Channel + quota → GET /api/user/models → POST /pg/chat/completions (session JWT)
# → 额度↓ + insufficient 额度 error
#
#   docker compose -f docker-compose.dev.yml -f docker-compose.seam.yml up -d --build
#   BASEDONG_API_BASE=http://localhost:3000 MOCK_UPSTREAM=http://mock-openai:18080 ./scripts/probe-playground.sh
set -euo pipefail

BASE="${BASEDONG_API_BASE:-http://localhost:3000}"
BASE="${BASE%/}"
MOCK_UPSTREAM="${MOCK_UPSTREAM:-http://mock-openai:18080}"
USER="p$(date +%s | tail -c 7)$((RANDOM % 1000))"
PASS="ProbePass123!"
ROOT_USER="rootprobe"
ROOT_PASS="RootPass123!"
MODEL="gpt-4o-mini"

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
    >/tmp/setup-pg.out || true
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

self="$(curl -fsS "$BASE/api/user/self" -H "Authorization: Bearer $user_token")"
user_id="$(echo "$self" | json_num id)"
test -n "$user_id"

root_login="$(curl -fsS -X POST "$BASE/api/user/login" \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"$ROOT_USER\",\"password\":\"$ROOT_PASS\"}")"
root_token="$(echo "$root_login" | json_str access_token)"
test -n "$root_token"

echo "grant quota"
curl -fsS -X POST "$BASE/api/user/manage" \
  -H "Authorization: Bearer $root_token" \
  -H 'Content-Type: application/json' \
  -d "{\"id\":$user_id,\"action\":\"add_quota\",\"mode\":\"add\",\"value\":100000}" \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true'

before="$(curl -fsS "$BASE/api/user/self" -H "Authorization: Bearer $user_token")"
quota_before="$(echo "$before" | json_num quota)"
used_before="$(echo "$before" | json_num used_quota)"
echo "quota_before=$quota_before used_before=${used_before:-0}"

echo "add mock OpenAI Channel → $MOCK_UPSTREAM"
ch_payload="{\"mode\":\"single\",\"channel\":{\"type\":1,\"name\":\"mock-openai-pg\",\"key\":\"sk-mock\",\"base_url\":\"$MOCK_UPSTREAM\",\"models\":\"$MODEL\",\"group\":\"default\",\"status\":1,\"priority\":1,\"weight\":100,\"auto_ban\":1}}"
ch_out="$(curl -sS -X POST "$BASE/api/channel/" \
  -H "Authorization: Bearer $root_token" \
  -H 'Content-Type: application/json' \
  -d "$ch_payload")"
echo "channel create: $ch_out"
echo "$ch_out" | grep -q '"success"[[:space:]]*:[[:space:]]*true' || {
  echo "channel create failed" >&2
  exit 1
}

echo "user models catalog should include $MODEL"
models_json="$(curl -fsS "$BASE/api/user/models" -H "Authorization: Bearer $user_token")"
echo "models: $(echo "$models_json" | head -c 400)"
echo "$models_json" | grep -q "$MODEL" || {
  echo "expected $MODEL in /api/user/models" >&2
  exit 1
}

echo "POST /pg/chat/completions (session JWT, no API Key)"
pg_code="$(curl -sS -o /tmp/pg-ok.json -w '%{http_code}' -X POST "$BASE/pg/chat/completions" \
  -H "Authorization: Bearer $user_token" \
  -H 'Content-Type: application/json' \
  -d "{\"model\":\"$MODEL\",\"group\":\"default\",\"messages\":[{\"role\":\"user\",\"content\":\"hi\"}],\"max_tokens\":16,\"stream\":false}")"
echo "pg_http=$pg_code"
head -c 500 /tmp/pg-ok.json; echo
if [ "$pg_code" != "200" ] || ! grep -q '"choices"' /tmp/pg-ok.json; then
  echo "playground chat failed" >&2
  exit 1
fi

after="$(curl -fsS "$BASE/api/user/self" -H "Authorization: Bearer $user_token")"
quota_after="$(echo "$after" | json_num quota)"
used_after="$(echo "$after" | json_num used_quota)"
echo "quota_after=$quota_after used_after=${used_after:-0}"
if [ "$quota_after" -ge "$quota_before" ] && [ "${used_after:-0}" -le "${used_before:-0}" ]; then
  echo "expected 额度 to decrease after playground chat" >&2
  exit 1
fi

echo "negative: insufficient 额度 on /pg"
drain="$quota_after"
if [ -z "$drain" ] || [ "$drain" -le 0 ]; then
  drain=100000
fi
curl -fsS -X POST "$BASE/api/user/manage" \
  -H "Authorization: Bearer $root_token" \
  -H 'Content-Type: application/json' \
  -d "{\"id\":$user_id,\"action\":\"add_quota\",\"mode\":\"subtract\",\"value\":$drain}" \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true'

zero_code="$(curl -sS -o /tmp/pg-zero.json -w '%{http_code}' -X POST "$BASE/pg/chat/completions" \
  -H "Authorization: Bearer $user_token" \
  -H 'Content-Type: application/json' \
  -d "{\"model\":\"$MODEL\",\"group\":\"default\",\"messages\":[{\"role\":\"user\",\"content\":\"hi\"}],\"max_tokens\":8,\"stream\":false}")"
echo "zero_http=$zero_code"
head -c 400 /tmp/pg-zero.json; echo
if [ "$zero_code" = "200" ] && grep -q '"choices"' /tmp/pg-zero.json; then
  echo "zero 额度 must not succeed on playground" >&2
  exit 1
fi
if ! grep -qiE 'quota|额度|insufficient' /tmp/pg-zero.json; then
  echo "expected quota/额度 error message in playground response" >&2
  # still ok if non-200 without choices — soft check
  if [ "$zero_code" = "200" ]; then
    exit 1
  fi
fi

echo "usage logs for user should include consume entry for $MODEL"
# Re-grant a little quota and one more chat so a log row exists after drain path
curl -fsS -X POST "$BASE/api/user/manage" \
  -H "Authorization: Bearer $root_token" \
  -H 'Content-Type: application/json' \
  -d "{\"id\":$user_id,\"action\":\"add_quota\",\"mode\":\"add\",\"value\":50000}" \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true'
curl -sS -o /tmp/pg-log.json -w '%{http_code}' -X POST "$BASE/pg/chat/completions" \
  -H "Authorization: Bearer $user_token" \
  -H 'Content-Type: application/json' \
  -d "{\"model\":\"$MODEL\",\"group\":\"default\",\"messages\":[{\"role\":\"user\",\"content\":\"log\"}],\"max_tokens\":8,\"stream\":false}" \
  >/tmp/pg-log.code || true
logs="$(curl -fsS "$BASE/api/log/self?type=2&p=1&page_size=20" -H "Authorization: Bearer $user_token")"
echo "logs: $(echo "$logs" | head -c 500)"
echo "$logs" | grep -q "$MODEL" || {
  echo "expected consume log for $MODEL in /api/log/self" >&2
  exit 1
}

echo "ok: playground seam (/api/user/models + /pg/chat/completions → 额度 + usage logs)"
