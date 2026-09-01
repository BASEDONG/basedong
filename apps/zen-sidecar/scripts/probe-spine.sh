#!/usr/bin/env bash
# Black-box spine probe for Zen Sidecar compose (#10 / #17).
# Seam: compose + Sidecar northbound HTTP (/health, Sidecar Credential).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
cd "$ROOT"

PROJECT=basedong-zen-spine
COMPOSE=(docker compose -f docker-compose.yml -f docker-compose.zen-sidecar.yml)
for f in ${ZEN_PROBE_COMPOSE_EXTRA:-}; do
  COMPOSE+=(-f "$f")
done
COMPOSE+=(-p "$PROJECT")
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

if [[ "${ZEN_PROBE_SKIP_UP:-0}" != "1" ]]; then
  echo "== bring up zen-sidecar on the shared compose project network =="
  "${COMPOSE[@]}" up -d zen-sidecar
fi

echo "== wait for healthy =="
healthy=0
for i in $(seq 1 36); do
  cid="$("${COMPOSE[@]}" ps -q zen-sidecar)"
  [[ -n "$cid" ]] || fail "zen-sidecar container not running"
  st="$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$cid")"
  if [[ "$st" == "healthy" ]]; then
    healthy=1
    pass "zen-sidecar healthy"
    break
  fi
  if code="$(curl_net -sS -o /dev/null -w "%{http_code}" "$BASE/health" 2>/dev/null || true)"; then
    if [[ "$code" == "200" ]]; then
      healthy=1
      pass "zen-sidecar /health reachable (status=$st)"
      break
    fi
  fi
  [[ "$i" -eq 36 ]] && fail "zen-sidecar not ready (docker=$st http=${code:-n/a})"
  sleep 5
done
[[ "$healthy" -eq 1 ]] || fail "zen-sidecar never became ready"

echo "== /health and /healthz from private network =="
for path in /health /healthz; do
  code="$(curl_net -sS -o /dev/null -w "%{http_code}" "$BASE$path")"
  [[ "$code" == "200" ]] || fail "$path expected 200, got $code"
  pass "$path → 200"
done

echo "== reject missing Sidecar Credential =="
code="$(curl_net -sS -o /dev/null -w "%{http_code}" "$BASE/v1/models")"
[[ "$code" == "401" || "$code" == "403" ]] || fail "unauthenticated /v1/models expected 401/403, got $code"
pass "unauthenticated /v1/models → $code"

echo "== accept Sidecar Credential =="
code="$(curl_net -sS -o /dev/null -w "%{http_code}" -H "Authorization: Bearer ${SIDECAR_KEY}" "$BASE/v1/models")"
[[ "$code" == "200" ]] || fail "authenticated /v1/models expected 200, got $code"
pass "authenticated /v1/models → 200"

echo "== greenfield sidecar uses distinct Sidecar Credential =="
grep -q 'basedong-sidecar-dev-credential' apps/zen-sidecar/sidecar.py || fail "Sidecar Credential default missing from sidecar.py"
[[ "$SIDECAR_KEY" != "public" ]] || fail "Sidecar Credential must not be Anonymous Zen public"
pass "Sidecar Credential distinct from public"

echo "ALL SPINE CHECKS PASSED"
