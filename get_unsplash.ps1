$client = New-Object System.Net.WebClient
$client.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
$urls = @(
"https://images.unsplash.com/photo-1551028719-01ec1bf0e386?w=800&q=80",
"https://images.unsplash.com/photo-1499013819532-e4ff41b00669?w=800&q=80",
"https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80",
"https://images.unsplash.com/photo-1434389670869-bac08581780e?w=800&q=80",
"https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80",
"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"
)
for ($i=0; $i -lt 6; $i++) {
    $file = "C:\Users\Administrator\Documents\VSGravity\Vibe\product-$($i+7).png"
    try {
        $client.DownloadFile($urls[$i], $file)
        Write-Host "Downloaded product-$($i+7)"
    } catch {
        Write-Host "Failed product-$($i+7)"
    }
}
