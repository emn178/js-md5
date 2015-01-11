md5 = require('../src/md5.js');
expect = require('expect.js');
testName = 'default';
require('./test.js');

delete require.cache[require.resolve('../src/md5.js')]
delete require.cache[require.resolve('./test.js')]
md5 = null

JS_MD5_TEST = true;
testName = 'without ArrayBuffer';
base64 = require('../src/md5.js');
require('./test.js');
