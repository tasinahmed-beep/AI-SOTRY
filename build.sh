#!/bin/bash
set -e

# Ensure node_modules/.bin is in PATH
export PATH="$PWD/node_modules/.bin:$PATH"

# Run the build
npm run build:ssg
