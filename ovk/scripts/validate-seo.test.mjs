import assert from 'node:assert/strict';
import test from 'node:test';
import {extractPageSignals} from './validate-seo.mjs';

test('reads browser-parsed metadata, including entities and quoted angle brackets', () => {
  const signals = extractPageSignals(`<!doctype html><html><head>
    <title>OVK &amp; Standards</title>
    <meta name="description" content="A > B &amp; C">
    <link rel="alternate canonical" href="https://tech.ovk.de/?a=1&amp;b=2">
    <meta name="robots" content="NOINDEX, follow">
    </head><body><h1>Standards</h1></body></html>`);
  assert.equal(signals.title, 'OVK & Standards');
  assert.equal(signals.description, 'A > B & C');
  assert.equal(signals.canonical, 'https://tech.ovk.de/?a=1&b=2');
  assert.deepEqual(signals.robots, ['noindex, follow']);
  assert.equal(signals.h1Count, 1);
});

test('recognises browser-accepted script end tags reported by CodeQL', () => {
  for (const end of ['</script >', '</script foo="bar">', '</SCRIPT\n>']) {
    const signals = extractPageSignals(`<script type="application/ld+json">{"name":"OVK"}${end}<h1>Title</h1>`);
    assert.deepEqual(signals.jsonLd.map((value) => JSON.parse(value)), [{name: 'OVK'}]);
    assert.equal(signals.h1Count, 1);
  }
});

test('ignores fake tags inside comments, script text, and templates', () => {
  const signals = extractPageSignals(`<!-- <h1>fake</h1> -->
    <script>const fake = '<h1>fake</h1><meta name="description" content="fake">';</script>
    <template><h1>inert</h1></template><h1>Visible</h1>`);
  assert.equal(signals.h1Count, 1);
  assert.equal(signals.descriptionCount, 0);
  assert.deepEqual(signals.jsonLd, []);
});
