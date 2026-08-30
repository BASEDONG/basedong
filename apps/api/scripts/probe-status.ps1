# Black-box probe of the Backend HTTP seam: GET /api/status
# Usage: powershell -File scripts/probe-status.ps1 [base_url]
param(
  [string]$BaseUrl = $(if ($env:BASEDONG_API_BASE_URL) { $env:BASEDONG_API_BASE_URL } else { "http://localhost:3000" })
)

$BaseUrl = $BaseUrl.TrimEnd("/")
$Url = "$BaseUrl/api/status"
Write-Host "Probing $Url"

try {
  $resp = Invoke-WebRequest -Uri $Url -Method GET -TimeoutSec 30 -UseBasicParsing
} catch {
  Write-Error "probe failed: could not fetch $Url"
  exit 1
}

if ($resp.StatusCode -ne 200) {
  Write-Error "probe failed: HTTP $($resp.StatusCode)"
  exit 1
}

if ($resp.Content -notmatch '"success"\s*:\s*true') {
  Write-Error "probe failed: success is not true"
  Write-Host $resp.Content
  exit 1
}

Write-Host "ok: control-plane /api/status returned success=true"
