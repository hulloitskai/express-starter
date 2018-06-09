#!/usr/bin/env sh

## Configurations
SERVER_DIR="build/server.js"

## Set Node environment
export NODE_ENV=producion

## Compile app to Javascript if not Docker
[ -z "$IS_DOCKER" ] && npm run build

## Run the app
node "$SERVER_DIR"
