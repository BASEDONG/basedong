#!/usr/bin/env bash
# PoC #13: in-Sidecar retry / Free Pool model rotation (mock Zen)
# Seam: New API Relay + Sidecar northbound; New API RetryTimes stays out of the loop
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
cd "$ROOT"

PROJECT=basedong-zen-spine
COMPOSE=(
  docker compose
  -f docker-compose.yml
  -f docker-compose.zen-sidecar.yml
  -f docker-compose.zen-retry.yml
  -p "$PROJECT"
)
NETWORK="${PROJECT}_default"
BASE="${BASEDONG_API_BASE:-http://localhost:3000}"
BASE="${BASE%/}"
SIDECAR_URL="${ZEN_SIDECAR_URL:-http://zen-sidecar:8080}"
SIDECAR_KEY="${SIDECAR_CREDENTIAL:-basedong-sidecar-dev-credential}"
USER="r$(date +%s | tail -c 7)$((RANDOM % 1000))"
PASS="ProbePass123!"
ROOT_USER="rootzen"
ROOT_PASS="RootPass123!"
WORKDIR="$ROOT/apps/zen-sidecar/.probe-tmp-$$"
mkdir -p "$WORKDIR"
trap 'rm -rf "$WORKDIR"' EXIT

fail() { echo "FAIL: $*" >&2; exit 1; }
pass() { echo "PASS: $*"; }
json_str() { sed -n "s/.*\"${1}\"[[:space:]]*:[[:space:]]*\"\([^\"]*\)\".*/\1/p" | head -n1; }
json_num() { sed -n "s/.*\"${1}\"[[:space:]]*:[[:space:]]*\([0-9][0-9]*\).*/\1/p" | head -n1; }
jqn() { docker run --rm -i ghcr.io/jqlang/jq:1.7 "$@"; }

# curl on compose network; split headers/body from -i response onto workdir files
sidecar_curl() {
  local out_base="$1"
  shift
  local code raw_http
  # Capture full response + trailer status (small PoC payloads)
  raw_http="$(docker run --rm --network "$NETWORK" \
    curlimages/curl:8.12.1 -sS -i -w "\n__HTTP_CODE__%{http_code}" \
    "$@" 2>/dev/null || true)"
  code="$(printf '%s\n' "$raw_http" | tail -n1 | sed 's/.*__HTTP_CODE__//')"
  printf '%s' "$code" >"$WORKDIR/${out_base}.code"
  # Drop trailer; split at first empty line
  printf '%s\n' "$raw_http" | sed '$d' >"$WORKDIR/${out_base}.full"
  local hdr_end
  hdr_end="$(grep -n -m1 -E '^[[:space:]]*$' "$WORKDIR/${out_base}.full" | head -n1 | cut -d: -f1 || true)"
  if [[ -n "$hdr_end" ]]; then
    head -n "$((hdr_end - 1))" "$WORKDIR/${out_base}.full" >"$WORKDIR/${out_base}.hdr"
    tail -n "+$((hdr_end + 1))" "$WORKDIR/${out_base}.full" >"$WORKDIR/${out_base}.body"
  else
    cp "$WORKDIR/${out_base}.full" "$WORKDIR/${out_base}.hdr"
    : >"$WORKDIR/${out_base}.body"
  fi
}

echo "== compose up (retry overlay: mock-zen + auto-retry sidecar) =="
"${COMPOSE[@]}" up -d --pull never --no-build postgres redis api
"${COMPOSE[@]}" up -d --pull never --no-build --force-recreate mock-zen zen-sidecar
# Ensure api can resolve the recreated sidecar
"${COMPOSE[@]}" up -d --pull never --no-build api

echo "== wait api + sidecar =="
for i in $(seq 1 90); do
  curl -fsS "$BASE/api/status" >/dev/null 2>&1 && break
  [[ "$i" -eq 90 ]] && fail "api not ready"
  sleep 2
done
pass "api ready"
for i in $(seq 1 36); do
  code="$(docker run --rm --network "$NETWORK" curlimages/curl:8.12.1 -sS -o /dev/null -w "%{http_code}" "$SIDECAR_URL/healthz" || true)"
  [[ "$code" == "200" ]] && break
  [[ "$i" -eq 36 ]] && fail "sidecar healthz not 200 (got $code)"
  sleep 2
done
pass "sidecar healthz"

echo "== Sidecar direct: auto rotates fail-free → ok-free =="
code="$(sidecar_curl auto -H "Authorization: Bearer $SIDECAR_KEY" -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}],"max_tokens":8,"stream":false}' \
  "$SIDECAR_URL/v1/chat/completions"; cat "$WORKDIR/auto.code")"
echo "direct_http=$code"
head -n 20 "$WORKDIR/auto.hdr"
head -c 400 "$WORKDIR/auto.body"; echo
[[ "$code" == "200" ]] || fail "auto retry expected 200, got $code"
grep -qiE 'x-basedong-retry-tried:[[:space:]]*fail-free,ok-free' "$WORKDIR/auto.hdr" \
  || fail "missing retry tried header fail-free,ok-free"
grep -q '"model"[[:space:]]*:[[:space:]]*"ok-free"' "$WORKDIR/auto.body" || fail "expected model ok-free after rotation"
pass "Sidecar rotated fail-free → ok-free before success"

echo "== Sidecar: client 400 is not blindly retried across pool =="
code400="$(sidecar_curl bad -H "Authorization: Bearer $SIDECAR_KEY" -H "Content-Type: application/json" \
  -d '{"model":"client-bad","messages":[{"role":"user","content":"hi"}],"max_tokens":8}' \
  "$SIDECAR_URL/v1/chat/completions"; cat "$WORKDIR/bad.code")"
echo "client_bad_http=$code400"
tried="$(grep -i 'x-basedong-retry-tried:' "$WORKDIR/bad.hdr" | tr -d '\r' || true)"
echo "$tried"
[[ "$code400" == "400" ]] || fail "expected 400 for client-bad"
echo "$tried" | grep -q 'client-bad' || fail "tried header should mention client-bad"
echo "$tried" | grep -q 'ok-free' && fail "must not rotate into ok-free on 400"
pass "non-retryable 400 stops without pool walk"

echo "== Sidecar stream: pre-body 429 then ok-free SSE (no stitch) =="
code_sse="$(sidecar_curl sse -H "Authorization: Bearer $SIDECAR_KEY" -H "Content-Type: application/json" \
  -H "Accept: text/event-stream" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}],"max_tokens":8,"stream":true}' \
  "$SIDECAR_URL/v1/chat/completions"; cat "$WORKDIR/sse.code")"
[[ "$code_sse" == "200" ]] || fail "stream auto expected 200, got $code_sse"
grep -qiE 'x-basedong-upstream-model:[[:space:]]*ok-free' "$WORKDIR/sse.hdr" \
  || fail "stream upstream model should be ok-free"
grep -qiE 'x-basedong-retry-tried:[[:space:]]*fail-free,ok-free' "$WORKDIR/sse.hdr" \
  || fail "stream should show fail then ok in tried"
models="$(
  grep '^data:' "$WORKDIR/sse.body" | grep -v '\[DONE\]' | sed 's/^data:[[:space:]]*//' \
    | while IFS= read -r line; do
        [[ -z "$line" ]] && continue
        echo "$line" | jqn -r 'if type=="object" then (.model // empty) else empty end' 2>/dev/null || true
      done | grep -v '^$' | sort -u || true
)"
echo "sse_models=$models"
echo "$models" | grep -q 'fail-free' && fail "stream body must not include fail-free chunks (no stitch)"
pass "stream success after pre-body rotation; single upstream in body"

echo "== New API: RetryTimes=0; Sidecar absorbs rotation =="
setup_json="$(curl -fsS "$BASE/api/setup" || true)"
if echo "$setup_json" | grep -q '"status"[[:space:]]*:[[:space:]]*false\|"status"[[:space:]]*:[[:space:]]*0'; then
  curl -fsS -X POST "$BASE/api/setup" -H 'Content-Type: application/json' \
    -d "{\"username\":\"$ROOT_USER\",\"password\":\"$ROOT_PASS\",\"confirmPassword\":\"$ROOT_PASS\",\"SelfUseModeEnabled\":false,\"DemoSiteEnabled\":false}" \
    | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "setup failed"
fi
root_token="$(curl -sS -X POST "$BASE/api/user/login" -H 'Content-Type: application/json' \
  -d "{\"username\":\"$ROOT_USER\",\"password\":\"$ROOT_PASS\"}" | json_str access_token)"
[[ -n "$root_token" ]] || fail "root login failed"

curl -fsS -X PUT "$BASE/api/option/" -H "Authorization: Bearer $root_token" -H 'Content-Type: application/json' \
  -d '{"key":"RetryTimes","value":"0"}' \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "set RetryTimes failed"
pass "New API RetryTimes=0"

curl -fsS -X POST "$BASE/api/user/register" -H 'Content-Type: application/json' \
  -d "{\"username\":\"$USER\",\"password\":\"$PASS\"}" \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "register failed"
user_token="$(curl -fsS -X POST "$BASE/api/user/login" -H 'Content-Type: application/json' \
  -d "{\"username\":\"$USER\",\"password\":\"$PASS\"}" | json_str access_token)"
user_id="$(curl -fsS "$BASE/api/user/self" -H "Authorization: Bearer $user_token" | json_num id)"
curl -fsS -X POST "$BASE/api/user/manage" -H "Authorization: Bearer $root_token" -H 'Content-Type: application/json' \
  -d "{\"id\":$user_id,\"action\":\"add_quota\",\"mode\":\"add\",\"value\":100000}" \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "quota failed"

opts="$(curl -fsS "$BASE/api/option/" -H "Authorization: Bearer $root_token")"
mp="$(echo "$opts" | jqn -r '.data[] | select(.key=="ModelPrice") | .value')"
[[ -n "$mp" && "$mp" != "null" ]] || mp='{}'
merged="$(echo "$mp" | jqn -c '. + {"auto":0}')"
curl -fsS -X PUT "$BASE/api/option/" -H "Authorization: Bearer $root_token" -H 'Content-Type: application/json' \
  -d "$(jqn -n --arg v "$merged" '{key:"ModelPrice",value:$v}')" \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "ModelPrice failed"

# model_mapping empty so Sidecar receives literal auto (owns rotation)
ch_list="$(curl -fsS "$BASE/api/channel/?p=1&page_size=50" -H "Authorization: Bearer $root_token")"
if echo "$ch_list" | grep -q 'zen-sidecar-auto'; then
  ch_id="$(echo "$ch_list" | jqn '.data.items[] | select(.name=="zen-sidecar-auto") | .id' | head -n1)"
  curl -fsS -X PUT "$BASE/api/channel/" -H "Authorization: Bearer $root_token" -H 'Content-Type: application/json' \
    -d "$(jqn -n --argjson id "$ch_id" --arg key "$SIDECAR_KEY" --arg base "$SIDECAR_URL" \
      '{id:$id,type:1,name:"zen-sidecar-auto",key:$key,base_url:$base,models:"auto",model_mapping:"{}",group:"default",priority:1,weight:100,auto_ban:1}')" \
    | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "channel update failed"
else
  curl -fsS -X POST "$BASE/api/channel/" -H "Authorization: Bearer $root_token" -H 'Content-Type: application/json' \
    -d "$(jqn -n --arg key "$SIDECAR_KEY" --arg base "$SIDECAR_URL" \
      '{mode:"single",channel:{type:1,name:"zen-sidecar-auto",key:$key,base_url:$base,models:"auto",model_mapping:"{}",group:"default",status:1,priority:1,weight:100,auto_ban:1}}')" \
    | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "channel create failed"
fi
pass "Channel auto → Sidecar (no model_mapping)"

curl -fsS -X POST "$BASE/api/token/" -H "Authorization: Bearer $user_token" -H 'Content-Type: application/json' \
  -d '{"name":"zen-retry-key","remain_quota":0,"expired_time":-1,"unlimited_quota":true,"model_limits_enabled":false,"model_limits":"","allow_ips":"","group":""}' \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "token create failed"
key_id="$(curl -fsS "$BASE/api/token/?p=1&size=10" -H "Authorization: Bearer $user_token" | json_num id)"
api_key="$(curl -fsS -X POST "$BASE/api/token/${key_id}/key" -H "Authorization: Bearer $user_token" | json_str key)"
[[ -n "$api_key" ]] || fail "api key missing"

relay_code="$(curl -sS -o "$WORKDIR/napi.json" -w '%{http_code}' -X POST "$BASE/v1/chat/completions" \
  -H "Authorization: Bearer $api_key" -H 'Content-Type: application/json' \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}],"max_tokens":8,"stream":false}')"
echo "napi_http=$relay_code"
head -c 400 "$WORKDIR/napi.json"; echo
[[ "$relay_code" == "200" ]] || fail "New API path expected 200 after Sidecar rotation"
grep -q '"model"[[:space:]]*:[[:space:]]*"ok-free"' "$WORKDIR/napi.json" || fail "New API response should surface ok-free"
pass "New API got single success after Sidecar-internal rotation (RetryTimes=0)"

echo "ALL AUTO RETRY CHECKS PASSED"
