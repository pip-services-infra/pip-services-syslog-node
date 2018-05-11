#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component data and set necessary variables
$component = Get-Content -Path "component.json" | ConvertFrom-Json
$rcImage="$($component.registry)/$($component.name):$($component.version)-$($component.build)-rc"

# Define server name
$pos = $component.registry.IndexOf("/")
$server = ""
if ($pos -gt 0) {
    $server = $component.registry.Substring(0, $pos)
}

# Automatically login to server
if ($env:DOCKER_USER -ne $null -and $env:DOCKER_PASS -ne $null) {
    docker login $server -u $env:DOCKER_USER -p $env:DOCKER_PASS
}

# Push image to docker registry
docker push $rcImage
