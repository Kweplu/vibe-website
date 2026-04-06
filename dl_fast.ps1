$ErrorActionPreference = 'SilentlyContinue'
$dest = "C:\Users\Administrator\Documents\VSGravity\Vibe"

$u7 = "https://images.pexels.com/photos/16170/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800"
$u8 = "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800"
$u9 = "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=800"
$u10 = "https://images.pexels.com/photos/1940026/pexels-photo-1940026.jpeg?auto=compress&cs=tinysrgb&w=800"
$u11 = "https://images.pexels.com/photos/3166810/pexels-photo-3166810.jpeg?auto=compress&cs=tinysrgb&w=800"
$u12 = "https://images.pexels.com/photos/11314353/pexels-photo-11314353.jpeg?auto=compress&cs=tinysrgb&w=800"

Invoke-WebRequest -Uri $u7 -OutFile "$dest\product-7.png" -UseBasicParsing
Invoke-WebRequest -Uri $u8 -OutFile "$dest\product-8.png" -UseBasicParsing
Invoke-WebRequest -Uri $u9 -OutFile "$dest\product-9.png" -UseBasicParsing
Invoke-WebRequest -Uri $u10 -OutFile "$dest\product-10.png" -UseBasicParsing
Invoke-WebRequest -Uri $u11 -OutFile "$dest\product-11.png" -UseBasicParsing
Invoke-WebRequest -Uri $u12 -OutFile "$dest\product-12.png" -UseBasicParsing
