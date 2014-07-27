/*
 * js-md5 v0.1.2
 * https://github.com/emn178/js-md5
 *
 * Copyright 2014, emn178@gmail.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

(function(root, undefined){
  'use strict';

  var HEX_CHARS = "0123456789abcdef";
  var HEX_TABLE = {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15,
    'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15
  };

  var R = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
           5,  9, 14, 20, 5,  9, 14, 20, 5,  9, 14, 20, 5,  9, 14, 20,
           4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
           6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];

  var K = [0XD76AA478, 0XE8C7B756, 0X242070DB, 0XC1BDCEEE,
           0XF57C0FAF, 0X4787C62A, 0XA8304613, 0XFD469501,
           0X698098D8, 0X8B44F7AF, 0XFFFF5BB1, 0X895CD7BE,
           0X6B901122, 0XFD987193, 0XA679438E, 0X49B40821,
           0XF61E2562, 0XC040B340, 0X265E5A51, 0XE9B6C7AA,
           0XD62F105D, 0X02441453, 0XD8A1E681, 0XE7D3FBC8,
           0X21E1CDE6, 0XC33707D6, 0XF4D50D87, 0X455A14ED,
           0XA9E3E905, 0XFCEFA3F8, 0X676F02D9, 0X8D2A4C8A,
           0XFFFA3942, 0X8771F681, 0X6D9D6122, 0XFDE5380C,
           0XA4BEEA44, 0X4BDECFA9, 0XF6BB4B60, 0XBEBFBC70,
           0X289B7EC6, 0XEAA127FA, 0XD4EF3085, 0X04881D05,
           0XD9D4D039, 0XE6DB99E5, 0X1FA27CF8, 0XC4AC5665,
           0XF4292244, 0X432AFF97, 0XAB9423A7, 0XFC93A039,
           0X655B59C3, 0X8F0CCC92, 0XFFEFF47D, 0X85845DD1,
           0X6FA87E4F, 0XFE2CE6E0, 0XA3014314, 0X4E0811A1,
           0XF7537E82, 0XBD3AF235, 0X2AD7D2BB, 0XEB86D391];

  var md5 = function(message) {
    var blocks = hasUTF8(message) ? UTF8toBlocks(message) : ASCIItoBlocks(message);
    var h0 = 0x67452301;
    var h1 = 0xEFCDAB89;
    var h2 = 0x98BADCFE;
    var h3 = 0x10325476;

    for(var i = 0, length = blocks.length;i < length;i += 16)
    {
      var a = h0;
      var b = h1;
      var c = h2;
      var d = h3;
      var f, g, tmp, x, y;

      for(var j = 0;j < 64;++j)
      {
        if(j < 16)
        {
          // f = (b & c) | ((~b) & d);
          f = d ^ (b & (c ^ d));
          g = j;
        }
        else if(j < 32)
        {
          // f = (d & b) | ((~d) & c);
          f = c ^ (d & (b ^ c));
          g = (5 * j + 1) % 16;
        }
        else if(j < 48)
        {
          f = b ^ c ^ d;
          g = (3 * j + 5) % 16;
        }
        else
        {
          f = c ^ (b | (~d));
          g = (7 * j) % 16;
        }

        tmp = d;
        d = c
        c = b

        // leftrotate
        x = (a + f + K[j] + blocks[i + g]);
        y = R[j];
        b += (x << y) | (x >>> (32 - y));
        a = tmp;
      }
      h0 = (h0 + a) | 0;
      h1 = (h1 + b) | 0;
      h2 = (h2 + c) | 0;
      h3 = (h3 + d) | 0;
    }
    return toHexString(h0) + toHexString(h1) + toHexString(h2) + toHexString(h3);
  };

  var toHexString = function(num) {
    var hex = "";
    for(var i = 0; i < 4; i++)
    {
      var offset = i << 3;
      hex += HEX_CHARS.charAt((num >> (offset + 4)) & 0x0F) + HEX_CHARS.charAt((num >> offset) & 0x0F);
    }
    return hex;
  };

  var hasUTF8 = function(message) {
    var i = message.length;
    while(i--)
      if(message.charCodeAt(i) > 127)
        return true;
    return false;
  };

  var ASCIItoBlocks = function(message) {
    // a block is 32 bits(4 bytes), a chunk is 512 bits(64 bytes)
    var length = message.length;
    var chunkCount = ((length + 8) >> 6) + 1;
    var blockCount = chunkCount << 4; // chunkCount * 16
    var blocks = [];
    var i;
    for(i = 0;i < blockCount;++i)
      blocks[i] = 0;
    for(i = 0;i < length;++i)
      blocks[i >> 2] |= message.charCodeAt(i) << ((i % 4) << 3);
    blocks[i >> 2] |= 0x80 << ((i % 4) << 3);
    blocks[blockCount - 2] = length << 3; // length * 8
    return blocks;
  };

  var UTF8toBlocks = function(message) {
    var uri = encodeURIComponent(message);
    var blocks = [];
    for(var i = 0, bytes = 0, length = uri.length;i < length;++i)
    {
      var c = uri.charCodeAt(i);
      if(c == 37) // %
        blocks[bytes >> 2] |= ((HEX_TABLE[uri.charAt(++i)] << 4) | HEX_TABLE[uri.charAt(++i)]) << ((bytes % 4) << 3);
      else
        blocks[bytes >> 2] |= c << ((bytes % 4) << 3);
      ++bytes;
    }
    var chunkCount = ((bytes + 8) >> 6) + 1;
    var blockCount = chunkCount << 4; // chunkCount * 16
    var index = bytes >> 2;
    blocks[index] |= 0x80 << ((bytes % 4) << 3);
    for(var i = index + 1;i < blockCount;++i)
      blocks[i] = 0;
    blocks[blockCount - 2] = bytes << 3; // bytes * 8
    return blocks;
  };

  if(typeof(module) != 'undefined')
    module.exports = md5;
  else if(root)
    root.md5 = md5;
}(this));
