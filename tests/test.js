(function (md5) {
  Array.prototype.toHexString = ArrayBuffer.prototype.toHexString = function () {
    var array = new Uint8Array(this);
    var hex = '';
    for (var i = 0; i < array.length; ++i) {
      var c = array[i].toString('16');
      hex += c.length == 1 ? '0' + c : c;
    }
    return hex;
  };

  var testCases = {
    'ascii': {
      'd41d8cd98f00b204e9800998ecf8427e': '',
      '9e107d9d372bb6826bd81d3542a419d6': 'The quick brown fox jumps over the lazy dog',
      'e4d909c290d0fb1ca068ffaddf22cbd0': 'The quick brown fox jumps over the lazy dog.'
    },
    'ascii more than 64 bytes': {
      'f63872ef7bc97a8a8eadba6f0881de53': 'The MD5 message-digest algorithm is a widely used cryptographic hash function producing a 128-bit (16-byte) hash value, typically expressed in text format as a 32 digit hexadecimal number. MD5 has been utilized in a wide variety of cryptographic applications, and is also commonly used to verify data integrity.'
    },
    'UTF8': {
      'a7bac2239fcdcb3a067903d8077c4a07': '中文',
      'ec3edbf3b05a449fc206a0138c739c3b': 'aécio',
      'b90869aaf121210f6c563973fa855650': '𠜎'
    },
    'UTF8 more than 64 bytes': {
      'edce615b179e6e29be23145b77ebbd61': '訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一',
      'ad36c9ab669a0ba9ce46d3ce9134de34': '訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。'
    },
    'special length': {
      'a119de63e4b2398427da06dd780263b3': '0123456780123456780123456780123456780123456780123456780',
      'ddafd84ebe63aebc4626b037a569d78b': '01234567801234567801234567801234567801234567801234567801',
      '9ea04d743618797ce464445b5785a630': '0123456780123456780123456780123456780123456780123456780123456780',
      '658d914ae42c4938874b2e786ccda479': '01234567801234567801234567801234567801234567801234567801234567801234567',
      'a083a3710d685793f1f17988bfe3c175': '012345678012345678012345678012345678012345678012345678012345678012345678',
      '2b21a843cfc31c8026a0d835bc91bc98': '012345678012345678012345678012345678012345678012345678012345678012345678012345678012345678012345678012345678012345678012345678012345678012345678',
      'd02ebde979264c79e141559fc9f6b65c': '012345678901234567',
      '1ced811af47ead374872fcca9d73dd71': '012345678901234567890123456789012345678901234567890123456789',
      'ffb81a243a60dac45929300873e05287': '012345678901234567中文',
    },
    'Array': {
      'd41d8cd98f00b204e9800998ecf8427e': [],
      '93b885adfe0da089cdf634904fd59f71': [0],
      '9e107d9d372bb6826bd81d3542a419d6': [84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103]
    },
    'Uint8Array': {
      '9e107d9d372bb6826bd81d3542a419d6': new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])
    },
    'Int8Array': {
      '9e107d9d372bb6826bd81d3542a419d6': new Int8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])
    },
    'ArrayBuffer': {
      '93b885adfe0da089cdf634904fd59f71': new ArrayBuffer(1)
    },
    'Object': {
      'd41d8cd98f00b204e9800998ecf8427e': {},
      'd41d8cd98f00b204e9800998ecf8427e': {what: 'ever'}
    }
  };

  if (typeof process == 'object') {
    testCases['Buffer'] = {
      'd41d8cd98f00b204e9800998ecf8427e': new Buffer(0),
      '9e107d9d372bb6826bd81d3542a419d6': new Buffer(new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103]))
    }
  }

  var methods = [
    {
      name: 'md5',
      call: md5,
    },
    {
      name: 'md5.hex',
      call: md5.hex
    },
    {
      name: 'md5.array',
      call: function (message) {
        return md5.array(message).toHexString();
      }
    },
    {
      name: 'md5.digest',
      call: function (message) {
        return md5.digest(message).toHexString();
      }
    },
    {
      name: 'md5.arrayBuffer',
      call: function (message) {
        return md5.arrayBuffer(message).toHexString();
      }
    },
    {
      name: 'md5.buffer',
      call: function (message) {
        return md5.buffer(message).toHexString();
      }
    }
  ];

  var classMethods = [
    {
      name: 'create',
      call: function (message) {
        return md5.create().update(message).toString();
      }
    },
    {
      name: 'update',
      call: function (message) {
        return md5.update(message).toString();
      }
    },
    {
      name: 'hex',
      call: function (message) {
        return md5.update(message).hex();
      }
    },
    {
      name: 'array',
      call: function (message) {
        return md5.update(message).array().toHexString();
      }
    },
    {
      name: 'digest',
      call: function (message) {
        return md5.update(message).digest().toHexString();
      }
    },
    {
      name: 'arrayBuffer',
      call: function (message) {
        return md5.update(message).arrayBuffer().toHexString();
      }
    },
    {
      name: 'buffer',
      call: function (message) {
        return md5.update(message).buffer().toHexString();
      }
    },
    {
      name: 'finalize',
      call: function (message) {
        var hash = md5.update(message);
        hash.hex();
        hash.update(message);
        return hash.hex();
      }
    }
  ];

  methods.forEach(function (method) {
    describe('#' + method.name, function () {
      for (var testCaseName in testCases) {
        (function (testCaseName) {
          var testCase = testCases[testCaseName];
          context('when ' + testCaseName, function () {
            for (var hash in testCase) {
              (function (message, hash) {
                it('should be equal', function () {
                  expect(method.call(message)).to.be(hash);
                });
              })(testCase[hash], hash);
            }
          });
        })(testCaseName);
      }
    });
  });

  describe('Md5', function () {
    classMethods.forEach(function (method) {
      describe('#' + method.name, function () {
        for (var testCaseName in testCases) {
          (function (testCaseName) {
            var testCase = testCases[testCaseName];
            context('when ' + testCaseName, function () {
              for (var hash in testCase) {
                (function (message, hash) {
                  it('should be equal', function () {
                    expect(method.call(message)).to.be(hash);
                  });
                })(testCase[hash], hash);
              }
            });
          })(testCaseName);
        }
      });
    });
  });
})(md5);
