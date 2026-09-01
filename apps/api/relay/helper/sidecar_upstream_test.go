package helper

import (
	"net/http"
	"testing"

	relaycommon "github.com/QuantumNous/new-api/relay/common"
	"github.com/stretchr/testify/assert"
)

func TestApplySidecarUpstreamModelFromResponseSetsLogFields(t *testing.T) {
	info := &relaycommon.RelayInfo{
		OriginModelName: "auto",
		ChannelMeta:     &relaycommon.ChannelMeta{},
	}
	resp := &http.Response{
		Header: http.Header{
			HeaderSidecarUpstreamModel: []string{"gpt-4o-mini"},
		},
	}

	ApplySidecarUpstreamModelFromResponse(info, resp)

	assert.True(t, info.IsModelMapped)
	assert.Equal(t, "gpt-4o-mini", info.UpstreamModelName)
}

func TestApplySidecarUpstreamModelFromResponseSkipsWhenSameAsOrigin(t *testing.T) {
	info := &relaycommon.RelayInfo{
		OriginModelName: "auto",
		ChannelMeta:     &relaycommon.ChannelMeta{},
	}
	resp := &http.Response{
		Header: http.Header{
			HeaderSidecarUpstreamModel: []string{"auto"},
		},
	}

	ApplySidecarUpstreamModelFromResponse(info, resp)

	assert.False(t, info.IsModelMapped)
	assert.Empty(t, info.UpstreamModelName)
}

func TestApplySidecarUpstreamModelFromResponseSkipsEmptyHeader(t *testing.T) {
	info := &relaycommon.RelayInfo{
		OriginModelName: "auto",
		ChannelMeta:     &relaycommon.ChannelMeta{},
	}

	ApplySidecarUpstreamModelFromResponse(info, &http.Response{Header: http.Header{}})

	assert.False(t, info.IsModelMapped)
}
