#!/usr/bin/env python3
"""Zen Sidecar — greenfield northbound OpenAI adapter for Anonymous Zen Free Pool."""
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
UPSTREAM = os.environ.get("UPSTREAM", "https://opencode.ai/zen").rstrip("/")
ALLOWLIST = {s.strip() for s in os.environ.get("ALLOWLIST", "big-pickle").split(",") if s.strip()}
RESPONSES_MODELS = {
    s.strip() for s in os.environ.get("RESPONSES_MODELS", "").split(",") if s.strip()
}
PICK_ORDER = [s.strip() for s in os.environ.get("PICK_ORDER", "").split(",") if s.strip()]
SYNC_INTERVAL_SEC = float(os.environ.get("SYNC_INTERVAL_SEC", "300"))
# Per-model retries on 429/5xx/transport errors, then rotate to the next Free Pool member.
# Prefer PER_MODEL_ATTEMPTS; MAX_ATTEMPTS kept as a legacy alias for overlays/probes.
_per_model_raw = os.environ.get("PER_MODEL_ATTEMPTS")
if _per_model_raw is None or _per_model_raw == "":
    _per_model_raw = os.environ.get("MAX_ATTEMPTS", "20")
PER_MODEL_ATTEMPTS = min(50, max(1, int(_per_model_raw)))
MAX_ATTEMPTS = PER_MODEL_ATTEMPTS  # legacy name used in logs / older docs

_lock = threading.Lock()
_pool: list[str] = []
_last_good_pool: list[str] = []
_sync_meta: dict = {"ok": False, "at": 0.0, "error": "", "source": "none", "pool": []}


def _zen_headers() -> dict[str, str]:
    return {
        "Authorization": "Bearer public",
        "User-Agent": os.environ.get("ZEN_UA", "opencode/1.2.31"),
        "x-opencode-version": os.environ.get("ZEN_CLIENT_VERSION", "1.2.31"),
    }


def _get(url: str) -> tuple[int, bytes]:
    req = urllib.request.Request(url, method="GET", headers=_zen_headers())
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.status, resp.read()
    except urllib.error.HTTPError as e:
        return e.code, e.read()


def _post_json(url: str, payload: dict) -> tuple[int, dict[str, str], bytes]:
    data = json.dumps(payload).encode("utf-8")
    headers = {**_zen_headers(), "Content-Type": "application/json"}
    req = urllib.request.Request(url, data=data, method="POST", headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return resp.status, {k: v for k, v in resp.headers.items()}, resp.read()
    except urllib.error.HTTPError as e:
        hdrs = {k: v for k, v in e.headers.items()} if e.headers else {}
        return e.code, hdrs, e.read()


def is_free_candidate(model_id: str) -> bool:
    return model_id.endswith("-free") or model_id in ALLOWLIST


def uses_responses(model_id: str) -> bool:
    return model_id in RESPONSES_MODELS


def is_retryable(code: int) -> bool:
    return code == 429 or 500 <= code <= 599


def probe_model(model_id: str) -> bool:
    if uses_responses(model_id):
        status, _, _ = _post_json(
            f"{UPSTREAM}/v1/responses",
            {
                "model": model_id,
                "input": [{"role": "user", "content": "ping"}],
                "max_output_tokens": 1,
            },
        )
        return 200 <= status < 300
    status, _, _ = _post_json(
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
            return dict(_sync_meta)

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
            return dict(_sync_meta)

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
        return dict(_sync_meta)


def current_pool() -> list[str]:
    with _lock:
        return list(_pool)


def pick_auto_candidates() -> list[str]:
    pool = current_pool()
    if PICK_ORDER:
        ordered = [m for m in PICK_ORDER if m in pool]
        rest = [m for m in pool if m not in ordered]
        random.shuffle(rest)
        return ordered + rest
    arr = list(pool)
    random.shuffle(arr)
    return arr


def chat_to_responses_payload(model: str, body: dict) -> dict:
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
    return _post_json(f"{UPSTREAM}/v1/chat/completions", payload)


def upstream_via_responses(model: str, body: dict) -> tuple[int, dict[str, str], bytes]:
    try:
        payload = chat_to_responses_payload(model, body)
    except ValueError as e:
        err = json.dumps(
            {"error": {"message": f"cannot convert chat→responses: {e}", "type": "protocol_conversion_error"}}
        ).encode()
        return 501, {"Content-Type": "application/json"}, err
    status, headers, raw = _post_json(f"{UPSTREAM}/v1/responses", payload)
    if status >= 400:
        return status, headers, raw
    try:
        chat = responses_to_chat(model, json.loads(raw.decode("utf-8")))
        return 200, {"Content-Type": "application/json"}, json.dumps(chat).encode()
    except Exception as e:  # noqa: BLE001
        err = json.dumps(
            {"error": {"message": f"cannot convert responses→chat: {e}", "type": "protocol_conversion_error"}}
        ).encode()
        return 502, {"Content-Type": "application/json"}, err


def call_upstream(model: str, body: dict, stream: bool) -> tuple[int, dict[str, str], bytes]:
    if uses_responses(model):
        if stream:
            err = json.dumps(
                {
                    "error": {
                        "message": "responses-southbound models do not support stream conversion",
                        "type": "protocol_conversion_error",
                    }
                }
            ).encode()
            return 501, {"Content-Type": "application/json"}, err
        return upstream_via_responses(model, body)
    return upstream_chat(model, body, stream)


def _protocol_error_type(text: bytes) -> str | None:
    try:
        return (json.loads(text.decode("utf-8")).get("error") or {}).get("type")
    except Exception:
        return None


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
        if path in ("/health", "/healthz"):
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
        special = {"client-bad", "broken-responses-free"}

        if requested == "auto":
            candidates = pick_auto_candidates()
        elif requested in pool or requested in special:
            candidates = [requested]
        else:
            return self._json(
                404,
                {
                    "error": {
                        "message": f"model {requested} not in Free Pool (no paid fallback)",
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

        tried: list[str] = []  # unique model order (header-compatible)
        total_attempts = 0
        last_status = 0
        last_text = b""
        last_model = ""

        for model in candidates:
            tried.append(model)
            last_model = model
            for _attempt in range(PER_MODEL_ATTEMPTS):
                total_attempts += 1
                headers: dict[str, str] = {}
                try:
                    status, headers, text = call_upstream(model, body, stream)
                except Exception as e:  # noqa: BLE001
                    status = 502
                    text = str(e).encode("utf-8")
                    headers = {}
                last_status = status
                last_text = text

                if _protocol_error_type(text) == "protocol_conversion_error":
                    self._write_response(
                        status, text, model, tried, uses_responses(model), stream=False, attempts=total_attempts
                    )
                    return

                if 400 <= status < 500 and status != 429:
                    self._write_response(
                        status,
                        text,
                        model,
                        tried,
                        uses_responses(model),
                        stream=False,
                        ctype=headers.get("Content-Type"),
                        attempts=total_attempts,
                    )
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
                self._write_response(
                    status,
                    out,
                    model,
                    tried,
                    uses_responses(model),
                    stream=stream,
                    ctype=ctype,
                    attempts=total_attempts,
                )
                return
            # same-model budget exhausted on retryable errors → next Free Pool member

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
            {
                "X-Basedong-Retry-Tried": ",".join(tried),
                "X-Basedong-Upstream-Model": last_model,
                "X-Basedong-Retry-Attempts": str(total_attempts),
            },
        )

    def _write_response(
        self,
        status: int,
        body: bytes,
        model: str,
        tried: list[str],
        responses: bool,
        stream: bool,
        ctype: str | None = None,
        attempts: int = 0,
    ) -> None:
        self.send_response(status)
        self.send_header("Content-Type", ctype or ("text/event-stream" if stream else "application/json"))
        self.send_header("X-Basedong-Upstream-Model", model)
        self.send_header("X-Basedong-Retry-Tried", ",".join(tried))
        self.send_header("X-Basedong-Retry-Attempts", str(attempts))
        self.send_header("X-Basedong-Free-Pool", ",".join(current_pool()))
        if responses:
            self.send_header("X-Basedong-Southbound", "responses")
        else:
            self.send_header("X-Basedong-Southbound", "chat")
        if not stream:
            self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def _loop_sync() -> None:
    while True:
        time.sleep(SYNC_INTERVAL_SEC)
        try:
            sync_free_pool()
        except Exception as e:  # noqa: BLE001
            print(f"periodic sync error: {e}", flush=True)


if __name__ == "__main__":
    print(
        f"zen-sidecar on :{PORT} upstream={UPSTREAM} allowlist={sorted(ALLOWLIST)} "
        f"per_model_attempts={PER_MODEL_ATTEMPTS} sync_interval={SYNC_INTERVAL_SEC}s",
        flush=True,
    )
    sync_free_pool()
    if SYNC_INTERVAL_SEC > 0:
        threading.Thread(target=_loop_sync, daemon=True).start()
    ThreadingHTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
