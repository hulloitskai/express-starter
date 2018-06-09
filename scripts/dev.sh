#!/usr/bin/env sh

## Configurations
SERVER_DIR="build/server.js"

## Set Node environment
export NODE_ENV=development

## Default log filter to NPM package config 
[ "$LOG_FILTER" == "" ] && LOG_FILTER=$npm_package_config_jmespath_log_filter

## Log all output if undefined or null log filter
if [ -n "$LOG_FILTER" ] && [ "$LOG_FILTER" != "null" ]
then echo "Logging with the JMESPath query filter: $LOG_FILTER"
else LOG_FILTER="*"
fi

## Prebuild initial app into Javascript
npm run build

## Start app using Nodemon with auto-watching enabled, pipe through pin-pretty
run_server="nodemon --watch static --watch src \
                    --ignore 'src/**/*.spec.ts' \
                    --ext ts,html,css \
                    $SERVER_DIR | pino-pretty -c -t -s '$LOG_FILTER'"

## Recompile app upon changes to src/
run_watching_compiler="npm run compile-watch"

## Simultaneously run server and compiler
concurrently --kill-others \
             --names 'server,compiler' \
             "$run_watching_compiler" "$run_server" 
