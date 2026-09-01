#!/usr/bin/env bash
# PoC #15: Catalog Sync + Probe update Free Pool (cache on sync failure)
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
  -f docker-compose.zen-catalog.yml
  -p "$PROJECT"
)
NETWORK="${PROJECT}_default"
BASE="${BASEDONG_API_BASE:-http://localhost:3000}"
BASE="${BASE%/}"
SIDECAR_URL="${ZEN_SIDECAR_URL:-http://zen-sidecar:8080}"
MOCK_URL="${ZEN_MOCK_URL:-http://mock-zen:8090}"
SIDECAR_KEY="${SIDECAR_CREDENTIAL:-basedong-sidecar-dev-credential}"
USER="c$(date +%s | tail -c 7)$((RANDOM % 1000))"
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

net_curl() {
  docker run --rm --network "$NETWORK" curlimages/curl:8.12.1 -sS "$@"
}

echo "== compose up (catalog overlay) =="
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
  code="$(net_curl -o /dev/null -w "%{http_code}" "$SIDECAR_URL/healthz" || true)"
  [[ "$code" == "200" ]] && break
  [[ "$i" -eq 36 ]] && fail "sidecar healthz not 200"
  sleep 2
done
pass "sidecar healthz"

echo "== seed catalog: free + allowlist + dead + paid =="
net_curl -H 'Content-Type: application/json' \
  -d '{"models":["ok-free","dead-free","gpt-paid","big-pickle"]}' \
  "$MOCK_URL/mock-admin/catalog" | tee "$WORKDIR/seed.json" | grep -q '"ok":[[:space:]]*true' \
  || fail "seed catalog failed"
net_curl -H 'Content-Type: application/json' \
  -d '{"ids":["dead-free"]}' \
  "$MOCK_URL/mock-admin/probe-fail" | grep -q '"ok":[[:space:]]*true' || fail "set probe-fail failed"

echo "== sync #1: pool = catalog ∩ (*-free ∨ allowlist) then Probe =="
sync1="$(net_curl -X POST -H "Authorization: Bearer $SIDECAR_KEY" "$SIDECAR_URL/admin/sync")"
echo "$sync1" | tee "$WORKDIR/sync1.json"
echo "$sync1" | jqn -e '.ok == true' >/dev/null || fail "sync1 not ok"
pool1="$(echo "$sync1" | jqn -r '.pool | sort | join(",")')"
echo "pool1=$pool1"
echo "$pool1" | grep -q 'ok-free' || fail "ok-free missing"
echo "$pool1" | grep -q 'big-pickle' || fail "allowlist big-pickle missing"
echo "$pool1" | grep -q 'dead-free' && fail "dead-free should be probed out"
echo "$pool1" | grep -q 'gpt-paid' && fail "paid models must not enter Free Pool"
cand="$(echo "$sync1" | jqn -r '.candidates | sort | join(",")')"
echo "candidates=$cand"
echo "$cand" | grep -q 'dead-free' || fail "dead-free should still be a free candidate before probe drop"
echo "$cand" | grep -q 'gpt-paid' && fail "gpt-paid must not be a free candidate"
pass "Free Pool follows filter + Probe (not a fixed seven list)"

echo "== sync #2: catalog change within one cycle (add new-free, drop ok-free) =="
net_curl -H 'Content-Type: application/json' \
  -d '{"models":["new-free","dead-free","gpt-paid","big-pickle"]}' \
  "$MOCK_URL/mock-admin/catalog" | grep -q '"ok":[[:space:]]*true' || fail "catalog mutate failed"
sync2="$(net_curl -X POST -H "Authorization: Bearer $SIDECAR_KEY" "$SIDECAR_URL/admin/sync")"
echo "$sync2" | tee "$WORKDIR/sync2.json"
pool2="$(echo "$sync2" | jqn -r '.pool | sort | join(",")')"
echo "pool2=$pool2"
echo "$pool2" | grep -q 'new-free' || fail "new-free should appear after sync"
echo "$pool2" | grep -q 'ok-free' && fail "ok-free should leave pool after catalog drop"
echo "$pool2" | grep -q 'big-pickle' || fail "big-pickle should remain"
pass "pool membership updated after catalog change in one sync cycle"

echo "== sync #3: Probe re-admits recovered model =="
net_curl -H 'Content-Type: application/json' \
  -d '{"models":["new-free","dead-free","big-pickle"]}' \
  "$MOCK_URL/mock-admin/catalog" >/dev/null
net_curl -H 'Content-Type: application/json' -d '{"ids":[]}' \
  "$MOCK_URL/mock-admin/probe-fail" | grep -q '"ok":[[:space:]]*true' || fail "clear probe-fail failed"
sync3="$(net_curl -X POST -H "Authorization: Bearer $SIDECAR_KEY" "$SIDECAR_URL/admin/sync")"
echo "$sync3" | tee "$WORKDIR/sync3.json"
pool3="$(echo "$sync3" | jqn -r '.pool | sort | join(",")')"
echo "pool3=$pool3"
echo "$pool3" | grep -q 'dead-free' || fail "recovered dead-free should be re-admitted"
pass "Probe re-admits recovered candidate"

echo "== sync #4: catalog failure retains last successful cache =="
cached="$pool3"
net_curl -H 'Content-Type: application/json' -d '{"fail":true}' \
  "$MOCK_URL/mock-admin/catalog-fail" | grep -q '"ok":[[:space:]]*true' || fail "catalog-fail on failed"
sync4="$(net_curl -X POST -H "Authorization: Bearer $SIDECAR_KEY" "$SIDECAR_URL/admin/sync")"
echo "$sync4" | tee "$WORKDIR/sync4.json"
echo "$sync4" | jqn -e '.ok == false' >/dev/null || fail "sync4 should report ok=false"
src="$(echo "$sync4" | jqn -r '.source')"
[[ "$src" == "cache" ]] || fail "expected source=cache, got $src"
echo "$sync4" | jqn --argjson want "$(echo "$sync3" | jqn '.pool')" \
  -e '(.pool | sort) == ($want | sort)' >/dev/null \
  || fail "cache pool diverged from last good"
# auto must still work from cache (not empty)
health="$(net_curl "$SIDECAR_URL/healthz")"
echo "$health" | jqn -e '(.free_pool | length) > 0' >/dev/null || fail "pool emptied on sync failure"
pass "sync failure retains last successful Free Pool cache"

# restore catalog for New API path
net_curl -H 'Content-Type: application/json' -d '{"fail":false}' "$MOCK_URL/mock-admin/catalog-fail" >/dev/null
net_curl -H 'Content-Type: application/json' \
  -d '{"models":["new-free","big-pickle"]}' "$MOCK_URL/mock-admin/catalog" >/dev/null
net_curl -X POST -H "Authorization: Bearer $SIDECAR_KEY" "$SIDECAR_URL/admin/sync" >/dev/null

echo "== New API: auto selects from synced Free Pool =="
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
merged="$(echo "$mp" | jqn -c '. + {"auto":0}')"
curl -fsS -X PUT "$BASE/api/option/" -H "Authorization: Bearer $root_token" -H 'Content-Type: application/json' \
  -d "$(jqn -n --arg v "$merged" '{key:"ModelPrice",value:$v}')" \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "ModelPrice failed"

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

curl -fsS -X POST "$BASE/api/token/" -H "Authorization: Bearer $user_token" -H 'Content-Type: application/json' \
  -d '{"name":"zen-catalog-key","remain_quota":0,"expired_time":-1,"unlimited_quota":true,"model_limits_enabled":false,"model_limits":"","allow_ips":"","group":""}' \
  | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "token create failed"
key_id="$(curl -fsS "$BASE/api/token/?p=1&size=10" -H "Authorization: Bearer $user_token" | json_num id)"
api_key="$(curl -fsS -X POST "$BASE/api/token/${key_id}/key" -H "Authorization: Bearer $user_token" | json_str key)"

relay_code="$(curl -sS -o "$WORKDIR/napi.json" -w '%{http_code}' -X POST "$BASE/v1/chat/completions" \
  -H "Authorization: Bearer $api_key" -H 'Content-Type: application/json' \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}],"max_tokens":8,"stream":false}')"
echo "napi_http=$relay_code"
head -c 400 "$WORKDIR/napi.json"; echo
[[ "$relay_code" == "200" ]] || fail "New API auto expected 200 from synced pool"
model="$(cat "$WORKDIR/napi.json" | jqn -r '.model')"
echo "upstream_model=$model"
case "$model" in
  new-free|big-pickle) pass "auto resolved to synced Free Pool member $model" ;;
  *) fail "unexpected model $model (not from synced pool)" ;;
esac

echo "ALL CATALOG SYNC CHECKS PASSED"
