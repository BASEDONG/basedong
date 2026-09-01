# Zen Sidecar — upstream model in consume logs (#19)

## Problem

Customers call model **`auto`**. The Sidecar picks a real Free Pool id and returns it in the response JSON `model` field (and `X-Basedong-Upstream-Model` header). Operators need the **real upstream id** in Admin **consume logs**, not only in the client response body.

## Evidence: JSON `model` alone is insufficient

Consume logs record the customer-facing model from `relayInfo.OriginModelName`, not the upstream response body:

```233:233:apps/api/service/text_quota.go
		ModelName:            relayInfo.OriginModelName,
```

For native `auto` with empty Channel `model_mapping` (`{}`), `other.upstream_model_name` is **not** populated — it is gated on `IsModelMapped`, which ModelMappedHelper only sets when the Channel has a non-empty mapping:

```86:89:apps/api/service/log_info_generate.go
	if relayInfo.IsModelMapped {
		other["is_model_mapped"] = true
		other["upstream_model_name"] = relayInfo.UpstreamModelName
	}
```

The Admin usage-log UI shows “Actual Model” only when both `is_model_mapped` and `upstream_model_name` are present (`apps/api/web/src/features/usage-logs/lib/format.ts`).

**Conclusion:** Response JSON `model` reaches the **client** but does **not** flow into operator consume logs for the native-`auto` Sidecar path without a Relay change.

## Solution (minimal Relay patch)

Zen Sidecar sets on successful responses:

```http
X-Basedong-Upstream-Model: <real-free-pool-id>
```

Relay reads this header in `relay/helper/sidecar_upstream.go` (`ApplySidecarUpstreamModelFromResponse`) at OpenAI adaptor response handling time. When the header differs from `OriginModelName`, Relay sets `UpstreamModelName` and `IsModelMapped` so existing log/UI paths emit `other.upstream_model_name`.

No catalog, probe, UA, or retry logic is added to New API.

## Operator verification

After a successful `auto` request through a Channel → Sidecar:

1. Open Admin → Logs → consume entry for the request.
2. Confirm **Request Model** = `auto` and **Actual Model** (or mapped indicator) shows the Free Pool id from the Sidecar header.
3. Optional: inspect raw `other` JSON for `upstream_model_name`.

## Related

- Sidecar header: `apps/zen-sidecar/sidecar.py`
- Runbook: [`runbook.md`](runbook.md)
- Parent: [issue #9](https://github.com/BASEDONG/basedong/issues/9)
