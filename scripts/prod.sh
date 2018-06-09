#!/usr/bin/env bash

## Configurations
SERVER_DIR="build/server.js"

## Set Node environment
export NODE_ENV=producion

## Build app Javascript
npm run build

## Run the app
node "$SERVER_DIR"
