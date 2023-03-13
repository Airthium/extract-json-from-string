#!/bin/bash

set -e

# Install
yarn install

# Depcheck
yarn depcheck

# Lint
yarn prettier

# Test
yarn test

# Build
yarn build
