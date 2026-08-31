#!/usr/bin/env python3
"""Deterministic Zen-shaped mock for Sidecar retry PoC (#13)."""
from __future__ import annotations

import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

PORT = int(__import__("os").environ.get("PORT", "8090"))


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt: str, *args) -> None:
        print("[%s] %s" % (self.log_date_time_string(), fmt % args), flush=True)

    def _read_json(self):
        n = int(self.headers.get("Content-Length") or 0)
        raw = self.rfile.read(n) if n else b"{}"
        return json.loads(raw.decode("utf-8") or "{}")

    def _send(self, code: int, body: dict | list, headers: dict | None = None):
        data = json.dumps(body).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        for k, v in (headers or {}).items():
            self.send_header(k, v)
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        path = self.path.split("?", 1)[0]
        if path in ("/healthz", "/health", "/v1/health"):
            return self._send(200, {"status": "ok"})
        if path.endswith("/models") or path == "/v1/models":
            models = [
                {"id": "fail-free", "object": "model", "owned_by": "mock"},
                {"id": "ok-free", "object": "model", "owned_by": "mock"},
            ]
            return self._send(200, {"object": "list", "data": models})
        self._send(404, {"error": {"message": "not found", "type": "invalid_request_error"}})

    def do_POST(self):
        path = self.path.split("?", 1)[0]
        if not path.endswith("/chat/completions"):
            return self._send(404, {"error": {"message": "not found", "type": "invalid_request_error"}})
        body = self._read_json()
        model = body.get("model") or ""
        if model == "fail-free":
            return self._send(
                429,
                {"error": {"message": "rate limited (mock)", "type": "rate_limit_error"}},
                {"Retry-After": "1"},
            )
        if model == "client-bad":
            return self._send(
                400,
                {"error": {"message": "bad request (mock)", "type": "invalid_request_error"}},
            )
        if model == "ok-free":
            if body.get("stream"):
                # Immediate SSE success (no mid-stream failure in this mock)
                payload = (
                    'data: {"id":"mock","object":"chat.completion.chunk","model":"ok-free",'
                    '"choices":[{"index":0,"delta":{"role":"assistant","content":"pong"},"finish_reason":null}]}\n\n'
                    'data: {"id":"mock","object":"chat.completion.chunk","model":"ok-free",'
                    '"choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n'
                    "data: [DONE]\n\n"
                ).encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "text/event-stream")
                self.send_header("Cache-Control", "no-cache")
                self.end_headers()
                self.wfile.write(payload)
                return
            return self._send(
                200,
                {
                    "id": "mock-ok",
                    "object": "chat.completion",
                    "model": "ok-free",
                    "choices": [
                        {
                            "index": 0,
                            "finish_reason": "stop",
                            "message": {"role": "assistant", "content": "pong"},
                        }
                    ],
                    "usage": {"prompt_tokens": 1, "completion_tokens": 1, "total_tokens": 2},
                },
            )
        self._send(404, {"error": {"message": f"unknown model {model}", "type": "invalid_request_error"}})


if __name__ == "__main__":
    print(f"mock-zen listening on :{PORT}", flush=True)
    ThreadingHTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
