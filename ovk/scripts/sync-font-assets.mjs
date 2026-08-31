import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const weights = [300, 400, 500, 600, 700, 800];
const packageDirectory = new URL('../node_modules/@fontsource/inter/', import.meta.url);
const fontSourceDirectory = new URL('files/', packageDirectory);
const targetDirectory = new URL('../static/fonts/inter/', import.meta.url);

await mkdir(targetDirectory, { recursive: true });

await Promise.all([
  ...weights.map((weight) => {
    const filename = `inter-latin-${weight}-normal.woff2`;
    return copyFile(new URL(filename, fontSourceDirectory), new URL(filename, targetDirectory));
  }),
  copyFile(new URL('LICENSE', packageDirectory), new URL('LICENSE', targetDirectory)),
]);

console.log(`Synced ${weights.length} locally hosted Inter font files to ${fileURLToPath(targetDirectory)}`);
