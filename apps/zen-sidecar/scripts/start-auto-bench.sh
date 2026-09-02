#!/usr/bin/env bash
# Start live auto capacity bench against a running Sidecar (default :18190).
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="${OUT_DIR:-/tmp/zen-bench-auto}"
MIRROR_OUT="${MIRROR_OUT:-$SCRIPT_DIR/bench-out}"
mkdir -p "$OUT_DIR" "$MIRROR_OUT"

export BASE="${BASE:-http://127.0.0.1:18190}"
export SIDECAR_KEY="${SIDECAR_KEY:-basedong-sidecar-dev-credential}"
export OUT_DIR
export MIRROR_OUT

nohup python3 "$SCRIPT_DIR/bench-auto-capacity.py" >"$OUT_DIR/run.log" 2>&1 &
echo $! >"$OUT_DIR/bench.pid"
echo "bench_pid=$(cat "$OUT_DIR/bench.pid") OUT_DIR=$OUT_DIR"
ps -p "$(cat "$OUT_DIR/bench.pid")" -o pid,cmd || true
