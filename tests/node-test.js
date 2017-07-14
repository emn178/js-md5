expect = require('expect.js');
Worker = require('webworker-threads').Worker;

// Node.js env
BUFFER = true;
md5 = require('../src/md5.js');
require('./test.js');

delete require.cache[require.resolve('../src/md5.js')]
delete require.cache[require.resolve('./test.js')]
md5 = null

// Webpack browser env
JS_MD5_NO_NODE_JS = true;
BUFFER = false;
window = global;
md5 = require('../src/md5.js');
require('./test.js');

delete require.cache[require.resolve('../src/md5.js')];
delete require.cache[require.resolve('./test.js')];
md5 = null;

// browser env
JS_MD5_NO_NODE_JS = true;
JS_MD5_NO_COMMON_JS = true;
BUFFER = false;
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
BUFFER = false;
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
BUFFER = false;
window = global;
define = function (func) {
  md5 = func();
  require('./test.js');
};
define.amd = true;

require('../src/md5.js');

delete require.cache[require.resolve('../src/md5.js')];
delete require.cache[require.resolve('./test.js')];
md5 = null;

// webworker
WORKER = 'tests/worker.js';
SOURCE = 'src/md5.js';

require('./worker-test.js');

// cover webworker
JS_MD5_NO_WINDOW = true;
JS_MD5_NO_NODE_JS = true;
JS_MD5_NO_COMMON_JS = false;
JS_MD5_NO_ARRAY_BUFFER = false;
BUFFER = false;
WORKER = './worker.js';
SOURCE = '../src/md5.js';
window = global;
self = global;

Worker = function (file) {
  require(file);
  currentWorker = this;

  this.postMessage = function (data) {
    onmessage({data: data});
  };
}

postMessage = function (data) {
  currentWorker.onmessage({data: data});
}

importScripts = function () {};

md5 = require('../src/md5.js');
require('./worker-test.js');
