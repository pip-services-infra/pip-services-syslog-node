#!/bin/bash

# Any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e
set -o pipefail

# Login to npm
if [ -z "${NPM_USER}" ]; then
npm login
else
npm install -g npm-cli-login
npm-cli-login
fi

npm version patch

# Update version in component.json
awk -F'["]' -v OFS='"'  '/"version":/{
    split($4,a,".");
    $4=a[1]"."a[2]"."a[3]+1
    }
;1' component.json > >(sleep 1 && cat > component.json)

npm publish --skip-git