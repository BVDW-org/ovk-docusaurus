import assert from 'node:assert/strict';
import test from 'node:test';
import { validateRuntime } from './validate-runtime.mjs';

test('accepts patched supported Node release lines', () => {
  for (const node of ['24.22.1', '24.22.2', '24.23.0', '26.12.1', '26.13.0']) {
    assert.doesNotThrow(() => validateRuntime({ node, brotli: '1.2.0' }));
  }
});

test('rejects vulnerable, unsupported, and prerelease Node versions', () => {
  for (const node of ['24.0.0', '24.22.0', '26.12.0', '22.23.4', '25.9.0', '27.0.0', '24.22.1-rc.1', undefined]) {
    assert.throws(() => validateRuntime({ node }), /Unsafe or unsupported Node/);
  }
});

test('checks external Brotli independently of the patched Node version', () => {
  for (const brotli of ['1.0.9', '1.1.0', '1.2.0', undefined]) {
    assert.throws(() => validateRuntime({ node: '26.12.1', brotli }, true), /shared Brotli/);
  }
  for (const brotli of ['1.0.10', '1.1.1', '1.2.1', '1.2.2']) {
    assert.doesNotThrow(() => validateRuntime({ node: '26.12.1', brotli }, true));
  }
});
