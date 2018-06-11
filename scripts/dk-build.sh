#!/usr/bin/env bash

## Environment argument must exist
if [ $# -eq 0 ]; then
  echo "Build environment argument required."
  exit 1
fi

## If the Docker image version variable is not set,
##   attempt to set it from the NPM config. If it 
#    still doesn't work, abort.
if [ -z "$IMAGE_VERSION" ]; then
  IMAGE_VERSION="$npm_package_config_docker_image_version"
  if [ -z "$IMAGE_VERSION" ]; then
    echo "Could not identify Docker image version number \
for tagging and labelling purposes."
    exit 2
  fi
fi

## Set the BUILD_TAG
if [ "$1" == production ]; then
  export BUILD_TAG="$IMAGE_VERSION-prod"
elif [ "$1" == development ]; then
  export BUILD_TAG="$IMAGE_VERSION-dev"
else
  echo "Could not identify build environment: $1"
  exit 3
fi

## Set the BUILD_ENV
export BUILD_ENV="$1"

## Initiate build
echo "Building Docker image with BUILD_ENV=$BUILD_ENV \
and BUILD_TAG=$BUILD_TAG..."
docker-compose build

## Save build config in .env for future use
##   with docker-compose
echo "Saving build configurations into '.env'..."
echo "BUILD_ENV=$BUILD_ENV" > .env
echo "BUILD_TAG=$BUILD_TAG" >> .env
echo "Done."
