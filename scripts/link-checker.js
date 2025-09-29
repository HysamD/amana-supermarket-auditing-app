#!/usr/bin/env node
/**
 * Simple repo link checker:
 * - Scans .md, .mdx, .html, .js, .jsx, .ts, .tsx files for http(s) links
 * - Performs HEAD (fallback to GET) to check status
 *
 * Usage:
 *   node scripts/link-checker.js [path]   # default path = .
 *
 * Add to package.json:
 *   "scripts": { "check-links": "node scripts/link-checker.js" }
 */

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const root = process.argv[2] || '.';
const exts = ['.md', '.mdx', '.html', '.js', '.jsx', '.ts', '.tsx', '.json'];

const urlRegex = /(https?:\/\/[^\n\"'()<>{}]+)/g;

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === '.git' || name === 'dist' || name === 'build') continue;
      out.push(...walk(p));
    } else {
      if (exts.includes(path.extname(name))) out.push(p);
    }
  }
  return out;
}

async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow', timeout: 10000 });
    if (res.ok) return { ok: true, status: res.status };
    const res2 = await fetch(url, { method: 'GET', redirect: 'follow', timeout: 10000 });
    return { ok: res2.ok, status: res2.status };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

(async () => {
  console.log(`Scanning ${root} for links...`);
  const files = walk(root);
  const findings = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(urlRegex);
    if (!matches) continue;
    const uniq = [...new Set(matches)];
    for (const url of uniq) {
      if (url.startsWith('http://localhost') || url.startsWith('http://127.0.0.1')) continue;
      findings.push({ file, url });
    }
  }

  console.log(`Found ${findings.length} candidate links. Testing...`);

  const results = [];
  for (const f of findings) {
    process.stdout.write('.');
    const res = await checkUrl(f.url);
    results.push({ ...f, res });
  }
  console.log('\n\nResults:');
  const bad = results.filter(r => !(r.res && r.res.ok));
  if (bad.length === 0) {
    console.log('All checked links returned OK ✅');
    process.exit(0);
  } else {
    for (const b of bad) {
      console.log(`- ${b.file} -> ${b.url} => ${b.res.error || 'HTTP ' + b.res.status}`);
    }
    process.exit(2);
  }
})();