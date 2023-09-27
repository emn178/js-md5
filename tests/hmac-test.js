(function (md5) {
  Array.prototype.toHexString = ArrayBuffer.prototype.toHexString = function () {
    var array = new Uint8Array(this);
    var hex = '';
    for (var i = 0; i < array.length; ++i) {
      var c = array[i].toString('16');
      hex += c.length === 1 ? '0' + c : c;
    }
    return hex;
  };

  var testCases = {
    md5_hmac: {
      'Test Vectors': {
        '9294727a3638bb1c13f48ef8158bfc9d': [
          [0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b],
          'Hi There'
        ],
        '750c783e6ab0b503eaa86e310a5db738': [
          'Jefe',
          'what do ya want for nothing?'
        ],
        '56be34521d144c88dbb8c733f0e8b3f6': [
          [0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa],
          [0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd]
        ],
        '697eaf0aca3a3aea3a75164746ffaa79': [
          [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19],
          [0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd]
        ],
        '56461ef2342edc00f9bab995690efd4c': [
          [0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c],
          'Test With Truncation'
        ],
        '6b1ab7fe4bd7bf8f0b62e6ce61b9d0cd': [
          [0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa],
          'Test Using Larger Than Block-Size Key - Hash Key First'
        ],
        '6f630fad67cda0ee1fb1f562db3aa53e': [
          [0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa],
          'Test Using Larger Than Block-Size Key and Larger Than One Block-Size Data'
        ]
      },
      'UTF8': {
        '05fe3b294344f4e93c811e10f9825a38': ['中文', '中文'],
        'c1bc6df91f38e6332b8562324005103d': ['aécio', 'aécio'],
        '14eef78533c35078177d11fb4593a19e': ['𠜎', '𠜎']
      }
    }
  };

  if (!(typeof JS_MD5_NO_ARRAY_BUFFER === 'boolean' && JS_MD5_NO_ARRAY_BUFFER)) {
    testCases.md5_hmac.Uint8Array = {
      '72c33c78cac0b7a581ac263a344ed01d': [
        new Uint8Array(0),
        'Hi There'
      ]
    };
    testCases.md5_hmac.ArrayBuffer = {
      '72c33c78cac0b7a581ac263a344ed01d': [
        new ArrayBuffer(0),
        'Hi There'
      ]
    };
  }

  var errorTestCases = [null, undefined, { length: 0 }, 0, 1, false, true, NaN, Infinity, function () {}];

  function runTestCases(name, algorithm) {
    var methods = [
      {
        name: name,
        call: algorithm,
      },
      {
        name: name + '.hex',
        call: algorithm.hex
      },
      {
        name: name + '.array',
        call: function (key, message) {
          return algorithm.array(key, message).toHexString();
        }
      },
      {
        name: name + '.digest',
        call: function (key, message) {
          return algorithm.digest(key, message).toHexString();
        }
      },
      {
        name: name + '.arrayBuffer',
        call: function (key, message) {
          return algorithm.arrayBuffer(key, message).toHexString();
        }
      }
    ];

    var classMethods = [
      {
        name: 'create',
        call: function (key, message) {
          return algorithm.create(key).update(message).toString();
        }
      },
      {
        name: 'update',
        call: function (key, message) {
          return algorithm.update(key, message).toString();
        }
      },
      {
        name: 'hex',
        call: function (key, message) {
          return algorithm.update(key, message).hex();
        }
      },
      {
        name: 'array',
        call: function (key, message) {
          return algorithm.update(key, message).array().toHexString();
        }
      },
      {
        name: 'digest',
        call: function (key, message) {
          return algorithm.update(key, message).digest().toHexString();
        }
      },
      {
        name: 'arrayBuffer',
        call: function (key, message) {
          return algorithm.update(key, message).arrayBuffer().toHexString();
        }
      },
      {
        name: 'finalize',
        call: function (key, message) {
          var hash = algorithm.update(key, message);
          hash.hex();
          return hash.hex();
        }
      }
    ];

    var subTestCases = testCases[name];

    describe(name, function () {
      methods.forEach(function (method) {
        describe('#' + method.name, function () {
          for (var testCaseName in subTestCases) {
            (function (testCaseName) {
              var testCase = subTestCases[testCaseName];
              context('when ' + testCaseName, function () {
                for (var hash in testCase) {
                  (function (message, hash) {
                    it('should be equal', function () {
                      expect(method.call(message[0], message[1])).to.be(hash);
                    });
                  })(testCase[hash], hash);
                }
              });
            })(testCaseName);
          }
        });
      });

      classMethods.forEach(function (method) {
        describe('#' + method.name, function () {
          for (var testCaseName in subTestCases) {
            (function (testCaseName) {
              var testCase = subTestCases[testCaseName];
              context('when ' + testCaseName, function () {
                for (var hash in testCase) {
                  (function (message, hash) {
                    it('should be equal', function () {
                      expect(method.call(message[0], message[1])).to.be(hash);
                    });
                  })(testCase[hash], hash);
                }
              });
            })(testCaseName);
          }
        });
      });

      describe('#' + name, function () {
        errorTestCases.forEach(function (testCase) {
          context('when ' + testCase, function () {
            it('should throw error', function () {
              expect(function () {
                algorithm(testCase, '');
              }).to.throwError(/input is invalid type/);
            });
          });
        });
      });
    });
  }

  runTestCases('md5_hmac', md5.hmac);
})(md5);
