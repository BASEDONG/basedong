#!/usr/bin/env bash
# Black-box auth seam against basedong-api (issue #3).
# Usage: BASEDONG_API_BASE=http://localhost:3000 ./scripts/probe-auth.sh
set -euo pipefail

BASE="${BASEDONG_API_BASE:-http://localhost:3000}"
BASE="${BASE%/}"
USER="probe_$(date +%s)"
PASS="ProbePass123!"

echo "register $USER"
curl -fsS -X POST "$BASE/api/user/register" \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"$USER\",\"password\":\"$PASS\"}" | grep -q '"success"[[:space:]]*:[[:space:]]*true'

echo "login $USER"
login_json="$(curl -fsS -X POST "$BASE/api/user/login" \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"$USER\",\"password\":\"$PASS\"}")"
echo "$login_json" | grep -q '"success"[[:space:]]*:[[:space:]]*true'
token="$(echo "$login_json" | sed -n 's/.*"access_token"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p')"
test -n "$token"

echo "self"
curl -fsS "$BASE/api/user/self" -H "Authorization: Bearer $token" | grep -q '"success"[[:space:]]*:[[:space:]]*true'

echo "ok: register → login → /api/user/self"
