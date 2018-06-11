#!/usr/bin/env sh

## Run tests
for test in $(find *.test.js); do
  echo "Running test: $test"
  node $test
done
