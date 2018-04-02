#!/bin/bash

# Set variable for git tag
COMPONENT=$(grep -m1 name component.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version component.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
TAG="v${VERSION}-${TRAVIS_BUILD_NUMBER}-rc"

# Configure git
git config --global user.email "pipdevs@gmail.com" 
git config --global user.name "pipdeveloper" 

git remote rm origin 
git remote add origin "https://pipdeveloper:${GITHUB_API_KEY}@github.com/pip-services-content/${COMPONENT}.git"

# Set git tag
git tag ${TAG} -a -m "Generated tag from TravisCI for build #$TRAVIS_BUILD_NUMBER"
git push --tags