expect = require('expect.js');
Worker = require("tiny-worker");

function unset() {
  delete require.cache[require.resolve('../src/md5.js')];
  delete require.cache[require.resolve('./test.js')];
  delete require.cache[require.resolve('./hmac-test.js')];
  md5 = null;
  BUFFER = undefined;
  JS_MD5_NO_NODE_JS = undefined;
  JS_MD5_NO_COMMON_JS = undefined;
  JS_MD5_NO_ARRAY_BUFFER = undefined;
  JS_MD5_NO_ARRAY_BUFFER_IS_VIEW = undefined;
  JS_MD5_NO_LEGACY = undefined;
  JS_MD5_NO_HMAC = undefined;
  window = undefined;
}

function runCommonJsTest() {
  md5 = require('../src/md5.js');
  require('./test.js');
  require('./hmac-test.js');
  unset();
}

function runWindowTest() {
  window = global;
  require('../src/md5.js');
  require('./test.js');
  require('./hmac-test.js');
  unset();
}

function runCommonJsTestLite() {
  JS_MD5_NO_LEGACY = true;
  JS_MD5_NO_HMAC = true;
  md5 = require('../src/md5.js');
  require('./test.js');
  // require('./hmac-test.js');
  unset();
}

function runWindowTestLite() {
  window = global;
  JS_MD5_NO_LEGACY = true;
  JS_MD5_NO_HMAC = true;
  // window.JS_MD5_NO_LEGACY = global.JS_MD5_NO_LEGACY = true;
  // window.JS_MD5_NO_HMAC = global.JS_MD5_NO_HMAC = true;
  require('../src/md5.js');
  require('./test.js');
  // require('./hmac-test.js');
  unset();
}

const ArrayBuffer_  = ArrayBuffer;
for (var i = 0; i < 2; i++) {

  const runCommonJsTest_ = i ? runCommonJsTestLite : runCommonJsTest;
  const runWindowTest_ = i ? runWindowTestLite : runWindowTest;

  // Node.js env
  BUFFER = true;
  runCommonJsTest_();

  // Node.js env, no Buffer.from
  JS_MD5_NO_BUFFER_FROM = true
  runCommonJsTest_();

  // Webpack browser env
  JS_MD5_NO_NODE_JS = true;
  runCommonJsTest_();


  // browser env
  JS_MD5_NO_NODE_JS = true;
  JS_MD5_NO_COMMON_JS = true;
  runWindowTest_();

  // browser env and no array buffer
  JS_MD5_NO_NODE_JS = true;
  JS_MD5_NO_COMMON_JS = true;
  JS_MD5_NO_ARRAY_BUFFER = true;
  runWindowTest_();

  // browser env and no isView
  JS_MD5_NO_NODE_JS = true;
  JS_MD5_NO_COMMON_JS = true;
  JS_MD5_NO_ARRAY_BUFFER_IS_VIEW = true;
  runWindowTest_();

}



// browser AMD
JS_MD5_NO_NODE_JS = true;
JS_MD5_NO_COMMON_JS = true;
window = global;
define =  function (func) {
  md5 = func();
  require('./test.js');
  require('./hmac-test.js');
};
define.amd = true;

require('../src/md5.js');
unset();




// browser AMD (lite)
JS_MD5_NO_NODE_JS = true;
JS_MD5_NO_COMMON_JS = true;
JS_MD5_NO_LEGACY = true;
JS_MD5_NO_HMAC = true;
window = global;
define =  function (func) {
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
JS_MD5_NO_NODE_JS = true;
WORKER = './worker.js';
SOURCE = '../src/md5.js';
window = global;
self = global;

WorkerGlobalScope = function () { } // for Testing

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


// cover webworker (lite)
JS_MD5_NO_NODE_JS = true;
JS_MD5_NO_HMAC = true;
JS_MD5_NO_LEGACY = true;
WORKER = './worker.js';
SOURCE = '../src/md5.js';
window = global;
self = global;

WorkerGlobalScope = function () { } // for Testing

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
