#!/usr/bin/env bash

export NODE_ENV=development
if [ "$LOG_FILTER" == "" ]; then
  LOG_FILTER=$npm_package_config_jmespath_log_filter
fi

if [ -n "$LOG_FILTER" ] && [ "$LOG_FILTER" != "null" ]
then echo "logging with the JMESPath query filter: $LOG_FILTER"
else LOG_QUERY="*"
fi

nodemon --watch 'src/**/*.ts' --watch 'dist/**/*.*' --ignore 'src/**/*.spec.ts' \
  --exec 'ts-node' src/server.ts | pino-pretty -c -t -s "$LOG_FILTER"
