#!/usr/bin/env bash
# PoC #14: responses-southbound via northbound chat/completions
# Seam: New API speaks only chat; Sidecar converts to Zen /v1/responses
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
cd "$ROOT"

PROJECT=basedong-zen-spine
COMPOSE=(
  docker compose
  -f docker-compose.yml
  -f docker-compose.zen-sidecar.yml
  -f docker-compose.zen-mock.yml
  -f docker-compose.zen-retry.yml
  -f docker-compose.zen-responses.yml
  -p "$PROJECT"
)
NETWORK="${PROJECT}_default"
BASE="${BASEDONG_API_BASE:-http://localhost:3000}"
BASE="${BASE%/}"
SIDECAR_URL="${ZEN_SIDECAR_URL:-http://zen-sidecar:8080}"
SIDECAR_KEY="${SIDECAR_CREDENTIAL:-basedong-sidecar-dev-credential}"
USER="p$(date +%s | tail -c 7)$((RANDOM % 1000))"
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

sidecar_curl() {
  local out_base="$1"
  shift
  local raw_http code
  raw_http="$(docker run --rm --network "$NETWORK" \
    curlimages/curl:8.12.1 -sS -i -w "\n__HTTP_CODE__%{http_code}" \
    "$@" 2>/dev/null || true)"
  code="$(printf '%s\n' "$raw_http" | tail -n1 | sed 's/.*__HTTP_CODE__//')"
  printf '%s' "$code" >"$WORKDIR/${out_base}.code"
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

echo "== compose up (responses overlay) =="
"${COMPOSE[@]}" up -d --pull never --no-build postgres redis api
"${COMPOSE[@]}" up -d --pull never --no-build --force-recreate mock-zen zen-sidecar
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
  [[ "$i" -eq 36 ]] && fail "sidecar healthz not 200"
  sleep 2
done
pass "sidecar healthz"

echo "== Sidecar: muse-spark-free via northbound chat → southbound responses =="
code="$(sidecar_curl muse -H "Authorization: Bearer $SIDECAR_KEY" -H "Content-Type: application/json" \
  -d '{"model":"muse-spark-free","messages":[{"role":"user","content":"hi"}],"max_tokens":8,"stream":false}' \
  "$SIDECAR_URL/v1/chat/completions"; cat "$WORKDIR/muse.code")"
echo "muse_http=$code"
head -n 20 "$WORKDIR/muse.hdr"
head -c 500 "$WORKDIR/muse.body"; echo
[[ "$code" == "200" ]] || fail "expected 200 from responses conversion"
grep -qiE 'x-basedong-southbound:[[:space:]]*responses' "$WORKDIR/muse.hdr" \
  || fail "missing X-Basedong-Southbound: responses"
grep -q '"model"[[:space:]]*:[[:space:]]*"muse-spark-free"' "$WORKDIR/muse.body" || fail "model id missing"
grep -q 'pong-responses' "$WORKDIR/muse.body" || fail "expected converted assistant text"
pass "chat→responses→chat conversion succeeded"

echo "== Sidecar: stream on responses-only model fails explicitly (no paid fallback) =="
code_s="$(sidecar_curl muse_s -H "Authorization: Bearer $SIDECAR_KEY" -H "Content-Type: application/json" \
  -d '{"model":"muse-spark-free","messages":[{"role":"user","content":"hi"}],"stream":true}' \
  "$SIDECAR_URL/v1/chat/completions"; cat "$WORKDIR/muse_s.code")"
echo "stream_http=$code_s"
[[ "$code_s" == "501" ]] || fail "expected 501 protocol_conversion_error for stream, got $code_s"
grep -q 'protocol_conversion_error' "$WORKDIR/muse_s.body" || fail "missing protocol_conversion_error"
grep -qi 'paid-not-free\|402' "$WORKDIR/muse_s.body" && fail "must not mention paid fallback"
pass "stream conversion refused explicitly"

echo "== Sidecar: unconvertible responses output is explicit failure =="
code_b="$(sidecar_curl broken -H "Authorization: Bearer $SIDECAR_KEY" -H "Content-Type: application/json" \
  -d '{"model":"broken-responses-free","messages":[{"role":"user","content":"hi"}]}' \
  "$SIDECAR_URL/v1/chat/completions"; cat "$WORKDIR/broken.code")"
echo "broken_http=$code_b"
[[ "$code_b" == "502" ]] || fail "expected 502 conversion failure, got $code_b"
grep -q 'protocol_conversion_error' "$WORKDIR/broken.body" || fail "missing protocol_conversion_error on broken"
pass "broken responses→chat fails explicitly"

echo "== Sidecar: paid model not in Free Pool → 404 (no silent paid) =="
code_p="$(sidecar_curl paid -H "Authorization: Bearer $SIDECAR_KEY" -H "Content-Type: application/json" \
  -d '{"model":"paid-not-free","messages":[{"role":"user","content":"hi"}]}' \
  "$SIDECAR_URL/v1/chat/completions"; cat "$WORKDIR/paid.code")"
echo "paid_http=$code_p"
[[ "$code_p" == "404" ]] || fail "expected 404 for paid-not-free outside Free Pool"
grep -qi 'no paid fallback' "$WORKDIR/paid.body" || fail "expected no-paid-fallback message"
pass "paid model rejected without fallback"

echo "== New API path: only chat Channel; muse-spark-free still works =="
setup_json="$(curl -fsS "$BASE/api/setup" || true)"
if echo "$setup_json" | grep -q '"status"[[:space:]]*:[[:space:]]*false\|"status"[[:space:]]*:[[:space:]]*0'; then
  curl -fsS -X POST "$BASE/api/setup" -H 'Content-Type: application/json' \
    -d "{\"username\":\"$ROOT_USER\",\"password\":\"$ROOT_PASS\",\"confirmPassword\":\"$ROOT_PASS\",\"SelfUseModeEnabled\":false,\"DemoSiteEnabled\":false}" \
    | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "setup failed"
fi
root_token="$(curl -sS -X POST "$BASE/api/user/login" -H 'Content-Type: application/json' \
  -d "{\"username\":\"$ROOT_USER\",\"password\":\"$ROOT_PASS\"}" | json_str access_token)"
[[ -n "$root_token" ]] || fail "root login failed"

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
merged="$(echo "$mp" | jqn -c '. + {"auto":0,"muse-spark-free":0}')"
curl -fsS -X PUT "$BASE/api/option/" -H "Authorization: Bearer $root_token" -H 'Content-Type: application/json' \
  -d "$(jqn -n --arg v "$merged" '{key:"ModelPrice",value:$v}')" \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "ModelPrice failed"

# Channel models include muse-spark-free; empty mapping — New API never opens a /responses Channel
ch_list="$(curl -fsS "$BASE/api/channel/?p=1&page_size=50" -H "Authorization: Bearer $root_token")"
if echo "$ch_list" | grep -q 'zen-sidecar-auto'; then
  ch_id="$(echo "$ch_list" | jqn '.data.items[] | select(.name=="zen-sidecar-auto") | .id' | head -n1)"
  curl -fsS -X PUT "$BASE/api/channel/" -H "Authorization: Bearer $root_token" -H 'Content-Type: application/json' \
    -d "$(jqn -n --argjson id "$ch_id" --arg key "$SIDECAR_KEY" --arg base "$SIDECAR_URL" \
      '{id:$id,type:1,name:"zen-sidecar-auto",key:$key,base_url:$base,models:"auto,muse-spark-free",model_mapping:"{}",group:"default",priority:1,weight:100,auto_ban:1}')" \
    | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "channel update failed"
else
  curl -fsS -X POST "$BASE/api/channel/" -H "Authorization: Bearer $root_token" -H 'Content-Type: application/json' \
    -d "$(jqn -n --arg key "$SIDECAR_KEY" --arg base "$SIDECAR_URL" \
      '{mode:"single",channel:{type:1,name:"zen-sidecar-auto",key:$key,base_url:$base,models:"auto,muse-spark-free",model_mapping:"{}",group:"default",status:1,priority:1,weight:100,auto_ban:1}}')" \
    | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "channel create failed"
fi
pass "Channel chat-only (models auto,muse-spark-free; no responses Channel)"

curl -fsS -X POST "$BASE/api/token/" -H "Authorization: Bearer $user_token" -H 'Content-Type: application/json' \
  -d '{"name":"zen-responses-key","remain_quota":0,"expired_time":-1,"unlimited_quota":true,"model_limits_enabled":false,"model_limits":"","allow_ips":"","group":""}' \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "token create failed"
key_id="$(curl -fsS "$BASE/api/token/?p=1&size=10" -H "Authorization: Bearer $user_token" | json_num id)"
api_key="$(curl -fsS -X POST "$BASE/api/token/${key_id}/key" -H "Authorization: Bearer $user_token" | json_str key)"
[[ -n "$api_key" ]] || fail "api key missing"

relay_code="$(curl -sS -o "$WORKDIR/napi.json" -w '%{http_code}' -X POST "$BASE/v1/chat/completions" \
  -H "Authorization: Bearer $api_key" -H 'Content-Type: application/json' \
  -d '{"model":"muse-spark-free","messages":[{"role":"user","content":"hi"}],"max_tokens":8,"stream":false}')"
echo "napi_http=$relay_code"
head -c 500 "$WORKDIR/napi.json"; echo
[[ "$relay_code" == "200" ]] || fail "New API chat path expected 200 via Sidecar responses conversion"
grep -q 'pong-responses' "$WORKDIR/napi.json" || fail "New API body missing converted text"
grep -q '"model"[[:space:]]*:[[:space:]]*"muse-spark-free"' "$WORKDIR/napi.json" || fail "upstream model missing"
pass "New API chat/completions → Sidecar responses southbound (no responses Channel)"

echo "ALL RESPONSES SOUTHBOUND CHECKS PASSED"
