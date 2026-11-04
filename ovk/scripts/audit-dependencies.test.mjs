import assert from 'node:assert/strict';
import test from 'node:test';
import { evaluateAudit } from './audit-dependencies.mjs';

const report = {
  vulnerabilities: {
    deepmerge: {
      via: [{ name: 'deepmerge', severity: 'low', title: 'prototype poisoning', url: 'https://github.com/advisories/GHSA-gcqx-w48m-w2h4' }],
    },
    'workbox-build': { via: ['deepmerge'] },
    joi: {
      via: [{ name: 'joi', severity: 'high', title: 'ReDoS', url: 'https://github.com/advisories/GHSA-4528-x5fx-h6hg' }],
    },
  },
};

test('fails on advisories without an exception', () => {
  const { failures, accepted } = evaluateAudit(report, [], '2026-11-04');
  assert.equal(failures.length, 2);
  assert.equal(accepted.length, 0);
});

test('accepts only listed advisories with a future expiry', () => {
  const exceptions = [{ id: 'GHSA-gcqx-w48m-w2h4', package: 'deepmerge', expires: '2027-01-31' }];
  const { failures, accepted } = evaluateAudit(report, exceptions, '2026-11-04');
  assert.deepEqual(accepted.map((a) => a.id), ['GHSA-gcqx-w48m-w2h4']);
  assert.equal(failures.length, 1);
  assert.match(failures[0], /joi/);
});

test('fails on expired exceptions and reports stale ones', () => {
  const exceptions = [
    { id: 'GHSA-gcqx-w48m-w2h4', package: 'deepmerge', expires: '2026-11-01' },
    { id: 'GHSA-xxxx-xxxx-xxxx', package: 'gone', expires: '2027-01-31' },
  ];
  const { failures, stale } = evaluateAudit({ vulnerabilities: { deepmerge: report.vulnerabilities.deepmerge } }, exceptions, '2026-11-04');
  assert.match(failures[0], /expired/);
  assert.deepEqual(stale.map((e) => e.id), ['GHSA-xxxx-xxxx-xxxx']);
});

test('passes on a clean report', () => {
  const { failures } = evaluateAudit({ vulnerabilities: {} }, [], '2026-11-04');
  assert.deepEqual(failures, []);
});
