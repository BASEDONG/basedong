#!/usr/bin/env python3
"""Live capacity bench for customer-facing model=auto through Zen Sidecar.

Product metric: HTTP 200 on auto == success (internal model rotation/retries OK).
Failure only when Sidecar returns a terminal error after per-model retries + pool rotation.

Env:
  BASE              default http://127.0.0.1:18190
  SIDECAR_KEY       default basedong-sidecar-dev-credential
  MAX_OK            stop after this many successes (default 800)
  DRAIN_CONC        concurrency for drain (default 2)
  FAIL_STREAK_STOP  consecutive terminal failures to declare exhausted (default 5)
  SKIP_RPM          1 to skip RPM ramp
  OUT_DIR           default /tmp/zen-bench-auto
"""
from __future__ import annotations

import json
import os
import statistics
import sys
import threading
import time
import urllib.error
import urllib.request
from collections import Counter
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass, field
from datetime import datetime, timezone

BASE = os.environ.get("BASE", "http://127.0.0.1:18190").rstrip("/")
KEY = os.environ.get("SIDECAR_KEY", "basedong-sidecar-dev-credential")
MAX_OK = int(os.environ.get("MAX_OK", "800"))
DRAIN_CONC = max(1, int(os.environ.get("DRAIN_CONC", "2")))
FAIL_STREAK_STOP = max(1, int(os.environ.get("FAIL_STREAK_STOP", "5")))
SKIP_RPM = os.environ.get("SKIP_RPM", "0") == "1"
OUT_DIR = os.environ.get("OUT_DIR", "/tmp/zen-bench-auto")
os.makedirs(OUT_DIR, exist_ok=True)


def _headers() -> dict[str, str]:
    return {"Authorization": f"Bearer {KEY}", "Content-Type": "application/json"}


def http_json(method: str, path: str, body: dict | None = None, timeout: float = 180.0):
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(f"{BASE}{path}", data=data, method=method, headers=_headers())
    t0 = time.perf_counter()
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            raw = resp.read()
            hdrs = {k: v for k, v in resp.headers.items()}
            return resp.status, hdrs, raw, time.perf_counter() - t0
    except urllib.error.HTTPError as e:
        raw = e.read()
        hdrs = {k: v for k, v in (e.headers.items() if e.headers else [])}
        return e.code, hdrs, raw, time.perf_counter() - t0
    except Exception as e:  # noqa: BLE001
        msg = f"transport_error: {type(e).__name__}: {e}".encode()
        return 599, {}, msg, time.perf_counter() - t0


def chat_auto(max_tokens: int = 8):
    body = {
        "model": "auto",
        "messages": [{"role": "user", "content": "ping"}],
        "max_tokens": max_tokens,
        "stream": False,
    }
    return http_json("POST", "/v1/chat/completions", body)


def get_health() -> dict:
    status, _, raw, _ = http_json("GET", "/health")
    if status != 200:
        raise SystemExit(f"/health failed: {status} {raw[:200]!r}")
    return json.loads(raw.decode())


@dataclass
class AutoCounters:
    ok: int = 0
    fail: int = 0
    latencies: list[float] = field(default_factory=list)
    upstream: Counter = field(default_factory=Counter)
    tried: Counter = field(default_factory=Counter)
    attempts_sum: int = 0
    attempts_n: int = 0
    fail_status: Counter = field(default_factory=Counter)
    lock: threading.Lock = field(default_factory=threading.Lock)

    def add(self, status: int, hdrs: dict, raw: bytes, lat: float) -> str:
        up = hdrs.get("X-Basedong-Upstream-Model") or hdrs.get("x-basedong-upstream-model") or ""
        tried = hdrs.get("X-Basedong-Retry-Tried") or hdrs.get("x-basedong-retry-tried") or ""
        att = hdrs.get("X-Basedong-Retry-Attempts") or hdrs.get("x-basedong-retry-attempts") or "0"
        with self.lock:
            self.latencies.append(lat)
            try:
                self.attempts_sum += int(att)
                self.attempts_n += 1
            except ValueError:
                pass
            if tried:
                self.tried[tried] += 1
            if 200 <= status < 300:
                self.ok += 1
                if up:
                    self.upstream[up] += 1
                return "ok"
            self.fail += 1
            self.fail_status[str(status)] += 1
            if up:
                self.upstream[f"fail:{up}"] += 1
            return f"fail_{status}"


def rpm_phase() -> dict:
    print("\n== RPM ramp on auto ==")
    results = {}
    for conc in (1, 2, 4, 8):
        n = max(conc * 3, 6)
        ctr = AutoCounters()
        t0 = time.perf_counter()

        def one(_i: int):
            st, hdrs, raw, lat = chat_auto()
            return ctr.add(st, hdrs, raw, lat)

        with ThreadPoolExecutor(max_workers=conc) as ex:
            futs = [ex.submit(one, i) for i in range(n)]
            for f in as_completed(futs):
                f.result()
        wall = time.perf_counter() - t0
        rpm = (ctr.ok / wall) * 60 if wall > 0 else 0
        p50 = statistics.median(ctr.latencies) if ctr.latencies else 0
        row = {
            "concurrency": conc,
            "requests": n,
            "ok": ctr.ok,
            "fail": ctr.fail,
            "wall_sec": round(wall, 2),
            "ok_rpm": round(rpm, 2),
            "p50_latency_sec": round(p50, 3),
            "upstream": dict(ctr.upstream),
        }
        results[str(conc)] = row
        print(
            f"  c={conc}: ok={ctr.ok}/{n} fail={ctr.fail} ok_rpm≈{rpm:.1f} p50={p50:.2f}s "
            f"upstream={dict(ctr.upstream)}"
        )
        if ctr.fail >= max(1, n // 2):
            print("  stopping RPM ramp early (high failure rate)")
            break
        time.sleep(1)
    return results


def drain_auto() -> dict:
    print(f"\n== drain auto (max_ok={MAX_OK}, conc={DRAIN_CONC}, fail_streak={FAIL_STREAK_STOP}) ==")
    ctr = AutoCounters()
    stop = threading.Event()
    streak = 0
    streak_lock = threading.Lock()
    t0 = time.perf_counter()

    def worker():
        nonlocal streak
        while not stop.is_set():
            with ctr.lock:
                if ctr.ok >= MAX_OK:
                    stop.set()
                    return
            st, hdrs, raw, lat = chat_auto()
            kind = ctr.add(st, hdrs, raw, lat)
            if kind == "ok":
                with streak_lock:
                    streak = 0
                if ctr.ok % 25 == 0:
                    print(
                        f"  auto: ok={ctr.ok} fail={ctr.fail} upstream_top={ctr.upstream.most_common(5)}",
                        flush=True,
                    )
            else:
                with streak_lock:
                    streak += 1
                    if streak >= FAIL_STREAK_STOP:
                        stop.set()
                        return
                time.sleep(0.3)

    with ThreadPoolExecutor(max_workers=DRAIN_CONC) as ex:
        futs = [ex.submit(worker) for _ in range(DRAIN_CONC)]
        for f in as_completed(futs):
            f.result()
    wall = time.perf_counter() - t0
    exhausted = streak >= FAIL_STREAK_STOP
    avg_attempts = (ctr.attempts_sum / ctr.attempts_n) if ctr.attempts_n else 0
    row = {
        "ok": ctr.ok,
        "fail": ctr.fail,
        "exhausted": exhausted,
        "wall_sec": round(wall, 2),
        "ok_rpm": round((ctr.ok / wall) * 60, 2) if wall > 0 else 0,
        "avg_retry_attempts": round(avg_attempts, 2),
        "upstream": dict(ctr.upstream),
        "tried_patterns": dict(ctr.tried.most_common(20)),
        "fail_status": dict(ctr.fail_status),
    }
    print(
        f"  DONE auto: ok={ctr.ok} fail={ctr.fail} exhausted={exhausted} "
        f"wall={wall:.1f}s ok_rpm≈{row['ok_rpm']} avg_attempts≈{avg_attempts:.2f}"
    )
    print(f"  upstream={dict(ctr.upstream)}")
    return row


def main() -> int:
    started = datetime.now(timezone.utc).isoformat()
    print(f"BASE={BASE}")
    print(f"started={started}")
    health = get_health()
    pool = health.get("free_pool") or []
    print(f"Free Pool ({len(pool)}): {pool}")
    print(f"sync: {json.dumps(health.get('sync') or {}, ensure_ascii=False)[:300]}")

    report: dict = {
        "started": started,
        "base": BASE,
        "model": "auto",
        "pool": pool,
        "health_sync": health.get("sync"),
        "rpm": {},
        "drain": None,
    }

    if SKIP_RPM:
        report["rpm"] = {"skipped": True}
    else:
        report["rpm"] = rpm_phase()

    report["drain"] = drain_auto()
    report["finished"] = datetime.now(timezone.utc).isoformat()
    report["summary"] = {
        "auto_ok": report["drain"]["ok"],
        "auto_fail": report["drain"]["fail"],
        "exhausted": report["drain"]["exhausted"],
        "upstream": report["drain"]["upstream"],
        "avg_retry_attempts": report["drain"]["avg_retry_attempts"],
        "note": "ok counts final HTTP 200 for model=auto after Sidecar per-model retry + rotation",
    }
    path = os.path.join(OUT_DIR, "report.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)
    # Optional mirror (default: sibling scripts/bench-out, gitignored)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_out = os.environ.get(
        "MIRROR_OUT", os.path.join(script_dir, "bench-out")
    )
    try:
        os.makedirs(repo_out, exist_ok=True)
        with open(os.path.join(repo_out, "auto-capacity.json"), "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2)
    except OSError:
        pass
    print("\n== SUMMARY ==")
    print(json.dumps(report["summary"], indent=2, ensure_ascii=False))
    print(f"Wrote {path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
