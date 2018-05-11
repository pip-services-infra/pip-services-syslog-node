#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component data and set necessary variables
$component = Get-Content -Path "component.json" | ConvertFrom-Json
$stageImage="$($component.registry)/$($component.name):$($component.version)-$($component.build)-rc"

# Build docker image
docker build -f docker/Dockerfile -t $stageImage .

# Set environment variables
$env:IMAGE = $stageImage

try {
    # Workaround to remove dangling images
    docker-compose -f ./docker/docker-compose.yml down

    docker-compose -f ./docker/docker-compose.yml up -d

    # Test using curl
    Start-Sleep -Seconds 10
    Invoke-WebRequest -Uri http://localhost:8080/heartbeat
    #Invoke-WebRequest -Uri http://localhost:8080/dashboards/get_dashboards

    Write-Host "The container was successfully built."
} finally {
    # Workaround to remove dangling images
    docker-compose -f ./docker/docker-compose.yml down
}
