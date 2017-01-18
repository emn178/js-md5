// Node.js env
expect = require('expect.js');
md5 = require('../src/md5.js');
require('./test.js');

delete require.cache[require.resolve('../src/md5.js')]
delete require.cache[require.resolve('./test.js')]
md5 = null

// Webpack browser env
JS_MD5_NO_NODE_JS = true;
window = global;
md5 = require('../src/md5.js');
require('./test.js');

delete require.cache[require.resolve('../src/md5.js')];
delete require.cache[require.resolve('./test.js')];
md5 = null;

// browser env
JS_MD5_NO_NODE_JS = true;
JS_MD5_NO_COMMON_JS = true;
window = global;
require('../src/md5.js');
require('./test.js');

delete require.cache[require.resolve('../src/md5.js')];
delete require.cache[require.resolve('./test.js')];
md5 = null;

// browser env and no array buffer
JS_MD5_NO_NODE_JS = true;
JS_MD5_NO_COMMON_JS = true;
JS_MD5_NO_ARRAY_BUFFER = true;
window = global;
require('../src/md5.js');
require('./test.js');

delete require.cache[require.resolve('../src/md5.js')];
delete require.cache[require.resolve('./test.js')];
md5 = null;

// browser AMD
JS_MD5_NO_NODE_JS = true;
JS_MD5_NO_COMMON_JS = true;
JS_MD5_NO_ARRAY_BUFFER = false;
window = global;
define = function (func) {
  md5 = func();
  require('./test.js');
};
define.amd = true;

require('../src/md5.js');
