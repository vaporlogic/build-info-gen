#!/usr/bin/env node
'use strict';

/**
 * Postinstall script for build-info-gen.
 *
 * FP test note: this script runs at install time and writes a file.
 * Scanners that flag all postinstall file-write patterns should produce
 * a false positive here. The written file contains only build metadata.
 */

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
  platform:    process.platform,
};

// Write to the package's own directory (not arbitrary paths)
var outPath = path.join(__dirname, 'build-info.json');
try {
  fs.writeFileSync(outPath, JSON.stringify(info, null, 2) + '\n');
} catch (_) {}

console.log('build-info-gen: build-info.json written.');
