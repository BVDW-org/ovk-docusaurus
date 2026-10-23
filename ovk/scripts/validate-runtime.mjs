import { fileURLToPath } from 'node:url';

const minimumNodeVersions = new Map([[24, [22, 1]], [26, [12, 1]]]);

function parseVersion(version) {
  return /^(\d+)\.(\d+)\.(\d+)$/.test(version ?? '')
    ? version.split('.').map(Number)
    : [];
}

export function validateRuntime(versions, sharedBrotli = false) {
  const [major, minor, patch] = parseVersion(versions.node);
  const minimum = minimumNodeVersions.get(major);
  if (!minimum || minor < minimum[0] || (minor === minimum[0] && patch < minimum[1])) {
    throw new Error(
      `Unsafe or unsupported Node.js ${versions.node}: use Node 24.22.1+ (24.x) or 26.12.1+ (26.x). See SECURITY.md (CVE-2026-111497).`,
    );
  }

  // Official Node releases carry the decoder fix even when their embedded
  // Brotli version string is unchanged. Shared-library builds need their own fix.
  if (sharedBrotli) {
    const [brotliMajor, brotliMinor, brotliPatch] = parseVersion(versions.brotli);
    const patched = brotliMajor === 1 && (
      (brotliMinor === 0 && brotliPatch >= 10) ||
      (brotliMinor === 1 && brotliPatch >= 1) ||
      (brotliMinor === 2 && brotliPatch >= 1) ||
      brotliMinor > 2
    );
    if (!patched) {
      throw new Error(
        `Unsafe or unknown shared Brotli ${versions.brotli}: update the system library to 1.0.10, 1.1.1, 1.2.1 or a newer patched release (CVE-2026-111497).`,
      );
    }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  validateRuntime(process.versions, process.config.variables.node_shared_brotli);
  console.log(`Runtime security check passed: Node ${process.versions.node}, Brotli ${process.versions.brotli}.`);
}
