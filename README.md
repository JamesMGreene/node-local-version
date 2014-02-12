# version-sync [![Build Status](https://secure.travis-ci.org/JamesMGreene/node-version-sync.png?branch=master)](http://travis-ci.org/JamesMGreene/node-version-sync)

Synchronous "package.json" version number fetcher for Node.


## Getting Started
Install the module with: `npm install version-sync`

```js
var versionSync = require('version-sync');
versionSync('grunt', require);  // '0.4.2'
versionSync('path', require);   // null
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


## Release History
 - 0.1.0: Published to NPM on 2014-02-12.
    - Initial release.


## License
Copyright (c) 2014 James M. Greene  
Licensed under the MIT license.
