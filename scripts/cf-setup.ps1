# One-shot Cloudflare setup for Tricore (run from repo root after `npx wrangler login`)
# Usage: powershell -ExecutionPolicy Bypass -File scripts\cf-setup.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host "== Checking wrangler auth ==" -ForegroundColor Cyan
$who = npx wrangler whoami 2>&1 | Out-String
if ($who -match "not authenticated") {
  Write-Host "Not logged in. Opening browser..." -ForegroundColor Yellow
  npx wrangler login
  $who = npx wrangler whoami 2>&1 | Out-String
  if ($who -match "not authenticated") {
    Write-Error "Still not authenticated. Complete the browser login and re-run this script."
    exit 1
  }
}
Write-Host "Authenticated." -ForegroundColor Green

$wranglerPath = Join-Path $root "wrangler.jsonc"
$config = Get-Content $wranglerPath -Raw
$nl = [Environment]::NewLine

# --- KV ---
if ($config -notmatch '"binding":\s*"TRICORE_KV"' -or $config -match 'PASTE_KV_ID_HERE') {
  Write-Host "== Creating KV namespace TRICORE_KV ==" -ForegroundColor Cyan
  $kvOut = npx wrangler kv namespace create TRICORE_KV 2>&1 | Out-String
  Write-Output $kvOut
  if ($kvOut -match 'id\s*=\s*"([a-f0-9]{32})"') {
    $kvId = $Matches[1]
  } elseif ($kvOut -match '\b([a-f0-9]{32})\b') {
    $kvId = $Matches[1]
  } else {
    Write-Error "Could not parse KV id from output. Paste it manually into wrangler.jsonc."
    exit 1
  }
  Write-Host "KV id: $kvId" -ForegroundColor Green
  $kvBlock = '  "kv_namespaces": [' + $nl +
             '    { "binding": "TRICORE_KV", "id": "' + $kvId + '" }' + $nl +
             '  ],'
  if ($config -match '(?s)//\s*"kv_namespaces":.*?\],') {
    $config = [regex]::Replace($config, '(?s)//\s*"kv_namespaces":.*?\],', [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $kvBlock })
  } else {
    $config = $config -replace '"observability"', ($kvBlock + $nl + '  "observability"')
  }
} else {
  Write-Host "KV binding already present in wrangler.jsonc - skipping create." -ForegroundColor Green
}

# --- R2 ---
if ($config -notmatch '"binding":\s*"TRICORE_MEDIA"') {
  Write-Host "== Creating R2 bucket tricore-media ==" -ForegroundColor Cyan
  $r2Out = npx wrangler r2 bucket create tricore-media 2>&1 | Out-String
  Write-Output $r2Out
  if ($r2Out -match "already exists" -or $LASTEXITCODE -eq 0) {
    $r2Block = '  "r2_buckets": [' + $nl +
               '    { "binding": "TRICORE_MEDIA", "bucket_name": "tricore-media" }' + $nl +
               '  ],'
    if ($config -match '(?s)//\s*"r2_buckets":.*?\],') {
      $config = [regex]::Replace($config, '(?s)//\s*"r2_buckets":.*?\],', [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $r2Block })
    } else {
      $config = $config -replace '"observability"', ($r2Block + $nl + '  "observability"')
    }
    Write-Host "R2 binding added." -ForegroundColor Green
  } else {
    Write-Warning "R2 create may have failed. Check output above; add r2_buckets manually."
  }
} else {
  Write-Host "R2 binding already present - skipping create." -ForegroundColor Green
}

# Remove leftover commented setup instructions
$config = [regex]::Replace($config, '(?m)^\s*//\s*(Persistent CMS|1\. npm run cf:|2\. Paste id|2\. Uncomment below).*\r?\n?', '')

Set-Content -Path $wranglerPath -Value $config.TrimEnd() -NoNewline
Write-Host ""
Write-Host "Updated wrangler.jsonc:" -ForegroundColor Cyan
Get-Content $wranglerPath
Write-Host ""
Write-Host "Done. Commit wrangler.jsonc and redeploy." -ForegroundColor Green
