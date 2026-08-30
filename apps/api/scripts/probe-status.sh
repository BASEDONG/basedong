#!/usr/bin/env bash
# Black-box probe of the Backend HTTP seam: GET /api/status
# Usage: ./scripts/probe-status.sh [base_url]
set -euo pipefail

BASE_URL="${1:-${BASEDONG_API_BASE_URL:-http://localhost:3000}}"
BASE_URL="${BASE_URL%/}"
URL="${BASE_URL}/api/status"

echo "Probing ${URL}"

body="$(curl -fsS --max-time 30 "${URL}")" || {
  echo "probe failed: could not fetch ${URL}" >&2
  exit 1
}

echo "${body}" | grep -q '"success"[[:space:]]*:[[:space:]]*true' || {
  echo "probe failed: success!=true" >&2
  echo "${body}" >&2
  exit 1
}

echo "ok: control-plane /api/status returned success=true"
