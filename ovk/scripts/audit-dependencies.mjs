import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Wraps `npm audit` with a narrow, reviewed exception list. Any advisory of
// any severity fails the check unless audit-exceptions.json lists its GHSA ID
// with a reason and an expiry date. Expired exceptions fail as well, so every
// exception gets re-reviewed. See SECURITY.md.

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const exceptionsFile = path.resolve(scriptDirectory, '../audit-exceptions.json');

function advisoryId(url) {
  return /GHSA-[\w-]+/.exec(url ?? '')?.[0] ?? url;
}

export function collectAdvisories(report) {
  const advisories = new Map();
  for (const vulnerability of Object.values(report.vulnerabilities ?? {})) {
    for (const via of vulnerability.via ?? []) {
      if (typeof via !== 'object') continue;
      const id = advisoryId(via.url);
      if (!advisories.has(id)) {
        advisories.set(id, {
          id,
          package: via.name,
          severity: via.severity,
          title: via.title,
          url: via.url,
        });
      }
    }
  }
  return [...advisories.values()];
}

export function evaluateAudit(report, exceptions, today) {
  const advisories = collectAdvisories(report);
  const byId = new Map(exceptions.map((exception) => [exception.id, exception]));
  const failures = [];
  const accepted = [];

  for (const advisory of advisories) {
    const exception = byId.get(advisory.id);
    if (!exception) {
      failures.push(`${advisory.severity} ${advisory.package}: ${advisory.title} (${advisory.url})`);
    } else if (!exception.expires || exception.expires < today) {
      failures.push(`Exception for ${advisory.id} (${advisory.package}) expired on ${exception.expires}; re-review it.`);
    } else {
      accepted.push(advisory);
    }
  }

  const present = new Set(advisories.map((advisory) => advisory.id));
  const stale = exceptions.filter((exception) => !present.has(exception.id));
  return { failures, accepted, stale };
}

function runNpmAudit() {
  const result = spawnSync('npm', ['audit', '--json'], {
    cwd: path.resolve(scriptDirectory, '..'),
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });
  if (result.error) throw result.error;
  try {
    return JSON.parse(result.stdout);
  } catch {
    throw new Error(`npm audit returned no JSON report:\n${result.stderr || result.stdout}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const report = runNpmAudit();
  if (report.error) {
    console.error(`npm audit failed: ${report.error.summary ?? JSON.stringify(report.error)}`);
    process.exit(1);
  }
  const exceptions = JSON.parse(readFileSync(exceptionsFile, 'utf8')).exceptions;
  const today = new Date().toISOString().slice(0, 10);
  const { failures, accepted, stale } = evaluateAudit(report, exceptions, today);

  for (const advisory of accepted) {
    console.log(`Accepted until ${exceptions.find((e) => e.id === advisory.id).expires}: ${advisory.package} ${advisory.id}`);
  }
  for (const exception of stale) {
    console.warn(`Exception ${exception.id} (${exception.package}) no longer matches an advisory; remove it.`);
  }
  if (failures.length) {
    console.error(`Dependency audit failed:\n- ${failures.join('\n- ')}`);
    process.exit(1);
  }
  console.log('Dependency audit passed.');
}
