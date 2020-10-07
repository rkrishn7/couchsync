#!/bin/bash

build() {
  echo 'building plugin 👽'

  rm -rf dist/*

  # Disallow webpack from writing HTML w/ inline JS (extensions don't allow this)
  export INLINE_RUNTIME_CHUNK=false
  # No need to generate source maps in production build
  export GENERATE_SOURCEMAP=false

  react-scripts build

  mv build/index.html build/popup.html
}

build