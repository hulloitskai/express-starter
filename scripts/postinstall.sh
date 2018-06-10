#!/usr/bin/env sh

## Only set up hooks if not running on Docker Cloud,
##   and if Git is available.
if [ "$IS_DOCKER" != "true" ] && [ -n "$(command -v git)" ]; then
  git config core.hooksPath .githooks
  echo "Successfully configured Git hooks."
else
  echo "Git installation not detected, or currently running in Docker Cloud; \
skipping Git hooks setup."
fi
