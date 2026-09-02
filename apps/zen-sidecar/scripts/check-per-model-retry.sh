#!/usr/bin/env bash
# Local (no Docker) check: mock Zen + sidecar per-model retry then rotate.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
MOCK_PORT=18091
SIDECAR_PORT=18191
KEY=basedong-sidecar-dev-credential
WORKDIR="${TMPDIR:-/tmp}/zen-retry-check-$$"
mkdir -p "$WORKDIR"
cleanup() {
  kill "$(cat "$WORKDIR/mock.pid" 2>/dev/null)" 2>/dev/null || true
  kill "$(cat "$WORKDIR/sidecar.pid" 2>/dev/null)" 2>/dev/null || true
  rm -rf "$WORKDIR"
}
trap cleanup EXIT

PORT="$MOCK_PORT" python3 "$ROOT/apps/zen-sidecar/poc/mock_zen.py" >"$WORKDIR/mock.log" 2>&1 &
echo $! >"$WORKDIR/mock.pid"
PORT="$SIDECAR_PORT" SIDECAR_KEY="$KEY" UPSTREAM="http://127.0.0.1:${MOCK_PORT}" \
  ALLOWLIST=big-pickle,fail-free,ok-free PICK_ORDER=fail-free,ok-free \
  PER_MODEL_ATTEMPTS=2 SYNC_INTERVAL_SEC=0 \
  python3 "$ROOT/apps/zen-sidecar/sidecar.py" >"$WORKDIR/sidecar.log" 2>&1 &
echo $! >"$WORKDIR/sidecar.pid"

for i in $(seq 1 40); do
  code=$(curl -sS -m 2 -o /dev/null -w "%{http_code}" "http://127.0.0.1:${SIDECAR_PORT}/health" || true)
  [[ "$code" == "200" ]] && break
  sleep 0.5
done
[[ "$code" == "200" ]] || { echo "sidecar not ready"; tail -50 "$WORKDIR/sidecar.log"; exit 1; }

# Force pool to include fail-free + ok-free for auto
curl -sS -m 5 -X POST "http://127.0.0.1:${MOCK_PORT}/mock-admin/catalog" \
  -H 'Content-Type: application/json' \
  -d '{"models":["fail-free","ok-free","paid-not-free"]}' >/dev/null
curl -sS -m 30 -X POST "http://127.0.0.1:${SIDECAR_PORT}/admin/sync" \
  -H "Authorization: Bearer ${KEY}" >/dev/null || true

hdr="$WORKDIR/auto.hdr"
body="$WORKDIR/auto.body"
code=$(curl -sS -m 60 -D "$hdr" -o "$body" -w "%{http_code}" \
  -H "Authorization: Bearer ${KEY}" -H 'Content-Type: application/json' \
  -d '{"model":"auto","messages":[{"role":"user","content":"hello"}],"max_tokens":16}' \
  "http://127.0.0.1:${SIDECAR_PORT}/v1/chat/completions")

echo "HTTP $code"
grep -i 'x-basedong-retry-tried' "$hdr" || true
grep -i 'x-basedong-retry-attempts' "$hdr" || true
grep -i 'x-basedong-upstream-model' "$hdr" || true
head -c 200 "$body"; echo

[[ "$code" == "200" ]] || { echo FAIL status; exit 1; }
grep -qiE 'x-basedong-retry-tried:[[:space:]]*fail-free,ok-free' "$hdr" || { echo FAIL tried header; exit 1; }
# PER_MODEL_ATTEMPTS=2 → fail-free twice then ok-free once = 3 attempts
grep -qiE 'x-basedong-retry-attempts:[[:space:]]*3' "$hdr" || { echo FAIL attempts header; cat "$hdr"; exit 1; }
grep -qiE 'x-basedong-upstream-model:[[:space:]]*ok-free' "$hdr" || { echo FAIL upstream; exit 1; }
echo PASS per-model retry then rotate
