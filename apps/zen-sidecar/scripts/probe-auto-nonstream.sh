#!/usr/bin/env bash
# PoC #11: customer API Key → New API Channel `auto` → Zen Sidecar → Anonymous Zen (non-stream)
# Seam: New API Relay + Sidecar northbound chat/completions
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
cd "$ROOT"

PROJECT=basedong-zen-spine
COMPOSE=(docker compose -f docker-compose.yml -f docker-compose.zen-sidecar.yml -p "$PROJECT")
NETWORK="${PROJECT}_default"
BASE="${BASEDONG_API_BASE:-http://localhost:3000}"
BASE="${BASE%/}"
SIDECAR_URL="${ZEN_SIDECAR_URL:-http://zen-sidecar:8080}"
SIDECAR_KEY="${SIDECAR_CREDENTIAL:-basedong-sidecar-dev-credential}"
# PoC: stock opencode2api has no native `auto` — Channel model_mapping bridges until #17.
UPSTREAM_FREE="${ZEN_POC_UPSTREAM_MODEL:-big-pickle}"
MODEL=auto
USER="z$(date +%s | tail -c 7)$((RANDOM % 1000))"
PASS="ProbePass123!"
ROOT_USER="rootzen"
ROOT_PASS="RootPass123!"

fail() { echo "FAIL: $*" >&2; exit 1; }
pass() { echo "PASS: $*"; }

json_str() {
  local key="$1"
  sed -n "s/.*\"${key}\"[[:space:]]*:[[:space:]]*\"\([^\"]*\)\".*/\1/p" | head -n1
}
json_num() {
  local key="$1"
  sed -n "s/.*\"${key}\"[[:space:]]*:[[:space:]]*\([0-9][0-9]*\).*/\1/p" | head -n1
}

jqn() {
  docker run --rm -i ghcr.io/jqlang/jq:1.7 "$@"
}

echo "== compose up: api + zen-sidecar =="
"${COMPOSE[@]}" up -d postgres redis zen-sidecar api

echo "== wait api /api/status =="
ready=0
for i in $(seq 1 90); do
  if curl -fsS "$BASE/api/status" >/dev/null 2>&1; then
    ready=1
    pass "api status reachable"
    break
  fi
  sleep 2
done
[[ "$ready" -eq 1 ]] || {
  "${COMPOSE[@]}" logs --tail=100 api || true
  fail "api never became ready at $BASE"
}

echo "== wait zen-sidecar /healthz =="
for i in $(seq 1 36); do
  code="$(docker run --rm --network "$NETWORK" curlimages/curl:8.12.1 -sS -o /dev/null -w "%{http_code}" "$SIDECAR_URL/healthz" || true)"
  if [[ "$code" == "200" ]]; then
    pass "zen-sidecar healthz"
    break
  fi
  [[ "$i" -eq 36 ]] && fail "zen-sidecar healthz not 200 (got ${code:-n/a})"
  sleep 5
done

[[ "$SIDECAR_KEY" != "public" ]] || fail "Sidecar Credential must not be Anonymous Zen public"
pass "Sidecar Credential distinct from public"

echo "== setup root (if needed) =="
setup_json="$(curl -fsS "$BASE/api/setup" || true)"
if echo "$setup_json" | grep -q '"status"[[:space:]]*:[[:space:]]*false\|"status"[[:space:]]*:[[:space:]]*0'; then
  curl -fsS -X POST "$BASE/api/setup" \
    -H 'Content-Type: application/json' \
    -d "{\"username\":\"$ROOT_USER\",\"password\":\"$ROOT_PASS\",\"confirmPassword\":\"$ROOT_PASS\",\"SelfUseModeEnabled\":false,\"DemoSiteEnabled\":false}" \
    | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "initial setup failed"
else
  # Already initialized — try configured root; fall back to common probe root
  :
fi

login_root() {
  local u="$1" p="$2"
  curl -sS -X POST "$BASE/api/user/login" \
    -H 'Content-Type: application/json' \
    -d "{\"username\":\"$u\",\"password\":\"$p\"}"
}

root_login="$(login_root "$ROOT_USER" "$ROOT_PASS")"
root_token="$(echo "$root_login" | json_str access_token)"
if [[ -z "$root_token" ]]; then
  root_login="$(login_root rootprobe RootPass123!)"
  root_token="$(echo "$root_login" | json_str access_token)"
fi
if [[ -z "$root_token" ]]; then
  root_login="$(login_root root 123456)"
  root_token="$(echo "$root_login" | json_str access_token)"
fi
[[ -n "$root_token" ]] || fail "root login failed: $root_login"
pass "root session"

echo "== register user + quota =="
reg_out="$(curl -sS -X POST "$BASE/api/user/register" \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"$USER\",\"password\":\"$PASS\"}")"
echo "$reg_out" | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "register failed: $reg_out"

user_login="$(curl -fsS -X POST "$BASE/api/user/login" \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"$USER\",\"password\":\"$PASS\"}")"
user_token="$(echo "$user_login" | json_str access_token)"
[[ -n "$user_token" ]] || fail "user login failed"
user_id="$(curl -fsS "$BASE/api/user/self" -H "Authorization: Bearer $user_token" | json_num id)"
[[ -n "$user_id" ]] || fail "user id missing"

curl -fsS -X POST "$BASE/api/user/manage" \
  -H "Authorization: Bearer $root_token" \
  -H 'Content-Type: application/json' \
  -d "{\"id\":$user_id,\"action\":\"add_quota\",\"mode\":\"add\",\"value\":100000}" \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "grant quota failed"
pass "quota granted to $USER"

echo "== price model auto at 0 =="
opts="$(curl -fsS "$BASE/api/option/" -H "Authorization: Bearer $root_token")"
mp="$(echo "$opts" | jqn -r '.data[] | select(.key=="ModelPrice") | .value')"
[[ -n "$mp" && "$mp" != "null" ]] || mp='{}'
merged="$(echo "$mp" | jqn -c '. + {"auto":0}')"
put="$(jqn -n --arg v "$merged" '{key:"ModelPrice",value:$v}')"
curl -fsS -X PUT "$BASE/api/option/" \
  -H "Authorization: Bearer $root_token" \
  -H 'Content-Type: application/json' \
  -d "$put" \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "ModelPrice update failed"
pass "ModelPrice includes auto:0"

echo "== create Channel (BaseURL=Sidecar, Key=Sidecar Credential, models=auto) =="
ch_payload="$(jqn -n \
  --arg key "$SIDECAR_KEY" \
  --arg base "$SIDECAR_URL" \
  --arg up "$UPSTREAM_FREE" \
  '{mode:"single",channel:{
      type:1,name:"zen-sidecar-auto",key:$key,base_url:$base,
      models:"auto",
      model_mapping:("{\"auto\":\""+$up+"\"}"),
      group:"default",status:1,priority:1,weight:100,auto_ban:1
    }}')"
ch_out="$(curl -sS -X POST "$BASE/api/channel/" \
  -H "Authorization: Bearer $root_token" \
  -H 'Content-Type: application/json' \
  -d "$ch_payload")"
echo "channel create: $ch_out"
echo "$ch_out" | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "channel create failed"

ch_list="$(curl -fsS "$BASE/api/channel/?p=1&page_size=50" -H "Authorization: Bearer $root_token")"
echo "$ch_list" | grep -q 'zen-sidecar-auto' || fail "channel not listed"
echo "$ch_list" | grep -q 'auto' || fail "channel models missing auto"
# Ensure we did not store Zen public as Channel key
echo "$ch_list" | grep -qi '"key"[[:space:]]*:[[:space:]]*"public"' && fail "Channel.Key must not be public"
pass "Channel configured"

echo "== create customer API Key =="
curl -fsS -X POST "$BASE/api/token/" \
  -H "Authorization: Bearer $user_token" \
  -H 'Content-Type: application/json' \
  -d '{"name":"zen-auto-key","remain_quota":0,"expired_time":-1,"unlimited_quota":true,"model_limits_enabled":false,"model_limits":"","allow_ips":"","group":""}' \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "token create failed"
list_json="$(curl -fsS "$BASE/api/token/?p=1&size=10" -H "Authorization: Bearer $user_token")"
key_id="$(echo "$list_json" | json_num id)"
api_key="$(curl -fsS -X POST "$BASE/api/token/${key_id}/key" -H "Authorization: Bearer $user_token" | json_str key)"
[[ -n "$api_key" ]] || fail "api key secret missing"
pass "customer API Key issued"

echo "== Relay non-stream model=auto =="
relay_body="$(jqn -n '{model:"auto",messages:[{role:"user",content:"Reply with exactly: pong"}],max_tokens:32,stream:false}')"
relay_code="$(curl -sS -o /tmp/zen-auto-relay.json -w '%{http_code}' -X POST "$BASE/v1/chat/completions" \
  -H "Authorization: Bearer $api_key" \
  -H 'Content-Type: application/json' \
  -d "$relay_body")"
echo "relay_http=$relay_code"
head -c 800 /tmp/zen-auto-relay.json; echo
[[ "$relay_code" == "200" ]] || fail "relay expected 200, got $relay_code"
grep -q '"choices"' /tmp/zen-auto-relay.json || fail "relay body missing choices"
resp_model="$(json_str model </tmp/zen-auto-relay.json)"
case "$resp_model" in
  auto|"$UPSTREAM_FREE"|*-free|big-pickle) pass "response model=$resp_model (Free Pool path)" ;;
  *) fail "unexpected response model: $resp_model" ;;
esac

echo "== wrong Sidecar Credential → non-200 =="
good_id="$(echo "$ch_list" | jqn '.data.items[0].id')"
[[ -n "$good_id" && "$good_id" != "null" ]] || fail "could not resolve channel id"
# UpdateChannel rejects bodies that include `status` — omit it.
curl -fsS -X PUT "$BASE/api/channel/" \
  -H "Authorization: Bearer $root_token" \
  -H 'Content-Type: application/json' \
  -d "$(jqn -n --argjson id "$good_id" --arg base "$SIDECAR_URL" --arg up "$UPSTREAM_FREE" \
    '{id:$id,type:1,name:"zen-sidecar-auto",key:"definitely-wrong-sidecar-key",base_url:$base,models:"auto",model_mapping:("{\"auto\":\""+$up+"\"}"),group:"default",priority:1,weight:100,auto_ban:1}')" \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "overwrite channel key failed"

bad_code="$(curl -sS -o /tmp/zen-auto-bad.json -w '%{http_code}' -X POST "$BASE/v1/chat/completions" \
  -H "Authorization: Bearer $api_key" \
  -H 'Content-Type: application/json' \
  -d "$relay_body")"
echo "bad_relay_http=$bad_code"
head -c 400 /tmp/zen-auto-bad.json; echo
[[ "$bad_code" != "200" ]] || fail "wrong Sidecar Credential must not return 200"
pass "wrong credential → clear failure ($bad_code)"

echo "ALL AUTO NON-STREAM CHECKS PASSED"
