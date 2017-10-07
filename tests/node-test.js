expect = require('expect.js');
Worker = require('webworker-threads').Worker;

function unset() {
  delete require.cache[require.resolve('../src/md5.js')];
  delete require.cache[require.resolve('./test.js')];
  md5 = null;
  BUFFER = undefined;
  JS_MD5_NO_WINDOW = undefined;
  JS_MD5_NO_NODE_JS = undefined;
  JS_MD5_NO_COMMON_JS = undefined;
  JS_MD5_NO_ARRAY_BUFFER = undefined;
  JS_MD5_NO_ARRAY_BUFFER_IS_VIEW = undefined;
  window = undefined;
}

function runCommonJsTest() {
  md5 = require('../src/md5.js');
  require('./test.js');
  unset();
}

function runWindowTest() {
  window = global;
  require('../src/md5.js');
  require('./test.js');
  unset();
}

// Node.js env
BUFFER = true;
runCommonJsTest();

// Webpack browser env
JS_MD5_NO_NODE_JS = true;
runCommonJsTest();

// browser env
JS_MD5_NO_NODE_JS = true;
JS_MD5_NO_COMMON_JS = true;
runWindowTest();

// browser env and no array buffer
JS_MD5_NO_NODE_JS = true;
JS_MD5_NO_COMMON_JS = true;
JS_MD5_NO_ARRAY_BUFFER = true;
runWindowTest();

// browser env and no isView
JS_MD5_NO_NODE_JS = true;
JS_MD5_NO_COMMON_JS = true;
JS_MD5_NO_ARRAY_BUFFER_IS_VIEW = true;
runWindowTest();

// browser AMD
JS_MD5_NO_NODE_JS = true;
JS_MD5_NO_COMMON_JS = true;
window = global;
define = function (func) {
  md5 = func();
  require('./test.js');
};
define.amd = true;

require('../src/md5.js');
unset();

// webworker
WORKER = 'tests/worker.js';
SOURCE = 'src/md5.js';

require('./worker-test.js');

delete require.cache[require.resolve('./worker-test.js')];

// cover webworker
JS_MD5_NO_WINDOW = true;
JS_MD5_NO_NODE_JS = true;
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
