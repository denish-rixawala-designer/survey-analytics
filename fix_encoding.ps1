$file = "c:\Users\DenishRixawala\Downloads\survey-company-analytics\src\Analytics.tsx"
$content = Get-Content $file -Raw -Encoding UTF8
$content = $content.Replace('Â·', '·')
$content = $content.Replace('â€”', '—')
$content = $content.Replace('â€“', '–')
$content = $content.Replace('â–¼', '▼')
$content = $content.Replace('â–²', '▲')
$content = $content.Replace('â†“', '↓')
$content = $content.Replace('âˆ’', '−')
$content = $content.Replace('â€¦', '…')
Set-Content $file $content -Encoding UTF8
Write-Host "Replaced encoding artifacts"
