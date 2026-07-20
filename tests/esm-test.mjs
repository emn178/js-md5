import expect from 'expect.js';
import md5, {md5 as namedMd5} from 'js-md5';
import browserMd5 from 'js-md5/build/md5.mjs';
import minBrowserMd5 from 'js-md5/build/md5.min.mjs';
import modernMd5 from 'js-md5/build/md5.modern.mjs';
import minModernMd5 from 'js-md5/build/md5.modern.min.mjs';
import liteMd5 from 'js-md5/build/md5-lite.mjs';
import minLiteMd5 from 'js-md5/build/md5-lite.min.mjs';

const EXPECTED_MD5 = '900150983cd24fb0d6963f7d28e17f72';

[md5, namedMd5, browserMd5, minBrowserMd5, modernMd5, minModernMd5,
  liteMd5, minLiteMd5].forEach(hash => {
  expect(hash('abc')).to.be(EXPECTED_MD5);
});

expect(md5.hmac).to.be.a('function');
expect(browserMd5.hmac).to.be.a('function');
expect(modernMd5.hmac).to.be.a('function');
expect(liteMd5.hmac).to.be(undefined);
expect(liteMd5.base64).to.be(undefined);
expect(liteMd5.buffer).to.be(undefined);

console.log('ESM imports: PASS');
