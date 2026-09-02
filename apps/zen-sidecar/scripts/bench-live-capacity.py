#!/usr/bin/env python3
"""Live Anonymous Zen capacity bench through Zen Sidecar (or direct upstream).

Measures:
  1) short-burst RPM at rising concurrency
  2) per-model daily success count until FreeUsageLimitError
  3) cross-model independence after each exhaustion
  4) residual auto path

Env:
  BASE          default http://127.0.0.1:8080  (Sidecar)
  SIDECAR_KEY   default basedong-sidecar-dev-credential
  MAX_PER_MODEL default 300
  DRAIN_CONC    default 2
  SKIP_DRAIN    set 1 to only run RPM + pool probe
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
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass, field
from datetime import datetime, timezone

BASE = os.environ.get("BASE", "http://127.0.0.1:8080").rstrip("/")
KEY = os.environ.get("SIDECAR_KEY", "basedong-sidecar-dev-credential")
MAX_PER_MODEL = int(os.environ.get("MAX_PER_MODEL", "300"))
DRAIN_CONC = max(1, int(os.environ.get("DRAIN_CONC", "2")))
SKIP_DRAIN = os.environ.get("SKIP_DRAIN", "0") == "1"
SKIP_RPM = os.environ.get("SKIP_RPM", "0") == "1"
SKIP_MODELS = {
    s.strip() for s in os.environ.get("SKIP_MODELS", "").split(",") if s.strip()
}
ONLY_MODELS = {
    s.strip() for s in os.environ.get("ONLY_MODELS", "").split(",") if s.strip()
}
OUT_DIR = os.environ.get("OUT_DIR", "/tmp/zen-bench")
os.makedirs(OUT_DIR, exist_ok=True)


def _headers() -> dict[str, str]:
    return {
        "Authorization": f"Bearer {KEY}",
        "Content-Type": "application/json",
    }


def http_json(method: str, path: str, body: dict | None = None, timeout: float = 90.0):
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(
        f"{BASE}{path}",
        data=data,
        method=method,
        headers=_headers(),
    )
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
    except Exception as e:  # noqa: BLE001 — timeout / connection blips
        msg = f"transport_error: {type(e).__name__}: {e}".encode()
        return 599, {}, msg, time.perf_counter() - t0


def err_type(raw: bytes) -> str:
    try:
        return str((json.loads(raw.decode("utf-8", errors="replace")).get("error") or {}).get("type") or "")
    except Exception:
        return ""


def is_free_exhausted(status: int, raw: bytes) -> bool:
    if status != 429:
        return False
    t = err_type(raw).lower()
    text = raw.decode("utf-8", errors="replace").lower()
    return (
        "freeusagelimit" in t
        or "free_usage" in t
        or "free usage" in text
        or "rate limit exceeded" in text
        or "freeusagelimiterror" in text
    )


@dataclass
class Counters:
    ok: int = 0
    fail: int = 0
    free_limit: int = 0
    other_429: int = 0
    latencies: list[float] = field(default_factory=list)
    lock: threading.Lock = field(default_factory=threading.Lock)

    def add(self, status: int, raw: bytes, lat: float) -> str:
        with self.lock:
            self.latencies.append(lat)
            if 200 <= status < 300:
                self.ok += 1
                return "ok"
            if is_free_exhausted(status, raw):
                self.free_limit += 1
                self.fail += 1
                return "free_limit"
            if status == 429:
                self.other_429 += 1
                self.fail += 1
                return "other_429"
            self.fail += 1
            return f"err_{status}"


def chat(model: str, max_tokens: int = 8) -> tuple[int, dict, bytes, float]:
    body = {
        "model": model,
        "messages": [{"role": "user", "content": "ping"}],
        "max_tokens": max_tokens,
        "stream": False,
    }
    return http_json("POST", "/v1/chat/completions", body)


def get_pool() -> list[str]:
    status, _, raw, _ = http_json("GET", "/health")
    if status != 200:
        raise SystemExit(f"/health failed: {status} {raw[:200]!r}")
    j = json.loads(raw.decode())
    pool = j.get("free_pool") or j.get("pool") or []
    if isinstance(pool, dict):
        pool = pool.get("models") or pool.get("ids") or []
    # also try /v1/models
    if not pool:
        st2, _, raw2, _ = http_json("GET", "/v1/models")
        if st2 == 200:
            data = json.loads(raw2.decode()).get("data") or []
            pool = [m["id"] for m in data if isinstance(m, dict) and m.get("id") and m["id"] != "auto"]
    return list(pool)


def rpm_phase(model: str) -> dict:
    print(f"\n== RPM ramp on {model} ==")
    results = {}
    for conc in (1, 2, 4, 8):
        n = max(conc * 3, 6)  # small sample
        ctr = Counters()
        t0 = time.perf_counter()

        def one(_i: int):
            st, _, raw, lat = chat(model)
            return ctr.add(st, raw, lat)

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
            "free_limit": ctr.free_limit,
            "other_429": ctr.other_429,
            "fail": ctr.fail,
            "wall_sec": round(wall, 2),
            "ok_rpm": round(rpm, 2),
            "p50_latency_sec": round(p50, 3),
        }
        results[str(conc)] = row
        print(
            f"  c={conc}: ok={ctr.ok}/{n} free_limit={ctr.free_limit} other_429={ctr.other_429} "
            f"ok_rpm≈{rpm:.1f} p50={p50:.2f}s"
        )
        if ctr.free_limit >= n // 2:
            print("  stopping RPM ramp early (quota pressure)")
            break
        time.sleep(1)
    return results


def drain_model(model: str) -> dict:
    print(f"\n== drain {model} (max={MAX_PER_MODEL}, conc={DRAIN_CONC}) ==")
    ctr = Counters()
    stop = threading.Event()
    streak_lock = threading.Lock()
    free_streak = 0
    t0 = time.perf_counter()

    def worker():
        nonlocal free_streak
        while not stop.is_set():
            with ctr.lock:
                if ctr.ok + ctr.fail >= MAX_PER_MODEL:
                    stop.set()
                    return
            st, _, raw, lat = chat(model)
            kind = ctr.add(st, raw, lat)
            if kind == "ok":
                with streak_lock:
                    free_streak = 0
                if ctr.ok % 10 == 0:
                    print(f"  {model}: ok={ctr.ok} fail={ctr.fail} free_limit={ctr.free_limit}", flush=True)
            elif kind == "free_limit":
                with streak_lock:
                    free_streak += 1
                    if free_streak >= 3:
                        stop.set()
                        return
            else:
                # transient 429/5xx: brief pause, don't count as exhaustion
                time.sleep(0.5)

    with ThreadPoolExecutor(max_workers=DRAIN_CONC) as ex:
        futs = [ex.submit(worker) for _ in range(DRAIN_CONC)]
        for f in as_completed(futs):
            f.result()
    wall = time.perf_counter() - t0
    exhausted = ctr.free_limit >= 3
    row = {
        "model": model,
        "ok": ctr.ok,
        "fail": ctr.fail,
        "free_limit": ctr.free_limit,
        "other_429": ctr.other_429,
        "exhausted": exhausted,
        "wall_sec": round(wall, 2),
        "ok_rpm": round((ctr.ok / wall) * 60, 2) if wall > 0 else 0,
    }
    print(
        f"  DONE {model}: ok={ctr.ok} free_limit={ctr.free_limit} exhausted={exhausted} "
        f"wall={wall:.1f}s ok_rpm≈{row['ok_rpm']}"
    )
    return row


def probe_models(models: list[str], label: str) -> dict[str, str]:
    print(f"\n== independence probe ({label}) ==")
    out = {}
    for m in models:
        st, _, raw, lat = chat(m)
        kind = "ok" if 200 <= st < 300 else ("free_limit" if is_free_exhausted(st, raw) else f"status_{st}")
        out[m] = kind
        print(f"  {m}: {kind} ({lat:.2f}s) {raw[:120]!r}")
        time.sleep(0.2)
    return out


def main() -> int:
    started = datetime.now(timezone.utc).isoformat()
    print(f"BASE={BASE}")
    print(f"started={started}")

    pool = get_pool()
    print(f"Free Pool ({len(pool)}): {pool}")
    if not pool:
        return 1

    report: dict = {
        "started": started,
        "base": BASE,
        "pool": pool,
        "rpm": {},
        "drains": [],
        "independence": [],
        "auto_residual": None,
    }

    if ONLY_MODELS:
        pool = [m for m in pool if m in ONLY_MODELS]
        print(f"ONLY_MODELS filter → {pool}")
    pool = [m for m in pool if m not in SKIP_MODELS]
    print(f"models to drain ({len(pool)}): {pool}")
    if not pool and not SKIP_DRAIN:
        print("nothing left to drain")
        return 0

    rpm_model = pool[0] if pool else (report["pool"][0] if report["pool"] else "auto")
    if SKIP_RPM:
        report["rpm"] = {"skipped": True}
        print("SKIP_RPM=1")
    else:
        report["rpm"] = rpm_phase(rpm_model)

    if SKIP_DRAIN:
        path = os.path.join(OUT_DIR, "report.json")
        with open(path, "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2)
        print(f"\nWrote {path}")
        return 0

    remaining = list(pool)
    # Prefer draining the RPM model first since it already consumed some quota
    ordered = [rpm_model] + [m for m in pool if m != rpm_model]

    for model in ordered:
        drain = drain_model(model)
        report["drains"].append(drain)
        remaining = [m for m in remaining if m != model]
        indep = probe_models(remaining, f"after exhausting {model}")
        report["independence"].append({"after": model, "probe": indep})
        # persist incremental
        with open(os.path.join(OUT_DIR, "report.json"), "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2)

    print("\n== residual auto ==")
    auto_ctr = Counters()
    for i in range(20):
        st, hdrs, raw, lat = chat("auto")
        kind = auto_ctr.add(st, raw, lat)
        up = hdrs.get("X-Basedong-Upstream-Model", "")
        print(f"  auto#{i+1}: {kind} upstream={up}")
        if kind == "free_limit" or kind.startswith("err_"):
            break
    report["auto_residual"] = {
        "ok": auto_ctr.ok,
        "free_limit": auto_ctr.free_limit,
        "fail": auto_ctr.fail,
    }

    report["finished"] = datetime.now(timezone.utc).isoformat()
    total_ok = sum(d["ok"] for d in report["drains"]) + report["rpm"].get("1", {}).get("ok", 0)
    # rpm counts overlap with first drain roughly; prefer drain sum + note
    drain_ok = sum(d["ok"] for d in report["drains"])
    report["summary"] = {
        "models": len(pool),
        "drain_ok_total": drain_ok,
        "per_model_ok": {d["model"]: d["ok"] for d in report["drains"]},
        "exhausted_models": [d["model"] for d in report["drains"] if d.get("exhausted")],
    }
    path = os.path.join(OUT_DIR, "report.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)
    print("\n== SUMMARY ==")
    print(json.dumps(report["summary"], indent=2))
    print(f"Wrote {path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
