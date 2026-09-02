# Local Docusaurus development

This directory contains the Docusaurus application for the [OVK technical specifications website](https://tech.ovk.de/).

For content ownership, synchronization, GitHub Actions, deployment, permissions, and troubleshooting, read the [repository guide](../README.md).

## Requirements

- Node.js 24 or newer
- npm

## Start the development server

```bash
npm ci
npm start
```

The command prints the local URL and reloads most source changes automatically.

## Validate and build

```bash
npm ci
node scripts/validate-identifier-config.mjs
npm run build
npm run serve
```

The production build is written to the ignored `build/` directory.

## Content locations

- `docs/` contains Docusaurus documentation sources.
- `src/` contains pages, components, and styles.
- `static/` contains assets copied directly into the build artifact.
- `scripts/` contains synchronized-content normalization and Identifier Landscape validation.

Some content under `docs/` and `static/tools/identifier-landscape/` is synchronized from other repositories. Make lasting content changes in the appropriate source repository described in the [root README](../README.md); the next sync may overwrite changes made directly to synchronized destinations.

## Deployment

Do not use `npm run deploy`, commit generated `build/` output, or push generated output to a `gh-pages` branch.

Production publishing is owned by the repository's GitHub Actions workflows. They install locked dependencies, validate the content, build a temporary artifact, verify the custom domain, and deploy through GitHub Pages.
