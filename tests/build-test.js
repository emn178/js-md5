var expect = require('expect.js');
var fs = require('fs');
var vm = require('vm');

var EXPECTED_MD5 = '900150983cd24fb0d6963f7d28e17f72';
var EXPECTED_HMAC = 'd2fe98063f876b03193afb49b4979591';

var load = function (file) {
  delete require.cache[require.resolve(file)];
  return require(file);
};

var testCore = function (md5) {
  expect(md5('abc')).to.be(EXPECTED_MD5);
  expect(md5.create().update('a').update('bc').hex()).to.be(EXPECTED_MD5);
  expect(md5.array('abc')).to.have.length(16);
  expect(md5.digest('abc')).to.have.length(16);
  expect(md5.arrayBuffer('abc').byteLength).to.be(16);
};

var loadBrowser = function (file) {
  var context = {
    window: {},
    ArrayBuffer: ArrayBuffer,
    Uint8Array: Uint8Array,
    Uint32Array: Uint32Array
  };
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), context);
  return context.md5 || context.window.md5;
};

var legacy = load('../build/md5.min.js');
testCore(legacy);
expect(legacy.base64).to.be.a('function');
expect(legacy.buffer).to.be.a('function');
expect(legacy.hmac('key', 'abc')).to.be(EXPECTED_HMAC);

var modern = load('../build/md5.modern.min.js');
testCore(modern);
expect(modern.base64).to.be.a('function');
expect(modern.buffer).to.be.a('function');
expect(modern.hmac('key', 'abc')).to.be(EXPECTED_HMAC);

var lite = load('../build/md5-lite.min.js');
testCore(lite);
expect(lite.base64).to.be(undefined);
expect(lite.buffer).to.be(undefined);
expect(lite.hmac).to.be(undefined);

testCore(load('../build/md5.js'));
testCore(load('../build/md5.modern.js'));
testCore(load('../build/md5-lite.js'));
testCore(loadBrowser('build/md5.modern.min.js'));
var browserLite = loadBrowser('build/md5-lite.min.js');
testCore(browserLite);
expect(browserLite.base64).to.be(undefined);
expect(browserLite.buffer).to.be(undefined);
expect(browserLite.hmac).to.be(undefined);

console.log('Build variants: PASS');
