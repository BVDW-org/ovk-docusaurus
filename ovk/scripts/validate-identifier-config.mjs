import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const toolDirectory = path.resolve(scriptDirectory, '../static/tools/identifier-landscape');
const sandbox = { window: {} };
const errors = [];

async function evaluate(relativePath) {
  const file = path.join(toolDirectory, relativePath);
  const source = await readFile(file, 'utf8');
  vm.runInNewContext(source, sandbox, {
    filename: relativePath,
    timeout: 1_000,
  });
}

function requireArray(value, label, { optional = false } = {}) {
  if (value === undefined && optional) {
    return [];
  }

  if (!Array.isArray(value)) {
    errors.push(`${label} must be an array`);
    return [];
  }

  return value;
}

function createRegistry(items, label) {
  const registry = new Set();

  for (const [index, item] of items.entries()) {
    if (!item || typeof item !== 'object') {
      errors.push(`${label}[${index}] must be an object`);
      continue;
    }

    if (typeof item.id !== 'string' || item.id.trim() === '') {
      errors.push(`${label}[${index}] is missing a non-empty id`);
      continue;
    }

    if (!/^[a-z0-9][a-z0-9_-]*$/i.test(item.id)) {
      errors.push(`${label}[${index}] id '${item.id}' may only contain letters, numbers, underscores, and hyphens`);
    }

    const id = item.id.toLowerCase();
    if (registry.has(id)) {
      errors.push(`${label} contains duplicate id '${item.id}'`);
    }
    registry.add(id);

    if (typeof item.name !== 'string' || item.name.trim() === '') {
      errors.push(`${label}[${index}] ('${item.id}') is missing a non-empty name`);
    }
  }

  return registry;
}

function validateReferences(values, registry, label) {
  const seen = new Set();

  for (const value of values) {
    const id = typeof value === 'string' ? value : value?.id;
    const normalizedId = typeof id === 'string' ? id.toLowerCase() : undefined;
    if (!normalizedId || !registry.has(normalizedId)) {
      errors.push(`${label} references unknown id '${id ?? '<missing>'}'`);
      continue;
    }
    if (seen.has(normalizedId)) {
      errors.push(`${label} contains duplicate reference '${id}'`);
    }
    seen.add(normalizedId);
  }
}

function validateCoverage(value, label) {
  if (value === undefined) return;
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 100) {
    errors.push(`${label} must be a finite number between 0 and 100`);
  }
}

await evaluate('config/core.js');

const vermarkterDirectory = path.join(toolDirectory, 'config/vermarkter');
const vermarkterDirectoryEntries = await readdir(vermarkterDirectory, { withFileTypes: true });
const unexpectedVermarkterFiles = vermarkterDirectoryEntries
  .filter((entry) => entry.isFile() && !entry.name.startsWith('.') && !entry.name.endsWith('.js'))
  .map((entry) => entry.name)
  .sort();

for (const file of unexpectedVermarkterFiles) {
  errors.push(`config/vermarkter contains unexpected non-JavaScript file '${file}'`);
}

const vermarkterFiles = vermarkterDirectoryEntries
  .filter((entry) => entry.isFile() && entry.name.endsWith('.js'))
  .map((entry) => entry.name)
  .sort();

if (vermarkterFiles.length === 0) {
  errors.push('config/vermarkter must contain at least one JavaScript file');
}

for (const file of vermarkterFiles) {
  await evaluate(`config/vermarkter/${file}`);
}

await evaluate('config/data_partners.js');

const config = sandbox.window.OVK_LANDSCAPE_CONFIG;
if (!config || typeof config !== 'object') {
  throw new Error('window.OVK_LANDSCAPE_CONFIG was not initialized');
}

const ids = requireArray(config.ids, 'ids');
const usecases = requireArray(config.usecases, 'usecases');
const dsps = requireArray(config.dsps, 'dsps');
const ssps = requireArray(config.ssps, 'ssps');
const vermarkter = requireArray(config.vermarkter, 'vermarkter');
const dataPartners = requireArray(config.dataPartners, 'dataPartners');

const idRegistry = createRegistry(ids, 'ids');
const usecaseRegistry = createRegistry(usecases, 'usecases');
const dspRegistry = createRegistry(dsps, 'dsps');
const sspRegistry = createRegistry(ssps, 'ssps');
const vermarkterRegistry = createRegistry(vermarkter, 'vermarkter');
createRegistry(dataPartners, 'dataPartners');

for (const identifier of ids) {
  if (typeof identifier.color !== 'string' || !/^#[0-9a-f]{6}$/i.test(identifier.color)) {
    errors.push(`ID '${identifier.id}'.color must be a six-digit hexadecimal color`);
  }
  if (
    identifier.textColor !== undefined &&
    (typeof identifier.textColor !== 'string' || !/^#[0-9a-f]{6}$/i.test(identifier.textColor))
  ) {
    errors.push(`ID '${identifier.id}'.textColor must be a six-digit hexadecimal color`);
  }
}

for (const dsp of dsps) {
  validateReferences(requireArray(dsp.supportedIds, `DSP '${dsp.id}'.supportedIds`), idRegistry, `DSP '${dsp.id}'`);
  validateReferences(requireArray(dsp.supportedUsecases, `DSP '${dsp.id}'.supportedUsecases`), usecaseRegistry, `DSP '${dsp.id}'`);
  validateReferences(requireArray(dsp.supportedSSPs, `DSP '${dsp.id}'.supportedSSPs`), sspRegistry, `DSP '${dsp.id}'`);
  validateReferences(
    requireArray(dsp.supportedVermarkter, `DSP '${dsp.id}'.supportedVermarkter`, { optional: true }),
    vermarkterRegistry,
    `DSP '${dsp.id}'`,
  );
}

for (const ssp of ssps) {
  validateReferences(requireArray(ssp.supportedIds, `SSP '${ssp.id}'.supportedIds`), idRegistry, `SSP '${ssp.id}'`);
  validateReferences(requireArray(ssp.supportedUsecases, `SSP '${ssp.id}'.supportedUsecases`), usecaseRegistry, `SSP '${ssp.id}'`);
  validateReferences(
    requireArray(ssp.supportedVermarkter, `SSP '${ssp.id}'.supportedVermarkter`, { optional: true }),
    vermarkterRegistry,
    `SSP '${ssp.id}'`,
  );
  if (!['standard', 'curation'].includes(ssp.category)) {
    errors.push(`SSP '${ssp.id}'.category must be either 'standard' or 'curation'`);
  }
}

for (const publisher of vermarkter) {
  const inventoryTypes = requireArray(
    publisher.supportedInventoryTypes,
    `Vermarkter '${publisher.id}'.supportedInventoryTypes`,
  );

  validateReferences(
    requireArray(publisher.supportedSSPs, `Vermarkter '${publisher.id}'.supportedSSPs`, { optional: true }),
    sspRegistry,
    `Vermarkter '${publisher.id}'`,
  );

  for (const [index, inventoryType] of inventoryTypes.entries()) {
    if (!inventoryType || typeof inventoryType.type !== 'string') {
      errors.push(`Vermarkter '${publisher.id}' inventory type ${index} is missing type`);
    }
    validateCoverage(inventoryType?.coverage, `Vermarkter '${publisher.id}' inventory type ${index}.coverage`);
    const supportedIds = requireArray(
      inventoryType?.supportedIds,
      `Vermarkter '${publisher.id}' inventory type ${index}.supportedIds`,
    );
    validateReferences(
      supportedIds,
      idRegistry,
      `Vermarkter '${publisher.id}' inventory type ${index}`,
    );

    for (const supportedId of supportedIds) {
      if (supportedId && typeof supportedId === 'object') {
        validateCoverage(
          supportedId.coverage,
          `Vermarkter '${publisher.id}' inventory type ${index} ID '${supportedId.id}'.coverage`,
        );
        validateReferences(
          requireArray(
            supportedId.excludedDSPs,
            `Vermarkter '${publisher.id}' inventory type ${index} ID '${supportedId.id}'.excludedDSPs`,
            { optional: true },
          ),
          dspRegistry,
          `Vermarkter '${publisher.id}' inventory type ${index} ID '${supportedId.id}' excluded DSPs`,
        );
      }
    }
  }
}

for (const partner of dataPartners) {
  validateReferences(requireArray(partner.supportedIds, `Data partner '${partner.id}'.supportedIds`), idRegistry, `Data partner '${partner.id}'`);
  validateReferences(requireArray(partner.supportedDSPs, `Data partner '${partner.id}'.supportedDSPs`), dspRegistry, `Data partner '${partner.id}'`);
  validateReferences(requireArray(partner.supportedSSPs, `Data partner '${partner.id}'.supportedSSPs`), sspRegistry, `Data partner '${partner.id}'`);
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  throw new Error(`Identifier configuration validation failed with ${errors.length} error(s)`);
}

await writeFile(
  path.join(toolDirectory, 'config/vermarkter-manifest.json'),
  `${JSON.stringify({ files: vermarkterFiles }, null, 2)}\n`,
);

console.log(
  `Identifier configuration is valid: ${ids.length} IDs, ${dsps.length} DSPs, ${ssps.length} SSPs, ` +
    `${vermarkter.length} Vermarkter, ${dataPartners.length} data partners.`,
);
