#!/usr/bin/env python3
"""Thin Sidecar PoC (#13/#14): northbound chat + Free Pool retry + responses southbound."""
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
RESPONSES_MODELS = {
    s.strip() for s in os.environ.get("RESPONSES_MODELS", "").split(",") if s.strip()
}
MAX_ATTEMPTS = min(20, max(1, int(os.environ.get("MAX_ATTEMPTS", str(len(FREE_POOL) or 5)))))


def pick_order() -> list[str]:
    if PICK_ORDER:
        return [m for m in PICK_ORDER if m in FREE_POOL]
    arr = list(FREE_POOL)
    random.shuffle(arr)
    return arr


def is_retryable(code: int) -> bool:
    return code == 429 or 500 <= code <= 599


def _upstream_headers() -> dict[str, str]:
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer public",
        "User-Agent": "opencode/1.2.31",
    }


def _http_json(url: str, payload: dict) -> tuple[int, dict[str, str], bytes]:
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, method="POST", headers=_upstream_headers())
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            headers = {k: v for k, v in resp.headers.items()}
            return resp.status, headers, resp.read()
    except urllib.error.HTTPError as e:
        headers = {k: v for k, v in e.headers.items()} if e.headers else {}
        return e.code, headers, e.read()


def chat_to_responses_payload(model: str, body: dict) -> dict:
    """Northbound chat/completions → southbound /v1/responses body (text-only PoC)."""
    messages = body.get("messages") or []
    if not isinstance(messages, list):
        raise ValueError("messages must be a list")
    instructions = None
    input_items: list[dict] = []
    for m in messages:
        if not isinstance(m, dict):
            continue
        role = m.get("role") or "user"
        content = m.get("content")
        if isinstance(content, list):
            parts = []
            for p in content:
                if isinstance(p, dict) and p.get("type") == "text":
                    parts.append(p.get("text") or "")
                elif isinstance(p, str):
                    parts.append(p)
            text = "".join(parts)
        elif content is None:
            text = ""
        else:
            text = str(content)
        if role == "system":
            instructions = text
            continue
        input_items.append({"role": role, "content": text})
    if not input_items and not instructions:
        raise ValueError("no convertible messages for responses southbound")
    out: dict = {"model": model, "input": input_items if input_items else (instructions or "")}
    if instructions and input_items:
        out["instructions"] = instructions
    if body.get("max_tokens") is not None:
        out["max_output_tokens"] = body["max_tokens"]
    return out


def extract_responses_text(resp_json: dict) -> str:
    if isinstance(resp_json.get("output_text"), str) and resp_json["output_text"]:
        return resp_json["output_text"]
    chunks: list[str] = []
    for item in resp_json.get("output") or []:
        if not isinstance(item, dict):
            continue
        if item.get("type") != "message" and item.get("role") != "assistant":
            continue
        for c in item.get("content") or []:
            if isinstance(c, dict) and c.get("type") in ("output_text", "text"):
                chunks.append(c.get("text") or "")
    return "".join(chunks)


def responses_to_chat(model: str, resp_json: dict) -> dict:
    text = extract_responses_text(resp_json)
    if text == "":
        raise ValueError("responses output has no extractable assistant text")
    usage = resp_json.get("usage") or {}
    return {
        "id": resp_json.get("id") or "chatcmpl-from-responses",
        "object": "chat.completion",
        "model": model,
        "choices": [
            {
                "index": 0,
                "finish_reason": "stop",
                "message": {"role": "assistant", "content": text},
            }
        ],
        "usage": {
            "prompt_tokens": int(usage.get("input_tokens") or usage.get("prompt_tokens") or 0),
            "completion_tokens": int(usage.get("output_tokens") or usage.get("completion_tokens") or 0),
            "total_tokens": int(usage.get("total_tokens") or 0),
        },
    }


def upstream_chat(model: str, body: dict, stream: bool) -> tuple[int, dict[str, str], bytes]:
    payload = dict(body)
    payload["model"] = model
    payload["stream"] = bool(stream)
    return _http_json(f"{UPSTREAM}/v1/chat/completions", payload)


def upstream_via_responses(model: str, body: dict) -> tuple[int, dict[str, str], bytes]:
    """Call /v1/responses and return chat-shaped JSON bytes on success."""
    try:
        payload = chat_to_responses_payload(model, body)
    except ValueError as e:
        err = json.dumps(
            {
                "error": {
                    "message": f"cannot convert chat→responses: {e}",
                    "type": "protocol_conversion_error",
                }
            }
        ).encode("utf-8")
        return 501, {"Content-Type": "application/json"}, err

    status, headers, raw = _http_json(f"{UPSTREAM}/v1/responses", payload)
    if status >= 400:
        return status, headers, raw
    try:
        resp_json = json.loads(raw.decode("utf-8"))
        chat = responses_to_chat(model, resp_json)
        out = json.dumps(chat).encode("utf-8")
        return 200, {"Content-Type": "application/json"}, out
    except Exception as e:  # noqa: BLE001
        err = json.dumps(
            {
                "error": {
                    "message": f"cannot convert responses→chat: {e}",
                    "type": "protocol_conversion_error",
                }
            }
        ).encode("utf-8")
        return 502, {"Content-Type": "application/json"}, err


def call_upstream(model: str, body: dict, stream: bool) -> tuple[int, dict[str, str], bytes]:
    if model in RESPONSES_MODELS:
        if stream:
            err = json.dumps(
                {
                    "error": {
                        "message": "responses-southbound models do not support stream conversion in this PoC",
                        "type": "protocol_conversion_error",
                    }
                }
            ).encode("utf-8")
            return 501, {"Content-Type": "application/json"}, err
        return upstream_via_responses(model, body)
    return upstream_chat(model, body, stream)


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
            return self._json(
                200,
                {
                    "status": "ok",
                    "free_pool": FREE_POOL,
                    "responses_models": sorted(RESPONSES_MODELS),
                },
            )
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
            return self._json(
                400,
                {"error": {"message": "request body must be a JSON object", "type": "invalid_request_error"}},
            )

        requested = body.get("model") or "auto"
        stream = bool(body.get("stream"))
        # Allow broken-responses-free for conversion-failure probe even if not in pool
        special = {"client-bad", "broken-responses-free"}
        if requested == "auto":
            candidates = pick_order()
        elif requested in FREE_POOL or requested in special:
            candidates = [requested]
        else:
            # Explicit reject — never silent paid fallback
            return self._json(
                404,
                {
                    "error": {
                        "message": f"model {requested} not in Free Pool (no paid fallback)",
                        "type": "invalid_request_error",
                    }
                },
            )

        if not candidates:
            return self._json(503, {"error": {"message": "Free Pool empty", "type": "server_error"}})

        tried: list[str] = []
        last_status = 0
        last_text = b""

        for model in candidates[:MAX_ATTEMPTS]:
            tried.append(model)
            try:
                status, headers, text = call_upstream(model, body, stream)
            except Exception as e:  # noqa: BLE001
                last_status = 502
                last_text = str(e).encode("utf-8")
                continue
            last_status = status
            last_text = text

            # Protocol conversion failures: do not rotate into paid / other protocols silently
            try:
                err_type = (json.loads(text.decode("utf-8")).get("error") or {}).get("type")
            except Exception:
                err_type = None
            if err_type == "protocol_conversion_error":
                self.send_response(status)
                self.send_header("Content-Type", "application/json")
                self.send_header("X-Basedong-Upstream-Model", model)
                self.send_header("X-Basedong-Retry-Tried", ",".join(tried))
                self.send_header("X-Basedong-Southbound", "responses" if model in RESPONSES_MODELS else "chat")
                self.send_header("Content-Length", str(len(text)))
                self.end_headers()
                self.wfile.write(text)
                return

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
            self.send_header("X-Basedong-Southbound", "responses" if model in RESPONSES_MODELS else "chat")
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
        f"auto-retry sidecar on :{PORT} upstream={UPSTREAM} pool={','.join(FREE_POOL)} "
        f"pick={','.join(PICK_ORDER) or 'random'} responses={','.join(sorted(RESPONSES_MODELS)) or '-'}",
        flush=True,
    )
    ThreadingHTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
