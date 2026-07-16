#!/usr/bin/env sh

# Run pipeline Python scripts with the project virtualenv when available.
#
# Strip a bare '--' that pnpm inserts when the caller passes extra flags after
# 'pnpm <script> -- <args>'. Without stripping, argparse receives '--' as the
# first argument and treats all subsequent flags as positional arguments.
script="$1"; shift
if [ "$1" = "--" ]; then shift; fi

if [ -x ".venv/bin/python3" ]; then
  exec .venv/bin/python3 "$script" "$@"
fi

exec python3 "$script" "$@"
