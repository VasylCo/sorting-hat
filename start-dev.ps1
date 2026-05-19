# Kill any process on port 8081
Write-Host "Killing processes on port 8081..."
Get-NetTCPConnection -LocalPort 8081 -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty OwningProcess |
  Sort-Object -Unique |
  ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }

# Kill any stray node/metro processes
Write-Host "Killing stray Metro/Node processes..."
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Wait a moment for ports to free
Start-Sleep -Seconds 1

# Ensure adb is running and set up port reverse
Write-Host "Starting adb and setting up port forwarding..."
adb start-server | Out-Null
adb reverse tcp:8081 tcp:8081

# Start Metro with clean cache
Write-Host "Starting Metro bundler..."
Set-Location $PSScriptRoot
npx react-native start --reset-cache
