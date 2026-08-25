# Semantic rename: components/sites + public/sites -> zone-based structure
$root = "d:\code\basedong\apps\web"
$compSites = Join-Path $root "src\components\sites"
$pubSites = Join-Path $root "public\sites"

$migrations = @(
  @{ site = "siliconflow-cn-10b89bdc"; zone = "marketing"; pages = @{
      "about-979bddc4" = "about"
      "ai-gateway-aaa44d08" = "ai-gateway"
      "brand-0612265a" = "brand"
      "developer-talk-aaf0e713" = "developer-talk"
      "enterprise-28346646" = "enterprise"
      "models-8452a47c" = "models"
      "news-f46b16ed" = "news"
      "partner-16e85911" = "partner"
      "pricing-7394a2bb" = "pricing"
      "reserved-fb22b035" = "reserved"
      "root-8a5edab2" = "home"
      "shared" = "shared"
      "token-factory-0abede1b" = "token-factory"
    }
  }
  @{ site = "cloud-siliconflow-cn-9378a730"; zone = "console"; pages = @{
      "me-account-ak-9fdd216d" = "account-ak"
      "me-account-authentication-1ca52dff" = "account-authentication"
      "me-batches-8a1f654e" = "batches"
      "me-bills-86d0c36f" = "bills"
      "me-campaigns-inviter-fa96b9ce" = "campaigns-inviter"
      "me-campaigns-real-name-012a7fcc" = "campaigns-real-name"
      "me-dedicated-apply-d401b450" = "dedicated-apply"
      "me-expensebill-cbc03a69" = "expensebill"
      "me-invitation-22abc046" = "invitation"
      "me-invoice-cc628e8f" = "invoice"
      "me-models-3fcb0ea4" = "models"
      "me-playground-chat-c63e68d1" = "playground-chat"
      "me-playground-image-d8166993" = "playground-image"
      "me-playground-text-to-speech-f1a0952b" = "playground-text-to-speech"
      "me-playground-video-f43f676a" = "playground-video"
      "shared" = "shared"
    }
  }
  @{ site = "account-siliconflow-cn-dceb7362"; zone = "auth"; pages = @{
      "zh-login-deeac313" = "login"
      "shared" = "shared"
    }
  }
  @{ site = "api-docs-siliconflow-cn-1ee2f543"; zone = "docs"; pages = @{
      "docs-userguide-introduction-9b4e1b9f" = "introduction"
      "shared" = "shared"
    }
  }
  @{ site = "siliconflow-feishu-cn-cb3ceb60"; zone = "forms"; pages = @{
      "share-base-form-shrcn2G8XKaFfNasfwD1lgDUbcb-38b270e3" = "business"
      "share-base-form-shrcnDiK9EIkGN3sK0PepqN1Ppb-1a5e3f48" = "support"
      "shared" = "shared"
    }
  }
)

foreach ($m in $migrations) {
  $zone = $m.zone
  $site = $m.site
  New-Item -ItemType Directory -Force -Path (Join-Path $root "src\components\$zone") | Out-Null
  New-Item -ItemType Directory -Force -Path (Join-Path $root "public\assets\$zone") | Out-Null

  foreach ($old in $m.pages.Keys) {
    $new = $m.pages[$old]
    $srcComp = Join-Path $compSites "$site\$old"
    $dstComp = Join-Path $root "src\components\$zone\$new"
    if (Test-Path $srcComp) {
      if (Test-Path $dstComp) { Remove-Item $dstComp -Recurse -Force }
      Move-Item $srcComp $dstComp -Force
    }
    $srcPub = Join-Path $pubSites "$site\$old"
    $dstPub = Join-Path $root "public\assets\$zone\$new"
    if (Test-Path $srcPub) {
      if (Test-Path $dstPub) { Remove-Item $dstPub -Recurse -Force }
      Move-Item $srcPub $dstPub -Force
    }
  }
}

# Remove empty sites dirs
if (Test-Path $compSites) { Remove-Item $compSites -Recurse -Force -ErrorAction SilentlyContinue }
if (Test-Path $pubSites) { Remove-Item $pubSites -Recurse -Force -ErrorAction SilentlyContinue }

# Bulk text replacement in src + public/assets + globals.css
$replacements = @()
foreach ($m in $migrations) {
  foreach ($old in $m.pages.Keys) {
    $new = $m.pages[$old]
    $site = $m.site
    $zone = $m.zone
    $replacements += @{
      Old = "@/components/sites/$site/$old"
      New = "@/components/$zone/$new"
    }
    $replacements += @{
      Old = "/sites/$site/$old"
      New = "/assets/$zone/$new"
    }
    $replacements += @{
      Old = "sites/$site/$old"
      New = "assets/$zone/$new"
    }
  }
}

$files = Get-ChildItem -Path (Join-Path $root "src"), (Join-Path $root "public\assets") -Recurse -File -Include *.ts,*.tsx,*.css,*.json,*.mjs -ErrorAction SilentlyContinue
foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw -Encoding UTF8
  $updated = $content
  foreach ($r in $replacements) {
    $updated = $updated.Replace($r.Old, $r.New)
  }
  if ($updated -ne $content) {
    Set-Content -Path $file.FullName -Value $updated -NoNewline -Encoding UTF8
  }
}

$globals = Join-Path $root "src\app\globals.css"
if (Test-Path $globals) {
  $content = Get-Content $globals -Raw -Encoding UTF8
  $updated = $content
  foreach ($r in $replacements) {
    $updated = $updated.Replace($r.Old, $r.New)
  }
  if ($updated -ne $content) {
    Set-Content -Path $globals -Value $updated -NoNewline -Encoding UTF8
  }
}

Write-Host "Migration complete"
