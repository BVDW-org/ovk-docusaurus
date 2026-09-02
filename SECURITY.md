# Security

## Reporting a vulnerability

Please report suspected vulnerabilities privately through GitHub's security-advisory feature. Do not include secrets, access tokens, or personal data in a public issue.

## Dependency-audit exception

As of 2 September 2026, `npm audit` reports two high-severity denial-of-service advisories for the transitive `image-size@2.0.2` dependency:

- [GHSA-w3rx-r6r6-pgpr](https://github.com/advisories/GHSA-w3rx-r6r6-pgpr) for ICNS files; and
- [GHSA-5p2g-fcmc-qvqq](https://github.com/advisories/GHSA-5p2g-fcmc-qvqq) for JPEG XL and HEIF-family files.

The package is used by `@docusaurus/mdx-loader` at build time. No patched `image-size` release is currently available, and the issue remains open in [Docusaurus](https://github.com/facebook/docusaurus/issues/12231).

This repository mitigates the reachable behavior in `scripts/validate-image-assets.mjs`. Every local build and CI build rejects ICNS, JPEG XL, and HEIF-family magic bytes before Docusaurus processes repository images. Dependabot continues to check weekly for an upstream replacement or patched release. Remove this exception when a supported fix becomes available.
