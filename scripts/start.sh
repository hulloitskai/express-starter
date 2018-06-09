#!/usr/bin/env sh

if [ "$NODE_ENV" == production ]
then npm run prod
else npm run dev
fi
