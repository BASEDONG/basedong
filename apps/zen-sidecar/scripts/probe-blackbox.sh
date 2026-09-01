#!/usr/bin/env bash
# #17: black-box northbound contract against mock Zen (external HTTP only)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
cd "$ROOT"

export ZEN_PROBE_COMPOSE_EXTRA="docker-compose.zen-mock.yml docker-compose.zen-retry.yml docker-compose.zen-responses.yml docker-compose.zen-catalog.yml"
export ZEN_PROBE_SKIP_UP=1

echo "== black-box stack: greenfield sidecar + mock Zen =="
docker compose \
  -f docker-compose.yml \
  -f docker-compose.zen-sidecar.yml \
  -f docker-compose.zen-mock.yml \
  -f docker-compose.zen-retry.yml \
  -f docker-compose.zen-responses.yml \
  -f docker-compose.zen-catalog.yml \
  -p basedong-zen-spine \
  up -d --pull never --no-build postgres redis api mock-zen zen-sidecar

bash apps/zen-sidecar/scripts/probe-spine.sh
bash apps/zen-sidecar/scripts/probe-auto-retry.sh
bash apps/zen-sidecar/scripts/probe-responses-southbound.sh
bash apps/zen-sidecar/scripts/probe-catalog-sync.sh

echo "ALL BLACK-BOX CHECKS PASSED"
