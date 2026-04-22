'use strict';

/**
 * build-info-gen — Read or regenerate build metadata.
 */

var fs   = require('fs');
var path = require('path');
var cp   = require('child_process');

function exec(cmd) {
  try { return cp.execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); }
  catch (_) { return ''; }
}

/**
 * Read the build-info.json generated at install time.
 * @returns {object|null}
 */
function read() {
  var p = path.join(__dirname, 'build-info.json');
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (_) { return null; }
}

/**
 * Generate fresh build info from the current working directory.
 * @returns {object}
 */
function generate() {
  return {
    generatedAt: new Date().toISOString(),
    gitHash:     exec('git rev-parse --short HEAD')        || 'unknown',
    gitBranch:   exec('git rev-parse --abbrev-ref HEAD')   || 'unknown',
    gitTag:      exec('git describe --tags --exact-match') || '',
    nodeVersion: process.version,
    platform:    process.platform,
  };
}

module.exports = { read, generate };
