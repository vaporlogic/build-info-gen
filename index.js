'use strict';

/**
 * build-info-gen v1.0.0
 * Added JS API. gitTag support added in v1.0.2.
 */

var fs   = require('fs');
var path = require('path');
var cp   = require('child_process');

function exec(cmd) {
  try { return cp.execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); }
  catch (_) { return ''; }
}

function read() {
  try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'build-info.json'), 'utf8')); }
  catch (_) { return null; }
}

function generate() {
  return {
    generatedAt: new Date().toISOString(),
    gitHash:     exec('git rev-parse --short HEAD')      || 'unknown',
    gitBranch:   exec('git rev-parse --abbrev-ref HEAD') || 'unknown',
    nodeVersion: process.version,
    platform:    process.platform,
  };
}

module.exports = { read, generate };
