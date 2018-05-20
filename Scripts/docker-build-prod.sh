#!/usr/bin/env bash

docker build -t stevenxie/express-starter \
             --build-arg ENV="production" .
