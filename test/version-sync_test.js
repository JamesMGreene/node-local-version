'use strict';

var versionSync = require('../lib/version-sync.js');

var opts = require;

exports['version-sync'] = {

  'no args': function(test) {
    test.expect(1);
    test.strictEqual(versionSync(), null, 'Returns `null` if no module ID is provided');
    test.done();
  },

  '`moduleId` but no `require`': function(test) {
    test.expect(1);
    test.strictEqual(versionSync('grunt'), null, 'Returns `null` if no local `require` is provided');
    test.done();
  },

  'undefined moduleId': function(test) {
    test.expect(1);
    /*jshint -W080 */
    var moduleId = undefined;
    /*jshint +W080 */
    test.strictEqual(versionSync(moduleId, opts), null, 'Returns `null` if module ID is `undefined`');
    test.done();
  },

  'null moduleId': function(test) {
    test.expect(1);
    var moduleId = null;
    test.strictEqual(versionSync(moduleId, opts), null, 'Returns `null` if module ID is `null`');
    test.done();
  },

  'empty moduleId': function(test) {
    test.expect(1);
    var moduleId = '';
    test.strictEqual(versionSync(moduleId, opts), null, 'Returns `null` if module ID is empty string');
    test.done();
  },

  'non-string moduleId': function(test) {
    test.expect(1);
    var moduleId = 42;
    test.strictEqual(versionSync(moduleId, opts), null, 'Returns `null` if module ID is not a string');
    test.done();
  },

  'missing module': function(test) {
    test.expect(1);
    var moduleId = 'schnarfflepopperxyz';
    test.strictEqual(versionSync(moduleId, opts), null, 'Returns `null` if module ID cannot be resolved');
    test.done();
  },

  'built-in module': function(test) {
    test.expect(1);
    var moduleId = 'path';
    test.strictEqual(versionSync(moduleId, opts), null, 'Returns `null` if built-in module ID is provided');
    test.done();
  },

  'normal module with `main` in root dir but explicitly pathed': function(test) {
    test.expect(2);
    var moduleId = './testData/node_modules/normalModule1/index.js';
    test.strictEqual(versionSync(moduleId, opts), '0.1.0', 'Returns correct version number');
    test.strictEqual(require('./testData/node_modules/normalModule1/package.json').version, '0.1.0', 'Returns correct version number using direct `require`');
    test.done();
  },

  'normal module with `main` in root dir': function(test) {
    test.expect(2);
    var moduleId = './testData/node_modules/normalModule1';
    test.strictEqual(versionSync(moduleId, opts), '0.1.0', 'Returns correct version number');
    test.strictEqual(require('./testData/node_modules/normalModule1/package.json').version, '0.1.0', 'Returns correct version number using direct `require`');
    test.done();
  },

  'normal module with `main` in descendant dir but explicitly pathed': function(test) {
    test.expect(2);
    var moduleId = './testData/node_modules/normalModule2/descendant/index.js';
    test.strictEqual(versionSync(moduleId, opts), 'v0.2.0-beta.1', 'Returns correct version number');
    test.strictEqual(require('./testData/node_modules/normalModule2/package.json').version, 'v0.2.0-beta.1', 'Returns correct version number using direct `require`');
    test.done();
  },

  'normal module with `main` in descendant dir': function(test) {
    test.expect(2);
    var moduleId = './testData/node_modules/normalModule2';
    test.strictEqual(versionSync(moduleId, opts), 'v0.2.0-beta.1', 'Returns correct version number');
    test.strictEqual(require('./testData/node_modules/normalModule2/package.json').version, 'v0.2.0-beta.1', 'Returns correct version number using direct `require`');
    test.done();
  }

};
