#!/usr/bin/env bash
# PoC #12: customer API Key → New API → Zen Sidecar → Anonymous Zen (SSE stream)
# Seam: New API Relay streaming chat/completions
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
UPSTREAM_FREE="${ZEN_POC_UPSTREAM_MODEL:-big-pickle}"
USER="s$(date +%s | tail -c 7)$((RANDOM % 1000))"
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
jqn() { docker run --rm -i ghcr.io/jqlang/jq:1.7 "$@"; }

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
[[ "$ready" -eq 1 ]] || fail "api never became ready"

echo "== wait zen-sidecar /healthz =="
for i in $(seq 1 36); do
  code="$(docker run --rm --network "$NETWORK" curlimages/curl:8.12.1 -sS -o /dev/null -w "%{http_code}" "$SIDECAR_URL/healthz" || true)"
  [[ "$code" == "200" ]] && { pass "zen-sidecar healthz"; break; }
  [[ "$i" -eq 36 ]] && fail "zen-sidecar healthz not 200"
  sleep 5
done

echo "== root session =="
setup_json="$(curl -fsS "$BASE/api/setup" || true)"
if echo "$setup_json" | grep -q '"status"[[:space:]]*:[[:space:]]*false\|"status"[[:space:]]*:[[:space:]]*0'; then
  curl -fsS -X POST "$BASE/api/setup" \
    -H 'Content-Type: application/json' \
    -d "{\"username\":\"$ROOT_USER\",\"password\":\"$ROOT_PASS\",\"confirmPassword\":\"$ROOT_PASS\",\"SelfUseModeEnabled\":false,\"DemoSiteEnabled\":false}" \
    | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "setup failed"
fi
root_login="$(curl -sS -X POST "$BASE/api/user/login" \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"$ROOT_USER\",\"password\":\"$ROOT_PASS\"}")"
root_token="$(echo "$root_login" | json_str access_token)"
[[ -n "$root_token" ]] || fail "root login failed: $root_login"
pass "root session"

echo "== register user + quota =="
curl -fsS -X POST "$BASE/api/user/register" \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"$USER\",\"password\":\"$PASS\"}" \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "register failed"
user_token="$(curl -fsS -X POST "$BASE/api/user/login" \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"$USER\",\"password\":\"$PASS\"}" | json_str access_token)"
user_id="$(curl -fsS "$BASE/api/user/self" -H "Authorization: Bearer $user_token" | json_num id)"
curl -fsS -X POST "$BASE/api/user/manage" \
  -H "Authorization: Bearer $root_token" \
  -H 'Content-Type: application/json' \
  -d "{\"id\":$user_id,\"action\":\"add_quota\",\"mode\":\"add\",\"value\":100000}" \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "quota failed"
pass "user $USER ready"

echo "== ensure ModelPrice auto:0 + Channel =="
opts="$(curl -fsS "$BASE/api/option/" -H "Authorization: Bearer $root_token")"
mp="$(echo "$opts" | jqn -r '.data[] | select(.key=="ModelPrice") | .value')"
[[ -n "$mp" && "$mp" != "null" ]] || mp='{}'
merged="$(echo "$mp" | jqn -c '. + {"auto":0}')"
curl -fsS -X PUT "$BASE/api/option/" \
  -H "Authorization: Bearer $root_token" \
  -H 'Content-Type: application/json' \
  -d "$(jqn -n --arg v "$merged" '{key:"ModelPrice",value:$v}')" \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "ModelPrice failed"

ch_list="$(curl -fsS "$BASE/api/channel/?p=1&page_size=50" -H "Authorization: Bearer $root_token")"
if ! echo "$ch_list" | grep -q 'zen-sidecar-auto'; then
  curl -fsS -X POST "$BASE/api/channel/" \
    -H "Authorization: Bearer $root_token" \
    -H 'Content-Type: application/json' \
    -d "$(jqn -n --arg key "$SIDECAR_KEY" --arg base "$SIDECAR_URL" --arg up "$UPSTREAM_FREE" \
      '{mode:"single",channel:{type:1,name:"zen-sidecar-auto",key:$key,base_url:$base,models:"auto",model_mapping:("{\"auto\":\""+$up+"\"}"),group:"default",status:1,priority:1,weight:100,auto_ban:1}}')" \
    | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "channel create failed"
else
  # Ensure Channel.Key is correct Sidecar Credential (previous probe may have overwritten it)
  ch_id="$(echo "$ch_list" | jqn '.data.items[] | select(.name=="zen-sidecar-auto") | .id' | head -n1)"
  curl -fsS -X PUT "$BASE/api/channel/" \
    -H "Authorization: Bearer $root_token" \
    -H 'Content-Type: application/json' \
    -d "$(jqn -n --argjson id "$ch_id" --arg key "$SIDECAR_KEY" --arg base "$SIDECAR_URL" --arg up "$UPSTREAM_FREE" \
      '{id:$id,type:1,name:"zen-sidecar-auto",key:$key,base_url:$base,models:"auto",model_mapping:("{\"auto\":\""+$up+"\"}"),group:"default",priority:1,weight:100,auto_ban:1}')" \
    | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "channel repair failed"
fi
pass "Channel auto → Sidecar ready"

echo "== customer API Key =="
curl -fsS -X POST "$BASE/api/token/" \
  -H "Authorization: Bearer $user_token" \
  -H 'Content-Type: application/json' \
  -d '{"name":"zen-auto-stream","remain_quota":0,"expired_time":-1,"unlimited_quota":true,"model_limits_enabled":false,"model_limits":"","allow_ips":"","group":""}' \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "token create failed"
key_id="$(curl -fsS "$BASE/api/token/?p=1&size=10" -H "Authorization: Bearer $user_token" | json_num id)"
api_key="$(curl -fsS -X POST "$BASE/api/token/${key_id}/key" -H "Authorization: Bearer $user_token" | json_str key)"
[[ -n "$api_key" ]] || fail "api key missing"
pass "API Key issued"

OUT=/tmp/zen-auto-stream.sse
HDR=/tmp/zen-auto-stream.hdr
relay_body="$(jqn -n '{model:"auto",messages:[{role:"user",content:"Reply with exactly: pong"}],max_tokens:32,stream:true}')"

echo "== Relay stream:true model=auto =="
relay_code="$(curl -sS -D "$HDR" -o "$OUT" -w '%{http_code}' -X POST "$BASE/v1/chat/completions" \
  -H "Authorization: Bearer $api_key" \
  -H 'Content-Type: application/json' \
  -H 'Accept: text/event-stream' \
  -d "$relay_body")"
echo "relay_http=$relay_code"
head -c 200 "$HDR"; echo
head -c 800 "$OUT"; echo

[[ "$relay_code" == "200" ]] || fail "stream expected HTTP 200, got $relay_code"
grep -qi 'text/event-stream\|application/octet-stream\|chunked' "$HDR" \
  || grep -q '^data:' "$OUT" \
  || fail "missing SSE Content-Type or data: frames"
pass "SSE response framing present"

grep -q '^data:' "$OUT" || fail "no data: lines in stream body"
# OpenAI-compatible streams end with data: [DONE] (sometimes with space)
grep -qE '^data:\s*\[DONE\]' "$OUT" || fail "missing data: [DONE] terminator"
pass "SSE has data frames and [DONE]"

# Collect distinct model ids from JSON chunks (success path: one upstream, no mid-stream stitch)
models="$(
  grep '^data:' "$OUT" | grep -v '\[DONE\]' | sed 's/^data:[[:space:]]*//' \
    | while IFS= read -r line; do
        [[ -z "$line" || "$line" == *'[DONE]'* ]] && continue
        echo "$line" | jqn -r 'if type=="object" then (.model // empty) else empty end' 2>/dev/null || true
      done | grep -v '^$' | sort -u || true
)"
echo "stream_models<<$models>>"
count="$(echo "$models" | grep -c . || true)"
if [[ "$count" -gt 1 ]]; then
  fail "multiple models in one stream (possible stitch): $models"
fi
if [[ -n "$models" ]]; then
  case "$models" in
    auto|"$UPSTREAM_FREE"|*-free|big-pickle) pass "single stream model=$models" ;;
    *) fail "unexpected stream model: $models" ;;
  esac
else
  pass "stream chunks omit model field (still single upstream success path)"
fi

# At least one delta/content or similar usable chunk for OpenAI clients
grep -qE '"delta"|"content"|"choices"' "$OUT" || fail "SSE body lacks OpenAI-compatible choices/delta/content"
pass "OpenAI-compatible stream payload present"

echo "ALL AUTO STREAM CHECKS PASSED"
