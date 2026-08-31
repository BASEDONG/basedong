#!/usr/bin/env python3
"""Thin Sidecar PoC (#13): northbound OpenAI chat + auto Free Pool retry/rotation."""
from __future__ import annotations

import json
import os
import random
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

PORT = int(os.environ.get("PORT", "8080"))
SIDECAR_KEY = os.environ.get("SIDECAR_KEY", "basedong-sidecar-dev-credential")
UPSTREAM = os.environ.get("UPSTREAM", "http://mock-zen:8090").rstrip("/")
FREE_POOL = [s.strip() for s in os.environ.get("FREE_POOL", "fail-free,ok-free").split(",") if s.strip()]
PICK_ORDER = [s.strip() for s in os.environ.get("PICK_ORDER", "").split(",") if s.strip()]
MAX_ATTEMPTS = min(20, max(1, int(os.environ.get("MAX_ATTEMPTS", str(len(FREE_POOL) or 5)))))


def pick_order() -> list[str]:
    if PICK_ORDER:
        return [m for m in PICK_ORDER if m in FREE_POOL]
    arr = list(FREE_POOL)
    random.shuffle(arr)
    return arr


def is_retryable(code: int) -> bool:
    return code == 429 or 500 <= code <= 599


def upstream_chat(model: str, body: dict, stream: bool) -> tuple[int, dict[str, str], bytes]:
    payload = dict(body)
    payload["model"] = model
    payload["stream"] = bool(stream)
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"{UPSTREAM}/v1/chat/completions",
        data=data,
        method="POST",
        headers={
            "Content-Type": "application/json",
            "Authorization": "Bearer public",
            "User-Agent": "opencode/1.2.31",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            headers = {k: v for k, v in resp.headers.items()}
            return resp.status, headers, resp.read()
    except urllib.error.HTTPError as e:
        headers = {k: v for k, v in e.headers.items()} if e.headers else {}
        return e.code, headers, e.read()


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
            return self._json(200, {"status": "ok", "free_pool": FREE_POOL})
        if path == "/v1/models":
            if not self._auth_ok():
                return self._json(401, {"error": {"message": "invalid local API key", "type": "authentication_error"}})
            data = [{"id": "auto", "object": "model", "owned_by": "basedong"}] + [
                {"id": m, "object": "model", "owned_by": "mock"} for m in FREE_POOL
            ]
            return self._json(200, {"object": "list", "data": data})
        self._json(404, {"error": {"message": "not found", "type": "invalid_request_error"}})

    def do_POST(self) -> None:
        path = self.path.split("?", 1)[0]
        if path != "/v1/chat/completions":
            return self._json(404, {"error": {"message": "not found", "type": "invalid_request_error"}})
        if not self._auth_ok():
            return self._json(401, {"error": {"message": "invalid local API key", "type": "authentication_error"}})
        n = int(self.headers.get("Content-Length") or 0)
        raw = self.rfile.read(n) if n else b"{}"
        try:
            body = json.loads(raw.decode("utf-8") or "{}")
        except json.JSONDecodeError:
            return self._json(400, {"error": {"message": "request body must be a JSON object", "type": "invalid_request_error"}})

        requested = body.get("model") or "auto"
        stream = bool(body.get("stream"))
        if requested == "auto":
            candidates = pick_order()
        elif requested in FREE_POOL or requested == "client-bad":
            candidates = [requested]
        else:
            return self._json(404, {"error": {"message": f"model {requested} not in Free Pool", "type": "invalid_request_error"}})

        if not candidates:
            return self._json(503, {"error": {"message": "Free Pool empty", "type": "server_error"}})

        tried: list[str] = []
        last_status = 0
        last_text = b""

        for model in candidates[:MAX_ATTEMPTS]:
            tried.append(model)
            try:
                status, headers, text = upstream_chat(model, body, stream)
            except Exception as e:  # noqa: BLE001 — PoC: treat transport as retryable
                last_status = 502
                last_text = str(e).encode("utf-8")
                continue
            last_status = status
            last_text = text

            # Client errors: do not rotate
            if 400 <= status < 500 and status != 429:
                self.send_response(status)
                self.send_header("Content-Type", headers.get("Content-Type", "application/json"))
                self.send_header("X-Basedong-Upstream-Model", model)
                self.send_header("X-Basedong-Retry-Tried", ",".join(tried))
                self.send_header("Content-Length", str(len(text)))
                self.end_headers()
                self.wfile.write(text)
                return

            if is_retryable(status):
                continue

            # Success (or other non-retryable): pipe. No mid-stream stitch —
            # we only write after a successful upstream status.
            ctype = headers.get("Content-Type", "application/json")
            out = text
            if not stream:
                try:
                    j = json.loads(text.decode("utf-8"))
                    j["model"] = model
                    out = json.dumps(j).encode("utf-8")
                except Exception:
                    out = text
            self.send_response(status)
            self.send_header("Content-Type", ctype)
            self.send_header("X-Basedong-Upstream-Model", model)
            self.send_header("X-Basedong-Retry-Tried", ",".join(tried))
            if not stream:
                self.send_header("Content-Length", str(len(out)))
            self.end_headers()
            self.wfile.write(out)
            return

        detail = last_text[:500].decode("utf-8", errors="replace")
        self._json(
            last_status if last_status >= 400 else 503,
            {
                "error": {
                    "message": f"all Free Pool attempts failed (tried: {','.join(tried)})",
                    "type": "server_error",
                    "detail": detail,
                }
            },
            {"X-Basedong-Retry-Tried": ",".join(tried)},
        )


if __name__ == "__main__":
    print(
        f"auto-retry sidecar on :{PORT} upstream={UPSTREAM} pool={','.join(FREE_POOL)} pick={','.join(PICK_ORDER) or 'random'}",
        flush=True,
    )
    ThreadingHTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
