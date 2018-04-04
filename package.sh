#!/bin/bash

COMPONENT=$(grep -m1 name component.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version component.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
STAGE_IMAGE="${REGISTRY}/${COMPONENT}:${VERSION}-${TRAVIS_BUILD_NUMBER}-rc"

# Any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e
set -o pipefail

# Build docker image
docker build -f docker/Dockerfile -t ${STAGE_IMAGE} .