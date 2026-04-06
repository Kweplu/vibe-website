$ErrorActionPreference = 'SilentlyContinue'
$dest = "C:\Users\Administrator\Documents\VSGravity\Vibe"

$p7 = "https://image.pollinations.ai/prompt/mens%20leather%20bomber%20jacket%20isolated%20on%20dark%20studio%20background%20menswear%20no%20models%20no%20people?width=400&height=500&nologo=true"
$p8 = "https://image.pollinations.ai/prompt/mens%20leather%20driving%20gloves%20isolated%20on%20dark%20studio%20background%20menswear%20no%20models%20no%20people?width=400&height=500&nologo=true"
$p9 = "https://image.pollinations.ai/prompt/mens%20silver%20cufflinks%20macro%20shot%20isolated%20on%20dark%20studio%20background%20menswear%20no%20models%20no%20people?width=400&height=500&nologo=true"
$p10 = "https://image.pollinations.ai/prompt/mens%20charcoal%20cashmere%20folded%20sweater%20isolated%20on%20dark%20studio%20background%20menswear%20no%20models%20no%20people?width=400&height=500&nologo=true"
$p11 = "https://image.pollinations.ai/prompt/mens%20leather%20belt%20isolated%20on%20dark%20studio%20background%20menswear%20no%20models%20no%20people?width=400&height=500&nologo=true"
$p12 = "https://image.pollinations.ai/prompt/mens%20thick%20wool%20scarf%20isolated%20on%20dark%20studio%20background%20menswear%20no%20models%20no%20people?width=400&height=500&nologo=true"

Write-Host "Downloading images..."
Invoke-WebRequest -Uri $p7 -OutFile "$dest\product-7.png" -UseBasicParsing
Invoke-WebRequest -Uri $p8 -OutFile "$dest\product-8.png" -UseBasicParsing
Invoke-WebRequest -Uri $p9 -OutFile "$dest\product-9.png" -UseBasicParsing
Invoke-WebRequest -Uri $p10 -OutFile "$dest\product-10.png" -UseBasicParsing
Invoke-WebRequest -Uri $p11 -OutFile "$dest\product-11.png" -UseBasicParsing
Invoke-WebRequest -Uri $p12 -OutFile "$dest\product-12.png" -UseBasicParsing
Write-Host "Done downloading all alternative unique images."
