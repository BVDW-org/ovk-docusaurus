import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const buildDirectory = path.resolve(scriptDirectory, '../build');

function readArgument(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

const host = readArgument('--host', '127.0.0.1');
const port = Number.parseInt(readArgument('--port', '3000'), 10);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(`Invalid port: ${readArgument('--port', '3000')}`);
}

const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.gif', 'image/gif'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webmanifest', 'application/manifest+json'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

async function findFile(absolutePath, hasExtension) {
  const candidates = hasExtension
    ? [absolutePath]
    : [absolutePath, `${absolutePath}.html`, path.join(absolutePath, 'index.html')];

  for (const candidate of candidates) {
    try {
      const fileStat = await stat(candidate);
      if (fileStat.isFile()) return candidate;
      if (fileStat.isDirectory()) {
        const indexFile = path.join(candidate, 'index.html');
        if ((await stat(indexFile)).isFile()) return indexFile;
      }
    } catch {
      // Try the next clean-URL candidate.
    }
  }

  return null;
}

function sendFile(response, requestMethod, file, statusCode = 200) {
  response.writeHead(statusCode, {
    'Cache-Control': 'no-cache',
    'Content-Type': mimeTypes.get(path.extname(file).toLowerCase()) ?? 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff',
  });

  if (requestMethod === 'HEAD') {
    response.end();
    return;
  }

  createReadStream(file)
    .on('error', () => response.destroy())
    .pipe(response);
}

const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method ?? '')) {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end('Method Not Allowed');
    return;
  }

  try {
    const requestUrl = new URL(request.url ?? '/', `http://${host}:${port}`);
    const decodedPath = decodeURIComponent(requestUrl.pathname);
    const relativePath = decodedPath.replace(/^\/+/, '');
    const absolutePath = path.resolve(buildDirectory, relativePath);
    const insideBuild =
      absolutePath === buildDirectory || absolutePath.startsWith(`${buildDirectory}${path.sep}`);

    if (!insideBuild) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    const file = await findFile(absolutePath, path.extname(relativePath) !== '');
    if (file) {
      sendFile(response, request.method, file);
      return;
    }

    sendFile(response, request.method, path.join(buildDirectory, '404.html'), 404);
  } catch {
    response.writeHead(400);
    response.end('Bad Request');
  }
});

server.on('error', (error) => {
  console.error(`Unable to start local server: ${error.message}`);
  process.exitCode = 1;
});

server.listen(port, host, () => {
  console.log(`OVK production build: http://${host}:${port}/`);
});
