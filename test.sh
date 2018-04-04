#!/bin/bash

COMPONENT=$(grep -m1 name component.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version component.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
TEST_IMAGE="${REGISTRY}/${COMPONENT}:${VERSION}-${TRAVIS_BUILD_NUMBER}-test"
CONTAINER="${COMPONENT}"

# Any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e
set -o pipefail

export TEST_IMAGE

# Workaround to remove dangling images
docker-compose -f ./docker/docker-compose.test.yml down

docker-compose -f ./docker/docker-compose.test.yml up --build --abort-on-container-exit --exit-code-from test

# Workaround to remove dangling images
docker-compose -f ./docker/docker-compose.test.yml down