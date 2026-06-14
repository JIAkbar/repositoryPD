#!/usr/bin/env node
/**
 * scripts/bug-sweep.js — DIGILAB Repository pre-commit checker
 * Usage: node scripts/bug-sweep.js
 * Exit code 1 if any check fails.
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DOCS = path.resolve(__dirname, '..', 'docs');
const RESET = '\x1b[0m', GREEN = '\x1b[32m', RED = '\x1b[31m', YELLOW = '\x1b[33m', BOLD = '\x1b[1m', DIM = '\x1b[2m';

const ok   = (msg) => `  ${GREEN}✅ ${msg}${RESET}`;
const fail = (msg) => `  ${RED}❌ ${msg}${RESET}`;
const warn = (msg) => `  ${YELLOW}⚠️  ${msg}${RESET}`;

// HTML files to check (routing-capable pages)
const HTML_FILES = [
  'index.html', 'index-evo.html',
  'admin.html', 'admin-evo.html',
  'mahasiswa.html', 'mahasiswa-evo.html',
  'statistik.html', 'statistik-evo.html',
  'mindmap.html', 'changelog.html',
];

// JS files to check
const JS_FILES = [
  'theme.js', 'layout-router.js', 'api-service.js', 'mahasiswa-shared.js',
];

let totalFails = 0;

function header(title) {
  console.log(`\n${BOLD}── ${title} ──${RESET}`);
}

function checkFile(fname, checks) {
  const fpath = path.join(DOCS, fname);
  if (!fs.existsSync(fpath)) {
    console.log(fail(`FILE NOT FOUND: ${fname}`));
    totalFails++;
    return;
  }
  const src = fs.readFileSync(fpath, 'utf-8');
  const lines = src.split('\n');
  let fileFailed = false;

  console.log(`\n  ${BOLD}${fname}${RESET}`);

  for (const [id, label, fn] of checks) {
    const result = fn(src, lines, fpath);
    if (result === true) {
      console.log(ok(label));
    } else if (result === null) {
      console.log(warn(`SKIP — ${label}`));
    } else {
      const detail = typeof result === 'string' ? `: ${result}` : '';
      console.log(fail(`${label}${detail}`));
      totalFails++;
      fileFailed = true;
    }
  }
}

// ── HELPERS ──────────────────────────────────────────────────────────────────

function hasString(src, str) {
  return src.includes(str);
}

function extractScriptContents(src) {
  // Extract text between <script> and </script> (non-src scripts only)
  const parts = [];
  const re = /<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(src)) !== null) parts.push(m[1]);
  return parts.join('\n');
}

function findHardcodedHex(src) {
  // Find hex colors outside :root { ... } blocks
  const rootRe = /:root\s*\{[^}]*\}/gs;
  let stripped = src.replace(rootRe, '');
  // Also strip comments
  stripped = stripped.replace(/\/\*[\s\S]*?\*\//g, '');
  // Also strip <style> blocks that are theme-switch definitions (data-theme attr blocks)
  stripped = stripped.replace(/\[data-(?:theme|version)[^\]]*\]\s*\{[^}]*\}/g, '');
  const hexRe = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
  const found = [];
  let m;
  while ((m = hexRe.exec(stripped)) !== null) {
    // Skip if inside a <style> block's own root/theme definition (already stripped)
    // Skip SVG fill/stroke that are intentional (white, black common values)
    const val = m[1].toLowerCase();
    if (['ffffff', 'fff', '000000', '000'].includes(val)) continue;
    // Find line number
    const lineNum = src.substring(0, m.index).split('\n').length;
    found.push(`#${m[1]} (line ${lineNum})`);
    if (found.length >= 5) { found.push('...'); break; }
  }
  return found.length ? found.join(', ') : true;
}

function jsSyntaxCheck(fpath) {
  try {
    execSync(`node --check "${fpath}"`, { stdio: 'pipe' });
    return true;
  } catch (e) {
    const msg = e.stderr ? e.stderr.toString().split('\n')[0] : e.message;
    return msg;
  }
}

// Pages without an evo equivalent — direct href/location to these is intentional
const NON_ROUTED_PAGES = new Set(['mindmap.html', 'changelog.html', 'checklist.html']);

function findHardcodeRedirects(src) {
  // Look for location.href = '*.html' — after router is installed this should be minimal
  const srcLines = src.split('\n');
  const re = /(?:window\.)?location\.href\s*=\s*['"]([^'"]+\.html)['"]/g;
  const found = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    const page = m[1].split('/').pop();
    if (NON_ROUTED_PAGES.has(page)) continue; // intentional direct href
    const lineNum = src.substring(0, m.index).split('\n').length;
    const lineContent = srcLines[lineNum - 1] || '';
    if (lineContent.includes('nosweep')) continue; // intentional direct switch (page-only)
    found.push(`'${m[1]}' (line ${lineNum})`);
  }
  return found.length ? found.join(', ') : true;
}

function findWindowOpen(src) {
  const re = /window\.open\s*\(/g;
  const found = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    const lineNum = src.substring(0, m.index).split('\n').length;
    found.push(`line ${lineNum}`);
  }
  return found.length ? `window.open() at ${found.join(', ')}` : true;
}

function findBlankTarget(src) {
  // Only flag if it's an internal .html link
  const re = /href=["'][^"']*\.html[^"']*["'][^>]*target=["']_blank["']|target=["']_blank["'][^>]*href=["'][^"']*\.html[^"']*["']/g;
  const found = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    const lineNum = src.substring(0, m.index).split('\n').length;
    found.push(`line ${lineNum}`);
  }
  return found.length ? `target="_blank" on internal link at ${found.join(', ')}` : true;
}

// ── CHECKS ───────────────────────────────────────────────────────────────────

const ROUTING_PAGES = new Set([
  'index.html', 'index-evo.html',
  'admin.html', 'admin-evo.html',
  'mahasiswa.html', 'mahasiswa-evo.html',
  'statistik.html', 'statistik-evo.html',
]);

function checksFor(fname) {
  const isRouting = ROUTING_PAGES.has(fname);
  const isMindmap  = fname === 'mindmap.html';

  return [
    ['theme',    'theme.js dimuat',
      (src) => hasString(src, 'src="theme.js"') ? true : 'theme.js tidak ditemukan di <head>'],

    ['fonts',    'Google Fonts import ada',
      (src) => hasString(src, 'fonts.googleapis.com') ? true : 'Google Fonts tidak diimport'],

    ['router',   'layout-router.js dimuat',
      (src) => !isRouting ? null :
               hasString(src, 'src="layout-router.js"') ? true : 'layout-router.js tidak ditemukan'],

    ['hardcode', 'Tidak ada hardcode redirect .html',
      (src) => !isRouting ? null : findHardcodeRedirects(src)],

    ['blank',    'Tidak ada target="_blank" di link internal',
      (src) => findBlankTarget(src)],

    ['winopen',  'Tidak ada window.open()',
      (src) => findWindowOpen(src)],

    ['cdn-icon', 'Tidak ada CDN icon library',
      (src) => {
        const bad = ['fontawesome', 'heroicons.com', 'cdnjs.*icon', 'lucide.dev'];
        for (const b of bad) {
          if (new RegExp(b, 'i').test(src)) return `ditemukan: ${b}`;
        }
        return true;
      }],
  ];
}

function jsChecksFor(fname) {
  return [
    ['syntax', 'JS syntax OK',
      (src, lines, fpath) => jsSyntaxCheck(fpath)],

    ['hardcode', 'Tidak ada hardcode redirect .html',
      (src) => findHardcodeRedirects(src)],
  ];
}

// ── RUN ──────────────────────────────────────────────────────────────────────

console.log(`${BOLD}\n🔍 DIGILAB Bug Sweep${RESET}  ${DIM}${new Date().toLocaleString('id-ID')}${RESET}`);

header('HTML Files');
for (const f of HTML_FILES) checkFile(f, checksFor(f));

header('JS Files');
for (const f of JS_FILES) checkFile(f, jsChecksFor(f));

// Summary
console.log(`\n${'─'.repeat(48)}`);
if (totalFails === 0) {
  console.log(GREEN + BOLD + 'Semua cek lulus -- siap commit!' + RESET);
} else {
  console.log(RED + BOLD + totalFails + ' masalah ditemukan -- perbaiki sebelum commit.' + RESET);
}
console.log('');

process.exit(totalFails > 0 ? 1 : 0);
