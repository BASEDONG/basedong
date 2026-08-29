#!/usr/bin/env bash
# Full retail loop: setup → user → quota → Channel(mock) → API Key → Relay → 额度下降
# + negative: bad Key / insufficient 额度
#
# Prefer mock on the compose network:
#   docker compose -f docker-compose.dev.yml -f docker-compose.seam.yml up -d --build
#   BASEDONG_API_BASE=http://localhost:3000 MOCK_UPSTREAM=http://mock-openai:18080 ./scripts/probe-retail.sh
set -euo pipefail

BASE="${BASEDONG_API_BASE:-http://localhost:3000}"
BASE="${BASE%/}"
MOCK_UPSTREAM="${MOCK_UPSTREAM:-http://mock-openai:18080}"
# Username max 20; distinct prefix from probe-auth.sh to avoid same-second collisions in CI
USER="r$(date +%s | tail -c 7)$((RANDOM % 1000))"
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
    >/tmp/setup-retail.out || true
fi

echo "register $USER"
reg_out="$(curl -sS -X POST "$BASE/api/user/register" \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"$USER\",\"password\":\"$PASS\"}")"
echo "$reg_out" | grep -q '"success"[[:space:]]*:[[:space:]]*true' || {
  echo "register failed: $reg_out" >&2
  exit 1
}

echo "login user"
user_login="$(curl -fsS -X POST "$BASE/api/user/login" \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"$USER\",\"password\":\"$PASS\"}")"
user_token="$(echo "$user_login" | json_str access_token)"
test -n "$user_token"

self="$(curl -fsS "$BASE/api/user/self" -H "Authorization: Bearer $user_token")"
user_id="$(echo "$self" | json_num id)"
test -n "$user_id"
echo "user_id=$user_id"

echo "login root"
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
test -n "$quota_before"
test "$quota_before" -gt 0

echo "add mock OpenAI Channel → $MOCK_UPSTREAM"
ch_payload="{\"mode\":\"single\",\"channel\":{\"type\":1,\"name\":\"mock-openai\",\"key\":\"sk-mock\",\"base_url\":\"$MOCK_UPSTREAM\",\"models\":\"$MODEL\",\"group\":\"default\",\"status\":1,\"priority\":1,\"weight\":100,\"auto_ban\":1}}"
ch_out="$(curl -sS -X POST "$BASE/api/channel/" \
  -H "Authorization: Bearer $root_token" \
  -H 'Content-Type: application/json' \
  -d "$ch_payload")"
echo "channel create: $ch_out"
echo "$ch_out" | grep -q '"success"[[:space:]]*:[[:space:]]*true' || {
  echo "channel create failed" >&2
  exit 1
}

echo "list channels / models_enabled"
ch_list="$(curl -fsS "$BASE/api/channel/?p=1&page_size=20" -H "Authorization: Bearer $root_token")"
echo "channels: $(echo "$ch_list" | head -c 800)"
models_en="$(curl -fsS "$BASE/api/channel/models_enabled" -H "Authorization: Bearer $root_token" || true)"
echo "models_enabled: $(echo "$models_en" | head -c 400)"
if ! echo "$ch_list" | grep -q "$MODEL"; then
  echo "channel list missing model $MODEL — dumping DB and aborting" >&2
  docker compose -f docker-compose.dev.yml -f docker-compose.seam.yml exec -T postgres \
    psql -U root -d new-api -c 'SELECT id, name, models, status, "group" FROM channels;' >&2 || true
  docker compose -f docker-compose.dev.yml -f docker-compose.seam.yml exec -T postgres \
    psql -U root -d new-api -c 'SELECT * FROM abilities;' >&2 || true
  exit 1
fi
# Rebuild abilities from persisted row (covers older insert paths)
ch_id="$(echo "$ch_list" | sed -n 's/.*"id"[[:space:]]*:[[:space:]]*\([0-9][0-9]*\).*/\1/p' | head -n1)"
if [ -n "$ch_id" ]; then
  upd="$(curl -sS -X PUT "$BASE/api/channel/" \
    -H "Authorization: Bearer $root_token" \
    -H 'Content-Type: application/json' \
    -d "{\"id\":$ch_id,\"type\":1,\"name\":\"mock-openai\",\"key\":\"sk-mock\",\"base_url\":\"$MOCK_UPSTREAM\",\"models\":\"$MODEL\",\"group\":\"default\",\"priority\":1,\"weight\":100,\"auto_ban\":1}")"
  echo "channel update: $upd"
fi

dump_channel_state() {
  echo "--- channel/ability dump ---" >&2
  docker compose -f docker-compose.dev.yml -f docker-compose.seam.yml exec -T postgres \
    psql -U root -d new-api -c 'SELECT id, name, models, status, "group" FROM channels;' >&2 || true
  docker compose -f docker-compose.dev.yml -f docker-compose.seam.yml exec -T postgres \
    psql -U root -d new-api -c 'SELECT * FROM abilities;' >&2 || true
  docker compose -f docker-compose.dev.yml -f docker-compose.seam.yml logs --no-color --tail=80 new-api >&2 || true
}
echo "create API Key"
curl -fsS -X POST "$BASE/api/token/" \
  -H "Authorization: Bearer $user_token" \
  -H 'Content-Type: application/json' \
  -d '{"name":"retail-key","remain_quota":0,"expired_time":-1,"unlimited_quota":true,"model_limits_enabled":false,"model_limits":"","allow_ips":"","group":""}' \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true'
list_json="$(curl -fsS "$BASE/api/token/?p=1&size=10" -H "Authorization: Bearer $user_token")"
key_id="$(echo "$list_json" | json_num id)"
test -n "$key_id"
secret_json="$(curl -fsS -X POST "$BASE/api/token/${key_id}/key" -H "Authorization: Bearer $user_token")"
api_key="$(echo "$secret_json" | json_str key)"
test -n "$api_key"
echo "api_key_len=${#api_key}"

echo "Relay chat/completions (happy path)"
relay_code="$(curl -sS -o /tmp/relay-ok.json -w '%{http_code}' -X POST "$BASE/v1/chat/completions" \
  -H "Authorization: Bearer $api_key" \
  -H 'Content-Type: application/json' \
  -d "{\"model\":\"$MODEL\",\"messages\":[{\"role\":\"user\",\"content\":\"hi\"}],\"max_tokens\":16}")"
echo "relay_http=$relay_code"
head -c 400 /tmp/relay-ok.json; echo
if [ "$relay_code" != "200" ] || ! grep -q '"choices"' /tmp/relay-ok.json; then
  dump_channel_state
  exit 1
fi
after="$(curl -fsS "$BASE/api/user/self" -H "Authorization: Bearer $user_token")"
quota_after="$(echo "$after" | json_num quota)"
used_after="$(echo "$after" | json_num used_quota)"
echo "quota_after=$quota_after used_after=${used_after:-0}"

if [ "$quota_after" -ge "$quota_before" ] && [ "${used_after:-0}" -le "${used_before:-0}" ]; then
  echo "expected 额度 to decrease (or used_quota to increase); before=$quota_before after=$quota_after used_before=${used_before:-0} used_after=${used_after:-0}" >&2
  exit 1
fi

echo "negative: invalid API Key"
bad_code="$(curl -sS -o /tmp/relay-bad.json -w '%{http_code}' -X POST "$BASE/v1/chat/completions" \
  -H 'Authorization: Bearer sk-invalid-basedong-probe' \
  -H 'Content-Type: application/json' \
  -d "{\"model\":\"$MODEL\",\"messages\":[{\"role\":\"user\",\"content\":\"hi\"}],\"max_tokens\":8}")"
echo "bad_key_http=$bad_code"
if [ "$bad_code" = "200" ] && grep -q '"choices"' /tmp/relay-bad.json; then
  echo "invalid Key must not succeed" >&2
  exit 1
fi

echo "negative: insufficient 额度"
curl -fsS -X POST "$BASE/api/user/manage" \
  -H "Authorization: Bearer $root_token" \
  -H 'Content-Type: application/json' \
  -d "{\"id\":$user_id,\"action\":\"add_quota\",\"mode\":\"override\",\"value\":0}" \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true'
zero_code="$(curl -sS -o /tmp/relay-zero.json -w '%{http_code}' -X POST "$BASE/v1/chat/completions" \
  -H "Authorization: Bearer $api_key" \
  -H 'Content-Type: application/json' \
  -d "{\"model\":\"$MODEL\",\"messages\":[{\"role\":\"user\",\"content\":\"hi\"}],\"max_tokens\":8}")"
echo "zero_quota_http=$zero_code"
if [ "$zero_code" = "200" ] && grep -q '"choices"' /tmp/relay-zero.json; then
  echo "insufficient 额度 must not succeed" >&2
  cat /tmp/relay-zero.json >&2
  exit 1
fi

echo "ok: retail loop (Channel + Relay + 额度 + negatives)"
