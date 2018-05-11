#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component data and set necessary variables
$component = Get-Content -Path "component.json" | ConvertFrom-Json
$buildImage="$($component.registry)/$($component.name):$($component.version)-$($component.build)-build"
$container=$component.name

# Remove build files
if (Test-Path "obj") {
    Remove-Item -Recurse -Force -Path "obj"
}

# Copy private keys to access git repo
if (-not (Test-Path -Path "docker/id_rsa")) {
    if ($env:GIT_PRIVATE_KEY -ne $null) {
        Set-Content -Path "docker/id_rsa" -Value $env:GIT_PRIVATE_KEY
    } else {
        Copy-Item -Path "~/.ssh/id_rsa" -Destination "docker"
    }
}

# Build docker image
docker build -f docker/Dockerfile.build -t $buildImage .

# Create and copy compiled files, then destroy
docker create --name $container $buildImage
docker cp "$($container):/app/obj" ./obj
docker rm $container

if (!(Test-Path ./obj)) {
    Write-Host "obj folder doesn't exist in root dir. Build failed. Watch logs above."
    exit 1
}