# Security

## Reporting a vulnerability

Please report suspected vulnerabilities privately through GitHub's security-advisory feature. Do not include secrets, access tokens, or personal data in a public issue.

## Node.js runtime and Node2Shell

The [21 October 2026 Node.js security release](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) fixes CVE-2026-111497 (Node2Shell), a memory-corruption vulnerability in Brotli decompression. Updating npm packages alone does not patch Node.js.

This project requires Node **24.22.1 or newer within 24.x**, or **26.12.1 or newer within 26.x**. Other release lines are not supported here. Both workflows use `.nvmrc` to fetch the latest Node 24 release (`check-latest: true`) and run `ovk/scripts/validate-runtime.mjs` before installation or upstream-content processing. `ovk/.npmrc` enforces the Node engine constraint during dependency installation. Local installation, validation, builds, startup, and preview serving also run the check through npm lifecycle scripts.

Official patched Node distributions include the decoder fix even if the embedded Brotli version string is unchanged. For builds linked to a system Brotli library (including Homebrew), the runtime check also requires a patched library: 1.0.10+, 1.1.1+, or 1.2.1+ within the respective release line. Vendor backports with older version strings need separate verification; use an upstream patched version to satisfy this check.

Production is a static GitHub Pages artifact, with no application Node.js server processing visitor requests. Node is used in CI and local development. Keep development and preview servers on loopback and restart existing processes after runtime upgrades.

## Dependencies and validation

`npm run audit:dependencies` fails on any advisory severity. Both publishing workflows run it before building, and `npm run check` includes it locally. Dependabot checks npm and GitHub Actions weekly. The audit is a point-in-time registry check, not proof that all possible vulnerabilities are absent.

On 23 October 2026 the lockfile was refreshed to patched dependencies, including `image-size` 2.0.4. The previous image-size audit exception is retired. The image-format restriction in `scripts/validate-image-assets.mjs` remains as a content policy and additional protection.

Two overrides bridge dependency ranges in Docusaurus 3.10.2:

- `tinypool` 2.1.2+ fixes prototype-pollution gadgets that can lead to code execution ([advisory](https://github.com/tinylibs/tinypool/security/advisories/GHSA-85c8-ppgw-ccpr)). Verify the threaded static-generation path when changing this override.
- `postcss-selector-parser` 7.1.7+ avoids the affected ranges reported by the npm registry ([advisory](https://github.com/postcss/postcss-selector-parser/security/advisories/GHSA-rj75-hqrm-r3gf)).

Remove these overrides once supported upstream dependency ranges include the fixes. The SEO validator uses the HTML parser `parse5` to handle browser-accepted script end tags; its regression tests cover the case reported by CodeQL.

## Secret-scan review, 23 October 2026

A local Gitleaks scan found no secrets in the current tracked tree. A scan of all local Git refs found generated Next.js preview and server-action encryption keys in historical `.next/` artifacts from commit `b11ccb41b2b1b90f6000c80771601d8e1e0bf595`. Those artifacts are absent from the current tree, and `.next/` is now ignored. Two additional historical Sourcegraph-token detections were false positives on a Next.js commit hash in bundled source comments. Git history was not rewritten, and the scan does not establish the validity of any historical keys in deployments outside this repository's current GitHub Pages workflow.
