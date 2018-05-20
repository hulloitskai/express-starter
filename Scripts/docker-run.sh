#!/usr/bin/env bash

# Runs a docker container with 'express-vol' as its Volume
docker volume create express-vol
docker run -p 3000:3000 \
           --mount source=express-vol,target=/app/dist \
           --name express-starter steven-xie/express-starter
