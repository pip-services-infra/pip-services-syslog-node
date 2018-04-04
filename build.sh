#!/bin/bash

COMPONENT=$(grep -m1 name component.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version component.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
BUILD_IMAGE="${REGISTRY}/${COMPONENT}:${VERSION}-build"
CONTAINER="${COMPONENT}"

# Any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e
set -o pipefail

# Remove build files
rm -rf ./obj

# Build docker image
docker build -f docker/Dockerfile.build -t ${BUILD_IMAGE} .

# Create and copy compiled files, then destroy
docker create --name ${CONTAINER} ${BUILD_IMAGE}
docker cp ${CONTAINER}:/app/obj ./obj
docker rm ${CONTAINER}