Remove-Item -Path "C:\ProgramData\MySQL\MySQL Server 8.4\Uploads\*" -Recurse -Force

if (!(Test-Path -Path "C:\ProgramData\webGems")) {
	New-Item -ItemType Directory -Path "C:\ProgramData\webGems"
	Write-Host "Directory created"
}

Copy-Item -Path "..\sql\Uploads\*" -Destination "C:\ProgramData\MySQL\MySQL Server 8.4\Uploads\"
Copy-Item -Path "..\sql\Queries\*" -Destination "C:\ProgramData\webGems\"

$user = "root"

Get-Content test.sql | & mysql -u $user -p"Wgtfyghtf90)"

