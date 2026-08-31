import { readdir, readFile } from 'node:fs/promises';
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

    const id = item.id.toLowerCase();
    if (registry.has(id)) {
      errors.push(`${label} contains duplicate id '${item.id}'`);
    }
    registry.add(id);
  }

  return registry;
}

function validateReferences(values, registry, label) {
  for (const value of values) {
    const id = typeof value === 'string' ? value : value?.id;
    if (typeof id !== 'string' || !registry.has(id.toLowerCase())) {
      errors.push(`${label} references unknown id '${id ?? '<missing>'}'`);
    }
  }
}

await evaluate('config/core.js');

const vermarkterDirectory = path.join(toolDirectory, 'config/vermarkter');
const vermarkterFiles = (await readdir(vermarkterDirectory))
  .filter((file) => file.endsWith('.js'))
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
}

for (const publisher of vermarkter) {
  const inventoryTypes = requireArray(
    publisher.supportedInventoryTypes,
    `Vermarkter '${publisher.id}'.supportedInventoryTypes`,
  );

  for (const [index, inventoryType] of inventoryTypes.entries()) {
    if (!inventoryType || typeof inventoryType.type !== 'string') {
      errors.push(`Vermarkter '${publisher.id}' inventory type ${index} is missing type`);
    }
    validateReferences(
      requireArray(inventoryType?.supportedIds, `Vermarkter '${publisher.id}' inventory type ${index}.supportedIds`),
      idRegistry,
      `Vermarkter '${publisher.id}' inventory type ${index}`,
    );
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

console.log(
  `Identifier configuration is valid: ${ids.length} IDs, ${dsps.length} DSPs, ${ssps.length} SSPs, ` +
    `${vermarkter.length} Vermarkter, ${dataPartners.length} data partners.`,
);
