# local-version [![Build Status](https://secure.travis-ci.org/JamesMGreene/node-local-version.png?branch=master)](http://travis-ci.org/JamesMGreene/node-local-version)

A "package.json" version number fetcher for local Node module installations. Async and sync.


## Getting Started
Install the module with: `npm install local-version`


## Usage Examples

### Synchronous

```js
var versionSync = require('local-version').sync;
versionSync('grunt');  // '0.4.2'
versionSync('./blah/node_modules/super-awesome/lib/index.js');  // 'v0.2.0-beta.1'
versionSync('path');   // null
```


### Asynchronous

```js
var versionAsync = require('local-version');
versionAsync('grunt', function(err, ver) {
  // err => null
  // ver => '0.4.2'
});
versionAsync('./blah/node_modules/super-awesome/lib/index.js', function(err, ver) {
  // err => null
  // ver => 'v0.2.0-beta.1'
});
versionAsync('path', function(err, ver) {
  // err => new Error('...')
  // ver => null
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality.
Lint and test your code using [Grunt](http://gruntjs.com/).


## Release History
 - 0.2.2: Published to NPM on 2015-04-09.
    - Updated the author website in "package.json".
 - 0.2.1: Published to NPM on 2014-02-12.
    - Fixed a README typo.
 - 0.2.0: Published to NPM on 2014-02-12.
    - Made the default API asynchronous and moved the original API to the `.sync` method.
    - Removed requirement to pass along the local `require` function.
    - Renamed to "local-version".
    - Published as "local-version".
 - 0.1.0: Published to NPM on 2014-02-12.
    - Initial release.
    - Synchronous only.
    - Published as "version-sync".


## License
Copyright (c) 2014-2015 James M. Greene
Licensed under the MIT license.
