#!/usr/bin/env sh

# Run pipeline Python scripts with the project virtualenv when available.
if [ -x ".venv/bin/python3" ]; then
  exec .venv/bin/python3 "$@"
fi

exec python3 "$@"
