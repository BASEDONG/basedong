#!/usr/bin/env bash
# Black-box spine probe for Zen Sidecar compose (#10).
# Seam: compose + Sidecar northbound HTTP (/healthz, Sidecar Credential).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
cd "$ROOT"

PROJECT=basedong-zen-spine
COMPOSE=(docker compose -f docker-compose.yml -f docker-compose.zen-sidecar.yml -p "$PROJECT")
SIDECAR_KEY="${SIDECAR_CREDENTIAL:-basedong-sidecar-dev-credential}"
BASE="http://zen-sidecar:8080"
NETWORK="${PROJECT}_default"

fail() { echo "FAIL: $*" >&2; exit 1; }
pass() { echo "PASS: $*"; }

curl_net() {
  docker run --rm --network "$NETWORK" curlimages/curl:8.12.1 "$@"
}

echo "== assert compose: api + zen-sidecar, no host ports on zen-sidecar =="
CFG="$("${COMPOSE[@]}" config --format json)"
echo "$CFG" | docker run --rm -i ghcr.io/jqlang/jq:1.7 -e '
  (.services.api != null) and (.services["zen-sidecar"] != null)
  | if . then . else error("api or zen-sidecar missing") end
' >/dev/null || fail "compose must define api and zen-sidecar"

PORTS="$(echo "$CFG" | docker run --rm -i ghcr.io/jqlang/jq:1.7 -r '.services["zen-sidecar"].ports // [] | length')"
[[ "$PORTS" == "0" ]] || fail "zen-sidecar must not publish host ports (found $PORTS)"
pass "compose defines api + zen-sidecar with zero published ports"

echo "== bring up zen-sidecar on the shared compose project network =="
# Operators run `up -d api zen-sidecar` for the full spine; this probe only needs
# the Sidecar (api is asserted present in compose config above and shares default network).
"${COMPOSE[@]}" up -d zen-sidecar

echo "== wait for healthy =="
healthy=0
for i in $(seq 1 36); do
  # Prefer docker health status when available
  cid="$("${COMPOSE[@]}" ps -q zen-sidecar)"
  [[ -n "$cid" ]] || fail "zen-sidecar container not running"
  st="$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$cid")"
  if [[ "$st" == "healthy" ]]; then
    healthy=1
    pass "zen-sidecar healthy"
    break
  fi
  # Fallback: hit /healthz ourselves (image may lack wget for healthcheck)
  if code="$(curl_net -sS -o /dev/null -w "%{http_code}" "$BASE/healthz" 2>/dev/null || true)"; then
    if [[ "$code" == "200" ]]; then
      healthy=1
      pass "zen-sidecar /healthz reachable (status=$st)"
      break
    fi
  fi
  if [[ "$i" -eq 36 ]]; then
    "${COMPOSE[@]}" logs --tail=100 zen-sidecar || true
    fail "zen-sidecar not ready (docker=$st http=${code:-n/a})"
  fi
  sleep 5
done
[[ "$healthy" -eq 1 ]] || fail "zen-sidecar never became ready"

echo "== /healthz from private network =="
code="$(curl_net -sS -o /dev/null -w "%{http_code}" "$BASE/healthz")"
[[ "$code" == "200" ]] || fail "/healthz expected 200, got $code"
pass "/healthz → 200 from compose network"

echo "== reject missing Sidecar Credential =="
code="$(curl_net -sS -o /dev/null -w "%{http_code}" "$BASE/v1/models")"
[[ "$code" == "401" || "$code" == "403" ]] || fail "unauthenticated /v1/models expected 401/403, got $code"
pass "unauthenticated /v1/models → $code"

echo "== accept Sidecar Credential =="
code="$(curl_net -sS -o /dev/null -w "%{http_code}" -H "Authorization: Bearer ${SIDECAR_KEY}" "$BASE/v1/models")"
[[ "$code" == "200" ]] || fail "authenticated /v1/models expected 200, got $code"
pass "authenticated /v1/models → 200"

echo "== config seed keeps Anonymous Zen in Sidecar =="
grep -q 'basedong-sidecar-dev-credential' apps/zen-sidecar/config.poc.json || fail "Sidecar Credential missing from seed config"
grep -q '"anonymous": true' apps/zen-sidecar/config.poc.json || fail "anonymous mode required for PoC spine"
pass "Anonymous Zen + Sidecar Credential live in Sidecar seed config"

echo "ALL SPINE CHECKS PASSED"
