#!/usr/bin/env bash
# Wait for auto capacity bench and copy report into scripts/bench-out (gitignored).
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="${OUT_DIR:-/tmp/zen-bench-auto}"
MIRROR_OUT="${MIRROR_OUT:-$SCRIPT_DIR/bench-out}"
mkdir -p "$MIRROR_OUT"

pid_file="$OUT_DIR/bench.pid"
if [[ -f "$pid_file" ]]; then
  while kill -0 "$(cat "$pid_file")" 2>/dev/null; do
    sleep 5
    tail -n 8 "$OUT_DIR/run.log" || true
  done
fi

tail -n 60 "$OUT_DIR/run.log" || true
if [[ -f "$OUT_DIR/report.json" ]]; then
  cp -f "$OUT_DIR/report.json" "$MIRROR_OUT/auto-capacity.json"
  python3 -m json.tool "$OUT_DIR/report.json" >"$MIRROR_OUT/auto-capacity.pretty.json"
  echo "mirrored -> $MIRROR_OUT/auto-capacity.json"
fi
