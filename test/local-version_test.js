'use strict';

var versionAsync = require('../lib/local-version.js');
var versionSync = versionAsync.sync;


//
// ASYNCHRONOUS
//
exports['local-version.async'] = {

  'no args': function(test) {
    test.expect(1);
    // NOTE: Synchronous!
    test.throws(function() {
      versionAsync();
    }, /Callback was not a function/);
    test.done();
  },

  'moduleId but no callback': function(test) {
    test.expect(1);
    // NOTE: Synchronous!
    test.throws(function() {
      versionAsync('foo');
    }, /Callback was not a function/);
    test.done();
  },

  'undefined moduleId': function(test) {
    test.expect(2);
    var moduleId;  // undefined
    versionAsync(moduleId, function(err, modulePath) {
      test.ok(err, 'Should have an Error');
      test.strictEqual(modulePath, null, 'Returns `null` if module ID is `undefined`');
      test.done();
    });
  },

  'null moduleId': function(test) {
    test.expect(2);
    var moduleId = null;
    versionAsync(moduleId, function(err, modulePath) {
      test.ok(err, 'Should have an Error');
      test.strictEqual(modulePath, null, 'Returns `null` if module ID is `null`');
      test.done();
    });
  },

  'non-string moduleId': function(test) {
    test.expect(2);
    var moduleId = 42;
    versionAsync(moduleId, function(err, modulePath) {
      test.ok(err, 'Should have an Error');
      test.strictEqual(modulePath, null, 'Returns `null` if module ID is not a string');
      test.done();
    });
  },

  'empty moduleId': function(test) {
    test.expect(2);
    var moduleId = '';
    versionAsync(moduleId, function(err, modulePath) {
      test.ok(err, 'Should have an Error');
      test.strictEqual(modulePath, null, 'Returns `null` if module ID is empty string');
      test.done();
    });
  },

  'built-in module': function(test) {
    test.expect(2);
    var moduleId = 'path';
    versionAsync(moduleId, function(err, modulePath) {
      test.ok(err, 'Should have an Error');
      test.strictEqual(modulePath, null, 'Returns `null` if built-in module ID is provided');
      test.done();
    });
  },

  'missing module': function(test) {
    test.expect(2);
    var moduleId = 'schnarfflepopperxyz';
    versionAsync(moduleId, function(err, modulePath) {
      test.ok(err, 'Should have an Error');
      test.strictEqual(modulePath, null, 'Returns `null` if module ID cannot be resolved');
      test.done();
    });
  },

  'normal module with `main` in root dir but explicitly pathed': function(test) {
    test.expect(3);
    var moduleId = './testData/node_modules/normalModule1/index.js';
    var expectedVersion = '0.1.0';
    test.strictEqual(require('./testData/node_modules/normalModule1/package.json').version, expectedVersion, 'Returns correct version number using direct `require`');
    versionAsync(moduleId, function(err, modulePath) {
      test.ok(!err, 'Should NOT have an Error');
      test.strictEqual(modulePath, expectedVersion, 'Returns correct version number');
      test.done();
    });
  },

  'normal module with `main` in root dir': function(test) {
    test.expect(3);
    var moduleId = './testData/node_modules/normalModule1';
    var expectedVersion = '0.1.0';
    test.strictEqual(require('./testData/node_modules/normalModule1/package.json').version, expectedVersion, 'Returns correct version number using direct `require`');
    versionAsync(moduleId, function(err, modulePath) {
      test.ok(!err, 'Should NOT have an Error');
      test.strictEqual(modulePath, expectedVersion, 'Returns correct version number');
      test.done();
    });
  },

  'normal module with `main` in descendant dir but explicitly pathed': function(test) {
    test.expect(3);
    var moduleId = './testData/node_modules/normalModule2/descendant/index.js';
    var expectedVersion = 'v0.2.0-beta.1';
    test.strictEqual(require('./testData/node_modules/normalModule2/package.json').version, expectedVersion, 'Returns correct version number using direct `require`');
    versionAsync(moduleId, function(err, modulePath) {
      test.ok(!err, 'Should NOT have an Error');
      test.strictEqual(modulePath, expectedVersion, 'Returns correct version number');
      test.done();
    });
  },

  'normal module with `main` in descendant dir': function(test) {
    test.expect(3);
    var moduleId = './testData/node_modules/normalModule2';
    var expectedVersion = 'v0.2.0-beta.1';
    test.strictEqual(require('./testData/node_modules/normalModule2/package.json').version, expectedVersion, 'Returns correct version number using direct `require`');
    versionAsync(moduleId, function(err, modulePath) {
      test.ok(!err, 'Should NOT have an Error');
      test.strictEqual(modulePath, expectedVersion, 'Returns correct version number');
      test.done();
    });
  }

};


//
// SYNCHRONOUS
//
exports['local-version.sync'] = {

  'no args': function(test) {
    test.expect(1);
    test.strictEqual(versionSync(), null, 'Returns `null` if no module ID is provided');
    test.done();
  },

  'undefined moduleId': function(test) {
    test.expect(1);
    var moduleId;  // undefined
    test.strictEqual(versionSync(moduleId), null, 'Returns `null` if module ID is `undefined`');
    test.done();
  },

  'null moduleId': function(test) {
    test.expect(1);
    var moduleId = null;
    test.strictEqual(versionSync(moduleId), null, 'Returns `null` if module ID is `null`');
    test.done();
  },

  'empty moduleId': function(test) {
    test.expect(1);
    var moduleId = '';
    test.strictEqual(versionSync(moduleId), null, 'Returns `null` if module ID is empty string');
    test.done();
  },

  'non-string moduleId': function(test) {
    test.expect(1);
    var moduleId = 42;
    test.strictEqual(versionSync(moduleId), null, 'Returns `null` if module ID is not a string');
    test.done();
  },

  'built-in module': function(test) {
    test.expect(1);
    var moduleId = 'path';
    test.strictEqual(versionSync(moduleId), null, 'Returns `null` if built-in module ID is provided');
    test.done();
  },

  'missing module': function(test) {
    test.expect(1);
    var moduleId = 'schnarfflepopperxyz';
    test.strictEqual(versionSync(moduleId), null, 'Returns `null` if module ID cannot be resolved');
    test.done();
  },

  'normal module with `main` in root dir but explicitly pathed': function(test) {
    test.expect(2);
    var moduleId = './testData/node_modules/normalModule1/index.js';
    test.strictEqual(versionSync(moduleId), '0.1.0', 'Returns correct version number');
    test.strictEqual(require('./testData/node_modules/normalModule1/package.json').version, '0.1.0', 'Returns correct version number using direct `require`');
    test.done();
  },

  'normal module with `main` in root dir': function(test) {
    test.expect(2);
    var moduleId = './testData/node_modules/normalModule1';
    test.strictEqual(versionSync(moduleId), '0.1.0', 'Returns correct version number');
    test.strictEqual(require('./testData/node_modules/normalModule1/package.json').version, '0.1.0', 'Returns correct version number using direct `require`');
    test.done();
  },

  'normal module with `main` in descendant dir but explicitly pathed': function(test) {
    test.expect(2);
    var moduleId = './testData/node_modules/normalModule2/descendant/index.js';
    test.strictEqual(versionSync(moduleId), 'v0.2.0-beta.1', 'Returns correct version number');
    test.strictEqual(require('./testData/node_modules/normalModule2/package.json').version, 'v0.2.0-beta.1', 'Returns correct version number using direct `require`');
    test.done();
  },

  'normal module with `main` in descendant dir': function(test) {
    test.expect(2);
    var moduleId = './testData/node_modules/normalModule2';
    test.strictEqual(versionSync(moduleId), 'v0.2.0-beta.1', 'Returns correct version number');
    test.strictEqual(require('./testData/node_modules/normalModule2/package.json').version, 'v0.2.0-beta.1', 'Returns correct version number using direct `require`');
    test.done();
  }

};