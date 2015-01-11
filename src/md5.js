/*
 * js-md5 v0.1.4
 * https://github.com/emn178/js-md5
 *
 * Copyright 2014-2015, emn178@gmail.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
;(function(root, undefined) {
  'use strict';

  if(typeof(module) != 'undefined') {
    root = global;
  }

  var HEX_CHARS = '0123456789abcdef'.split('');

  var blocks = [];
  if(!root.JS_MD5_TEST && typeof(ArrayBuffer) != 'undefined') {
    var buffer = new ArrayBuffer(64);
    var buffer8 = new Uint8Array(buffer);
    blocks = new Uint32Array(buffer);
  }

  var md5 = function(message, asciiOnly) {
    var h0 = 0x67452301, h1 = 0xEFCDAB89, h2 = 0x98BADCFE, h3 = 0x10325476, 
        a, b, c, d, bc, da, index = 0, bytes, length, utf8 = false, i;
    if(!asciiOnly && /[^\x00-\x7F]/.test(message)) {
      utf8 = true;
      bytes = getBytesFromUtf8(message);
      length = bytes.length;
    } else {
      length = message.length;
    }
    do {
      if(length - index > 64) {
        if(utf8) {
          if(buffer8) {
            for(i = 0;i < 64;++i) {
              buffer8[i] = bytes[index++];
            }
          } else {
            for(i = 0;i < 16;++i) {
              blocks[i] = bytes[index++] |
                          bytes[index++] << 8 |
                          bytes[index++] << 16 |
                          bytes[index++] << 24;
            }
          }
        } else {
          if(buffer8) {
            for(i = 0;i < 64;++i) {
              buffer8[i] = message.charCodeAt(index++);
            }
          } else {
            for(i = 0;i < 16;++i) {
              blocks[i] = message.charCodeAt(index++) |
                          message.charCodeAt(index++) << 8 |
                          message.charCodeAt(index++) << 16 |
                          message.charCodeAt(index++) << 24;
            }
          }
        }
      } else {
        blocks[0] = blocks[1] = blocks[2] = blocks[3] =
        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
        if(utf8) {
          if(buffer8) {
            for(i = 0;index < length;++index, ++i) {
              buffer8[i] = bytes[index];
            }
          } else {
            for(i = 0;index < length;++index, ++i) {
              blocks[i >> 2] |= bytes[index] <<((i & 3) << 3);
            }
          }
        } else {
          if(buffer8) {
            for(i = 0;index < length;++index, ++i) {
              buffer8[i] = message.charCodeAt(index);
            }
          } else {
            for(i = 0;index < length;++index, ++i) {
              blocks[i >> 2] |= message.charCodeAt(index) << ((i & 3) << 3);
            }
          }
        }
        blocks[i >> 2] |= 0x80 << ((i & 3) << 3);
        blocks[14] = length << 3;
      }

      if(index === 64) {
        a = blocks[0] - 680876937 << 0;
        a = (a << 7 | a >>> 25) - 271733879 << 0;
        d = blocks[1] - 117830708 + ((2004318071 & a) ^ -1732584194) << 0;
        d = (d << 12 | d >>> 20) + a << 0;
        c = blocks[2] - 1126478375 + (((a ^ -271733879) & d) ^ -271733879) << 0;
        c = (c << 17 | c >>> 15) + d << 0;
        b = blocks[3] - 1316259209 + (((d ^ a) & c) ^ a) << 0;
        b = (b << 22 | b >>> 10) + c << 0;
      } else {
        a = h0;
        b = h1;
        c = h2;
        d = h3;
        a += (d ^ (b & (c ^ d))) + blocks[0] - 680876936 << 0;
        a = (a << 7 | a >>> 25) + b << 0;
        d += (c ^ (a & (b ^ c))) + blocks[1] - 389564586 << 0;
        d = (d << 12 | d >>> 20) + a << 0;
        c += (b ^ (d & (a ^ b))) + blocks[2] + 606105819 << 0;
        c = (c << 17 | c >>> 15) + d << 0;
        b += (a ^ (c & (d ^ a))) + blocks[3] - 1044525330 << 0;
        b = (b << 22 | b >>> 10) + c << 0;
      }

      a += (d ^ (b & (c ^ d))) + blocks[4] - 176418897 << 0;
      a = (a << 7 | a >>> 25) + b << 0;
      d += (c ^ (a & (b ^ c))) + blocks[5] + 1200080426 << 0;
      d = (d << 12 | d >>> 20) + a << 0;
      c += (b ^ (d & (a ^ b))) + blocks[6] - 1473231341 << 0;
      c = (c << 17 | c >>> 15) + d << 0;
      b += (a ^ (c & (d ^ a))) + blocks[7] - 45705983 << 0;
      b = (b << 22 | b >>> 10) + c << 0;
      a += (d ^ (b & (c ^ d))) + blocks[8] + 1770035416 << 0;
      a = (a << 7 | a >>> 25) + b << 0;
      d += (c ^ (a & (b ^ c))) + blocks[9] - 1958414417 << 0;
      d = (d << 12 | d >>> 20) + a << 0;
      c += (b ^ (d & (a ^ b))) + blocks[10] - 42063 << 0;
      c = (c << 17 | c >>> 15) + d << 0;
      b += (a ^ (c & (d ^ a))) + blocks[11] - 1990404162 << 0;
      b = (b << 22 | b >>> 10) + c << 0;
      a += (d ^ (b & (c ^ d))) + blocks[12] + 1804603682 << 0;
      a = (a << 7 | a >>> 25) + b << 0;
      d += (c ^ (a & (b ^ c))) + blocks[13] - 40341101 << 0;
      d = (d << 12 | d >>> 20) + a << 0;
      c += (b ^ (d & (a ^ b))) + blocks[14] - 1502002290 << 0;
      c = (c << 17 | c >>> 15) + d << 0;
      b += (a ^ (c & (d ^ a))) + blocks[15] + 1236535329 << 0;
      b = (b << 22 | b >>> 10) + c << 0;
      a += (c ^ (d & (b ^ c))) + blocks[1] - 165796510 << 0;
      a = (a << 5 | a >>> 27) + b << 0;
      d += (b ^ (c & (a ^ b))) + blocks[6] - 1069501632 << 0;
      d = (d << 9 | d >>> 23) + a << 0;
      c += (a ^ (b & (d ^ a))) + blocks[11] + 643717713 << 0;
      c = (c << 14 | c >>> 18) + d << 0;
      b += (d ^ (a & (c ^ d))) + blocks[0] - 373897302 << 0;
      b = (b << 20 | b >>> 12) + c << 0;
      a += (c ^ (d & (b ^ c))) + blocks[5] - 701558691 << 0;
      a = (a << 5 | a >>> 27) + b << 0;
      d += (b ^ (c & (a ^ b))) + blocks[10] + 38016083 << 0;
      d = (d << 9 | d >>> 23) + a << 0;
      c += (a ^ (b & (d ^ a))) + blocks[15] - 660478335 << 0;
      c = (c << 14 | c >>> 18) + d << 0;
      b += (d ^ (a & (c ^ d))) + blocks[4] - 405537848 << 0;
      b = (b << 20 | b >>> 12) + c << 0;
      a += (c ^ (d & (b ^ c))) + blocks[9] + 568446438 << 0;
      a = (a << 5 | a >>> 27) + b << 0;
      d += (b ^ (c & (a ^ b))) + blocks[14] - 1019803690 << 0;
      d = (d << 9 | d >>> 23) + a << 0;
      c += (a ^ (b & (d ^ a))) + blocks[3] - 187363961 << 0;
      c = (c << 14 | c >>> 18) + d << 0;
      b += (d ^ (a & (c ^ d))) + blocks[8] + 1163531501 << 0;
      b = (b << 20 | b >>> 12) + c << 0;
      a += (c ^ (d & (b ^ c))) + blocks[13] - 1444681467 << 0;
      a = (a << 5 | a >>> 27) + b << 0;
      d += (b ^ (c & (a ^ b))) + blocks[2] - 51403784 << 0;
      d = (d << 9 | d >>> 23) + a << 0;
      c += (a ^ (b & (d ^ a))) + blocks[7] + 1735328473 << 0;
      c = (c << 14 | c >>> 18) + d << 0;
      b += (d ^ (a & (c ^ d))) + blocks[12] - 1926607734 << 0;
      b = (b << 20 | b >>> 12) + c << 0;
      bc = b ^ c;
      a += (bc ^ d) + blocks[5] - 378558 << 0;
      a = (a << 4 | a >>> 28) + b << 0;
      bc = b ^ c;
      d += (bc ^ a) + blocks[8] - 2022574463 << 0;
      d = (d << 11 | d >>> 21) + a << 0;
      da = d ^ a;
      c += (da ^ b) + blocks[11] + 1839030562 << 0;
      c = (c << 16 | c >>> 16) + d << 0;
      da = d ^ a;
      b += (da ^ c) + blocks[14] - 35309556 << 0;
      b = (b << 23 | b >>> 9) + c << 0;
      bc = b ^ c;
      a += (bc ^ d) + blocks[1] - 1530992060 << 0;
      a = (a << 4 | a >>> 28) + b << 0;
      bc = b ^ c;
      d += (bc ^ a) + blocks[4] + 1272893353 << 0;
      d = (d << 11 | d >>> 21) + a << 0;
      da = d ^ a;
      c += (da ^ b) + blocks[7] - 155497632 << 0;
      c = (c << 16 | c >>> 16) + d << 0;
      da = d ^ a;
      b += (da ^ c) + blocks[10] - 1094730640 << 0;
      b = (b << 23 | b >>> 9) + c << 0;
      bc = b ^ c;
      a += (bc ^ d) + blocks[13] + 681279174 << 0;
      a = (a << 4 | a >>> 28) + b << 0;
      bc = b ^ c;
      d += (bc ^ a) + blocks[0] - 358537222 << 0;
      d = (d << 11 | d >>> 21) + a << 0;
      da = d ^ a;
      c += (da ^ b) + blocks[3] - 722521979 << 0;
      c = (c << 16 | c >>> 16) + d << 0;
      da = d ^ a;
      b += (da ^ c) + blocks[6] + 76029189 << 0;
      b = (b << 23 | b >>> 9) + c << 0;
      bc = b ^ c;
      a += (bc ^ d) + blocks[9] - 640364487 << 0;
      a = (a << 4 | a >>> 28) + b << 0;
      bc = b ^ c;
      d += (bc ^ a) + blocks[12] - 421815835 << 0;
      d = (d << 11 | d >>> 21) + a << 0;
      da = d ^ a;
      c += (da ^ b) + blocks[15] + 530742520 << 0;
      c = (c << 16 | c >>> 16) + d << 0;
      da = d ^ a;
      b += (da ^ c) + blocks[2] - 995338651 << 0;
      b = (b << 23 | b >>> 9) + c << 0;
      a += (c ^ (b | ~d)) + blocks[0] - 198630844 << 0;
      a = (a << 6 | a >>> 26) + b << 0;
      d += (b ^ (a | ~c)) + blocks[7] + 1126891415 << 0;
      d = (d << 10 | d >>> 22) + a << 0;
      c += (a ^ (d | ~b)) + blocks[14] - 1416354905 << 0;
      c = (c << 15 | c >>> 17) + d << 0;
      b += (d ^ (c | ~a)) + blocks[5] - 57434055 << 0;
      b = (b << 21 | b >>> 11) + c << 0;
      a += (c ^ (b | ~d)) + blocks[12] + 1700485571 << 0;
      a = (a << 6 | a >>> 26) + b << 0;
      d += (b ^ (a | ~c)) + blocks[3] - 1894986606 << 0;
      d = (d << 10 | d >>> 22) + a << 0;
      c += (a ^ (d | ~b)) + blocks[10] - 1051523 << 0;
      c = (c << 15 | c >>> 17) + d << 0;
      b += (d ^ (c | ~a)) + blocks[1] - 2054922799 << 0;
      b = (b << 21 | b >>> 11) + c << 0;
      a += (c ^ (b | ~d)) + blocks[8] + 1873313359 << 0;
      a = (a << 6 | a >>> 26) + b << 0;
      d += (b ^ (a | ~c)) + blocks[15] - 30611744 << 0;
      d = (d << 10 | d >>> 22) + a << 0;
      c += (a ^ (d | ~b)) + blocks[6] - 1560198380 << 0;
      c = (c << 15 | c >>> 17) + d << 0;
      b += (d ^ (c | ~a)) + blocks[13] + 1309151649 << 0;
      b = (b << 21 | b >>> 11) + c << 0;
      a += (c ^ (b | ~d)) + blocks[4] - 145523070 << 0;
      a = (a << 6 | a >>> 26) + b << 0;
      d += (b ^ (a | ~c)) + blocks[11] - 1120210379 << 0;
      d = (d << 10 | d >>> 22) + a << 0;
      c += (a ^ (d | ~b)) + blocks[2] + 718787259 << 0;
      c = (c << 15 | c >>> 17) + d << 0;
      b += (d ^ (c | ~a)) + blocks[9] - 343485551 << 0;
      b = (b << 21 | b >>> 11) + c << 0;

      h0 = h0 + a << 0;
      h1 = h1 + b << 0;
      h2 = h2 + c << 0;
      h3 = h3 + d << 0;
    } while(index < length);

    return toHexString(h0) + toHexString(h1) + toHexString(h2) + toHexString(h3);
  };

  var toHexString = function(num) {
    var hex = '';
    for(var i = 0; i < 4; i++) {
      var offset = i << 3;
      hex += HEX_CHARS[(num >> (offset + 4)) & 0x0F] + HEX_CHARS[(num >> offset) & 0x0F];
    }
    return hex;
  };

  var getBytesFromUtf8 = function(str) {
    var bytes = [], index = 0;
    for (var i = 0;i < str.length; i++) {
      var c = str.charCodeAt(i);
      if (c < 0x80) {
        bytes[index++] = c;
      } else if (c < 0x800) {
        bytes[index++] = 0xc0 | (c >> 6);
        bytes[index++] = 0x80 | (c & 0x3f);
      } else if (c < 0xd800 || c >= 0xe000) {
        bytes[index++] = 0xe0 | (c >> 12);
        bytes[index++] = 0x80 | ((c >> 6) & 0x3f);
        bytes[index++] = 0x80 | (c & 0x3f);
      } else {
        c = 0x10000 + (((c & 0x3ff) << 10) | (str.charCodeAt(++i) & 0x3ff));
        bytes[index++] = 0xf0 | (c >> 18);
        bytes[index++] = 0x80 | ((c >> 12) & 0x3f);
        bytes[index++] = 0x80 | ((c >> 6) & 0x3f);
        bytes[index++] = 0x80 | (c & 0x3f);
      }
    }
    return bytes;
  };

  if(!root.JS_MD5_TEST && typeof(module) != 'undefined') {
    module.exports = md5;
  } else if(root) {
    root.md5 = md5;
  }
}(this));
