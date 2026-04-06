$client = New-Object System.Net.WebClient
$client.Headers.Add("User-Agent", "Mozilla/5.0")
$client.DownloadFile("https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80", "C:\Users\Administrator\Documents\VSGravity\Vibe\product-7.png")
$client.DownloadFile("https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80", "C:\Users\Administrator\Documents\VSGravity\Vibe\product-8.png")
$client.DownloadFile("https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80", "C:\Users\Administrator\Documents\VSGravity\Vibe\product-9.png")
$client.DownloadFile("https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80", "C:\Users\Administrator\Documents\VSGravity\Vibe\product-10.png")
$client.DownloadFile("https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=800&q=80", "C:\Users\Administrator\Documents\VSGravity\Vibe\product-11.png")
$client.DownloadFile("https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80", "C:\Users\Administrator\Documents\VSGravity\Vibe\product-12.png")
Copy-Item C:\Users\Administrator\Documents\VSGravity\Vibe\market.html -Destination C:\Users\Administrator\Documents\VSGravity\Vibe\explore.html -Force
Remove-Item C:\Users\Administrator\Documents\VSGravity\Vibe\market.html -Force
