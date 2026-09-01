#!/usr/bin/env python3
"""Thin Sidecar PoC (#15): Catalog Sync + Probe maintain Free Pool for auto."""
from __future__ import annotations

import json
import os
import random
import threading
import time
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

PORT = int(os.environ.get("PORT", "8080"))
SIDECAR_KEY = os.environ.get("SIDECAR_KEY", "basedong-sidecar-dev-credential")
UPSTREAM = os.environ.get("UPSTREAM", "http://mock-zen:8090").rstrip("/")
ALLOWLIST = {s.strip() for s in os.environ.get("ALLOWLIST", "big-pickle").split(",") if s.strip()}
SYNC_INTERVAL_SEC = float(os.environ.get("SYNC_INTERVAL_SEC", "0"))  # 0 = manual/admin only
MAX_ATTEMPTS = min(20, max(1, int(os.environ.get("MAX_ATTEMPTS", "5"))))

_lock = threading.Lock()
_pool: list[str] = []
_last_good_pool: list[str] = []
_sync_meta: dict = {
    "ok": False,
    "at": 0.0,
    "error": "",
    "candidates": [],
    "probed_dead": [],
    "source": "none",
}


def _get(url: str) -> tuple[int, bytes]:
    req = urllib.request.Request(
        url,
        method="GET",
        headers={"Authorization": "Bearer public", "User-Agent": "opencode/1.2.31"},
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return resp.status, resp.read()
    except urllib.error.HTTPError as e:
        return e.code, e.read()


def _post_json(url: str, payload: dict) -> tuple[int, bytes]:
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        method="POST",
        headers={
            "Content-Type": "application/json",
            "Authorization": "Bearer public",
            "User-Agent": "opencode/1.2.31",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return resp.status, resp.read()
    except urllib.error.HTTPError as e:
        return e.code, e.read()


def is_free_candidate(model_id: str) -> bool:
    return model_id.endswith("-free") or model_id in ALLOWLIST


def probe_model(model_id: str) -> bool:
    """Cheap live check — 2xx keeps candidate in pool."""
    status, _ = _post_json(
        f"{UPSTREAM}/v1/chat/completions",
        {
            "model": model_id,
            "messages": [{"role": "user", "content": "ping"}],
            "max_tokens": 1,
            "stream": False,
        },
    )
    return 200 <= status < 300


def sync_free_pool() -> dict:
    """Catalog Sync: fetch models → free filter → Probe → update pool (or keep cache)."""
    global _pool, _last_good_pool, _sync_meta
    status, raw = _get(f"{UPSTREAM}/v1/models")
    if status != 200:
        with _lock:
            retained = list(_last_good_pool)
            _pool = list(retained)
            _sync_meta = {
                "ok": False,
                "at": time.time(),
                "error": f"catalog HTTP {status}: {raw[:200].decode('utf-8', errors='replace')}",
                "candidates": [],
                "probed_dead": [],
                "source": "cache" if retained else "empty",
                "pool": list(retained),
            }
            meta = dict(_sync_meta)
        print(f"catalog sync failed; retained cache={retained}", flush=True)
        return meta

    try:
        data = json.loads(raw.decode("utf-8"))
        ids = [m["id"] for m in (data.get("data") or []) if isinstance(m, dict) and m.get("id")]
    except Exception as e:  # noqa: BLE001
        with _lock:
            retained = list(_last_good_pool)
            _pool = list(retained)
            _sync_meta = {
                "ok": False,
                "at": time.time(),
                "error": f"catalog parse error: {e}",
                "candidates": [],
                "probed_dead": [],
                "source": "cache" if retained else "empty",
                "pool": list(retained),
            }
            meta = dict(_sync_meta)
        return meta

    # Not a hardcoded fixed-seven list — filter catalog
    candidates = [i for i in ids if is_free_candidate(i)]
    alive: list[str] = []
    dead: list[str] = []
    for mid in candidates:
        if probe_model(mid):
            alive.append(mid)
        else:
            dead.append(mid)

    with _lock:
        _pool = list(alive)
        _last_good_pool = list(alive)
        _sync_meta = {
            "ok": True,
            "at": time.time(),
            "error": "",
            "candidates": candidates,
            "probed_dead": dead,
            "source": "sync",
            "pool": list(alive),
            "catalog_ids": ids,
            "allowlist": sorted(ALLOWLIST),
        }
        meta = dict(_sync_meta)
    print(f"catalog sync ok pool={alive} dead={dead}", flush=True)
    return meta


def current_pool() -> list[str]:
    with _lock:
        return list(_pool)


def pick_auto() -> list[str]:
    pool = current_pool()
    arr = list(pool)
    random.shuffle(arr)
    return arr


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt: str, *args) -> None:
        print("[%s] %s" % (self.log_date_time_string(), fmt % args), flush=True)

    def _json(self, code: int, body: dict, extra: dict | None = None) -> None:
        data = json.dumps(body).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        for k, v in (extra or {}).items():
            self.send_header(k, v)
        self.end_headers()
        self.wfile.write(data)

    def _auth_ok(self) -> bool:
        h = self.headers.get("Authorization") or ""
        if not h.lower().startswith("bearer "):
            return False
        return h.split(" ", 1)[1].strip() == SIDECAR_KEY

    def do_GET(self) -> None:
        path = self.path.split("?", 1)[0]
        if path in ("/healthz", "/health"):
            with _lock:
                meta = dict(_sync_meta)
                pool = list(_pool)
            return self._json(200, {"status": "ok", "free_pool": pool, "sync": meta})
        if path == "/admin/sync-status":
            if not self._auth_ok():
                return self._json(401, {"error": {"message": "invalid local API key", "type": "authentication_error"}})
            with _lock:
                return self._json(200, {"free_pool": list(_pool), "sync": dict(_sync_meta)})
        if path == "/v1/models":
            if not self._auth_ok():
                return self._json(401, {"error": {"message": "invalid local API key", "type": "authentication_error"}})
            pool = current_pool()
            data = [{"id": "auto", "object": "model", "owned_by": "basedong"}] + [
                {"id": m, "object": "model", "owned_by": "zen"} for m in pool
            ]
            return self._json(200, {"object": "list", "data": data})
        self._json(404, {"error": {"message": "not found", "type": "invalid_request_error"}})

    def do_POST(self) -> None:
        path = self.path.split("?", 1)[0]
        if path == "/admin/sync":
            if not self._auth_ok():
                return self._json(401, {"error": {"message": "invalid local API key", "type": "authentication_error"}})
            meta = sync_free_pool()
            return self._json(200 if meta.get("ok") or meta.get("pool") else 503, meta)

        if path != "/v1/chat/completions":
            return self._json(404, {"error": {"message": "not found", "type": "invalid_request_error"}})
        if not self._auth_ok():
            return self._json(401, {"error": {"message": "invalid local API key", "type": "authentication_error"}})

        n = int(self.headers.get("Content-Length") or 0)
        raw = self.rfile.read(n) if n else b"{}"
        try:
            body = json.loads(raw.decode("utf-8") or "{}")
        except json.JSONDecodeError:
            return self._json(
                400,
                {"error": {"message": "request body must be a JSON object", "type": "invalid_request_error"}},
            )

        requested = body.get("model") or "auto"
        stream = bool(body.get("stream"))
        pool = current_pool()
        if requested == "auto":
            candidates = pick_auto()
        elif requested in pool:
            candidates = [requested]
        else:
            return self._json(
                404,
                {
                    "error": {
                        "message": f"model {requested} not in Free Pool",
                        "type": "invalid_request_error",
                        "free_pool": pool,
                    }
                },
            )

        if not candidates:
            return self._json(
                503,
                {"error": {"message": "Free Pool empty", "type": "server_error", "free_pool": pool}},
            )

        tried: list[str] = []
        last_status = 0
        last_text = b""
        for model in candidates[:MAX_ATTEMPTS]:
            tried.append(model)
            payload = dict(body)
            payload["model"] = model
            payload["stream"] = stream
            status, text = _post_json(f"{UPSTREAM}/v1/chat/completions", payload)
            last_status, last_text = status, text
            if 400 <= status < 500 and status != 429:
                self.send_response(status)
                self.send_header("Content-Type", "application/json")
                self.send_header("X-Basedong-Upstream-Model", model)
                self.send_header("X-Basedong-Retry-Tried", ",".join(tried))
                self.send_header("Content-Length", str(len(text)))
                self.end_headers()
                self.wfile.write(text)
                return
            if status == 429 or status >= 500:
                continue
            out = text
            if not stream:
                try:
                    j = json.loads(text.decode("utf-8"))
                    j["model"] = model
                    out = json.dumps(j).encode("utf-8")
                except Exception:
                    out = text
            self.send_response(status)
            self.send_header("Content-Type", "application/json" if not stream else "text/event-stream")
            self.send_header("X-Basedong-Upstream-Model", model)
            self.send_header("X-Basedong-Retry-Tried", ",".join(tried))
            self.send_header("X-Basedong-Free-Pool", ",".join(current_pool()))
            if not stream:
                self.send_header("Content-Length", str(len(out)))
            self.end_headers()
            self.wfile.write(out)
            return

        self._json(
            last_status if last_status >= 400 else 503,
            {
                "error": {
                    "message": f"all Free Pool attempts failed (tried: {','.join(tried)})",
                    "type": "server_error",
                    "detail": last_text[:300].decode("utf-8", errors="replace"),
                }
            },
            {"X-Basedong-Retry-Tried": ",".join(tried)},
        )


def _loop_sync() -> None:
    while True:
        time.sleep(SYNC_INTERVAL_SEC)
        try:
            sync_free_pool()
        except Exception as e:  # noqa: BLE001
            print(f"periodic sync error: {e}", flush=True)


if __name__ == "__main__":
    print(
        f"catalog-pool sidecar on :{PORT} upstream={UPSTREAM} allowlist={sorted(ALLOWLIST)}",
        flush=True,
    )
    sync_free_pool()
    if SYNC_INTERVAL_SEC > 0:
        threading.Thread(target=_loop_sync, daemon=True).start()
    ThreadingHTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
