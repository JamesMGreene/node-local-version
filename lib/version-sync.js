/*
 * version-sync
 * https://github.com/JamesMGreene/node-version-sync
 *
 * Copyright (c) 2014 James M. Greene
 * Licensed under the MIT license.
 */

'use strict';

// Node core modules
var path = require('path');

// Node userland modules
var findup = require('findup-sync');


module.exports = function versionSync(moduleId, localRequire) {
  // Verify arguments
  if (!(typeof moduleId === 'string' && moduleId)) {
    return null;
  }
  if (typeof localRequire !== 'function') {
    return null;
  }

  // Get the module's `main` path
  var modulePath;
  try {
    modulePath = localRequire.resolve(moduleId);
  }
  catch (e) {
    //throw new Error('Module could not be found: "' + moduleId + '"');
    return null;
  }

  
  // Verify the module's path is not a built-in one
  if (!modulePath || modulePath.indexOf(path.sep) === -1) {
    return null;
  }

  // Find the closest "package.json" file to `main`
  var pkgPath = findup('package.json', { cwd: path.dirname(modulePath) });
  if (!pkgPath) {
    return null;
  }

  // Return the version
  return localRequire(pkgPath).version || null;
};
