package helper

import (
	"net/http"
	"strings"

	relaycommon "github.com/QuantumNous/new-api/relay/common"
)

// HeaderSidecarUpstreamModel is set by Basedong Sidecars (e.g. Zen Sidecar) on
// successful upstream responses so Relay can record the real model id in consume logs.
const HeaderSidecarUpstreamModel = "X-Basedong-Upstream-Model"

// ApplySidecarUpstreamModelFromResponse records the Sidecar-reported upstream model
// for operator consume logs. Response JSON "model" is returned to the client but
// RecordConsumeLog uses OriginModelName (e.g. "auto") unless this header is applied.
func ApplySidecarUpstreamModelFromResponse(info *relaycommon.RelayInfo, resp *http.Response) {
	if info == nil || resp == nil {
		return
	}
	upstream := strings.TrimSpace(resp.Header.Get(HeaderSidecarUpstreamModel))
	if upstream == "" || upstream == info.OriginModelName {
		return
	}
	if info.ChannelMeta == nil {
		info.ChannelMeta = &relaycommon.ChannelMeta{}
	}
	info.UpstreamModelName = upstream
	info.IsModelMapped = true
}
