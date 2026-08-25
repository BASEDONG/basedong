# Reorganize app directory into Route Groups
$app = "d:\code\basedong\apps\web\src\app"

New-Item -ItemType Directory -Force -Path "$app\(marketing)" | Out-Null
New-Item -ItemType Directory -Force -Path "$app\(console)" | Out-Null
New-Item -ItemType Directory -Force -Path "$app\(auth)" | Out-Null
New-Item -ItemType Directory -Force -Path "$app\(docs)" | Out-Null
New-Item -ItemType Directory -Force -Path "$app\(forms)" | Out-Null

# Marketing routes
$marketingRoutes = @(
  "page.tsx",
  "about", "ai-gateway", "brand", "developer-talk", "enterprise",
  "models", "news", "partner", "pricing", "reserved", "token-factory"
)
foreach ($r in $marketingRoutes) {
  $src = Join-Path $app $r
  $dst = Join-Path "$app\(marketing)" $r
  if (Test-Path $src) {
    if (Test-Path $dst) { Remove-Item $dst -Recurse -Force }
    Move-Item $src $dst -Force
  }
}

# Console, auth, docs, forms
if (Test-Path "$app\me") { Move-Item "$app\me" "$app\(console)\me" -Force }
if (Test-Path "$app\zh") { Move-Item "$app\zh" "$app\(auth)\zh" -Force }
if (Test-Path "$app\docs") { Move-Item "$app\docs" "$app\(docs)\docs" -Force }
if (Test-Path "$app\share") { Move-Item "$app\share" "$app\(forms)\share" -Force }

Write-Host "Route group moves complete"
