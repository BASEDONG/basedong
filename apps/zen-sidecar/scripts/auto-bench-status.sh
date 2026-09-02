#!/usr/bin/env bash
set -euo pipefail
DIR=${BENCH_DIR:-/tmp/zen-bench-auto2}
echo "==== run.log ($DIR) ===="
tail -50 "$DIR/run.log" || true
echo "==== pid ===="
if [[ -f "$DIR/bench.pid" ]]; then
  pid=$(cat "$DIR/bench.pid")
  echo "pid=$pid"
  if kill -0 "$pid" 2>/dev/null; then echo running; else echo dead; fi
  ps -p "$pid" -o pid,etime,cmd 2>/dev/null || true
else
  echo no_pid_file
fi
pgrep -af 'bench-auto-capacity' || echo 'no bench-auto-capacity process'
echo "==== report ===="
if [[ -f "$DIR/report.json" ]]; then
  python3 - <<PY
import json
d=json.load(open("$DIR/report.json"))
print(json.dumps(d.get("summary") or {}, indent=2, ensure_ascii=False))
print("drain_ok", (d.get("drain") or {}).get("ok"))
print("exhausted", (d.get("drain") or {}).get("exhausted"))
PY
else
  echo no_report
fi
