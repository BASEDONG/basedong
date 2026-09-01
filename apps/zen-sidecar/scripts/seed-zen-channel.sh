#!/usr/bin/env bash
# Seed New API Channel + ModelPrice for Zen Sidecar `auto` (staging / local).
# Idempotent: skips channel create when "zen-sidecar-auto" already exists.
#
# Usage (API already up; Sidecar healthy on compose network):
#   BASEDONG_API_BASE=http://localhost:3000 bash apps/zen-sidecar/scripts/seed-zen-channel.sh
#
# Optional env:
#   SIDECAR_CREDENTIAL  (default: basedong-sidecar-dev-credential — rotate for prod)
#   ZEN_SIDECAR_URL     (default: http://zen-sidecar:8080)
#   ROOT_USER / ROOT_PASS
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
cd "$ROOT"

BASE="${BASEDONG_API_BASE:-http://localhost:3000}"
BASE="${BASE%/}"
SIDECAR_URL="${ZEN_SIDECAR_URL:-http://zen-sidecar:8080}"
SIDECAR_KEY="${SIDECAR_CREDENTIAL:-basedong-sidecar-dev-credential}"
CHANNEL_NAME="${ZEN_CHANNEL_NAME:-zen-sidecar-auto}"
ROOT_USER="${ROOT_USER:-rootzen}"
ROOT_PASS="${ROOT_PASS:-RootPass123!}"

fail() { echo "FAIL: $*" >&2; exit 1; }
pass() { echo "PASS: $*"; }

json_str() {
  local key="$1"
  sed -n "s/.*\"${key}\"[[:space:]]*:[[:space:]]*\"\([^\"]*\)\".*/\1/p" | head -n1
}

jqn() {
  docker run --rm -i ghcr.io/jqlang/jq:1.7 "$@"
}

[[ "$SIDECAR_KEY" != "public" ]] || fail "Sidecar Credential must not be Anonymous Zen public"

echo "== wait api /api/status at $BASE =="
ready=0
for i in $(seq 1 90); do
  if curl -fsS "$BASE/api/status" >/dev/null 2>&1; then
    ready=1
    pass "api status reachable"
    break
  fi
  sleep 2
done
[[ "$ready" -eq 1 ]] || fail "api never became ready at $BASE"

echo "== root login =="
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

echo "== ModelPrice auto:0 =="
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

echo "== Channel $CHANNEL_NAME =="
ch_list="$(curl -fsS "$BASE/api/channel/?p=1&page_size=100" -H "Authorization: Bearer $root_token")"
if echo "$ch_list" | grep -q "\"name\"[[:space:]]*:[[:space:]]*\"${CHANNEL_NAME}\""; then
  pass "channel already exists: $CHANNEL_NAME"
else
  ch_payload="$(jqn -n \
    --arg key "$SIDECAR_KEY" \
    --arg base "$SIDECAR_URL" \
    --arg name "$CHANNEL_NAME" \
    '{mode:"single",channel:{
      type:1,name:$name,key:$key,base_url:$base,
      models:"auto",
      model_mapping:"{}",
      group:"default",status:1,priority:1,weight:100,auto_ban:1
    }}')"
  ch_out="$(curl -sS -X POST "$BASE/api/channel/" \
    -H "Authorization: Bearer $root_token" \
    -H 'Content-Type: application/json' \
    -d "$ch_payload")"
  echo "$ch_out" | grep -q '"success"[[:space:]]*:[[:space:]]*true' || fail "channel create failed: $ch_out"
  pass "channel created: $CHANNEL_NAME → $SIDECAR_URL"
fi

echo "$ch_list" | grep -qi '"key"[[:space:]]*:[[:space:]]*"public"' && fail "Channel.Key must not be public" || true

echo ""
echo "Seed complete."
echo "  Channel: $CHANNEL_NAME"
echo "  BaseURL: $SIDECAR_URL"
echo "  Models:  auto"
echo "  Mapping: {}"
echo "Next: issue a customer API Key, then call POST /v1/chat/completions with model=auto."
echo "Live smoke: docs/zen-sidecar/live-smoke.md"
echo "Checklist: docs/zen-sidecar/staging-checklist.md"
