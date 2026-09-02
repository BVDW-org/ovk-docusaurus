import { open, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const ovkDirectory = path.resolve(scriptDirectory, '..');
const roots = ['blog', 'docs', 'src', 'static'];
const unsafeImages = [];

async function collectFiles(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }

  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(entryPath)));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }
  return files;
}

function matchesBytes(buffer, bytes, offset = 0) {
  return bytes.every((byte, index) => buffer[offset + index] === byte);
}

function detectUnsafeType(buffer) {
  if (buffer.length >= 4 && buffer.subarray(0, 4).toString('ascii') === 'icns') {
    return 'ICNS';
  }

  if (matchesBytes(buffer, [0xff, 0x0a])) {
    return 'JPEG XL codestream';
  }

  if (
    matchesBytes(
      buffer,
      [0x00, 0x00, 0x00, 0x0c, 0x4a, 0x58, 0x4c, 0x20, 0x0d, 0x0a, 0x87, 0x0a],
    )
  ) {
    return 'JPEG XL container';
  }

  if (buffer.length >= 12 && buffer.subarray(4, 8).toString('ascii') === 'ftyp') {
    const brand = buffer.subarray(8, 12).toString('ascii');
    if (['avif', 'mif1', 'msf1', 'heic', 'heix', 'hevc', 'hevx'].includes(brand)) {
      return `HEIF-family (${brand})`;
    }
  }

  return null;
}

for (const root of roots) {
  const files = await collectFiles(path.join(ovkDirectory, root));
  for (const file of files) {
    const handle = await open(file, 'r');
    try {
      const buffer = Buffer.alloc(32);
      const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
      const unsafeType = detectUnsafeType(buffer.subarray(0, bytesRead));
      if (unsafeType) {
        unsafeImages.push(`${path.relative(ovkDirectory, file)}: ${unsafeType}`);
      }
    } finally {
      await handle.close();
    }
  }
}

if (unsafeImages.length > 0) {
  for (const image of unsafeImages) {
    console.error(`- ${image}`);
  }
  throw new Error(
    'Unsafe image formats are blocked because the Docusaurus image-size dependency has unpatched denial-of-service advisories.',
  );
}

console.log('Image assets are safe: no ICNS, JPEG XL, or HEIF-family files detected.');
