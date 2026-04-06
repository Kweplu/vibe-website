$ErrorActionPreference = 'Stop'
$urls = @(
"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop", 
"https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=800&auto=format&fit=crop", 
"https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop", 
"https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=800&auto=format&fit=crop", 
"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop", 
"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop", 
"https://images.unsplash.com/photo-1622396113945-8ed1857ba0fb?w=800&auto=format&fit=crop", 
"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop", 
"https://images.unsplash.com/photo-1502251322055-6b4d31f0cf88?w=800&auto=format&fit=crop", 
"https://images.unsplash.com/photo-1521369909029-2afed882ba28?w=800&auto=format&fit=crop", 
"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format&fit=crop", 
"https://images.unsplash.com/photo-1598502392476-eb969315993d?w=800&auto=format&fit=crop",
"https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2000&auto=format&fit=crop"
)

for ($i=0; $i -lt 12; $i++) {
    $out = "product-$($i+1).jpg"
    try {
        Invoke-WebRequest -Uri $urls[$i] -OutFile $out -UseBasicParsing
        Write-Host "Downloaded $out"
    } catch {
        Write-Host "Failed $out"
    }
}
try {
    Invoke-WebRequest -Uri $urls[12] -OutFile "hero-bg.jpg" -UseBasicParsing
    Write-Host "Downloaded hero-bg.jpg"
} catch {
    Write-Host "Failed hero-bg"
}
