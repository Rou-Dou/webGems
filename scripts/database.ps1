Remove-Item -Path "C:\ProgramData\MySQL\MySQL Server 8.4\Uploads\*" -Recurse -Force
cd ..\sql
Copy-Item -Path ".\Uploads\*" -Destination "C:\ProgramData\MySQL\MySQL Server 8.4\Uploads\"

$user = "root"

cd ..\; cd scripts;

Get-Content test.sql | & mysql -u $user -p"Wgtfyghtf90)"

