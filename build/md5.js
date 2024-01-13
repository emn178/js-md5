/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.8.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2023
 * @license MIT
 */
(function() {
    "use strict";
    var root = "object" === typeof window ? window : {};
    var WEB_WORKER = "undefined" !== typeof WorkerGlobalScope && !!WorkerGlobalScope;
    var NODE_JS = "object" === typeof process && process.versions && process.versions.node;
    NODE_JS ? root = global : WEB_WORKER && (root = self);
    var COMMON_JS = "object" === typeof module && module.exports;
    var AMD = "function" === typeof define && define.amd;
    var ArrayBuffer_ = ArrayBuffer;
    var HEX_CHARS = "0123456789abcdef".split("");
    var EXTRA = [ 128, 32768, 8388608, -2147483648 ];
    var OUTPUT_TYPES = [ "hex", "array", "digest", "buffer", "arrayBuffer", "base64" ];
    var BASE64_ENCODE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    var isArray = Array.isArray;
    var isView = ArrayBuffer_.isView;
    isArray || (isArray = function(obj) {
        return "[object Array]" === Object.prototype.toString.call(obj);
    }), isView || (isView = function(obj) {
        return "object" === typeof obj && obj.buffer && obj.buffer.constructor === ArrayBuffer_;
    });
    var buffer8, blocks = [];
    var buffer;
    buffer = new ArrayBuffer_(68), buffer8 = new Uint8Array(buffer), blocks = new Uint32Array(buffer);
    var formatMessage = function(message) {
        var type = typeof message;
        if ("string" === type) return [ message, true ];
        if ("object" !== type || null === message) throw new Error("input is invalid type");
        if (message.constructor === ArrayBuffer_) return [ new Uint8Array(message), false ];
        if (isArray(message) || isView(message)) return [ message, false ];
        throw new Error("input is invalid type");
    };
    function Md5(sharedMemory) {
        var buffer;
        sharedMemory ? (blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0, 
        this.blocks = blocks, this.buffer8 = buffer8) : (buffer = new ArrayBuffer_(68), 
        this.buffer8 = new Uint8Array(buffer), this.blocks = new Uint32Array(buffer)), 
        this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0, 
        this.finalized = this.hashed = false, this.first = true;
    }
    Md5.prototype.update = function(message) {
        if (this.finalized) throw new Error("finalize already called");
        var result = formatMessage(message);
        message = result[0];
        var isString = result[1];
        var code, i, index = 0, length = message.length, blocks = this.blocks;
        var buffer8 = this.buffer8;
        while (index < length) {
            if (this.hashed && (this.hashed = false, blocks[0] = blocks[16], blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0), 
            isString) for (i = this.start; index < length && i < 64; ++index) code = message.charCodeAt(index), 
            code < 128 ? buffer8[i++] = code : (code < 2048 ? buffer8[i++] = 192 | code >>> 6 : (code < 55296 || code >= 57344 ? buffer8[i++] = 224 | code >>> 12 : (code = 65536 + ((1023 & code) << 10 | 1023 & message.charCodeAt(++index)), 
            buffer8[i++] = 240 | code >>> 18, buffer8[i++] = 128 | code >>> 12 & 63), 
            buffer8[i++] = 128 | code >>> 6 & 63), buffer8[i++] = 128 | 63 & code); else for (i = this.start; index < length && i < 64; ++index) buffer8[i++] = message[index];
            this.lastByteIndex = i, this.bytes += i - this.start, i >= 64 ? (this.start = i - 64, 
            this.hash(), this.hashed = true) : this.start = i;
        }
        return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, 
        this.bytes = this.bytes % 4294967296), this;
    }, Md5.prototype.finalize = function() {
        if (this.finalized) return;
        this.finalized = true;
        var blocks = this.blocks, i = this.lastByteIndex;
        blocks[i >>> 2] |= EXTRA[3 & i], i >= 56 && (this.hashed || this.hash(), 
        blocks[0] = blocks[16], blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0), 
        blocks[14] = this.bytes << 3, blocks[15] = this.hBytes << 3 | this.bytes >>> 29, 
        this.hash();
    }, Md5.prototype.hash = function() {
        var a, b, c, d, bc, da, blocks = this.blocks;
        this.first ? (a = blocks[0] - 680876937, a = (a << 7 | a >>> 25) - 271733879 << 0, 
        d = (-1732584194 ^ 2004318071 & a) + blocks[1] - 117830708, d = (d << 12 | d >>> 20) + a << 0, 
        c = (-271733879 ^ d & (-271733879 ^ a)) + blocks[2] - 1126478375, c = (c << 17 | c >>> 15) + d << 0, 
        b = (a ^ c & (d ^ a)) + blocks[3] - 1316259209) : (a = this.h0, b = this.h1, 
        c = this.h2, d = this.h3, a += (d ^ b & (c ^ d)) + blocks[0] - 680876936, 
        a = (a << 7 | a >>> 25) + b << 0, d += (c ^ a & (b ^ c)) + blocks[1] - 389564586, 
        d = (d << 12 | d >>> 20) + a << 0, c += (b ^ d & (a ^ b)) + blocks[2] + 606105819, 
        c = (c << 17 | c >>> 15) + d << 0, b += (a ^ c & (d ^ a)) + blocks[3] - 1044525330), 
        b = (b << 22 | b >>> 10) + c << 0, a += (d ^ b & (c ^ d)) + blocks[4] - 176418897, 
        a = (a << 7 | a >>> 25) + b << 0, d += (c ^ a & (b ^ c)) + blocks[5] + 1200080426, 
        d = (d << 12 | d >>> 20) + a << 0, c += (b ^ d & (a ^ b)) + blocks[6] - 1473231341, 
        c = (c << 17 | c >>> 15) + d << 0, b += (a ^ c & (d ^ a)) + blocks[7] - 45705983, 
        b = (b << 22 | b >>> 10) + c << 0, a += (d ^ b & (c ^ d)) + blocks[8] + 1770035416, 
        a = (a << 7 | a >>> 25) + b << 0, d += (c ^ a & (b ^ c)) + blocks[9] - 1958414417, 
        d = (d << 12 | d >>> 20) + a << 0, c += (b ^ d & (a ^ b)) + blocks[10] - 42063, 
        c = (c << 17 | c >>> 15) + d << 0, b += (a ^ c & (d ^ a)) + blocks[11] - 1990404162, 
        b = (b << 22 | b >>> 10) + c << 0, a += (d ^ b & (c ^ d)) + blocks[12] + 1804603682, 
        a = (a << 7 | a >>> 25) + b << 0, d += (c ^ a & (b ^ c)) + blocks[13] - 40341101, 
        d = (d << 12 | d >>> 20) + a << 0, c += (b ^ d & (a ^ b)) + blocks[14] - 1502002290, 
        c = (c << 17 | c >>> 15) + d << 0, b += (a ^ c & (d ^ a)) + blocks[15] + 1236535329, 
        b = (b << 22 | b >>> 10) + c << 0, a += (c ^ d & (b ^ c)) + blocks[1] - 165796510, 
        a = (a << 5 | a >>> 27) + b << 0, d += (b ^ c & (a ^ b)) + blocks[6] - 1069501632, 
        d = (d << 9 | d >>> 23) + a << 0, c += (a ^ b & (d ^ a)) + blocks[11] + 643717713, 
        c = (c << 14 | c >>> 18) + d << 0, b += (d ^ a & (c ^ d)) + blocks[0] - 373897302, 
        b = (b << 20 | b >>> 12) + c << 0, a += (c ^ d & (b ^ c)) + blocks[5] - 701558691, 
        a = (a << 5 | a >>> 27) + b << 0, d += (b ^ c & (a ^ b)) + blocks[10] + 38016083, 
        d = (d << 9 | d >>> 23) + a << 0, c += (a ^ b & (d ^ a)) + blocks[15] - 660478335, 
        c = (c << 14 | c >>> 18) + d << 0, b += (d ^ a & (c ^ d)) + blocks[4] - 405537848, 
        b = (b << 20 | b >>> 12) + c << 0, a += (c ^ d & (b ^ c)) + blocks[9] + 568446438, 
        a = (a << 5 | a >>> 27) + b << 0, d += (b ^ c & (a ^ b)) + blocks[14] - 1019803690, 
        d = (d << 9 | d >>> 23) + a << 0, c += (a ^ b & (d ^ a)) + blocks[3] - 187363961, 
        c = (c << 14 | c >>> 18) + d << 0, b += (d ^ a & (c ^ d)) + blocks[8] + 1163531501, 
        b = (b << 20 | b >>> 12) + c << 0, a += (c ^ d & (b ^ c)) + blocks[13] - 1444681467, 
        a = (a << 5 | a >>> 27) + b << 0, d += (b ^ c & (a ^ b)) + blocks[2] - 51403784, 
        d = (d << 9 | d >>> 23) + a << 0, c += (a ^ b & (d ^ a)) + blocks[7] + 1735328473, 
        c = (c << 14 | c >>> 18) + d << 0, b += (d ^ a & (c ^ d)) + blocks[12] - 1926607734, 
        b = (b << 20 | b >>> 12) + c << 0, bc = b ^ c, a += (bc ^ d) + blocks[5] - 378558, 
        a = (a << 4 | a >>> 28) + b << 0, d += (bc ^ a) + blocks[8] - 2022574463, 
        d = (d << 11 | d >>> 21) + a << 0, da = d ^ a, c += (da ^ b) + blocks[11] + 1839030562, 
        c = (c << 16 | c >>> 16) + d << 0, b += (da ^ c) + blocks[14] - 35309556, 
        b = (b << 23 | b >>> 9) + c << 0, bc = b ^ c, a += (bc ^ d) + blocks[1] - 1530992060, 
        a = (a << 4 | a >>> 28) + b << 0, d += (bc ^ a) + blocks[4] + 1272893353, 
        d = (d << 11 | d >>> 21) + a << 0, da = d ^ a, c += (da ^ b) + blocks[7] - 155497632, 
        c = (c << 16 | c >>> 16) + d << 0, b += (da ^ c) + blocks[10] - 1094730640, 
        b = (b << 23 | b >>> 9) + c << 0, bc = b ^ c, a += (bc ^ d) + blocks[13] + 681279174, 
        a = (a << 4 | a >>> 28) + b << 0, d += (bc ^ a) + blocks[0] - 358537222, 
        d = (d << 11 | d >>> 21) + a << 0, da = d ^ a, c += (da ^ b) + blocks[3] - 722521979, 
        c = (c << 16 | c >>> 16) + d << 0, b += (da ^ c) + blocks[6] + 76029189, 
        b = (b << 23 | b >>> 9) + c << 0, bc = b ^ c, a += (bc ^ d) + blocks[9] - 640364487, 
        a = (a << 4 | a >>> 28) + b << 0, d += (bc ^ a) + blocks[12] - 421815835, 
        d = (d << 11 | d >>> 21) + a << 0, da = d ^ a, c += (da ^ b) + blocks[15] + 530742520, 
        c = (c << 16 | c >>> 16) + d << 0, b += (da ^ c) + blocks[2] - 995338651, 
        b = (b << 23 | b >>> 9) + c << 0, a += (c ^ (b | ~d)) + blocks[0] - 198630844, 
        a = (a << 6 | a >>> 26) + b << 0, d += (b ^ (a | ~c)) + blocks[7] + 1126891415, 
        d = (d << 10 | d >>> 22) + a << 0, c += (a ^ (d | ~b)) + blocks[14] - 1416354905, 
        c = (c << 15 | c >>> 17) + d << 0, b += (d ^ (c | ~a)) + blocks[5] - 57434055, 
        b = (b << 21 | b >>> 11) + c << 0, a += (c ^ (b | ~d)) + blocks[12] + 1700485571, 
        a = (a << 6 | a >>> 26) + b << 0, d += (b ^ (a | ~c)) + blocks[3] - 1894986606, 
        d = (d << 10 | d >>> 22) + a << 0, c += (a ^ (d | ~b)) + blocks[10] - 1051523, 
        c = (c << 15 | c >>> 17) + d << 0, b += (d ^ (c | ~a)) + blocks[1] - 2054922799, 
        b = (b << 21 | b >>> 11) + c << 0, a += (c ^ (b | ~d)) + blocks[8] + 1873313359, 
        a = (a << 6 | a >>> 26) + b << 0, d += (b ^ (a | ~c)) + blocks[15] - 30611744, 
        d = (d << 10 | d >>> 22) + a << 0, c += (a ^ (d | ~b)) + blocks[6] - 1560198380, 
        c = (c << 15 | c >>> 17) + d << 0, b += (d ^ (c | ~a)) + blocks[13] + 1309151649, 
        b = (b << 21 | b >>> 11) + c << 0, a += (c ^ (b | ~d)) + blocks[4] - 145523070, 
        a = (a << 6 | a >>> 26) + b << 0, d += (b ^ (a | ~c)) + blocks[11] - 1120210379, 
        d = (d << 10 | d >>> 22) + a << 0, c += (a ^ (d | ~b)) + blocks[2] + 718787259, 
        c = (c << 15 | c >>> 17) + d << 0, b += (d ^ (c | ~a)) + blocks[9] - 343485551, 
        b = (b << 21 | b >>> 11) + c << 0, this.first ? (this.h0 = a + 1732584193 << 0, 
        this.h1 = b - 271733879 << 0, this.h2 = c - 1732584194 << 0, this.h3 = d + 271733878 << 0, 
        this.first = false) : (this.h0 = this.h0 + a << 0, this.h1 = this.h1 + b << 0, 
        this.h2 = this.h2 + c << 0, this.h3 = this.h3 + d << 0);
    }, Md5.prototype.hex = function() {
        this.finalize();
        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
        return HEX_CHARS[h0 >>> 4 & 15] + HEX_CHARS[15 & h0] + HEX_CHARS[h0 >>> 12 & 15] + HEX_CHARS[h0 >>> 8 & 15] + HEX_CHARS[h0 >>> 20 & 15] + HEX_CHARS[h0 >>> 16 & 15] + HEX_CHARS[h0 >>> 28 & 15] + HEX_CHARS[h0 >>> 24 & 15] + HEX_CHARS[h1 >>> 4 & 15] + HEX_CHARS[15 & h1] + HEX_CHARS[h1 >>> 12 & 15] + HEX_CHARS[h1 >>> 8 & 15] + HEX_CHARS[h1 >>> 20 & 15] + HEX_CHARS[h1 >>> 16 & 15] + HEX_CHARS[h1 >>> 28 & 15] + HEX_CHARS[h1 >>> 24 & 15] + HEX_CHARS[h2 >>> 4 & 15] + HEX_CHARS[15 & h2] + HEX_CHARS[h2 >>> 12 & 15] + HEX_CHARS[h2 >>> 8 & 15] + HEX_CHARS[h2 >>> 20 & 15] + HEX_CHARS[h2 >>> 16 & 15] + HEX_CHARS[h2 >>> 28 & 15] + HEX_CHARS[h2 >>> 24 & 15] + HEX_CHARS[h3 >>> 4 & 15] + HEX_CHARS[15 & h3] + HEX_CHARS[h3 >>> 12 & 15] + HEX_CHARS[h3 >>> 8 & 15] + HEX_CHARS[h3 >>> 20 & 15] + HEX_CHARS[h3 >>> 16 & 15] + HEX_CHARS[h3 >>> 28 & 15] + HEX_CHARS[h3 >>> 24 & 15];
    }, Md5.prototype.toString = Md5.prototype.hex, Md5.prototype.digest = function() {
        this.finalize();
        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
        return [ 255 & h0, h0 >>> 8 & 255, h0 >>> 16 & 255, h0 >>> 24 & 255, 255 & h1, h1 >>> 8 & 255, h1 >>> 16 & 255, h1 >>> 24 & 255, 255 & h2, h2 >>> 8 & 255, h2 >>> 16 & 255, h2 >>> 24 & 255, 255 & h3, h3 >>> 8 & 255, h3 >>> 16 & 255, h3 >>> 24 & 255 ];
    }, Md5.prototype.array = Md5.prototype.digest, Md5.prototype.arrayBuffer = function() {
        this.finalize();
        var buffer = new ArrayBuffer(16);
        var blocks = new Uint32Array(buffer);
        return blocks[0] = this.h0, blocks[1] = this.h1, blocks[2] = this.h2, blocks[3] = this.h3, 
        buffer;
    }, Md5.prototype.buffer = Md5.prototype.arrayBuffer, Md5.prototype.base64 = function() {
        var v1, v2, v3, base64Str = "", bytes = this.array();
        for (var i = 0; i < 15; ) v1 = bytes[i++], v2 = bytes[i++], v3 = bytes[i++], 
        base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] + BASE64_ENCODE_CHAR[63 & (v1 << 4 | v2 >>> 4)] + BASE64_ENCODE_CHAR[63 & (v2 << 2 | v3 >>> 6)] + BASE64_ENCODE_CHAR[63 & v3];
        return v1 = bytes[i], base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] + BASE64_ENCODE_CHAR[v1 << 4 & 63] + "==", 
        base64Str;
    };
    var nodeJsEnv = NODE_JS ? {
        crypto: require("crypto"),
        Buffer: require("buffer").Buffer,
        bufferFrom: Buffer.from && true ? Buffer.from : function(message) {
            return new Buffer(message);
        }
    } : {};
    var createOutputMethod = function(outputType) {
        return function(message) {
            return new Md5(true).update(message)[outputType]();
        };
    };
    var md5Base = createOutputMethod("hex");
    NODE_JS && function() {
        var md5BaseOriginal = md5Base;
        var {
            crypto,
            Buffer,
            bufferFrom
        } = nodeJsEnv;
        md5Base = function(message) {
            if (null === message || void 0 === message) throw new Error("input is invalid type");
            if ("string" === typeof message) return crypto.createHash("md5").update(message, "utf8").digest("hex");
            if (message.constructor === ArrayBuffer_ && (message = new Uint8Array(message)), 
            isArray(message) || isView(message) || message.constructor === Buffer) return crypto.createHash("md5").update(bufferFrom(message)).digest("hex");
            return md5BaseOriginal(message);
        };
    }(), md5Base.create = function() {
        return new Md5();
    }, md5Base.update = function(message) {
        return md5Base.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
        var type = OUTPUT_TYPES[i];
        md5Base[type] = createOutputMethod(type);
    }
    var exports = md5Base;
    exports.md5 = exports;
    var createHmacOutputMethod = function(outputType) {
        return function(key, message) {
            return new HmacMd5(key, true).update(message)[outputType]();
        };
    };
    function HmacMd5(key, sharedMemory) {
        var i, result = formatMessage(key);
        if (key = result[0], result[1]) {
            var code, bytes = [], length = key.length, index = 0;
            for (i = 0; i < length; ++i) code = key.charCodeAt(i), code < 128 ? bytes[index++] = code : (code < 2048 ? bytes[index++] = 192 | code >>> 6 : (code < 55296 || code >= 57344 ? bytes[index++] = 224 | code >>> 12 : (code = 65536 + ((1023 & code) << 10 | 1023 & key.charCodeAt(++i)), 
            bytes[index++] = 240 | code >>> 18, bytes[index++] = 128 | code >>> 12 & 63), 
            bytes[index++] = 128 | code >>> 6 & 63), bytes[index++] = 128 | 63 & code);
            key = bytes;
        }
        key.length > 64 && (key = new Md5(true).update(key).array());
        var oKeyPad = [], iKeyPad = [];
        for (i = 0; i < 64; ++i) {
            var b = key[i] || 0;
            oKeyPad[i] = 92 ^ b, iKeyPad[i] = 54 ^ b;
        }
        Md5.call(this, sharedMemory), this.update(iKeyPad), this.oKeyPad = oKeyPad, 
        this.inner = true, this.sharedMemory = sharedMemory;
    }
    HmacMd5.prototype = new Md5(), HmacMd5.prototype.finalize = function() {
        var innerHash;
        Md5.prototype.finalize.call(this), this.inner && (this.inner = false, innerHash = this.array(), 
        Md5.call(this, this.sharedMemory), this.update(this.oKeyPad), this.update(innerHash), 
        Md5.prototype.finalize.call(this));
    };
    var hmacBase = createHmacOutputMethod("hex");
    for (hmacBase.create = function(key) {
        return new HmacMd5(key);
    }, hmacBase.update = function(key, message) {
        return hmacBase.create(key).update(message);
    }, i = 0; i < OUTPUT_TYPES.length; ++i) type = OUTPUT_TYPES[i], hmacBase[type] = createHmacOutputMethod(type);
    exports.md5.hmac = hmacBase, COMMON_JS ? module.exports = exports : (root.md5 = exports, 
    AMD && define(function() {
        return exports;
    }));
})();