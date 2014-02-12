/*
 * local-version
 * https://github.com/JamesMGreene/node-local-version
 *
 * Copyright (c) 2014 James M. Greene
 * Licensed under the MIT license.
 */

'use strict';

// Node core modules
var path = require('path');

// Node userland modules
var callsite = require('callsite');
var resolve = require('resolve');
var findup = require('findup-sync');


function asyncBail(cb, msg) {
  process.nextTick(function() {
    cb(new Error(msg), null);
  });
  return;
}

// API Export
var version =
module.exports =
function version(moduleId, cb) {
  // Verify arguments
  if (typeof cb !== 'function') {
    throw new Error('Callback was not a function');
  }
  if (typeof moduleId !== 'string') {
    return asyncBail(cb, 'Module ID was not a string: ' + moduleId);
  }
  if (!moduleId) {
    return asyncBail(cb, 'Module ID was an empty string');
  }

  // Verify the module is not a built-in one
  if (resolve.isCore(moduleId)) {
    return asyncBail(cb, 'Module ID corresponds to a built-in Node core module: ' + moduleId);
  }

  // Get the module's `main` path
  var caller__dirname;
  try {
    var stack = callsite(),
        caller__filename = stack[1].getFileName();
    caller__dirname = path.dirname(caller__filename);
  }
  catch (e) {
    caller__dirname = null;
  }

  if (!caller__dirname) {
    return asyncBail(cb, 'Could not establish calling context');
  }

  // Finally, a real asynchronous action:
  resolve(moduleId, { basedir: caller__dirname }, function(err, modulePath) {
    // Verify the module's `main` path was found
    var pkgPath;
    if (!err && modulePath && modulePath.indexOf(path.sep) !== -1 &&
        // Find the closest "package.json" file to `main`
        (pkgPath = findup('package.json', { cwd: path.dirname(modulePath) }))
    ) {
      try {
        var pkg = require(pkgPath);
        // Return the version
        if (pkg.version) {
          cb(null, pkg.version);
        }
        else {
          cb(new Error('Found the module but it did not have a version'), null);
        }
      }
      catch (e) {
        cb(new Error('Failed to load the module "package.json"'), null);
      }
    }
    else {
      cb(new Error('Module could not be found: ' + moduleId), null); 
    }
  });
};

version.sync = function versionSync(moduleId) {
  // Verify arguments
  if (typeof moduleId !== 'string' || !moduleId || resolve.isCore(moduleId)) {
    return null;
  }

  // Get the module's `main` path
  var modulePath;
  try {
    var stack = callsite(),
        caller__filename = stack[1].getFileName(),
        caller__dirname = path.dirname(caller__filename);
    modulePath = resolve.sync(moduleId, { basedir: caller__dirname });
  }
  catch (e) {
    //throw new Error('Module could not be found: "' + moduleId + '"');
    return null;
  }

  // Verify the module path was found
  if (!modulePath || modulePath.indexOf(path.sep) === -1) {
    return null;
  }

  // Find the closest "package.json" file to `main`
  var pkgPath = findup('package.json', { cwd: path.dirname(modulePath) });
  if (!pkgPath) {
    return null;
  }

  try {
    // Return the version
    return require(pkgPath).version || null;
  }
  catch (e) {
    return null;
  }
};
