#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component data
$component = Get-Content -Path "component.json" | ConvertFrom-Json
$version = (Get-Content -Path package.json | ConvertFrom-Json).version

if ($component.version -ne $version) {
    throw "Versions in component.json and package.json do not match"
}

# Automatically login to server
if ($env:NPM_USER -ne $null -and $env:NPM_PASS -ne $null -and $env:NPM_EMAIL -ne $null) {
    npm-cli-login
} 

# Publish to npm repository
npm publish