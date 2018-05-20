#!/usr/bin/env bash

docker build -t steven-xie/express-starter \
             --build-arg ENV="production" .
