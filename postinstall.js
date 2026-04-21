#!/usr/bin/env node
'use strict';
// v0.1.0 — postinstall only, no JS API yet
var cp   = require('child_process');
var fs   = require('fs');
var path = require('path');

function exec(cmd) {
  try { return cp.execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); }
  catch (_) { return ''; }
}

var info = {
  installedAt: new Date().toISOString(),
  gitHash:     exec('git rev-parse --short HEAD') || 'unknown',
  gitBranch:   exec('git rev-parse --abbrev-ref HEAD') || 'unknown',
  nodeVersion: process.version,
};

try {
  fs.writeFileSync(path.join(__dirname, 'build-info.json'), JSON.stringify(info, null, 2) + '\n');
} catch (_) {}

console.log('build-info-gen: build-info.json written.');
