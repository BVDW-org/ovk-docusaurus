#!/usr/bin/env bash

set -euo pipefail

if [ "$#" -ne 3 ]; then
  echo "Usage: $0 <identity-source> <contextual-source> <werbeformen-docs-source>" >&2
  exit 2
fi

repository_root="$(git rev-parse --show-toplevel)"
identity_source="$1"
contextual_source="$2"
werbeformen_source="$3"

require_directory() {
  if [ ! -d "$1" ]; then
    echo "Required source directory is missing: $1" >&2
    exit 1
  fi
}

require_file() {
  if [ ! -f "$1" ]; then
    echo "Required source file is missing: $1" >&2
    exit 1
  fi
}

require_document_content() {
  local first_document
  first_document="$(find "$1" -type f \( -name '*.md' -o -name '*.mdx' \) -print -quit)"
  if [ -z "$first_document" ]; then
    echo "Source directory contains no Markdown documents: $1" >&2
    exit 1
  fi
}

require_no_symlinks() {
  local first_symlink
  first_symlink="$(find "$1" -type l -print -quit)"
  if [ -n "$first_symlink" ]; then
    echo "Source directory contains an unsupported symbolic link: $first_symlink" >&2
    exit 1
  fi
}

sync_tree() {
  local source="$1"
  local destination="$2"
  shift 2

  mkdir -p "$destination"
  rsync -a \
    --delete \
    --delete-excluded \
    --exclude='.git/' \
    --exclude='.github/' \
    --exclude='.idea/' \
    --exclude='.DS_Store' \
    "$@" \
    "$source/" \
    "$destination/"
}

sync_identifier_landscape() {
  local source="$1"
  local destination="$2"

  mkdir -p "$destination"

  # The production runtime is hardened and maintained in this repository.
  # Preserve it while synchronizing upstream reference files and configuration.
  rsync -a \
    --delete \
    --exclude='.git/' \
    --exclude='.github/' \
    --exclude='.idea/' \
    --exclude='.DS_Store' \
    --exclude='/app.js' \
    --exclude='/index.html' \
    --exclude='/style.css' \
    --exclude='/config/vermarkter/' \
    "$source/" \
    "$destination/"

  # Only JavaScript configuration modules are publishable vendor inputs.
  # Keeping this as a separate strict sync also deletes malformed filenames.
  sync_tree \
    "$source/config/vermarkter" \
    "$destination/config/vermarkter" \
    --include='*.js' \
    --exclude='*'
}

require_directory "$identity_source"
require_directory "$identity_source/tools/identifier-landscape"
require_file "$identity_source/README.md"
require_file "$identity_source/tools/identifier-landscape/index.html"
require_file "$identity_source/tools/identifier-landscape/config/core.js"
require_file "$contextual_source/README.md"
require_directory "$werbeformen_source"
require_document_content "$identity_source"
require_document_content "$werbeformen_source"
require_no_symlinks "$identity_source"
require_no_symlinks "$werbeformen_source"

identifier_destination="$repository_root/ovk/static/tools/identifier-landscape"
require_file "$identifier_destination/app.js"
require_file "$identifier_destination/index.html"
require_file "$identifier_destination/style.css"

sync_tree \
  "$identity_source" \
  "$repository_root/ovk/docs/identitysolutions" \
  --exclude='/tools/'

sync_identifier_landscape \
  "$identity_source/tools/identifier-landscape" \
  "$identifier_destination"

mkdir -p "$repository_root/ovk/docs/contextualstandards"
cp "$contextual_source/README.md" "$repository_root/ovk/docs/contextualstandards/index.md"

sync_tree \
  "$werbeformen_source" \
  "$repository_root/ovk/docs/werbeformen"

node "$repository_root/ovk/scripts/normalize-synced-content.mjs"
