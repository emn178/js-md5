/*
 * js-md5 v0.1.3
 * https://github.com/emn178/js-md5
 *
 * Copyright 2014-2015, emn178@gmail.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
;(function(root, undefined) {
  'use strict';

  var HEX_CHARS = '0123456789abcdef'.split('');

  var md5 = function(message, asciiOnly) {
    var blocks, h0 = 0x67452301, h1 = 0xEFCDAB89, h2 = 0x98BADCFE, h3 = 0x10325476, 
        a, b, c, d, bc, da;
    if(!asciiOnly && /[^\x00-\x7F]/.test(message)) {
      blocks = getBlocksFromUtf8(message);
    } else {
      blocks = getBlocksFromAscii(message);
    }
    for(var i = 0, length = blocks.length;i < length;i += 16) {
      if(i === 0) {
        a = blocks[i + 0] - 680876937;
        a = ((a << 7 | a >>> 25) - 271733879) << 0;
        d = blocks[i + 1] - 117830708 + ((2004318071 & a) ^ -1732584194);
        d = ((d << 12 | d >>> 20) + a) << 0;
        c = blocks[i + 2] - 1126478375 + (((a ^ -271733879) & d) ^ -271733879);
        c = ((c << 17 | c >>> 15) + d) << 0;
        b = blocks[i + 3] - 1316259209 + (((d ^ a) & c) ^ a);
        b = ((b << 22 | b >>> 10) + c) << 0;
      } else {
        a = h0;
        b = h1;
        c = h2;
        d = h3;
        a += (d ^ (b & (c ^ d))) + blocks[i + 0] - 680876936;
        a = ((a << 7 | a >>> 25) + b) << 0;
        d += (c ^ (a & (b ^ c))) + blocks[i + 1] - 389564586;
        d = ((d << 12 | d >>> 20) + a) << 0;
        c += (b ^ (d & (a ^ b))) + blocks[i + 2] + 606105819;
        c = ((c << 17 | c >>> 15) + d) << 0;
        b += (a ^ (c & (d ^ a))) + blocks[i + 3] - 1044525330;
        b = ((b << 22 | b >>> 10) + c) << 0;
      }

      a += (d ^ (b & (c ^ d))) + blocks[i + 4] - 176418897;
      a = ((a << 7 | a >>> 25) + b) << 0;
      d += (c ^ (a & (b ^ c))) + blocks[i + 5] + 1200080426;
      d = ((d << 12 | d >>> 20) + a) << 0;
      c += (b ^ (d & (a ^ b))) + blocks[i + 6] - 1473231341;
      c = ((c << 17 | c >>> 15) + d) << 0;
      b += (a ^ (c & (d ^ a))) + blocks[i + 7] - 45705983;
      b = ((b << 22 | b >>> 10) + c) << 0;
      a += (d ^ (b & (c ^ d))) + blocks[i + 8] + 1770035416;
      a = ((a << 7 | a >>> 25) + b) << 0;
      d += (c ^ (a & (b ^ c))) + blocks[i + 9] - 1958414417;
      d = ((d << 12 | d >>> 20) + a) << 0;
      c += (b ^ (d & (a ^ b))) + blocks[i + 10] - 42063;
      c = ((c << 17 | c >>> 15) + d) << 0;
      b += (a ^ (c & (d ^ a))) + blocks[i + 11] - 1990404162;
      b = ((b << 22 | b >>> 10) + c) << 0;
      a += (d ^ (b & (c ^ d))) + blocks[i + 12] + 1804603682;
      a = ((a << 7 | a >>> 25) + b) << 0;
      d += (c ^ (a & (b ^ c))) + blocks[i + 13] - 40341101;
      d = ((d << 12 | d >>> 20) + a) << 0;
      c += (b ^ (d & (a ^ b))) + blocks[i + 14] - 1502002290;
      c = ((c << 17 | c >>> 15) + d) << 0;
      b += (a ^ (c & (d ^ a))) + blocks[i + 15] + 1236535329;
      b = ((b << 22 | b >>> 10) + c) << 0;
      a += (c ^ (d & (b ^ c))) + blocks[i + 1] - 165796510;
      a = ((a << 5 | a >>> 27) + b) << 0;
      d += (b ^ (c & (a ^ b))) + blocks[i + 6] - 1069501632;
      d = ((d << 9 | d >>> 23) + a) << 0;
      c += (a ^ (b & (d ^ a))) + blocks[i + 11] + 643717713;
      c = ((c << 14 | c >>> 18) + d) << 0;
      b += (d ^ (a & (c ^ d))) + blocks[i + 0] - 373897302;
      b = ((b << 20 | b >>> 12) + c) << 0;
      a += (c ^ (d & (b ^ c))) + blocks[i + 5] - 701558691;
      a = ((a << 5 | a >>> 27) + b) << 0;
      d += (b ^ (c & (a ^ b))) + blocks[i + 10] + 38016083;
      d = ((d << 9 | d >>> 23) + a) << 0;
      c += (a ^ (b & (d ^ a))) + blocks[i + 15] - 660478335;
      c = ((c << 14 | c >>> 18) + d) << 0;
      b += (d ^ (a & (c ^ d))) + blocks[i + 4] - 405537848;
      b = ((b << 20 | b >>> 12) + c) << 0;
      a += (c ^ (d & (b ^ c))) + blocks[i + 9] + 568446438;
      a = ((a << 5 | a >>> 27) + b) << 0;
      d += (b ^ (c & (a ^ b))) + blocks[i + 14] - 1019803690;
      d = ((d << 9 | d >>> 23) + a) << 0;
      c += (a ^ (b & (d ^ a))) + blocks[i + 3] - 187363961;
      c = ((c << 14 | c >>> 18) + d) << 0;
      b += (d ^ (a & (c ^ d))) + blocks[i + 8] + 1163531501;
      b = ((b << 20 | b >>> 12) + c) << 0;
      a += (c ^ (d & (b ^ c))) + blocks[i + 13] - 1444681467;
      a = ((a << 5 | a >>> 27) + b) << 0;
      d += (b ^ (c & (a ^ b))) + blocks[i + 2] - 51403784;
      d = ((d << 9 | d >>> 23) + a) << 0;
      c += (a ^ (b & (d ^ a))) + blocks[i + 7] + 1735328473;
      c = ((c << 14 | c >>> 18) + d) << 0;
      b += (d ^ (a & (c ^ d))) + blocks[i + 12] - 1926607734;
      b = ((b << 20 | b >>> 12) + c) << 0;
      bc = b ^ c;
      a += (bc ^ d) + blocks[i + 5] - 378558;
      a = ((a << 4 | a >>> 28) + b) << 0;
      bc = b ^ c;
      d += (bc ^ a) + blocks[i + 8] - 2022574463;
      d = ((d << 11 | d >>> 21) + a) << 0;
      da = d ^ a;
      c += (da ^ b) + blocks[i + 11] + 1839030562;
      c = ((c << 16 | c >>> 16) + d) << 0;
      da = d ^ a;
      b += (da ^ c) + blocks[i + 14] - 35309556;
      b = ((b << 23 | b >>> 9) + c) << 0;
      bc = b ^ c;
      a += (bc ^ d) + blocks[i + 1] - 1530992060;
      a = ((a << 4 | a >>> 28) + b) << 0;
      bc = b ^ c;
      d += (bc ^ a) + blocks[i + 4] + 1272893353;
      d = ((d << 11 | d >>> 21) + a) << 0;
      da = d ^ a;
      c += (da ^ b) + blocks[i + 7] - 155497632;
      c = ((c << 16 | c >>> 16) + d) << 0;
      da = d ^ a;
      b += (da ^ c) + blocks[i + 10] - 1094730640;
      b = ((b << 23 | b >>> 9) + c) << 0;
      bc = b ^ c;
      a += (bc ^ d) + blocks[i + 13] + 681279174;
      a = ((a << 4 | a >>> 28) + b) << 0;
      bc = b ^ c;
      d += (bc ^ a) + blocks[i + 0] - 358537222;
      d = ((d << 11 | d >>> 21) + a) << 0;
      da = d ^ a;
      c += (da ^ b) + blocks[i + 3] - 722521979;
      c = ((c << 16 | c >>> 16) + d) << 0;
      da = d ^ a;
      b += (da ^ c) + blocks[i + 6] + 76029189;
      b = ((b << 23 | b >>> 9) + c) << 0;
      bc = b ^ c;
      a += (bc ^ d) + blocks[i + 9] - 640364487;
      a = ((a << 4 | a >>> 28) + b) << 0;
      bc = b ^ c;
      d += (bc ^ a) + blocks[i + 12] - 421815835;
      d = ((d << 11 | d >>> 21) + a) << 0;
      da = d ^ a;
      c += (da ^ b) + blocks[i + 15] + 530742520;
      c = ((c << 16 | c >>> 16) + d) << 0;
      da = d ^ a;
      b += (da ^ c) + blocks[i + 2] - 995338651;
      b = ((b << 23 | b >>> 9) + c) << 0;
      a += (c ^ (b | ~d)) + blocks[i + 0] - 198630844;
      a = ((a << 6 | a >>> 26) + b) << 0;
      d += (b ^ (a | ~c)) + blocks[i + 7] + 1126891415;
      d = ((d << 10 | d >>> 22) + a) << 0;
      c += (a ^ (d | ~b)) + blocks[i + 14] - 1416354905;
      c = ((c << 15 | c >>> 17) + d) << 0;
      b += (d ^ (c | ~a)) + blocks[i + 5] - 57434055;
      b = ((b << 21 | b >>> 11) + c) << 0;
      a += (c ^ (b | ~d)) + blocks[i + 12] + 1700485571;
      a = ((a << 6 | a >>> 26) + b) << 0;
      d += (b ^ (a | ~c)) + blocks[i + 3] - 1894986606;
      d = ((d << 10 | d >>> 22) + a) << 0;
      c += (a ^ (d | ~b)) + blocks[i + 10] - 1051523;
      c = ((c << 15 | c >>> 17) + d) << 0;
      b += (d ^ (c | ~a)) + blocks[i + 1] - 2054922799;
      b = ((b << 21 | b >>> 11) + c) << 0;
      a += (c ^ (b | ~d)) + blocks[i + 8] + 1873313359;
      a = ((a << 6 | a >>> 26) + b) << 0;
      d += (b ^ (a | ~c)) + blocks[i + 15] - 30611744;
      d = ((d << 10 | d >>> 22) + a) << 0;
      c += (a ^ (d | ~b)) + blocks[i + 6] - 1560198380;
      c = ((c << 15 | c >>> 17) + d) << 0;
      b += (d ^ (c | ~a)) + blocks[i + 13] + 1309151649;
      b = ((b << 21 | b >>> 11) + c) << 0;
      a += (c ^ (b | ~d)) + blocks[i + 4] - 145523070;
      a = ((a << 6 | a >>> 26) + b) << 0;
      d += (b ^ (a | ~c)) + blocks[i + 11] - 1120210379;
      d = ((d << 10 | d >>> 22) + a) << 0;
      c += (a ^ (d | ~b)) + blocks[i + 2] + 718787259;
      c = ((c << 15 | c >>> 17) + d) << 0;
      b += (d ^ (c | ~a)) + blocks[i + 9] - 343485551;
      b = ((b << 21 | b >>> 11) + c) << 0;

      h0 = (h0 + a) << 0;
      h1 = (h1 + b) << 0;
      h2 = (h2 + c) << 0;
      h3 = (h3 + d) << 0;
    }

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

  var getBlocksFromAscii = function(message) {
    // a block is 32 bits(4 bytes), a chunk is 512 bits(64 bytes)
    var length = message.length;
    var chunkCount = ((length + 8) >> 6) + 1;
    var blockCount = chunkCount << 4; // chunkCount * 16
    var blocks = [], i;
    for(i = 0;i < blockCount;++i) {
      blocks[i] = 0;
    }
    for(i = 0;i < length;++i) {
      blocks[i >> 2] |= message.charCodeAt(i) << ((i & 3) << 3);
    }
    blocks[i >> 2] |= 0x80 << ((i & 3) << 3);
    blocks[blockCount - 2] = length << 3; // length * 8
    return blocks;
  };

  var getBlocksFromUtf8 = function(message) {
    var bytes = getBytesFromUtf8(message);
    var length = bytes.length;
    var chunkCount = ((length + 8) >> 6) + 1;
    var blockCount = chunkCount << 4; // chunkCount * 16
    var blocks = [], i;
    for(i = 0;i < blockCount;++i) {
      blocks[i] = 0;
    }
    for(i = 0;i < length;++i) {
      blocks[i >> 2] |= bytes[i] << ((i & 3) << 3);
    }
    blocks[i >> 2] |= 0x80 << ((i & 3) << 3);
    blocks[blockCount - 2] = length << 3; // length * 8
    return blocks;
  };

  if(typeof(module) != 'undefined') {
    module.exports = md5;
  } else if(root) {
    root.md5 = md5;
  }
}(this));
