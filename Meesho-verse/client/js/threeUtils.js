// three.js - http://github.com/mrdoob/three.js
"use strict";
var THREE = THREE || { REVISION: "54" };
self.console = self.console || {
  info: function () {},
  log: function () {},
  debug: function () {},
  warn: function () {},
  error: function () {},
};
self.Int32Array = self.Int32Array || Array;
self.Float32Array = self.Float32Array || Array;
String.prototype.startsWith =
  String.prototype.startsWith ||
  function (a) {
    return this.slice(0, a.length) === a;
  };
String.prototype.endsWith =
  String.prototype.endsWith ||
  function (a) {
    var a = String(a),
      b = this.lastIndexOf(a);
    return (-1 < b && b) === this.length - a.length;
  };
String.prototype.trim =
  String.prototype.trim ||
  function () {
    return this.replace(/^\s+|\s+$/g, "");
  };
(function () {
  for (
    var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0;
    c < b.length && !window.requestAnimationFrame;
    ++c
  )
    (window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"]),
      (window.cancelAnimationFrame =
        window[b[c] + "CancelAnimationFrame"] ||
        window[b[c] + "CancelRequestAnimationFrame"]);
  void 0 === window.requestAnimationFrame &&
    (window.requestAnimationFrame = function (b) {
      var c = Date.now(),
        f = Math.max(0, 16 - (c - a)),
        g = window.setTimeout(function () {
          b(c + f);
        }, f);
      a = c + f;
      return g;
    });
  window.cancelAnimationFrame =
    window.cancelAnimationFrame ||
    function (a) {
      window.clearTimeout(a);
    };
})();
THREE.CullFaceNone = 0;
THREE.CullFaceBack = 1;
THREE.CullFaceFront = 2;
THREE.CullFaceFrontBack = 3;
THREE.FrontFaceDirectionCW = 0;
THREE.FrontFaceDirectionCCW = 1;
THREE.BasicShadowMap = 0;
THREE.PCFShadowMap = 1;
THREE.PCFSoftShadowMap = 2;
THREE.FrontSide = 0;
THREE.BackSide = 1;
THREE.DoubleSide = 2;
THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NoBlending = 0;
THREE.NormalBlending = 1;
THREE.AdditiveBlending = 2;
THREE.SubtractiveBlending = 3;
THREE.MultiplyBlending = 4;
THREE.CustomBlending = 5;
THREE.AddEquation = 100;
THREE.SubtractEquation = 101;
THREE.ReverseSubtractEquation = 102;
THREE.ZeroFactor = 200;
THREE.OneFactor = 201;
THREE.SrcColorFactor = 202;
THREE.OneMinusSrcColorFactor = 203;
THREE.SrcAlphaFactor = 204;
THREE.OneMinusSrcAlphaFactor = 205;
THREE.DstAlphaFactor = 206;
THREE.OneMinusDstAlphaFactor = 207;
THREE.DstColorFactor = 208;
THREE.OneMinusDstColorFactor = 209;
THREE.SrcAlphaSaturateFactor = 210;
THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.AddOperation = 2;
THREE.UVMapping = function () {};
THREE.CubeReflectionMapping = function () {};
THREE.CubeRefractionMapping = function () {};
THREE.SphericalReflectionMapping = function () {};
THREE.SphericalRefractionMapping = function () {};
THREE.RepeatWrapping = 1e3;
THREE.ClampToEdgeWrapping = 1001;
THREE.MirroredRepeatWrapping = 1002;
THREE.NearestFilter = 1003;
THREE.NearestMipMapNearestFilter = 1004;
THREE.NearestMipMapLinearFilter = 1005;
THREE.LinearFilter = 1006;
THREE.LinearMipMapNearestFilter = 1007;
THREE.LinearMipMapLinearFilter = 1008;
THREE.UnsignedByteType = 1009;
THREE.ByteType = 1010;
THREE.ShortType = 1011;
THREE.UnsignedShortType = 1012;
THREE.IntType = 1013;
THREE.UnsignedIntType = 1014;
THREE.FloatType = 1015;
THREE.UnsignedShort4444Type = 1016;
THREE.UnsignedShort5551Type = 1017;
THREE.UnsignedShort565Type = 1018;
THREE.AlphaFormat = 1019;
THREE.RGBFormat = 1020;
THREE.RGBAFormat = 1021;
THREE.LuminanceFormat = 1022;
THREE.LuminanceAlphaFormat = 1023;
THREE.RGB_S3TC_DXT1_Format = 2001;
THREE.RGBA_S3TC_DXT1_Format = 2002;
THREE.RGBA_S3TC_DXT3_Format = 2003;
THREE.RGBA_S3TC_DXT5_Format = 2004;
THREE.Color = function (a) {
  void 0 !== a && this.set(a);
  return this;
};
THREE.Color.prototype = {
  constructor: THREE.Color,
  r: 1,
  g: 1,
  b: 1,
  copy: function (a) {
    this.r = a.r;
    this.g = a.g;
    this.b = a.b;
    return this;
  },
  copyGammaToLinear: function (a) {
    this.r = a.r * a.r;
    this.g = a.g * a.g;
    this.b = a.b * a.b;
    return this;
  },
  copyLinearToGamma: function (a) {
    this.r = Math.sqrt(a.r);
    this.g = Math.sqrt(a.g);
    this.b = Math.sqrt(a.b);
    return this;
  },
  convertGammaToLinear: function () {
    var a = this.r,
      b = this.g,
      c = this.b;
    this.r = a * a;
    this.g = b * b;
    this.b = c * c;
    return this;
  },
  convertLinearToGamma: function () {
    this.r = Math.sqrt(this.r);
    this.g = Math.sqrt(this.g);
    this.b = Math.sqrt(this.b);
    return this;
  },
  set: function (a) {
    switch (typeof a) {
      case "number":
        this.setHex(a);
        break;
      case "string":
        this.setStyle(a);
    }
  },
  setRGB: function (a, b, c) {
    this.r = a;
    this.g = b;
    this.b = c;
    return this;
  },
  setHSV: function (a, b, c) {
    var d, e, f;
    0 === c
      ? (this.r = this.g = this.b = 0)
      : ((d = Math.floor(6 * a)),
        (e = 6 * a - d),
        (a = c * (1 - b)),
        (f = c * (1 - b * e)),
        (b = c * (1 - b * (1 - e))),
        0 === d
          ? ((this.r = c), (this.g = b), (this.b = a))
          : 1 === d
          ? ((this.r = f), (this.g = c), (this.b = a))
          : 2 === d
          ? ((this.r = a), (this.g = c), (this.b = b))
          : 3 === d
          ? ((this.r = a), (this.g = f), (this.b = c))
          : 4 === d
          ? ((this.r = b), (this.g = a), (this.b = c))
          : 5 === d && ((this.r = c), (this.g = a), (this.b = f)));
    return this;
  },
  getHex: function () {
    return (
      ((255 * this.r) << 16) ^ ((255 * this.g) << 8) ^ ((255 * this.b) << 0)
    );
  },
  setHex: function (a) {
    a = Math.floor(a);
    this.r = ((a >> 16) & 255) / 255;
    this.g = ((a >> 8) & 255) / 255;
    this.b = (a & 255) / 255;
    return this;
  },
  getHexString: function () {
    return ("000000" + this.getHex().toString(16)).slice(-6);
  },
  getStyle: function () {
    return (
      "rgb(" +
      ((255 * this.r) | 0) +
      "," +
      ((255 * this.g) | 0) +
      "," +
      ((255 * this.b) | 0) +
      ")"
    );
  },
  setStyle: function (a) {
    if (/^rgb\((\d+),(\d+),(\d+)\)$/i.test(a))
      return (
        (a = /^rgb\((\d+),(\d+),(\d+)\)$/i.exec(a)),
        (this.r = Math.min(255, parseInt(a[1], 10)) / 255),
        (this.g = Math.min(255, parseInt(a[2], 10)) / 255),
        (this.b = Math.min(255, parseInt(a[3], 10)) / 255),
        this
      );
    if (/^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.test(a))
      return (
        (a = /^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.exec(a)),
        (this.r = Math.min(100, parseInt(a[1], 10)) / 100),
        (this.g = Math.min(100, parseInt(a[2], 10)) / 100),
        (this.b = Math.min(100, parseInt(a[3], 10)) / 100),
        this
      );
    if (/^\#([0-9a-f]{6})$/i.test(a))
      return (
        (a = /^\#([0-9a-f]{6})$/i.exec(a)),
        this.setHex(parseInt(a[1], 16)),
        this
      );
    if (/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(a))
      return (
        (a = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(a)),
        this.setHex(parseInt(a[1] + a[1] + a[2] + a[2] + a[3] + a[3], 16)),
        this
      );
    if (/^(\w+)$/i.test(a)) return this.setHex(THREE.ColorKeywords[a]), this;
  },
  getHSV: function (a) {
    var b = this.r,
      c = this.g,
      d = this.b,
      e = Math.max(Math.max(b, c), d),
      f = Math.min(Math.min(b, c), d);
    if (f === e) f = b = 0;
    else {
      var g = e - f,
        f = g / e,
        b =
          (b === e
            ? (c - d) / g
            : c === e
            ? 2 + (d - b) / g
            : 4 + (b - c) / g) / 6;
      0 > b && (b += 1);
      1 < b && (b -= 1);
    }
    void 0 === a && (a = { h: 0, s: 0, v: 0 });
    a.h = b;
    a.s = f;
    a.v = e;
    return a;
  },
  lerpSelf: function (a, b) {
    this.r += (a.r - this.r) * b;
    this.g += (a.g - this.g) * b;
    this.b += (a.b - this.b) * b;
    return this;
  },
  clone: function () {
    return new THREE.Color().setRGB(this.r, this.g, this.b);
  },
};
THREE.ColorKeywords = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074,
};
THREE.Vector2 = function (a, b) {
  this.x = a || 0;
  this.y = b || 0;
};
THREE.Vector2.prototype = {
  constructor: THREE.Vector2,
  set: function (a, b) {
    this.x = a;
    this.y = b;
    return this;
  },
  setX: function (a) {
    this.x = a;
    return this;
  },
  setY: function (a) {
    this.y = a;
    return this;
  },
  setComponent: function (a, b) {
    switch (a) {
      case 0:
        this.x = b;
        break;
      case 1:
        this.y = b;
        break;
      default:
        throw Error("index is out of range: " + a);
    }
  },
  getComponent: function (a) {
    switch (a) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw Error("index is out of range: " + a);
    }
  },
  copy: function (a) {
    this.x = a.x;
    this.y = a.y;
    return this;
  },
  addScalar: function (a) {
    this.x += a;
    this.y += a;
    return this;
  },
  add: function (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    return this;
  },
  addSelf: function (a) {
    this.x += a.x;
    this.y += a.y;
    return this;
  },
  sub: function (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    return this;
  },
  subSelf: function (a) {
    this.x -= a.x;
    this.y -= a.y;
    return this;
  },
  multiplyScalar: function (a) {
    this.x *= a;
    this.y *= a;
    return this;
  },
  divideScalar: function (a) {
    0 !== a ? ((this.x /= a), (this.y /= a)) : this.set(0, 0);
    return this;
  },
  minSelf: function (a) {
    this.x > a.x && (this.x = a.x);
    this.y > a.y && (this.y = a.y);
    return this;
  },
  maxSelf: function (a) {
    this.x < a.x && (this.x = a.x);
    this.y < a.y && (this.y = a.y);
    return this;
  },
  clampSelf: function (a, b) {
    this.x < a.x ? (this.x = a.x) : this.x > b.x && (this.x = b.x);
    this.y < a.y ? (this.y = a.y) : this.y > b.y && (this.y = b.y);
    return this;
  },
  negate: function () {
    return this.multiplyScalar(-1);
  },
  dot: function (a) {
    return this.x * a.x + this.y * a.y;
  },
  lengthSq: function () {
    return this.x * this.x + this.y * this.y;
  },
  length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  normalize: function () {
    return this.divideScalar(this.length());
  },
  distanceTo: function (a) {
    return Math.sqrt(this.distanceToSquared(a));
  },
  distanceToSquared: function (a) {
    var b = this.x - a.x,
      a = this.y - a.y;
    return b * b + a * a;
  },
  setLength: function (a) {
    var b = this.length();
    0 !== b && a !== b && this.multiplyScalar(a / b);
    return this;
  },
  lerpSelf: function (a, b) {
    this.x += (a.x - this.x) * b;
    this.y += (a.y - this.y) * b;
    return this;
  },
  equals: function (a) {
    return a.x === this.x && a.y === this.y;
  },
  clone: function () {
    return new THREE.Vector2(this.x, this.y);
  },
};
THREE.Vector3 = function (a, b, c) {
  this.x = a || 0;
  this.y = b || 0;
  this.z = c || 0;
};
THREE.Vector3.prototype = {
  constructor: THREE.Vector3,
  set: function (a, b, c) {
    this.x = a;
    this.y = b;
    this.z = c;
    return this;
  },
  setX: function (a) {
    this.x = a;
    return this;
  },
  setY: function (a) {
    this.y = a;
    return this;
  },
  setZ: function (a) {
    this.z = a;
    return this;
  },
  setComponent: function (a, b) {
    switch (a) {
      case 0:
        this.x = b;
        break;
      case 1:
        this.y = b;
        break;
      case 2:
        this.z = b;
        break;
      default:
        throw Error("index is out of range: " + a);
    }
  },
  getComponent: function (a) {
    switch (a) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw Error("index is out of range: " + a);
    }
  },
  copy: function (a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    return this;
  },
  add: function (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    return this;
  },
  addSelf: function (a) {
    this.x += a.x;
    this.y += a.y;
    this.z += a.z;
    return this;
  },
  addScalar: function (a) {
    this.x += a;
    this.y += a;
    this.z += a;
    return this;
  },
  sub: function (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    return this;
  },
  subSelf: function (a) {
    this.x -= a.x;
    this.y -= a.y;
    this.z -= a.z;
    return this;
  },
  multiply: function (a, b) {
    this.x = a.x * b.x;
    this.y = a.y * b.y;
    this.z = a.z * b.z;
    return this;
  },
  multiplySelf: function (a) {
    this.x *= a.x;
    this.y *= a.y;
    this.z *= a.z;
    return this;
  },
  multiplyScalar: function (a) {
    this.x *= a;
    this.y *= a;
    this.z *= a;
    return this;
  },
  divideSelf: function (a) {
    this.x /= a.x;
    this.y /= a.y;
    this.z /= a.z;
    return this;
  },
  divideScalar: function (a) {
    0 !== a
      ? ((this.x /= a), (this.y /= a), (this.z /= a))
      : (this.z = this.y = this.x = 0);
    return this;
  },
  minSelf: function (a) {
    this.x > a.x && (this.x = a.x);
    this.y > a.y && (this.y = a.y);
    this.z > a.z && (this.z = a.z);
    return this;
  },
  maxSelf: function (a) {
    this.x < a.x && (this.x = a.x);
    this.y < a.y && (this.y = a.y);
    this.z < a.z && (this.z = a.z);
    return this;
  },
  clampSelf: function (a, b) {
    this.x < a.x ? (this.x = a.x) : this.x > b.x && (this.x = b.x);
    this.y < a.y ? (this.y = a.y) : this.y > b.y && (this.y = b.y);
    this.z < a.z ? (this.z = a.z) : this.z > b.z && (this.z = b.z);
    return this;
  },
  negate: function () {
    return this.multiplyScalar(-1);
  },
  dot: function (a) {
    return this.x * a.x + this.y * a.y + this.z * a.z;
  },
  lengthSq: function () {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  },
  length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  },
  lengthManhattan: function () {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  },
  normalize: function () {
    return this.divideScalar(this.length());
  },
  setLength: function (a) {
    var b = this.length();
    0 !== b && a !== b && this.multiplyScalar(a / b);
    return this;
  },
  lerpSelf: function (a, b) {
    this.x += (a.x - this.x) * b;
    this.y += (a.y - this.y) * b;
    this.z += (a.z - this.z) * b;
    return this;
  },
  cross: function (a, b) {
    this.x = a.y * b.z - a.z * b.y;
    this.y = a.z * b.x - a.x * b.z;
    this.z = a.x * b.y - a.y * b.x;
    return this;
  },
  crossSelf: function (a) {
    var b = this.x,
      c = this.y,
      d = this.z;
    this.x = c * a.z - d * a.y;
    this.y = d * a.x - b * a.z;
    this.z = b * a.y - c * a.x;
    return this;
  },
  angleTo: function (a) {
    return Math.acos(this.dot(a) / this.length() / a.length());
  },
  distanceTo: function (a) {
    return Math.sqrt(this.distanceToSquared(a));
  },
  distanceToSquared: function (a) {
    var b = this.x - a.x,
      c = this.y - a.y,
      a = this.z - a.z;
    return b * b + c * c + a * a;
  },
  getPositionFromMatrix: function (a) {
    this.x = a.elements[12];
    this.y = a.elements[13];
    this.z = a.elements[14];
    return this;
  },
  setEulerFromRotationMatrix: function (a, b) {
    function c(a) {
      return Math.min(Math.max(a, -1), 1);
    }
    var d = a.elements,
      e = d[0],
      f = d[4],
      g = d[8],
      h = d[1],
      i = d[5],
      k = d[9],
      n = d[2],
      p = d[6],
      d = d[10];
    void 0 === b || "XYZ" === b
      ? ((this.y = Math.asin(c(g))),
        0.99999 > Math.abs(g)
          ? ((this.x = Math.atan2(-k, d)), (this.z = Math.atan2(-f, e)))
          : ((this.x = Math.atan2(p, i)), (this.z = 0)))
      : "YXZ" === b
      ? ((this.x = Math.asin(-c(k))),
        0.99999 > Math.abs(k)
          ? ((this.y = Math.atan2(g, d)), (this.z = Math.atan2(h, i)))
          : ((this.y = Math.atan2(-n, e)), (this.z = 0)))
      : "ZXY" === b
      ? ((this.x = Math.asin(c(p))),
        0.99999 > Math.abs(p)
          ? ((this.y = Math.atan2(-n, d)), (this.z = Math.atan2(-f, i)))
          : ((this.y = 0), (this.z = Math.atan2(h, e))))
      : "ZYX" === b
      ? ((this.y = Math.asin(-c(n))),
        0.99999 > Math.abs(n)
          ? ((this.x = Math.atan2(p, d)), (this.z = Math.atan2(h, e)))
          : ((this.x = 0), (this.z = Math.atan2(-f, i))))
      : "YZX" === b
      ? ((this.z = Math.asin(c(h))),
        0.99999 > Math.abs(h)
          ? ((this.x = Math.atan2(-k, i)), (this.y = Math.atan2(-n, e)))
          : ((this.x = 0), (this.y = Math.atan2(g, d))))
      : "XZY" === b &&
        ((this.z = Math.asin(-c(f))),
        0.99999 > Math.abs(f)
          ? ((this.x = Math.atan2(p, i)), (this.y = Math.atan2(g, e)))
          : ((this.x = Math.atan2(-k, d)), (this.y = 0)));
    return this;
  },
  setEulerFromQuaternion: function (a, b) {
    function c(a) {
      return Math.min(Math.max(a, -1), 1);
    }
    var d = a.x * a.x,
      e = a.y * a.y,
      f = a.z * a.z,
      g = a.w * a.w;
    void 0 === b || "XYZ" === b
      ? ((this.x = Math.atan2(2 * (a.x * a.w - a.y * a.z), g - d - e + f)),
        (this.y = Math.asin(c(2 * (a.x * a.z + a.y * a.w)))),
        (this.z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g + d - e - f)))
      : "YXZ" === b
      ? ((this.x = Math.asin(c(2 * (a.x * a.w - a.y * a.z)))),
        (this.y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g - d - e + f)),
        (this.z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g - d + e - f)))
      : "ZXY" === b
      ? ((this.x = Math.asin(c(2 * (a.x * a.w + a.y * a.z)))),
        (this.y = Math.atan2(2 * (a.y * a.w - a.z * a.x), g - d - e + f)),
        (this.z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g - d + e - f)))
      : "ZYX" === b
      ? ((this.x = Math.atan2(2 * (a.x * a.w + a.z * a.y), g - d - e + f)),
        (this.y = Math.asin(c(2 * (a.y * a.w - a.x * a.z)))),
        (this.z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g + d - e - f)))
      : "YZX" === b
      ? ((this.x = Math.atan2(2 * (a.x * a.w - a.z * a.y), g - d + e - f)),
        (this.y = Math.atan2(2 * (a.y * a.w - a.x * a.z), g + d - e - f)),
        (this.z = Math.asin(c(2 * (a.x * a.y + a.z * a.w)))))
      : "XZY" === b &&
        ((this.x = Math.atan2(2 * (a.x * a.w + a.y * a.z), g - d + e - f)),
        (this.y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g + d - e - f)),
        (this.z = Math.asin(c(2 * (a.z * a.w - a.x * a.y)))));
    return this;
  },
  getScaleFromMatrix: function (a) {
    var b = this.set(a.elements[0], a.elements[1], a.elements[2]).length(),
      c = this.set(a.elements[4], a.elements[5], a.elements[6]).length(),
      a = this.set(a.elements[8], a.elements[9], a.elements[10]).length();
    this.x = b;
    this.y = c;
    this.z = a;
    return this;
  },
  equals: function (a) {
    return a.x === this.x && a.y === this.y && a.z === this.z;
  },
  clone: function () {
    return new THREE.Vector3(this.x, this.y, this.z);
  },
};
THREE.Vector4 = function (a, b, c, d) {
  this.x = a || 0;
  this.y = b || 0;
  this.z = c || 0;
  this.w = void 0 !== d ? d : 1;
};
THREE.Vector4.prototype = {
  constructor: THREE.Vector4,
  set: function (a, b, c, d) {
    this.x = a;
    this.y = b;
    this.z = c;
    this.w = d;
    return this;
  },
  setX: function (a) {
    this.x = a;
    return this;
  },
  setY: function (a) {
    this.y = a;
    return this;
  },
  setZ: function (a) {
    this.z = a;
    return this;
  },
  setW: function (a) {
    this.w = a;
    return this;
  },
  setComponent: function (a, b) {
    switch (a) {
      case 0:
        this.x = b;
        break;
      case 1:
        this.y = b;
        break;
      case 2:
        this.z = b;
        break;
      case 3:
        this.w = b;
        break;
      default:
        throw Error("index is out of range: " + a);
    }
  },
  getComponent: function (a) {
    switch (a) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw Error("index is out of range: " + a);
    }
  },
  copy: function (a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    this.w = void 0 !== a.w ? a.w : 1;
    return this;
  },
  addScalar: function (a) {
    this.x += a;
    this.y += a;
    this.z += a;
    this.w += a;
    return this;
  },
  add: function (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    this.w = a.w + b.w;
    return this;
  },
  addSelf: function (a) {
    this.x += a.x;
    this.y += a.y;
    this.z += a.z;
    this.w += a.w;
    return this;
  },
  sub: function (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    this.w = a.w - b.w;
    return this;
  },
  subSelf: function (a) {
    this.x -= a.x;
    this.y -= a.y;
    this.z -= a.z;
    this.w -= a.w;
    return this;
  },
  multiplyScalar: function (a) {
    this.x *= a;
    this.y *= a;
    this.z *= a;
    this.w *= a;
    return this;
  },
  divideScalar: function (a) {
    0 !== a
      ? ((this.x /= a), (this.y /= a), (this.z /= a), (this.w /= a))
      : ((this.z = this.y = this.x = 0), (this.w = 1));
    return this;
  },
  minSelf: function (a) {
    this.x > a.x && (this.x = a.x);
    this.y > a.y && (this.y = a.y);
    this.z > a.z && (this.z = a.z);
    this.w > a.w && (this.w = a.w);
    return this;
  },
  maxSelf: function (a) {
    this.x < a.x && (this.x = a.x);
    this.y < a.y && (this.y = a.y);
    this.z < a.z && (this.z = a.z);
    this.w < a.w && (this.w = a.w);
    return this;
  },
  clampSelf: function (a, b) {
    this.x < a.x ? (this.x = a.x) : this.x > b.x && (this.x = b.x);
    this.y < a.y ? (this.y = a.y) : this.y > b.y && (this.y = b.y);
    this.z < a.z ? (this.z = a.z) : this.z > b.z && (this.z = b.z);
    this.w < a.w ? (this.w = a.w) : this.w > b.w && (this.w = b.w);
    return this;
  },
  negate: function () {
    return this.multiplyScalar(-1);
  },
  dot: function (a) {
    return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w;
  },
  lengthSq: function () {
    return (
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  },
  length: function () {
    return Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  },
  lengthManhattan: function () {
    return (
      Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
    );
  },
  normalize: function () {
    return this.divideScalar(this.length());
  },
  setLength: function (a) {
    var b = this.length();
    0 !== b && a !== b && this.multiplyScalar(a / b);
    return this;
  },
  lerpSelf: function (a, b) {
    this.x += (a.x - this.x) * b;
    this.y += (a.y - this.y) * b;
    this.z += (a.z - this.z) * b;
    this.w += (a.w - this.w) * b;
    return this;
  },
  equals: function (a) {
    return a.x === this.x && a.y === this.y && a.z === this.z && a.w === this.w;
  },
  clone: function () {
    return new THREE.Vector4(this.x, this.y, this.z, this.w);
  },
  setAxisAngleFromQuaternion: function (a) {
    this.w = 2 * Math.acos(a.w);
    var b = Math.sqrt(1 - a.w * a.w);
    1e-4 > b
      ? ((this.x = 1), (this.z = this.y = 0))
      : ((this.x = a.x / b), (this.y = a.y / b), (this.z = a.z / b));
    return this;
  },
  setAxisAngleFromRotationMatrix: function (a) {
    var b,
      c,
      d,
      a = a.elements,
      e = a[0];
    d = a[4];
    var f = a[8],
      g = a[1],
      h = a[5],
      i = a[9];
    c = a[2];
    b = a[6];
    var k = a[10];
    if (
      0.01 > Math.abs(d - g) &&
      0.01 > Math.abs(f - c) &&
      0.01 > Math.abs(i - b)
    ) {
      if (
        0.1 > Math.abs(d + g) &&
        0.1 > Math.abs(f + c) &&
        0.1 > Math.abs(i + b) &&
        0.1 > Math.abs(e + h + k - 3)
      )
        return this.set(1, 0, 0, 0), this;
      a = Math.PI;
      e = (e + 1) / 2;
      h = (h + 1) / 2;
      k = (k + 1) / 2;
      d = (d + g) / 4;
      f = (f + c) / 4;
      i = (i + b) / 4;
      e > h && e > k
        ? 0.01 > e
          ? ((b = 0), (d = c = 0.707106781))
          : ((b = Math.sqrt(e)), (c = d / b), (d = f / b))
        : h > k
        ? 0.01 > h
          ? ((b = 0.707106781), (c = 0), (d = 0.707106781))
          : ((c = Math.sqrt(h)), (b = d / c), (d = i / c))
        : 0.01 > k
        ? ((c = b = 0.707106781), (d = 0))
        : ((d = Math.sqrt(k)), (b = f / d), (c = i / d));
      this.set(b, c, d, a);
      return this;
    }
    a = Math.sqrt((b - i) * (b - i) + (f - c) * (f - c) + (g - d) * (g - d));
    0.001 > Math.abs(a) && (a = 1);
    this.x = (b - i) / a;
    this.y = (f - c) / a;
    this.z = (g - d) / a;
    this.w = Math.acos((e + h + k - 1) / 2);
    return this;
  },
};
THREE.Box2 = function (a, b) {
  this.min = void 0 !== a ? a.clone() : new THREE.Vector2(Infinity, Infinity);
  this.max = void 0 !== b ? b.clone() : new THREE.Vector2(-Infinity, -Infinity);
};
THREE.Box2.prototype = {
  constructor: THREE.Box2,
  set: function (a, b) {
    this.min.copy(a);
    this.max.copy(b);
    return this;
  },
  setFromPoints: function (a) {
    if (0 < a.length) {
      var b = a[0];
      this.min.copy(b);
      this.max.copy(b);
      for (var c = 1, d = a.length; c < d; c++)
        (b = a[c]),
          b.x < this.min.x
            ? (this.min.x = b.x)
            : b.x > this.max.x && (this.max.x = b.x),
          b.y < this.min.y
            ? (this.min.y = b.y)
            : b.y > this.max.y && (this.max.y = b.y);
    } else this.makeEmpty();
    return this;
  },
  setFromCenterAndSize: function (a, b) {
    var c = THREE.Box2.__v1.copy(b).multiplyScalar(0.5);
    this.min.copy(a).subSelf(c);
    this.max.copy(a).addSelf(c);
    return this;
  },
  copy: function (a) {
    this.min.copy(a.min);
    this.max.copy(a.max);
    return this;
  },
  makeEmpty: function () {
    this.min.x = this.min.y = Infinity;
    this.max.x = this.max.y = -Infinity;
    return this;
  },
  empty: function () {
    return this.max.x < this.min.x || this.max.y < this.min.y;
  },
  center: function (a) {
    return (a || new THREE.Vector2())
      .add(this.min, this.max)
      .multiplyScalar(0.5);
  },
  size: function (a) {
    return (a || new THREE.Vector2()).sub(this.max, this.min);
  },
  expandByPoint: function (a) {
    this.min.minSelf(a);
    this.max.maxSelf(a);
    return this;
  },
  expandByVector: function (a) {
    this.min.subSelf(a);
    this.max.addSelf(a);
    return this;
  },
  expandByScalar: function (a) {
    this.min.addScalar(-a);
    this.max.addScalar(a);
    return this;
  },
  containsPoint: function (a) {
    return this.min.x <= a.x &&
      a.x <= this.max.x &&
      this.min.y <= a.y &&
      a.y <= this.max.y
      ? !0
      : !1;
  },
  containsBox: function (a) {
    return this.min.x <= a.min.x &&
      a.max.x <= this.max.x &&
      this.min.y <= a.min.y &&
      a.max.y <= this.max.y
      ? !0
      : !1;
  },
  getParameter: function (a) {
    return new THREE.Vector2(
      (a.x - this.min.x) / (this.max.x - this.min.x),
      (a.y - this.min.y) / (this.max.y - this.min.y)
    );
  },
  isIntersectionBox: function (a) {
    return a.max.x < this.min.x ||
      a.min.x > this.max.x ||
      a.max.y < this.min.y ||
      a.min.y > this.max.y
      ? !1
      : !0;
  },
  clampPoint: function (a, b) {
    return (b || new THREE.Vector2()).copy(a).clampSelf(this.min, this.max);
  },
  distanceToPoint: function (a) {
    return THREE.Box2.__v1
      .copy(a)
      .clampSelf(this.min, this.max)
      .subSelf(a)
      .length();
  },
  intersect: function (a) {
    this.min.maxSelf(a.min);
    this.max.minSelf(a.max);
    return this;
  },
  union: function (a) {
    this.min.minSelf(a.min);
    this.max.maxSelf(a.max);
    return this;
  },
  translate: function (a) {
    this.min.addSelf(a);
    this.max.addSelf(a);
    return this;
  },
  equals: function (a) {
    return a.min.equals(this.min) && a.max.equals(this.max);
  },
  clone: function () {
    return new THREE.Box2().copy(this);
  },
};
THREE.Box2.__v1 = new THREE.Vector2();
THREE.Box3 = function (a, b) {
  this.min =
    void 0 !== a ? a.clone() : new THREE.Vector3(Infinity, Infinity, Infinity);
  this.max =
    void 0 !== b
      ? b.clone()
      : new THREE.Vector3(-Infinity, -Infinity, -Infinity);
};
THREE.Box3.prototype = {
  constructor: THREE.Box3,
  set: function (a, b) {
    this.min.copy(a);
    this.max.copy(b);
    return this;
  },
  setFromPoints: function (a) {
    if (0 < a.length) {
      var b = a[0];
      this.min.copy(b);
      this.max.copy(b);
      for (var c = 1, d = a.length; c < d; c++)
        (b = a[c]),
          b.x < this.min.x
            ? (this.min.x = b.x)
            : b.x > this.max.x && (this.max.x = b.x),
          b.y < this.min.y
            ? (this.min.y = b.y)
            : b.y > this.max.y && (this.max.y = b.y),
          b.z < this.min.z
            ? (this.min.z = b.z)
            : b.z > this.max.z && (this.max.z = b.z);
    } else this.makeEmpty();
    return this;
  },
  setFromCenterAndSize: function (a, b) {
    var c = THREE.Box3.__v1.copy(b).multiplyScalar(0.5);
    this.min.copy(a).subSelf(c);
    this.max.copy(a).addSelf(c);
    return this;
  },
  copy: function (a) {
    this.min.copy(a.min);
    this.max.copy(a.max);
    return this;
  },
  makeEmpty: function () {
    this.min.x = this.min.y = this.min.z = Infinity;
    this.max.x = this.max.y = this.max.z = -Infinity;
    return this;
  },
  empty: function () {
    return (
      this.max.x < this.min.x ||
      this.max.y < this.min.y ||
      this.max.z < this.min.z
    );
  },
  center: function (a) {
    return (a || new THREE.Vector3())
      .add(this.min, this.max)
      .multiplyScalar(0.5);
  },
  size: function (a) {
    return (a || new THREE.Vector3()).sub(this.max, this.min);
  },
  expandByPoint: function (a) {
    this.min.minSelf(a);
    this.max.maxSelf(a);
    return this;
  },
  expandByVector: function (a) {
    this.min.subSelf(a);
    this.max.addSelf(a);
    return this;
  },
  expandByScalar: function (a) {
    this.min.addScalar(-a);
    this.max.addScalar(a);
    return this;
  },
  containsPoint: function (a) {
    return this.min.x <= a.x &&
      a.x <= this.max.x &&
      this.min.y <= a.y &&
      a.y <= this.max.y &&
      this.min.z <= a.z &&
      a.z <= this.max.z
      ? !0
      : !1;
  },
  containsBox: function (a) {
    return this.min.x <= a.min.x &&
      a.max.x <= this.max.x &&
      this.min.y <= a.min.y &&
      a.max.y <= this.max.y &&
      this.min.z <= a.min.z &&
      a.max.z <= this.max.z
      ? !0
      : !1;
  },
  getParameter: function (a) {
    return new THREE.Vector3(
      (a.x - this.min.x) / (this.max.x - this.min.x),
      (a.y - this.min.y) / (this.max.y - this.min.y),
      (a.z - this.min.z) / (this.max.z - this.min.z)
    );
  },
  isIntersectionBox: function (a) {
    return a.max.x < this.min.x ||
      a.min.x > this.max.x ||
      a.max.y < this.min.y ||
      a.min.y > this.max.y ||
      a.max.z < this.min.z ||
      a.min.z > this.max.z
      ? !1
      : !0;
  },
  clampPoint: function (a, b) {
    b || new THREE.Vector3();
    return new THREE.Vector3().copy(a).clampSelf(this.min, this.max);
  },
  distanceToPoint: function (a) {
    return THREE.Box3.__v1
      .copy(a)
      .clampSelf(this.min, this.max)
      .subSelf(a)
      .length();
  },
  getBoundingSphere: function (a) {
    a = a || new THREE.Sphere();
    a.center = this.center();
    a.radius = 0.5 * this.size(THREE.Box3.__v0).length();
    return a;
  },
  intersect: function (a) {
    this.min.maxSelf(a.min);
    this.max.minSelf(a.max);
    return this;
  },
  union: function (a) {
    this.min.minSelf(a.min);
    this.max.maxSelf(a.max);
    return this;
  },
  transform: function (a) {
    a = [
      a.multiplyVector3(
        THREE.Box3.__v0.set(this.min.x, this.min.y, this.min.z)
      ),
      a.multiplyVector3(
        THREE.Box3.__v1.set(this.min.x, this.min.y, this.max.z)
      ),
      a.multiplyVector3(
        THREE.Box3.__v2.set(this.min.x, this.max.y, this.min.z)
      ),
      a.multiplyVector3(
        THREE.Box3.__v3.set(this.min.x, this.max.y, this.max.z)
      ),
      a.multiplyVector3(
        THREE.Box3.__v4.set(this.max.x, this.min.y, this.min.z)
      ),
      a.multiplyVector3(
        THREE.Box3.__v5.set(this.max.x, this.min.y, this.max.z)
      ),
      a.multiplyVector3(
        THREE.Box3.__v6.set(this.max.x, this.max.y, this.min.z)
      ),
      a.multiplyVector3(
        THREE.Box3.__v7.set(this.max.x, this.max.y, this.max.z)
      ),
    ];
    this.makeEmpty();
    this.setFromPoints(a);
    return this;
  },
  translate: function (a) {
    this.min.addSelf(a);
    this.max.addSelf(a);
    return this;
  },
  equals: function (a) {
    return a.min.equals(this.min) && a.max.equals(this.max);
  },
  clone: function () {
    return new THREE.Box3().copy(this);
  },
};
THREE.Box3.__v0 = new THREE.Vector3();
THREE.Box3.__v1 = new THREE.Vector3();
THREE.Box3.__v2 = new THREE.Vector3();
THREE.Box3.__v3 = new THREE.Vector3();
THREE.Box3.__v4 = new THREE.Vector3();
THREE.Box3.__v5 = new THREE.Vector3();
THREE.Box3.__v6 = new THREE.Vector3();
THREE.Box3.__v7 = new THREE.Vector3();
THREE.Matrix3 = function () {
  this.elements = new Float32Array(9);
};
THREE.Matrix3.prototype = {
  constructor: THREE.Matrix3,
  multiplyVector3: function (a) {
    var b = this.elements,
      c = a.x,
      d = a.y,
      e = a.z;
    a.x = b[0] * c + b[3] * d + b[6] * e;
    a.y = b[1] * c + b[4] * d + b[7] * e;
    a.z = b[2] * c + b[5] * d + b[8] * e;
    return a;
  },
  multiplyVector3Array: function (a) {
    for (var b = THREE.Matrix3.__v1, c = 0, d = a.length; c < d; c += 3)
      (b.x = a[c]),
        (b.y = a[c + 1]),
        (b.z = a[c + 2]),
        this.multiplyVector3(b),
        (a[c] = b.x),
        (a[c + 1] = b.y),
        (a[c + 2] = b.z);
    return a;
  },
  getInverse: function (a) {
    var b = a.elements,
      a = b[10] * b[5] - b[6] * b[9],
      c = -b[10] * b[1] + b[2] * b[9],
      d = b[6] * b[1] - b[2] * b[5],
      e = -b[10] * b[4] + b[6] * b[8],
      f = b[10] * b[0] - b[2] * b[8],
      g = -b[6] * b[0] + b[2] * b[4],
      h = b[9] * b[4] - b[5] * b[8],
      i = -b[9] * b[0] + b[1] * b[8],
      k = b[5] * b[0] - b[1] * b[4],
      b = b[0] * a + b[1] * e + b[2] * h;
    0 === b && console.warn("Matrix3.getInverse(): determinant == 0");
    var b = 1 / b,
      n = this.elements;
    n[0] = b * a;
    n[1] = b * c;
    n[2] = b * d;
    n[3] = b * e;
    n[4] = b * f;
    n[5] = b * g;
    n[6] = b * h;
    n[7] = b * i;
    n[8] = b * k;
    return this;
  },
  transpose: function () {
    var a,
      b = this.elements;
    a = b[1];
    b[1] = b[3];
    b[3] = a;
    a = b[2];
    b[2] = b[6];
    b[6] = a;
    a = b[5];
    b[5] = b[7];
    b[7] = a;
    return this;
  },
  transposeIntoArray: function (a) {
    var b = this.elements;
    a[0] = b[0];
    a[1] = b[3];
    a[2] = b[6];
    a[3] = b[1];
    a[4] = b[4];
    a[5] = b[7];
    a[6] = b[2];
    a[7] = b[5];
    a[8] = b[8];
    return this;
  },
};
THREE.Matrix3.__v1 = new THREE.Vector3();
THREE.Matrix4 = function (a, b, c, d, e, f, g, h, i, k, n, p, m, r, s, l) {
  this.elements = new Float32Array(16);
  this.set(
    void 0 !== a ? a : 1,
    b || 0,
    c || 0,
    d || 0,
    e || 0,
    void 0 !== f ? f : 1,
    g || 0,
    h || 0,
    i || 0,
    k || 0,
    void 0 !== n ? n : 1,
    p || 0,
    m || 0,
    r || 0,
    s || 0,
    void 0 !== l ? l : 1
  );
};
THREE.Matrix4.prototype = {
  constructor: THREE.Matrix4,
  set: function (a, b, c, d, e, f, g, h, i, k, n, p, m, r, s, l) {
    var q = this.elements;
    q[0] = a;
    q[4] = b;
    q[8] = c;
    q[12] = d;
    q[1] = e;
    q[5] = f;
    q[9] = g;
    q[13] = h;
    q[2] = i;
    q[6] = k;
    q[10] = n;
    q[14] = p;
    q[3] = m;
    q[7] = r;
    q[11] = s;
    q[15] = l;
    return this;
  },
  identity: function () {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  },
  copy: function (a) {
    a = a.elements;
    this.set(
      a[0],
      a[4],
      a[8],
      a[12],
      a[1],
      a[5],
      a[9],
      a[13],
      a[2],
      a[6],
      a[10],
      a[14],
      a[3],
      a[7],
      a[11],
      a[15]
    );
    return this;
  },
  setRotationFromEuler: function (a, b) {
    var c = this.elements,
      d = a.x,
      e = a.y,
      f = a.z,
      g = Math.cos(d),
      d = Math.sin(d),
      h = Math.cos(e),
      e = Math.sin(e),
      i = Math.cos(f),
      f = Math.sin(f);
    if (void 0 === b || "XYZ" === b) {
      var k = g * i,
        n = g * f,
        p = d * i,
        m = d * f;
      c[0] = h * i;
      c[4] = -h * f;
      c[8] = e;
      c[1] = n + p * e;
      c[5] = k - m * e;
      c[9] = -d * h;
      c[2] = m - k * e;
      c[6] = p + n * e;
      c[10] = g * h;
    } else
      "YXZ" === b
        ? ((k = h * i),
          (n = h * f),
          (p = e * i),
          (m = e * f),
          (c[0] = k + m * d),
          (c[4] = p * d - n),
          (c[8] = g * e),
          (c[1] = g * f),
          (c[5] = g * i),
          (c[9] = -d),
          (c[2] = n * d - p),
          (c[6] = m + k * d),
          (c[10] = g * h))
        : "ZXY" === b
        ? ((k = h * i),
          (n = h * f),
          (p = e * i),
          (m = e * f),
          (c[0] = k - m * d),
          (c[4] = -g * f),
          (c[8] = p + n * d),
          (c[1] = n + p * d),
          (c[5] = g * i),
          (c[9] = m - k * d),
          (c[2] = -g * e),
          (c[6] = d),
          (c[10] = g * h))
        : "ZYX" === b
        ? ((k = g * i),
          (n = g * f),
          (p = d * i),
          (m = d * f),
          (c[0] = h * i),
          (c[4] = p * e - n),
          (c[8] = k * e + m),
          (c[1] = h * f),
          (c[5] = m * e + k),
          (c[9] = n * e - p),
          (c[2] = -e),
          (c[6] = d * h),
          (c[10] = g * h))
        : "YZX" === b
        ? ((k = g * h),
          (n = g * e),
          (p = d * h),
          (m = d * e),
          (c[0] = h * i),
          (c[4] = m - k * f),
          (c[8] = p * f + n),
          (c[1] = f),
          (c[5] = g * i),
          (c[9] = -d * i),
          (c[2] = -e * i),
          (c[6] = n * f + p),
          (c[10] = k - m * f))
        : "XZY" === b &&
          ((k = g * h),
          (n = g * e),
          (p = d * h),
          (m = d * e),
          (c[0] = h * i),
          (c[4] = -f),
          (c[8] = e * i),
          (c[1] = k * f + m),
          (c[5] = g * i),
          (c[9] = n * f - p),
          (c[2] = p * f - n),
          (c[6] = d * i),
          (c[10] = m * f + k));
    return this;
  },
  setRotationFromQuaternion: function (a) {
    var b = this.elements,
      c = a.x,
      d = a.y,
      e = a.z,
      f = a.w,
      g = c + c,
      h = d + d,
      i = e + e,
      a = c * g,
      k = c * h,
      c = c * i,
      n = d * h,
      d = d * i,
      e = e * i,
      g = f * g,
      h = f * h,
      f = f * i;
    b[0] = 1 - (n + e);
    b[4] = k - f;
    b[8] = c + h;
    b[1] = k + f;
    b[5] = 1 - (a + e);
    b[9] = d - g;
    b[2] = c - h;
    b[6] = d + g;
    b[10] = 1 - (a + n);
    return this;
  },
  lookAt: function (a, b, c) {
    var d = this.elements,
      e = THREE.Matrix4.__v1,
      f = THREE.Matrix4.__v2,
      g = THREE.Matrix4.__v3;
    g.sub(a, b).normalize();
    0 === g.length() && (g.z = 1);
    e.cross(c, g).normalize();
    0 === e.length() && ((g.x += 1e-4), e.cross(c, g).normalize());
    f.cross(g, e);
    d[0] = e.x;
    d[4] = f.x;
    d[8] = g.x;
    d[1] = e.y;
    d[5] = f.y;
    d[9] = g.y;
    d[2] = e.z;
    d[6] = f.z;
    d[10] = g.z;
    return this;
  },
  multiply: function (a, b) {
    var c = a.elements,
      d = b.elements,
      e = this.elements,
      f = c[0],
      g = c[4],
      h = c[8],
      i = c[12],
      k = c[1],
      n = c[5],
      p = c[9],
      m = c[13],
      r = c[2],
      s = c[6],
      l = c[10],
      q = c[14],
      u = c[3],
      B = c[7],
      x = c[11],
      c = c[15],
      t = d[0],
      F = d[4],
      C = d[8],
      A = d[12],
      z = d[1],
      H = d[5],
      G = d[9],
      I = d[13],
      $ = d[2],
      D = d[6],
      L = d[10],
      y = d[14],
      J = d[3],
      K = d[7],
      R = d[11],
      d = d[15];
    e[0] = f * t + g * z + h * $ + i * J;
    e[4] = f * F + g * H + h * D + i * K;
    e[8] = f * C + g * G + h * L + i * R;
    e[12] = f * A + g * I + h * y + i * d;
    e[1] = k * t + n * z + p * $ + m * J;
    e[5] = k * F + n * H + p * D + m * K;
    e[9] = k * C + n * G + p * L + m * R;
    e[13] = k * A + n * I + p * y + m * d;
    e[2] = r * t + s * z + l * $ + q * J;
    e[6] = r * F + s * H + l * D + q * K;
    e[10] = r * C + s * G + l * L + q * R;
    e[14] = r * A + s * I + l * y + q * d;
    e[3] = u * t + B * z + x * $ + c * J;
    e[7] = u * F + B * H + x * D + c * K;
    e[11] = u * C + B * G + x * L + c * R;
    e[15] = u * A + B * I + x * y + c * d;
    return this;
  },
  multiplySelf: function (a) {
    return this.multiply(this, a);
  },
  multiplyToArray: function (a, b, c) {
    var d = this.elements;
    this.multiply(a, b);
    c[0] = d[0];
    c[1] = d[1];
    c[2] = d[2];
    c[3] = d[3];
    c[4] = d[4];
    c[5] = d[5];
    c[6] = d[6];
    c[7] = d[7];
    c[8] = d[8];
    c[9] = d[9];
    c[10] = d[10];
    c[11] = d[11];
    c[12] = d[12];
    c[13] = d[13];
    c[14] = d[14];
    c[15] = d[15];
    return this;
  },
  multiplyScalar: function (a) {
    var b = this.elements;
    b[0] *= a;
    b[4] *= a;
    b[8] *= a;
    b[12] *= a;
    b[1] *= a;
    b[5] *= a;
    b[9] *= a;
    b[13] *= a;
    b[2] *= a;
    b[6] *= a;
    b[10] *= a;
    b[14] *= a;
    b[3] *= a;
    b[7] *= a;
    b[11] *= a;
    b[15] *= a;
    return this;
  },
  multiplyVector3: function (a) {
    var b = this.elements,
      c = a.x,
      d = a.y,
      e = a.z,
      f = 1 / (b[3] * c + b[7] * d + b[11] * e + b[15]);
    a.x = (b[0] * c + b[4] * d + b[8] * e + b[12]) * f;
    a.y = (b[1] * c + b[5] * d + b[9] * e + b[13]) * f;
    a.z = (b[2] * c + b[6] * d + b[10] * e + b[14]) * f;
    return a;
  },
  multiplyVector4: function (a) {
    var b = this.elements,
      c = a.x,
      d = a.y,
      e = a.z,
      f = a.w;
    a.x = b[0] * c + b[4] * d + b[8] * e + b[12] * f;
    a.y = b[1] * c + b[5] * d + b[9] * e + b[13] * f;
    a.z = b[2] * c + b[6] * d + b[10] * e + b[14] * f;
    a.w = b[3] * c + b[7] * d + b[11] * e + b[15] * f;
    return a;
  },
  multiplyVector3Array: function (a) {
    for (var b = THREE.Matrix4.__v1, c = 0, d = a.length; c < d; c += 3)
      (b.x = a[c]),
        (b.y = a[c + 1]),
        (b.z = a[c + 2]),
        this.multiplyVector3(b),
        (a[c] = b.x),
        (a[c + 1] = b.y),
        (a[c + 2] = b.z);
    return a;
  },
  rotateAxis: function (a) {
    var b = this.elements,
      c = a.x,
      d = a.y,
      e = a.z;
    a.x = c * b[0] + d * b[4] + e * b[8];
    a.y = c * b[1] + d * b[5] + e * b[9];
    a.z = c * b[2] + d * b[6] + e * b[10];
    a.normalize();
    return a;
  },
  crossVector: function (a) {
    var b = this.elements,
      c = new THREE.Vector4();
    c.x = b[0] * a.x + b[4] * a.y + b[8] * a.z + b[12] * a.w;
    c.y = b[1] * a.x + b[5] * a.y + b[9] * a.z + b[13] * a.w;
    c.z = b[2] * a.x + b[6] * a.y + b[10] * a.z + b[14] * a.w;
    c.w = a.w ? b[3] * a.x + b[7] * a.y + b[11] * a.z + b[15] * a.w : 1;
    return c;
  },
  determinant: function () {
    var a = this.elements,
      b = a[0],
      c = a[4],
      d = a[8],
      e = a[12],
      f = a[1],
      g = a[5],
      h = a[9],
      i = a[13],
      k = a[2],
      n = a[6],
      p = a[10],
      m = a[14],
      r = a[3],
      s = a[7],
      l = a[11],
      a = a[15];
    return (
      e * h * n * r -
      d * i * n * r -
      e * g * p * r +
      c * i * p * r +
      d * g * m * r -
      c * h * m * r -
      e * h * k * s +
      d * i * k * s +
      e * f * p * s -
      b * i * p * s -
      d * f * m * s +
      b * h * m * s +
      e * g * k * l -
      c * i * k * l -
      e * f * n * l +
      b * i * n * l +
      c * f * m * l -
      b * g * m * l -
      d * g * k * a +
      c * h * k * a +
      d * f * n * a -
      b * h * n * a -
      c * f * p * a +
      b * g * p * a
    );
  },
  transpose: function () {
    var a = this.elements,
      b;
    b = a[1];
    a[1] = a[4];
    a[4] = b;
    b = a[2];
    a[2] = a[8];
    a[8] = b;
    b = a[6];
    a[6] = a[9];
    a[9] = b;
    b = a[3];
    a[3] = a[12];
    a[12] = b;
    b = a[7];
    a[7] = a[13];
    a[13] = b;
    b = a[11];
    a[11] = a[14];
    a[14] = b;
    return this;
  },
  flattenToArray: function (a) {
    var b = this.elements;
    a[0] = b[0];
    a[1] = b[1];
    a[2] = b[2];
    a[3] = b[3];
    a[4] = b[4];
    a[5] = b[5];
    a[6] = b[6];
    a[7] = b[7];
    a[8] = b[8];
    a[9] = b[9];
    a[10] = b[10];
    a[11] = b[11];
    a[12] = b[12];
    a[13] = b[13];
    a[14] = b[14];
    a[15] = b[15];
    return a;
  },
  flattenToArrayOffset: function (a, b) {
    var c = this.elements;
    a[b] = c[0];
    a[b + 1] = c[1];
    a[b + 2] = c[2];
    a[b + 3] = c[3];
    a[b + 4] = c[4];
    a[b + 5] = c[5];
    a[b + 6] = c[6];
    a[b + 7] = c[7];
    a[b + 8] = c[8];
    a[b + 9] = c[9];
    a[b + 10] = c[10];
    a[b + 11] = c[11];
    a[b + 12] = c[12];
    a[b + 13] = c[13];
    a[b + 14] = c[14];
    a[b + 15] = c[15];
    return a;
  },
  getPosition: function () {
    var a = this.elements;
    return THREE.Matrix4.__v1.set(a[12], a[13], a[14]);
  },
  setPosition: function (a) {
    var b = this.elements;
    b[12] = a.x;
    b[13] = a.y;
    b[14] = a.z;
    return this;
  },
  getColumnX: function () {
    var a = this.elements;
    return THREE.Matrix4.__v1.set(a[0], a[1], a[2]);
  },
  getColumnY: function () {
    var a = this.elements;
    return THREE.Matrix4.__v1.set(a[4], a[5], a[6]);
  },
  getColumnZ: function () {
    var a = this.elements;
    return THREE.Matrix4.__v1.set(a[8], a[9], a[10]);
  },
  getInverse: function (a) {
    var b = this.elements,
      c = a.elements,
      d = c[0],
      e = c[4],
      f = c[8],
      g = c[12],
      h = c[1],
      i = c[5],
      k = c[9],
      n = c[13],
      p = c[2],
      m = c[6],
      r = c[10],
      s = c[14],
      l = c[3],
      q = c[7],
      u = c[11],
      c = c[15];
    b[0] =
      k * s * q - n * r * q + n * m * u - i * s * u - k * m * c + i * r * c;
    b[4] =
      g * r * q - f * s * q - g * m * u + e * s * u + f * m * c - e * r * c;
    b[8] =
      f * n * q - g * k * q + g * i * u - e * n * u - f * i * c + e * k * c;
    b[12] =
      g * k * m - f * n * m - g * i * r + e * n * r + f * i * s - e * k * s;
    b[1] =
      n * r * l - k * s * l - n * p * u + h * s * u + k * p * c - h * r * c;
    b[5] =
      f * s * l - g * r * l + g * p * u - d * s * u - f * p * c + d * r * c;
    b[9] =
      g * k * l - f * n * l - g * h * u + d * n * u + f * h * c - d * k * c;
    b[13] =
      f * n * p - g * k * p + g * h * r - d * n * r - f * h * s + d * k * s;
    b[2] =
      i * s * l - n * m * l + n * p * q - h * s * q - i * p * c + h * m * c;
    b[6] =
      g * m * l - e * s * l - g * p * q + d * s * q + e * p * c - d * m * c;
    b[10] =
      e * n * l - g * i * l + g * h * q - d * n * q - e * h * c + d * i * c;
    b[14] =
      g * i * p - e * n * p - g * h * m + d * n * m + e * h * s - d * i * s;
    b[3] =
      k * m * l - i * r * l - k * p * q + h * r * q + i * p * u - h * m * u;
    b[7] =
      e * r * l - f * m * l + f * p * q - d * r * q - e * p * u + d * m * u;
    b[11] =
      f * i * l - e * k * l - f * h * q + d * k * q + e * h * u - d * i * u;
    b[15] =
      e * k * p - f * i * p + f * h * m - d * k * m - e * h * r + d * i * r;
    this.multiplyScalar(1 / a.determinant());
    return this;
  },
  compose: function (a, b, c) {
    var d = this.elements,
      e = THREE.Matrix4.__m1,
      f = THREE.Matrix4.__m2;
    e.identity();
    e.setRotationFromQuaternion(b);
    f.makeScale(c);
    this.multiply(e, f);
    d[12] = a.x;
    d[13] = a.y;
    d[14] = a.z;
    return this;
  },
  decompose: function (a, b, c) {
    var d = this.elements,
      e = THREE.Matrix4.__v1,
      f = THREE.Matrix4.__v2,
      g = THREE.Matrix4.__v3;
    e.set(d[0], d[1], d[2]);
    f.set(d[4], d[5], d[6]);
    g.set(d[8], d[9], d[10]);
    a = a instanceof THREE.Vector3 ? a : new THREE.Vector3();
    b = b instanceof THREE.Quaternion ? b : new THREE.Quaternion();
    c = c instanceof THREE.Vector3 ? c : new THREE.Vector3();
    c.x = e.length();
    c.y = f.length();
    c.z = g.length();
    a.x = d[12];
    a.y = d[13];
    a.z = d[14];
    d = THREE.Matrix4.__m1;
    d.copy(this);
    d.elements[0] /= c.x;
    d.elements[1] /= c.x;
    d.elements[2] /= c.x;
    d.elements[4] /= c.y;
    d.elements[5] /= c.y;
    d.elements[6] /= c.y;
    d.elements[8] /= c.z;
    d.elements[9] /= c.z;
    d.elements[10] /= c.z;
    b.setFromRotationMatrix(d);
    return [a, b, c];
  },
  extractPosition: function (a) {
    var b = this.elements,
      a = a.elements;
    b[12] = a[12];
    b[13] = a[13];
    b[14] = a[14];
    return this;
  },
  extractRotation: function (a) {
    var b = this.elements,
      a = a.elements,
      c = THREE.Matrix4.__v1,
      d = 1 / c.set(a[0], a[1], a[2]).length(),
      e = 1 / c.set(a[4], a[5], a[6]).length(),
      c = 1 / c.set(a[8], a[9], a[10]).length();
    b[0] = a[0] * d;
    b[1] = a[1] * d;
    b[2] = a[2] * d;
    b[4] = a[4] * e;
    b[5] = a[5] * e;
    b[6] = a[6] * e;
    b[8] = a[8] * c;
    b[9] = a[9] * c;
    b[10] = a[10] * c;
    return this;
  },
  translate: function (a) {
    var b = this.elements,
      c = a.x,
      d = a.y,
      a = a.z;
    b[12] = b[0] * c + b[4] * d + b[8] * a + b[12];
    b[13] = b[1] * c + b[5] * d + b[9] * a + b[13];
    b[14] = b[2] * c + b[6] * d + b[10] * a + b[14];
    b[15] = b[3] * c + b[7] * d + b[11] * a + b[15];
    return this;
  },
  rotateX: function (a) {
    var b = this.elements,
      c = b[4],
      d = b[5],
      e = b[6],
      f = b[7],
      g = b[8],
      h = b[9],
      i = b[10],
      k = b[11],
      n = Math.cos(a),
      a = Math.sin(a);
    b[4] = n * c + a * g;
    b[5] = n * d + a * h;
    b[6] = n * e + a * i;
    b[7] = n * f + a * k;
    b[8] = n * g - a * c;
    b[9] = n * h - a * d;
    b[10] = n * i - a * e;
    b[11] = n * k - a * f;
    return this;
  },
  rotateY: function (a) {
    var b = this.elements,
      c = b[0],
      d = b[1],
      e = b[2],
      f = b[3],
      g = b[8],
      h = b[9],
      i = b[10],
      k = b[11],
      n = Math.cos(a),
      a = Math.sin(a);
    b[0] = n * c - a * g;
    b[1] = n * d - a * h;
    b[2] = n * e - a * i;
    b[3] = n * f - a * k;
    b[8] = n * g + a * c;
    b[9] = n * h + a * d;
    b[10] = n * i + a * e;
    b[11] = n * k + a * f;
    return this;
  },
  rotateZ: function (a) {
    var b = this.elements,
      c = b[0],
      d = b[1],
      e = b[2],
      f = b[3],
      g = b[4],
      h = b[5],
      i = b[6],
      k = b[7],
      n = Math.cos(a),
      a = Math.sin(a);
    b[0] = n * c + a * g;
    b[1] = n * d + a * h;
    b[2] = n * e + a * i;
    b[3] = n * f + a * k;
    b[4] = n * g - a * c;
    b[5] = n * h - a * d;
    b[6] = n * i - a * e;
    b[7] = n * k - a * f;
    return this;
  },
  rotateByAxis: function (a, b) {
    var c = this.elements;
    if (1 === a.x && 0 === a.y && 0 === a.z) return this.rotateX(b);
    if (0 === a.x && 1 === a.y && 0 === a.z) return this.rotateY(b);
    if (0 === a.x && 0 === a.y && 1 === a.z) return this.rotateZ(b);
    var d = a.x,
      e = a.y,
      f = a.z,
      g = Math.sqrt(d * d + e * e + f * f),
      d = d / g,
      e = e / g,
      f = f / g,
      g = d * d,
      h = e * e,
      i = f * f,
      k = Math.cos(b),
      n = Math.sin(b),
      p = 1 - k,
      m = d * e * p,
      r = d * f * p,
      p = e * f * p,
      d = d * n,
      s = e * n,
      n = f * n,
      f = g + (1 - g) * k,
      g = m + n,
      e = r - s,
      m = m - n,
      h = h + (1 - h) * k,
      n = p + d,
      r = r + s,
      p = p - d,
      i = i + (1 - i) * k,
      k = c[0],
      d = c[1],
      s = c[2],
      l = c[3],
      q = c[4],
      u = c[5],
      B = c[6],
      x = c[7],
      t = c[8],
      F = c[9],
      C = c[10],
      A = c[11];
    c[0] = f * k + g * q + e * t;
    c[1] = f * d + g * u + e * F;
    c[2] = f * s + g * B + e * C;
    c[3] = f * l + g * x + e * A;
    c[4] = m * k + h * q + n * t;
    c[5] = m * d + h * u + n * F;
    c[6] = m * s + h * B + n * C;
    c[7] = m * l + h * x + n * A;
    c[8] = r * k + p * q + i * t;
    c[9] = r * d + p * u + i * F;
    c[10] = r * s + p * B + i * C;
    c[11] = r * l + p * x + i * A;
    return this;
  },
  scale: function (a) {
    var b = this.elements,
      c = a.x,
      d = a.y,
      a = a.z;
    b[0] *= c;
    b[4] *= d;
    b[8] *= a;
    b[1] *= c;
    b[5] *= d;
    b[9] *= a;
    b[2] *= c;
    b[6] *= d;
    b[10] *= a;
    b[3] *= c;
    b[7] *= d;
    b[11] *= a;
    return this;
  },
  getMaxScaleOnAxis: function () {
    var a = this.elements;
    return Math.sqrt(
      Math.max(
        a[0] * a[0] + a[1] * a[1] + a[2] * a[2],
        Math.max(
          a[4] * a[4] + a[5] * a[5] + a[6] * a[6],
          a[8] * a[8] + a[9] * a[9] + a[10] * a[10]
        )
      )
    );
  },
  makeTranslation: function (a) {
    this.set(1, 0, 0, a.x, 0, 1, 0, a.y, 0, 0, 1, a.z, 0, 0, 0, 1);
    return this;
  },
  makeRotationX: function (a) {
    var b = Math.cos(a),
      a = Math.sin(a);
    this.set(1, 0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1);
    return this;
  },
  makeRotationY: function (a) {
    var b = Math.cos(a),
      a = Math.sin(a);
    this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1);
    return this;
  },
  makeRotationZ: function (a) {
    var b = Math.cos(a),
      a = Math.sin(a);
    this.set(b, -a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  },
  makeRotationAxis: function (a, b) {
    var c = Math.cos(b),
      d = Math.sin(b),
      e = 1 - c,
      f = a.x,
      g = a.y,
      h = a.z,
      i = e * f,
      k = e * g;
    this.set(
      i * f + c,
      i * g - d * h,
      i * h + d * g,
      0,
      i * g + d * h,
      k * g + c,
      k * h - d * f,
      0,
      i * h - d * g,
      k * h + d * f,
      e * h * h + c,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  },
  makeScale: function (a) {
    this.set(a.x, 0, 0, 0, 0, a.y, 0, 0, 0, 0, a.z, 0, 0, 0, 0, 1);
    return this;
  },
  makeFrustum: function (a, b, c, d, e, f) {
    var g = this.elements;
    g[0] = (2 * e) / (b - a);
    g[4] = 0;
    g[8] = (b + a) / (b - a);
    g[12] = 0;
    g[1] = 0;
    g[5] = (2 * e) / (d - c);
    g[9] = (d + c) / (d - c);
    g[13] = 0;
    g[2] = 0;
    g[6] = 0;
    g[10] = -(f + e) / (f - e);
    g[14] = (-2 * f * e) / (f - e);
    g[3] = 0;
    g[7] = 0;
    g[11] = -1;
    g[15] = 0;
    return this;
  },
  makePerspective: function (a, b, c, d) {
    var a = c * Math.tan(THREE.Math.degToRad(0.5 * a)),
      e = -a;
    return this.makeFrustum(e * b, a * b, e, a, c, d);
  },
  makeOrthographic: function (a, b, c, d, e, f) {
    var g = this.elements,
      h = b - a,
      i = c - d,
      k = f - e;
    g[0] = 2 / h;
    g[4] = 0;
    g[8] = 0;
    g[12] = -((b + a) / h);
    g[1] = 0;
    g[5] = 2 / i;
    g[9] = 0;
    g[13] = -((c + d) / i);
    g[2] = 0;
    g[6] = 0;
    g[10] = -2 / k;
    g[14] = -((f + e) / k);
    g[3] = 0;
    g[7] = 0;
    g[11] = 0;
    g[15] = 1;
    return this;
  },
  clone: function () {
    var a = this.elements;
    return new THREE.Matrix4(
      a[0],
      a[4],
      a[8],
      a[12],
      a[1],
      a[5],
      a[9],
      a[13],
      a[2],
      a[6],
      a[10],
      a[14],
      a[3],
      a[7],
      a[11],
      a[15]
    );
  },
};
THREE.Matrix4.__v1 = new THREE.Vector3();
THREE.Matrix4.__v2 = new THREE.Vector3();
THREE.Matrix4.__v3 = new THREE.Vector3();
THREE.Matrix4.__m1 = new THREE.Matrix4();
THREE.Matrix4.__m2 = new THREE.Matrix4();
THREE.Ray = function (a, b) {
  this.origin = void 0 !== a ? a.clone() : new THREE.Vector3();
  this.direction = void 0 !== b ? b.clone() : new THREE.Vector3();
};
THREE.Ray.prototype = {
  constructor: THREE.Ray,
  set: function (a, b) {
    this.origin.copy(a);
    this.direction.copy(b);
    return this;
  },
  copy: function (a) {
    this.origin.copy(a.origin);
    this.direction.copy(a.direction);
    return this;
  },
  at: function (a, b) {
    return (b || new THREE.Vector3())
      .copy(this.direction)
      .multiplyScalar(a)
      .addSelf(this.origin);
  },
  recastSelf: function (a) {
    this.origin.copy(this.at(a, THREE.Ray.__v1));
    return this;
  },
  closestPointToPoint: function (a, b) {
    var c = b || new THREE.Vector3();
    c.sub(a, this.origin);
    var d = c.dot(this.direction);
    return c.copy(this.direction).multiplyScalar(d).addSelf(this.origin);
  },
  distanceToPoint: function (a) {
    var b = THREE.Ray.__v1.sub(a, this.origin).dot(this.direction);
    THREE.Ray.__v1.copy(this.direction).multiplyScalar(b).addSelf(this.origin);
    return THREE.Ray.__v1.distanceTo(a);
  },
  isIntersectionSphere: function (a) {
    return this.distanceToPoint(a.center) <= a.radius;
  },
  isIntersectionPlane: function (a) {
    return 0 != a.normal.dot(this.direction) ||
      0 == a.distanceToPoint(this.origin)
      ? !0
      : !1;
  },
  distanceToPlane: function (a) {
    var b = a.normal.dot(this.direction);
    if (0 == b) {
      if (0 == a.distanceToPoint(this.origin)) return 0;
    } else return -(this.origin.dot(a.normal) + a.constant) / b;
  },
  intersectPlane: function (a, b) {
    var c = this.distanceToPlane(a);
    return void 0 === c ? void 0 : this.at(c, b);
  },
  transform: function (a) {
    this.direction = a.multiplyVector3(this.direction.addSelf(this.origin));
    this.origin = a.multiplyVector3(this.origin);
    this.direction.subSelf(this.origin);
    return this;
  },
  equals: function (a) {
    return a.origin.equals(this.origin) && a.direction.equals(this.direction);
  },
  clone: function () {
    return new THREE.Ray().copy(this);
  },
};
THREE.Ray.__v1 = new THREE.Vector3();
THREE.Ray.__v2 = new THREE.Vector3();
THREE.Frustum = function () {
  this.planes = [
    new THREE.Plane(),
    new THREE.Plane(),
    new THREE.Plane(),
    new THREE.Plane(),
    new THREE.Plane(),
    new THREE.Plane(),
  ];
};
THREE.Frustum.prototype.setFromMatrix = function (a) {
  var b = this.planes,
    c = a.elements,
    a = c[0],
    d = c[1],
    e = c[2],
    f = c[3],
    g = c[4],
    h = c[5],
    i = c[6],
    k = c[7],
    n = c[8],
    p = c[9],
    m = c[10],
    r = c[11],
    s = c[12],
    l = c[13],
    q = c[14],
    c = c[15];
  b[0].setComponents(f - a, k - g, r - n, c - s);
  b[1].setComponents(f + a, k + g, r + n, c + s);
  b[2].setComponents(f + d, k + h, r + p, c + l);
  b[3].setComponents(f - d, k - h, r - p, c - l);
  b[4].setComponents(f - e, k - i, r - m, c - q);
  b[5].setComponents(f + e, k + i, r + m, c + q);
  for (a = 0; 6 > a; a++) b[a].normalize();
};
THREE.Frustum.prototype.contains = function (a) {
  for (
    var b = this.planes,
      c = a.matrixWorld,
      d = c.getPosition(),
      a = -a.geometry.boundingSphere.radius * c.getMaxScaleOnAxis(),
      e = (c = 0);
    6 > e;
    e++
  )
    if (((c = b[e].distanceToPoint(d)), c <= a)) return !1;
  return !0;
};
THREE.Frustum.__v1 = new THREE.Vector3();
THREE.Plane = function (a, b) {
  this.normal = void 0 !== a ? a.clone() : new THREE.Vector3(1, 0, 0);
  this.constant = void 0 !== b ? b : 0;
};
THREE.Plane.prototype = {
  constructor: THREE.Plane,
  set: function (a, b) {
    this.normal.copy(a);
    this.constant = b;
    return this;
  },
  setComponents: function (a, b, c, d) {
    this.normal.set(a, b, c);
    this.constant = d;
    return this;
  },
  setFromNormalAndCoplanarPoint: function (a, b) {
    this.normal.copy(a).normalize();
    this.constant = -b.dot(this.normal);
    return this;
  },
  setFromCoplanarPoints: function (a, b, c) {
    b = THREE.Plane.__v1
      .sub(c, b)
      .crossSelf(THREE.Plane.__v2.sub(a, b))
      .normalize();
    this.setFromNormalAndCoplanarPoint(b, a);
    return this;
  },
  copy: function (a) {
    this.normal.copy(a.normal);
    this.constant = a.constant;
    return this;
  },
  normalize: function () {
    var a = 1 / this.normal.length();
    this.normal.multiplyScalar(a);
    this.constant *= a;
    return this;
  },
  distanceToPoint: function (a) {
    return this.normal.dot(a) + this.constant;
  },
  distanceToSphere: function (a) {
    return this.distanceToPoint(a.center) - a.radius;
  },
  projectPoint: function (a, b) {
    return this.orthoPoint(a, b).subSelf(a).negate();
  },
  orthoPoint: function (a, b) {
    var c = this.distanceToPoint(a);
    return (b || new THREE.Vector3()).copy(this.normal).multiplyScalar(c);
  },
  isIntersectionLine: function (a, b) {
    var c = this.distanceToPoint(a),
      d = this.distanceToPoint(b);
    return (0 > c && 0 < d) || (0 > d && 0 < c);
  },
  coplanarPoint: function (a) {
    return (a || new THREE.Vector3())
      .copy(this.normal)
      .multiplyScalar(-this.constant);
  },
  transform: function (a, b) {
    var c = THREE.Plane.__v1,
      d = THREE.Plane.__v2,
      b = b || new THREE.Matrix3().getInverse(a).transpose(),
      c = b.multiplyVector3(c.copy(this.normal)),
      d = this.coplanarPoint(d),
      d = a.multiplyVector3(d);
    this.setFromNormalAndCoplanarPoint(c, d);
    return this;
  },
  translate: function (a) {
    this.constant -= a.dot(this.normal);
    return this;
  },
  equals: function (a) {
    return a.normal.equals(this.normal) && a.constant == this.constant;
  },
  clone: function () {
    return new THREE.Plane().copy(this);
  },
};
THREE.Plane.__vZero = new THREE.Vector3(0, 0, 0);
THREE.Plane.__v1 = new THREE.Vector3();
THREE.Plane.__v2 = new THREE.Vector3();
THREE.Sphere = function (a, b) {
  this.center = void 0 === a ? new THREE.Vector3() : a.clone();
  this.radius = void 0 === b ? 0 : b;
};
THREE.Sphere.prototype = {
  constructor: THREE.Sphere,
  set: function (a, b) {
    this.center.copy(a);
    this.radius = b;
    return this;
  },
  setFromCenterAndPoints: function (a, b) {
    for (var c = 0, d = 0, e = b.length; d < e; d++)
      var f = a.distanceToSquared(b[d]), c = Math.max(c, f);
    this.center = a;
    this.radius = Math.sqrt(c);
    return this;
  },
  copy: function (a) {
    this.center.copy(a.center);
    this.radius = a.radius;
    return this;
  },
  empty: function () {
    return 0 >= this.radius;
  },
  containsPoint: function (a) {
    return a.distanceToSquared(this.center) <= this.radius * this.radius;
  },
  distanceToPoint: function (a) {
    return a.distanceTo(this.center) - this.radius;
  },
  clampPoint: function (a, b) {
    var c = this.center.distanceToSquared(a),
      d = b || new THREE.Vector3();
    d.copy(a);
    c > this.radius * this.radius &&
      (d.subSelf(this.center).normalize(),
      d.multiplyScalar(this.radius).addSelf(this.center));
    return d;
  },
  getBoundingBox: function (a) {
    a = a || new THREE.Box3();
    a.set(this.center, this.center);
    a.expandByScalar(this.radius);
    return a;
  },
  transform: function (a) {
    this.center = a.multiplyVector3(this.center);
    this.radius *= a.getMaxScaleOnAxis();
    return this;
  },
  translate: function (a) {
    this.center.addSelf(a);
    return this;
  },
  equals: function (a) {
    return a.center.equals(this.center) && a.radius === this.radius;
  },
  clone: function () {
    return new THREE.Sphere().copy(this);
  },
};
THREE.Math = {
  clamp: function (a, b, c) {
    return a < b ? b : a > c ? c : a;
  },
  clampBottom: function (a, b) {
    return a < b ? b : a;
  },
  mapLinear: function (a, b, c, d, e) {
    return d + ((a - b) * (e - d)) / (c - b);
  },
  random16: function () {
    return (65280 * Math.random() + 255 * Math.random()) / 65535;
  },
  randInt: function (a, b) {
    return a + Math.floor(Math.random() * (b - a + 1));
  },
  randFloat: function (a, b) {
    return a + Math.random() * (b - a);
  },
  randFloatSpread: function (a) {
    return a * (0.5 - Math.random());
  },
  sign: function (a) {
    return 0 > a ? -1 : 0 < a ? 1 : 0;
  },
  degToRad: function (a) {
    return a * THREE.Math.__d2r;
  },
  radToDeg: function (a) {
    return a * THREE.Math.__r2d;
  },
};
THREE.Math.__d2r = Math.PI / 180;
THREE.Math.__r2d = 180 / Math.PI;
THREE.Quaternion = function (a, b, c, d) {
  this.x = a || 0;
  this.y = b || 0;
  this.z = c || 0;
  this.w = void 0 !== d ? d : 1;
};
THREE.Quaternion.prototype = {
  constructor: THREE.Quaternion,
  set: function (a, b, c, d) {
    this.x = a;
    this.y = b;
    this.z = c;
    this.w = d;
    return this;
  },
  copy: function (a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    this.w = a.w;
    return this;
  },
  setFromEuler: function (a, b) {
    var c = Math.cos(a.x / 2),
      d = Math.cos(a.y / 2),
      e = Math.cos(a.z / 2),
      f = Math.sin(a.x / 2),
      g = Math.sin(a.y / 2),
      h = Math.sin(a.z / 2);
    void 0 === b || "XYZ" === b
      ? ((this.x = f * d * e + c * g * h),
        (this.y = c * g * e - f * d * h),
        (this.z = c * d * h + f * g * e),
        (this.w = c * d * e - f * g * h))
      : "YXZ" === b
      ? ((this.x = f * d * e + c * g * h),
        (this.y = c * g * e - f * d * h),
        (this.z = c * d * h - f * g * e),
        (this.w = c * d * e + f * g * h))
      : "ZXY" === b
      ? ((this.x = f * d * e - c * g * h),
        (this.y = c * g * e + f * d * h),
        (this.z = c * d * h + f * g * e),
        (this.w = c * d * e - f * g * h))
      : "ZYX" === b
      ? ((this.x = f * d * e - c * g * h),
        (this.y = c * g * e + f * d * h),
        (this.z = c * d * h - f * g * e),
        (this.w = c * d * e + f * g * h))
      : "YZX" === b
      ? ((this.x = f * d * e + c * g * h),
        (this.y = c * g * e + f * d * h),
        (this.z = c * d * h - f * g * e),
        (this.w = c * d * e - f * g * h))
      : "XZY" === b &&
        ((this.x = f * d * e - c * g * h),
        (this.y = c * g * e - f * d * h),
        (this.z = c * d * h + f * g * e),
        (this.w = c * d * e + f * g * h));
    return this;
  },
  setFromAxisAngle: function (a, b) {
    var c = b / 2,
      d = Math.sin(c);
    this.x = a.x * d;
    this.y = a.y * d;
    this.z = a.z * d;
    this.w = Math.cos(c);
    return this;
  },
  setFromRotationMatrix: function (a) {
    var b = a.elements,
      c = b[0],
      a = b[4],
      d = b[8],
      e = b[1],
      f = b[5],
      g = b[9],
      h = b[2],
      i = b[6],
      b = b[10],
      k = c + f + b;
    0 < k
      ? ((c = 0.5 / Math.sqrt(k + 1)),
        (this.w = 0.25 / c),
        (this.x = (i - g) * c),
        (this.y = (d - h) * c),
        (this.z = (e - a) * c))
      : c > f && c > b
      ? ((c = 2 * Math.sqrt(1 + c - f - b)),
        (this.w = (i - g) / c),
        (this.x = 0.25 * c),
        (this.y = (a + e) / c),
        (this.z = (d + h) / c))
      : f > b
      ? ((c = 2 * Math.sqrt(1 + f - c - b)),
        (this.w = (d - h) / c),
        (this.x = (a + e) / c),
        (this.y = 0.25 * c),
        (this.z = (g + i) / c))
      : ((c = 2 * Math.sqrt(1 + b - c - f)),
        (this.w = (e - a) / c),
        (this.x = (d + h) / c),
        (this.y = (g + i) / c),
        (this.z = 0.25 * c));
    return this;
  },
  inverse: function () {
    this.conjugate().normalize();
    return this;
  },
  conjugate: function () {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
    return this;
  },
  lengthSq: function () {
    return (
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  },
  length: function () {
    return Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  },
  normalize: function () {
    var a = this.length();
    0 === a
      ? ((this.z = this.y = this.x = 0), (this.w = 1))
      : ((a = 1 / a),
        (this.x *= a),
        (this.y *= a),
        (this.z *= a),
        (this.w *= a));
    return this;
  },
  multiply: function (a, b) {
    this.copy(a);
    return this.multiplySelf(b);
  },
  multiplySelf: function (a) {
    var b = this.x,
      c = this.y,
      d = this.z,
      e = this.w,
      f = a.x,
      g = a.y,
      h = a.z,
      a = a.w;
    this.x = b * a + e * f + c * h - d * g;
    this.y = c * a + e * g + d * f - b * h;
    this.z = d * a + e * h + b * g - c * f;
    this.w = e * a - b * f - c * g - d * h;
    return this;
  },
  multiplyVector3: function (a, b) {
    b || (b = a);
    var c = a.x,
      d = a.y,
      e = a.z,
      f = this.x,
      g = this.y,
      h = this.z,
      i = this.w,
      k = i * c + g * e - h * d,
      n = i * d + h * c - f * e,
      p = i * e + f * d - g * c,
      c = -f * c - g * d - h * e;
    b.x = k * i + c * -f + n * -h - p * -g;
    b.y = n * i + c * -g + p * -f - k * -h;
    b.z = p * i + c * -h + k * -g - n * -f;
    return b;
  },
  slerpSelf: function (a, b) {
    var c = this.x,
      d = this.y,
      e = this.z,
      f = this.w,
      g = f * a.w + c * a.x + d * a.y + e * a.z;
    0 > g
      ? ((this.w = -a.w),
        (this.x = -a.x),
        (this.y = -a.y),
        (this.z = -a.z),
        (g = -g))
      : this.copy(a);
    if (1 <= g)
      return (this.w = f), (this.x = c), (this.y = d), (this.z = e), this;
    var h = Math.acos(g),
      i = Math.sqrt(1 - g * g);
    if (0.001 > Math.abs(i))
      return (
        (this.w = 0.5 * (f + this.w)),
        (this.x = 0.5 * (c + this.x)),
        (this.y = 0.5 * (d + this.y)),
        (this.z = 0.5 * (e + this.z)),
        this
      );
    g = Math.sin((1 - b) * h) / i;
    h = Math.sin(b * h) / i;
    this.w = f * g + this.w * h;
    this.x = c * g + this.x * h;
    this.y = d * g + this.y * h;
    this.z = e * g + this.z * h;
    return this;
  },
  equals: function (a) {
    return a.x === this.x && a.y === this.y && a.z === this.z && a.w === this.w;
  },
  clone: function () {
    return new THREE.Quaternion(this.x, this.y, this.z, this.w);
  },
};
THREE.Quaternion.slerp = function (a, b, c, d) {
  return c.copy(a).slerpSelf(b, d);
};
THREE.Spline = function (a) {
  function b(a, b, c, d, e, f, g) {
    a = 0.5 * (c - a);
    d = 0.5 * (d - b);
    return (
      (2 * (b - c) + a + d) * g + (-3 * (b - c) - 2 * a - d) * f + a * e + b
    );
  }
  this.points = a;
  var c = [],
    d = { x: 0, y: 0, z: 0 },
    e,
    f,
    g,
    h,
    i,
    k,
    n,
    p,
    m;
  this.initFromArray = function (a) {
    this.points = [];
    for (var b = 0; b < a.length; b++)
      this.points[b] = { x: a[b][0], y: a[b][1], z: a[b][2] };
  };
  this.getPoint = function (a) {
    e = (this.points.length - 1) * a;
    f = Math.floor(e);
    g = e - f;
    c[0] = 0 === f ? f : f - 1;
    c[1] = f;
    c[2] = f > this.points.length - 2 ? this.points.length - 1 : f + 1;
    c[3] = f > this.points.length - 3 ? this.points.length - 1 : f + 2;
    k = this.points[c[0]];
    n = this.points[c[1]];
    p = this.points[c[2]];
    m = this.points[c[3]];
    h = g * g;
    i = g * h;
    d.x = b(k.x, n.x, p.x, m.x, g, h, i);
    d.y = b(k.y, n.y, p.y, m.y, g, h, i);
    d.z = b(k.z, n.z, p.z, m.z, g, h, i);
    return d;
  };
  this.getControlPointsArray = function () {
    var a,
      b,
      c = this.points.length,
      d = [];
    for (a = 0; a < c; a++) (b = this.points[a]), (d[a] = [b.x, b.y, b.z]);
    return d;
  };
  this.getLength = function (a) {
    var b,
      c,
      d,
      e = (b = b = 0),
      f = new THREE.Vector3(),
      g = new THREE.Vector3(),
      h = [],
      i = 0;
    h[0] = 0;
    a || (a = 100);
    c = this.points.length * a;
    f.copy(this.points[0]);
    for (a = 1; a < c; a++)
      (b = a / c),
        (d = this.getPoint(b)),
        g.copy(d),
        (i += g.distanceTo(f)),
        f.copy(d),
        (b *= this.points.length - 1),
        (b = Math.floor(b)),
        b != e && ((h[b] = i), (e = b));
    h[h.length] = i;
    return { chunks: h, total: i };
  };
  this.reparametrizeByArcLength = function (a) {
    var b,
      c,
      d,
      e,
      f,
      g,
      h = [],
      i = new THREE.Vector3(),
      k = this.getLength();
    h.push(i.copy(this.points[0]).clone());
    for (b = 1; b < this.points.length; b++) {
      c = k.chunks[b] - k.chunks[b - 1];
      g = Math.ceil((a * c) / k.total);
      e = (b - 1) / (this.points.length - 1);
      f = b / (this.points.length - 1);
      for (c = 1; c < g - 1; c++)
        (d = e + c * (1 / g) * (f - e)),
          (d = this.getPoint(d)),
          h.push(i.copy(d).clone());
      h.push(i.copy(this.points[b]).clone());
    }
    this.points = h;
  };
};
THREE.Triangle = function (a, b, c) {
  this.a = new THREE.Vector3();
  this.b = new THREE.Vector3();
  this.c = new THREE.Vector3();
  void 0 !== a &&
    void 0 !== b &&
    void 0 !== c &&
    (this.a.copy(a), this.b.copy(b), this.c.copy(c));
};
THREE.Triangle.normal = function (a, b, c, d) {
  d = d || new THREE.Vector3();
  d.sub(c, b);
  THREE.Triangle.__v0.sub(a, b);
  d.crossSelf(THREE.Triangle.__v0);
  a = d.lengthSq();
  return 0 < a ? d.multiplyScalar(1 / Math.sqrt(a)) : d.set(0, 0, 0);
};
THREE.Triangle.barycoordFromPoint = function (a, b, c, d, e) {
  THREE.Triangle.__v0.sub(d, b);
  THREE.Triangle.__v1.sub(c, b);
  THREE.Triangle.__v2.sub(a, b);
  var a = THREE.Triangle.__v0.dot(THREE.Triangle.__v0),
    b = THREE.Triangle.__v0.dot(THREE.Triangle.__v1),
    c = THREE.Triangle.__v0.dot(THREE.Triangle.__v2),
    f = THREE.Triangle.__v1.dot(THREE.Triangle.__v1),
    d = THREE.Triangle.__v1.dot(THREE.Triangle.__v2),
    g = a * f - b * b,
    e = e || new THREE.Vector3();
  if (0 == g) return e.set(-2, -1, -1);
  g = 1 / g;
  f = (f * c - b * d) * g;
  a = (a * d - b * c) * g;
  return e.set(1 - f - a, a, f);
};
THREE.Triangle.containsPoint = function (a, b, c, d) {
  a = THREE.Triangle.barycoordFromPoint(a, b, c, d, THREE.Triangle.__v3);
  return 0 <= a.x && 0 <= a.y && 1 >= a.x + a.y;
};
THREE.Triangle.prototype = {
  constructor: THREE.Triangle,
  set: function (a, b, c) {
    this.a.copy(a);
    this.b.copy(b);
    this.c.copy(c);
    return this;
  },
  setFromPointsAndIndices: function (a, b, c, d) {
    this.a.copy(a[b]);
    this.b.copy(a[c]);
    this.c.copy(a[d]);
    return this;
  },
  copy: function (a) {
    this.a.copy(a.a);
    this.b.copy(a.b);
    this.c.copy(a.c);
    return this;
  },
  area: function () {
    THREE.Triangle.__v0.sub(this.c, this.b);
    THREE.Triangle.__v1.sub(this.a, this.b);
    return 0.5 * THREE.Triangle.__v0.crossSelf(THREE.Triangle.__v1).length();
  },
  midpoint: function (a) {
    return (a || new THREE.Vector3())
      .add(this.a, this.b)
      .addSelf(this.c)
      .multiplyScalar(1 / 3);
  },
  normal: function (a) {
    return THREE.Triangle.normal(this.a, this.b, this.c, a);
  },
  plane: function (a) {
    return (a || new THREE.Plane()).setFromCoplanarPoints(
      this.a,
      this.b,
      this.c
    );
  },
  barycoordFromPoint: function (a, b) {
    return THREE.Triangle.barycoordFromPoint(a, this.a, this.b, this.c, b);
  },
  containsPoint: function (a) {
    return THREE.Triangle.containsPoint(a, this.a, this.b, this.c);
  },
  equals: function (a) {
    return a.a.equals(this.a) && a.b.equals(this.b) && a.c.equals(this.c);
  },
  clone: function () {
    return new THREE.Triangle().copy(this);
  },
};
THREE.Triangle.__v0 = new THREE.Vector3();
THREE.Triangle.__v1 = new THREE.Vector3();
THREE.Triangle.__v2 = new THREE.Vector3();
THREE.Triangle.__v3 = new THREE.Vector3();
THREE.Vertex = function (a) {
  console.warn("THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead.");
  return a;
};
THREE.UV = function (a, b) {
  console.warn("THREE.UV has been DEPRECATED. Use THREE.Vector2 instead.");
  return new THREE.Vector2(a, b);
};
THREE.Clock = function (a) {
  this.autoStart = void 0 !== a ? a : !0;
  this.elapsedTime = this.oldTime = this.startTime = 0;
  this.running = !1;
};
THREE.Clock.prototype.start = function () {
  this.oldTime = this.startTime = Date.now();
  this.running = !0;
};
THREE.Clock.prototype.stop = function () {
  this.getElapsedTime();
  this.running = !1;
};
THREE.Clock.prototype.getElapsedTime = function () {
  this.getDelta();
  return this.elapsedTime;
};
THREE.Clock.prototype.getDelta = function () {
  var a = 0;
  this.autoStart && !this.running && this.start();
  if (this.running) {
    var b = Date.now(),
      a = 0.001 * (b - this.oldTime);
    this.oldTime = b;
    this.elapsedTime += a;
  }
  return a;
};
THREE.EventDispatcher = function () {
  var a = {};
  this.addEventListener = function (b, c) {
    void 0 === a[b] && (a[b] = []);
    -1 === a[b].indexOf(c) && a[b].push(c);
  };
  this.removeEventListener = function (b, c) {
    var d = a[b].indexOf(c);
    -1 !== d && a[b].splice(d, 1);
  };
  this.dispatchEvent = function (b) {
    var c = a[b.type];
    if (void 0 !== c) {
      b.target = this;
      for (var d = 0, e = c.length; d < e; d++) c[d].call(this, b);
    }
  };
};
(function (a) {
  a.Raycaster = function (b, c, d, e) {
    this.ray = new a.Ray(b, c);
    0 < this.ray.direction.length() && this.ray.direction.normalize();
    this.near = d || 0;
    this.far = e || Infinity;
  };
  var b = new a.Sphere(),
    c = new a.Ray(),
    d = new a.Plane(),
    e = new a.Vector3(),
    f = new a.Matrix4(),
    g = function (a, b) {
      return a.distance - b.distance;
    };
  new a.Vector3();
  new a.Vector3();
  new a.Vector3();
  var h = function (g, h, i) {
      if (g instanceof a.Particle) {
        h = h.ray.distanceToPoint(g.matrixWorld.getPosition());
        if (h > g.scale.x) return i;
        i.push({ distance: h, point: g.position, face: null, object: g });
      } else if (g instanceof a.Mesh) {
        b.set(
          g.matrixWorld.getPosition(),
          g.geometry.boundingSphere.radius * g.matrixWorld.getMaxScaleOnAxis()
        );
        if (!h.ray.isIntersectionSphere(b)) return i;
        var m = g.geometry,
          r = m.vertices,
          s = g.material instanceof a.MeshFaceMaterial,
          l = !0 === s ? g.material.materials : null,
          q = g.material.side,
          u,
          B,
          x,
          t = h.precision;
        g.matrixRotationWorld.extractRotation(g.matrixWorld);
        f.getInverse(g.matrixWorld);
        c.copy(h.ray).transform(f);
        for (var F = 0, C = m.faces.length; F < C; F++) {
          var A = m.faces[F],
            q = !0 === s ? l[A.materialIndex] : g.material;
          if (void 0 !== q) {
            d.setFromNormalAndCoplanarPoint(A.normal, r[A.a]);
            var z = c.distanceToPlane(d);
            if (!(Math.abs(z) < t) && !(0 > z)) {
              q = q.side;
              if (
                q !== a.DoubleSide &&
                ((u = c.direction.dot(d.normal)),
                !(q === a.FrontSide ? 0 > u : 0 < u))
              )
                continue;
              if (!(z < h.near || z > h.far)) {
                e = c.at(z, e);
                if (A instanceof a.Face3) {
                  if (
                    ((q = r[A.a]),
                    (u = r[A.b]),
                    (B = r[A.c]),
                    !a.Triangle.containsPoint(e, q, u, B))
                  )
                    continue;
                } else if (A instanceof a.Face4) {
                  if (
                    ((q = r[A.a]),
                    (u = r[A.b]),
                    (B = r[A.c]),
                    (x = r[A.d]),
                    !a.Triangle.containsPoint(e, q, u, x) &&
                      !a.Triangle.containsPoint(e, u, B, x))
                  )
                    continue;
                } else throw Error("face type not supported");
                i.push({
                  distance: z,
                  point: h.ray.at(z),
                  face: A,
                  faceIndex: F,
                  object: g,
                });
              }
            }
          }
        }
      }
    },
    i = function (a, b, c) {
      for (var a = a.getDescendants(), d = 0, e = a.length; d < e; d++)
        h(a[d], b, c);
    };
  a.Raycaster.prototype.precision = 1e-4;
  a.Raycaster.prototype.set = function (a, b) {
    this.ray.set(a, b);
    0 < this.ray.direction.length() && this.ray.direction.normalize();
  };
  a.Raycaster.prototype.intersectObject = function (a, b) {
    var c = [];
    !0 === b && i(a, this, c);
    h(a, this, c);
    c.sort(g);
    return c;
  };
  a.Raycaster.prototype.intersectObjects = function (a, b) {
    for (var c = [], d = 0, e = a.length; d < e; d++)
      h(a[d], this, c), !0 === b && i(a[d], this, c);
    c.sort(g);
    return c;
  };
})(THREE);
THREE.Object3D = function () {
  this.id = THREE.Object3DIdCount++;
  this.name = "";
  this.properties = {};
  this.parent = void 0;
  this.children = [];
  this.up = new THREE.Vector3(0, 1, 0);
  this.position = new THREE.Vector3();
  this.rotation = new THREE.Vector3();
  this.eulerOrder = THREE.Object3D.defaultEulerOrder;
  this.scale = new THREE.Vector3(1, 1, 1);
  this.renderDepth = null;
  this.rotationAutoUpdate = !0;
  this.matrix = new THREE.Matrix4();
  this.matrixWorld = new THREE.Matrix4();
  this.matrixRotationWorld = new THREE.Matrix4();
  this.matrixWorldNeedsUpdate = this.matrixAutoUpdate = !0;
  this.quaternion = new THREE.Quaternion();
  this.useQuaternion = !1;
  this.visible = !0;
  this.receiveShadow = this.castShadow = !1;
  this.frustumCulled = !0;
  this._vector = new THREE.Vector3();
};
THREE.Object3D.prototype = {
  constructor: THREE.Object3D,
  applyMatrix: function (a) {
    this.matrix.multiply(a, this.matrix);
    this.scale.getScaleFromMatrix(this.matrix);
    a = new THREE.Matrix4().extractRotation(this.matrix);
    this.rotation.setEulerFromRotationMatrix(a, this.eulerOrder);
    this.position.getPositionFromMatrix(this.matrix);
  },
  translate: function (a, b) {
    this.matrix.rotateAxis(b);
    this.position.addSelf(b.multiplyScalar(a));
  },
  translateX: function (a) {
    this.translate(a, this._vector.set(1, 0, 0));
  },
  translateY: function (a) {
    this.translate(a, this._vector.set(0, 1, 0));
  },
  translateZ: function (a) {
    this.translate(a, this._vector.set(0, 0, 1));
  },
  localToWorld: function (a) {
    return this.matrixWorld.multiplyVector3(a);
  },
  worldToLocal: function (a) {
    return THREE.Object3D.__m1.getInverse(this.matrixWorld).multiplyVector3(a);
  },
  lookAt: function (a) {
    this.matrix.lookAt(a, this.position, this.up);
    this.rotationAutoUpdate &&
      (!1 === this.useQuaternion
        ? this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder)
        : this.quaternion.copy(this.matrix.decompose()[1]));
  },
  add: function (a) {
    if (a === this)
      console.warn(
        "THREE.Object3D.add: An object can't be added as a child of itself."
      );
    else if (a instanceof THREE.Object3D) {
      void 0 !== a.parent && a.parent.remove(a);
      a.parent = this;
      this.children.push(a);
      for (var b = this; void 0 !== b.parent; ) b = b.parent;
      void 0 !== b && b instanceof THREE.Scene && b.__addObject(a);
    }
  },
  remove: function (a) {
    var b = this.children.indexOf(a);
    if (-1 !== b) {
      a.parent = void 0;
      this.children.splice(b, 1);
      for (b = this; void 0 !== b.parent; ) b = b.parent;
      void 0 !== b && b instanceof THREE.Scene && b.__removeObject(a);
    }
  },
  traverse: function (a) {
    a(this);
    for (var b = 0, c = this.children.length; b < c; b++)
      this.children[b].traverse(a);
  },
  getChildByName: function (a, b) {
    for (var c = 0, d = this.children.length; c < d; c++) {
      var e = this.children[c];
      if (
        e.name === a ||
        (!0 === b && ((e = e.getChildByName(a, b)), void 0 !== e))
      )
        return e;
    }
  },
  getDescendants: function (a) {
    void 0 === a && (a = []);
    Array.prototype.push.apply(a, this.children);
    for (var b = 0, c = this.children.length; b < c; b++)
      this.children[b].getDescendants(a);
    return a;
  },
  updateMatrix: function () {
    this.matrix.setPosition(this.position);
    !1 === this.useQuaternion
      ? this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder)
      : this.matrix.setRotationFromQuaternion(this.quaternion);
    (1 !== this.scale.x || 1 !== this.scale.y || 1 !== this.scale.z) &&
      this.matrix.scale(this.scale);
    this.matrixWorldNeedsUpdate = !0;
  },
  updateMatrixWorld: function (a) {
    !0 === this.matrixAutoUpdate && this.updateMatrix();
    if (!0 === this.matrixWorldNeedsUpdate || !0 === a)
      void 0 === this.parent
        ? this.matrixWorld.copy(this.matrix)
        : this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix),
        (this.matrixWorldNeedsUpdate = !1),
        (a = !0);
    for (var b = 0, c = this.children.length; b < c; b++)
      this.children[b].updateMatrixWorld(a);
  },
  clone: function (a) {
    void 0 === a && (a = new THREE.Object3D());
    a.name = this.name;
    a.up.copy(this.up);
    a.position.copy(this.position);
    a.rotation instanceof THREE.Vector3 && a.rotation.copy(this.rotation);
    a.eulerOrder = this.eulerOrder;
    a.scale.copy(this.scale);
    a.renderDepth = this.renderDepth;
    a.rotationAutoUpdate = this.rotationAutoUpdate;
    a.matrix.copy(this.matrix);
    a.matrixWorld.copy(this.matrixWorld);
    a.matrixRotationWorld.copy(this.matrixRotationWorld);
    a.matrixAutoUpdate = this.matrixAutoUpdate;
    a.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate;
    a.quaternion.copy(this.quaternion);
    a.useQuaternion = this.useQuaternion;
    a.visible = this.visible;
    a.castShadow = this.castShadow;
    a.receiveShadow = this.receiveShadow;
    a.frustumCulled = this.frustumCulled;
    for (var b = 0; b < this.children.length; b++)
      a.add(this.children[b].clone());
    return a;
  },
};
THREE.Object3D.__m1 = new THREE.Matrix4();
THREE.Object3D.defaultEulerOrder = "XYZ";
THREE.Object3DIdCount = 0;
THREE.Projector = function () {
  function a() {
    if (f === h) {
      var a = new THREE.RenderableObject();
      g.push(a);
      h++;
      f++;
      return a;
    }
    return g[f++];
  }
  function b() {
    if (k === p) {
      var a = new THREE.RenderableVertex();
      n.push(a);
      p++;
      k++;
      return a;
    }
    return n[k++];
  }
  function c(a, b) {
    return b.z - a.z;
  }
  function d(a, b) {
    var c = 0,
      d = 1,
      e = a.z + a.w,
      f = b.z + b.w,
      g = -a.z + a.w,
      h = -b.z + b.w;
    if (0 <= e && 0 <= f && 0 <= g && 0 <= h) return !0;
    if ((0 > e && 0 > f) || (0 > g && 0 > h)) return !1;
    0 > e
      ? (c = Math.max(c, e / (e - f)))
      : 0 > f && (d = Math.min(d, e / (e - f)));
    0 > g
      ? (c = Math.max(c, g / (g - h)))
      : 0 > h && (d = Math.min(d, g / (g - h)));
    if (d < c) return !1;
    a.lerpSelf(b, c);
    b.lerpSelf(a, 1 - d);
    return !0;
  }
  var e,
    f,
    g = [],
    h = 0,
    i,
    k,
    n = [],
    p = 0,
    m,
    r,
    s = [],
    l = 0,
    q,
    u = [],
    B = 0,
    x,
    t,
    F = [],
    C = 0,
    A,
    z,
    H = [],
    G = 0,
    I = { objects: [], sprites: [], lights: [], elements: [] },
    $ = new THREE.Vector3(),
    D = new THREE.Vector4(),
    L = new THREE.Matrix4(),
    y = new THREE.Matrix4(),
    J = new THREE.Matrix3(),
    K = new THREE.Frustum(),
    R = new THREE.Vector4(),
    P = new THREE.Vector4();
  this.projectVector = function (a, b) {
    b.matrixWorldInverse.getInverse(b.matrixWorld);
    L.multiply(b.projectionMatrix, b.matrixWorldInverse);
    L.multiplyVector3(a);
    return a;
  };
  this.unprojectVector = function (a, b) {
    b.projectionMatrixInverse.getInverse(b.projectionMatrix);
    L.multiply(b.matrixWorld, b.projectionMatrixInverse);
    L.multiplyVector3(a);
    return a;
  };
  this.pickingRay = function (a, b) {
    a.z = -1;
    var c = new THREE.Vector3(a.x, a.y, 1);
    this.unprojectVector(a, b);
    this.unprojectVector(c, b);
    c.subSelf(a).normalize();
    return new THREE.Raycaster(a, c);
  };
  this.projectScene = function (g, h, p, pa) {
    var ya = h.near,
      ua = h.far,
      N = !1,
      O,
      aa,
      fa,
      V,
      ja,
      Z,
      ga,
      oa,
      za,
      Da,
      Ta,
      sa,
      nb,
      Bb,
      kb;
    z = t = q = r = 0;
    I.elements.length = 0;
    g.updateMatrixWorld();
    void 0 === h.parent && h.updateMatrixWorld();
    h.matrixWorldInverse.getInverse(h.matrixWorld);
    L.multiply(h.projectionMatrix, h.matrixWorldInverse);
    K.setFromMatrix(L);
    f = 0;
    I.objects.length = 0;
    I.sprites.length = 0;
    I.lights.length = 0;
    var eb = function (b) {
      for (var c = 0, d = b.children.length; c < d; c++) {
        var f = b.children[c];
        if (!1 !== f.visible) {
          if (f instanceof THREE.Light) I.lights.push(f);
          else if (f instanceof THREE.Mesh || f instanceof THREE.Line) {
            if (!1 === f.frustumCulled || !0 === K.contains(f))
              (e = a()),
                (e.object = f),
                null !== f.renderDepth
                  ? (e.z = f.renderDepth)
                  : ($.copy(f.matrixWorld.getPosition()),
                    L.multiplyVector3($),
                    (e.z = $.z)),
                I.objects.push(e);
          } else
            f instanceof THREE.Sprite || f instanceof THREE.Particle
              ? ((e = a()),
                (e.object = f),
                null !== f.renderDepth
                  ? (e.z = f.renderDepth)
                  : ($.copy(f.matrixWorld.getPosition()),
                    L.multiplyVector3($),
                    (e.z = $.z)),
                I.sprites.push(e))
              : ((e = a()),
                (e.object = f),
                null !== f.renderDepth
                  ? (e.z = f.renderDepth)
                  : ($.copy(f.matrixWorld.getPosition()),
                    L.multiplyVector3($),
                    (e.z = $.z)),
                I.objects.push(e));
          eb(f);
        }
      }
    };
    eb(g);
    !0 === p && I.objects.sort(c);
    g = 0;
    for (p = I.objects.length; g < p; g++)
      if (
        ((oa = I.objects[g].object),
        (za = oa.matrixWorld),
        (k = 0),
        oa instanceof THREE.Mesh)
      ) {
        Da = oa.geometry;
        fa = Da.vertices;
        Ta = Da.faces;
        Da = Da.faceVertexUvs;
        J.getInverse(za);
        J.transpose();
        nb = oa.material instanceof THREE.MeshFaceMaterial;
        Bb = !0 === nb ? oa.material : null;
        O = 0;
        for (aa = fa.length; O < aa; O++)
          (i = b()),
            i.positionWorld.copy(fa[O]),
            za.multiplyVector3(i.positionWorld),
            i.positionScreen.copy(i.positionWorld),
            L.multiplyVector4(i.positionScreen),
            (i.positionScreen.x /= i.positionScreen.w),
            (i.positionScreen.y /= i.positionScreen.w),
            (i.visible = i.positionScreen.z > ya && i.positionScreen.z < ua);
        fa = 0;
        for (O = Ta.length; fa < O; fa++)
          if (
            ((aa = Ta[fa]),
            (kb = !0 === nb ? Bb.materials[aa.materialIndex] : oa.material),
            void 0 !== kb)
          ) {
            Z = kb.side;
            if (aa instanceof THREE.Face3)
              if (
                ((V = n[aa.a]),
                (ja = n[aa.b]),
                (ga = n[aa.c]),
                !0 === V.visible && !0 === ja.visible && !0 === ga.visible)
              )
                if (
                  ((N =
                    0 >
                    (ga.positionScreen.x - V.positionScreen.x) *
                      (ja.positionScreen.y - V.positionScreen.y) -
                      (ga.positionScreen.y - V.positionScreen.y) *
                        (ja.positionScreen.x - V.positionScreen.x)),
                  Z === THREE.DoubleSide || N === (Z === THREE.FrontSide))
                )
                  r === l
                    ? ((sa = new THREE.RenderableFace3()),
                      s.push(sa),
                      l++,
                      r++,
                      (m = sa))
                    : (m = s[r++]),
                    m.v1.copy(V),
                    m.v2.copy(ja),
                    m.v3.copy(ga);
                else continue;
              else continue;
            else if (aa instanceof THREE.Face4)
              if (
                ((V = n[aa.a]),
                (ja = n[aa.b]),
                (ga = n[aa.c]),
                (sa = n[aa.d]),
                !0 === V.visible &&
                  !0 === ja.visible &&
                  !0 === ga.visible &&
                  !0 === sa.visible)
              )
                if (
                  ((N =
                    0 >
                      (sa.positionScreen.x - V.positionScreen.x) *
                        (ja.positionScreen.y - V.positionScreen.y) -
                        (sa.positionScreen.y - V.positionScreen.y) *
                          (ja.positionScreen.x - V.positionScreen.x) ||
                    0 >
                      (ja.positionScreen.x - ga.positionScreen.x) *
                        (sa.positionScreen.y - ga.positionScreen.y) -
                        (ja.positionScreen.y - ga.positionScreen.y) *
                          (sa.positionScreen.x - ga.positionScreen.x)),
                  Z === THREE.DoubleSide || N === (Z === THREE.FrontSide))
                ) {
                  if (q === B) {
                    var pb = new THREE.RenderableFace4();
                    u.push(pb);
                    B++;
                    q++;
                    m = pb;
                  } else m = u[q++];
                  m.v1.copy(V);
                  m.v2.copy(ja);
                  m.v3.copy(ga);
                  m.v4.copy(sa);
                } else continue;
              else continue;
            m.normalWorld.copy(aa.normal);
            !1 === N &&
              (Z === THREE.BackSide || Z === THREE.DoubleSide) &&
              m.normalWorld.negate();
            J.multiplyVector3(m.normalWorld).normalize();
            m.centroidWorld.copy(aa.centroid);
            za.multiplyVector3(m.centroidWorld);
            m.centroidScreen.copy(m.centroidWorld);
            L.multiplyVector3(m.centroidScreen);
            ga = aa.vertexNormals;
            V = 0;
            for (ja = ga.length; V < ja; V++)
              (sa = m.vertexNormalsWorld[V]),
                sa.copy(ga[V]),
                !1 === N &&
                  (Z === THREE.BackSide || Z === THREE.DoubleSide) &&
                  sa.negate(),
                J.multiplyVector3(sa).normalize();
            m.vertexNormalsLength = ga.length;
            V = 0;
            for (ja = Da.length; V < ja; V++)
              if (((sa = Da[V][fa]), void 0 !== sa)) {
                Z = 0;
                for (ga = sa.length; Z < ga; Z++) m.uvs[V][Z] = sa[Z];
              }
            m.color = aa.color;
            m.material = kb;
            m.z = m.centroidScreen.z;
            I.elements.push(m);
          }
      } else if (oa instanceof THREE.Line) {
        y.multiply(L, za);
        fa = oa.geometry.vertices;
        V = b();
        V.positionScreen.copy(fa[0]);
        y.multiplyVector4(V.positionScreen);
        za = oa.type === THREE.LinePieces ? 2 : 1;
        O = 1;
        for (aa = fa.length; O < aa; O++)
          (V = b()),
            V.positionScreen.copy(fa[O]),
            y.multiplyVector4(V.positionScreen),
            0 < (O + 1) % za ||
              ((ja = n[k - 2]),
              R.copy(V.positionScreen),
              P.copy(ja.positionScreen),
              !0 === d(R, P) &&
                (R.multiplyScalar(1 / R.w),
                P.multiplyScalar(1 / P.w),
                t === C
                  ? ((Ta = new THREE.RenderableLine()),
                    F.push(Ta),
                    C++,
                    t++,
                    (x = Ta))
                  : (x = F[t++]),
                x.v1.positionScreen.copy(R),
                x.v2.positionScreen.copy(P),
                (x.z = Math.max(R.z, P.z)),
                (x.material = oa.material),
                I.elements.push(x)));
      }
    g = 0;
    for (p = I.sprites.length; g < p; g++)
      (oa = I.sprites[g].object),
        (za = oa.matrixWorld),
        oa instanceof THREE.Particle &&
          (D.set(za.elements[12], za.elements[13], za.elements[14], 1),
          L.multiplyVector4(D),
          (D.z /= D.w),
          0 < D.z &&
            1 > D.z &&
            (z === G
              ? ((ya = new THREE.RenderableParticle()),
                H.push(ya),
                G++,
                z++,
                (A = ya))
              : (A = H[z++]),
            (A.object = oa),
            (A.x = D.x / D.w),
            (A.y = D.y / D.w),
            (A.z = D.z),
            (A.rotation = oa.rotation.z),
            (A.scale.x =
              oa.scale.x *
              Math.abs(
                A.x -
                  (D.x + h.projectionMatrix.elements[0]) /
                    (D.w + h.projectionMatrix.elements[12])
              )),
            (A.scale.y =
              oa.scale.y *
              Math.abs(
                A.y -
                  (D.y + h.projectionMatrix.elements[5]) /
                    (D.w + h.projectionMatrix.elements[13])
              )),
            (A.material = oa.material),
            I.elements.push(A)));
    !0 === pa && I.elements.sort(c);
    return I;
  };
};
THREE.Face3 = function (a, b, c, d, e, f) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.normal = d instanceof THREE.Vector3 ? d : new THREE.Vector3();
  this.vertexNormals = d instanceof Array ? d : [];
  this.color = e instanceof THREE.Color ? e : new THREE.Color();
  this.vertexColors = e instanceof Array ? e : [];
  this.vertexTangents = [];
  this.materialIndex = void 0 !== f ? f : 0;
  this.centroid = new THREE.Vector3();
};
THREE.Face3.prototype = {
  constructor: THREE.Face3,
  clone: function () {
    var a = new THREE.Face3(this.a, this.b, this.c);
    a.normal.copy(this.normal);
    a.color.copy(this.color);
    a.centroid.copy(this.centroid);
    a.materialIndex = this.materialIndex;
    var b, c;
    b = 0;
    for (c = this.vertexNormals.length; b < c; b++)
      a.vertexNormals[b] = this.vertexNormals[b].clone();
    b = 0;
    for (c = this.vertexColors.length; b < c; b++)
      a.vertexColors[b] = this.vertexColors[b].clone();
    b = 0;
    for (c = this.vertexTangents.length; b < c; b++)
      a.vertexTangents[b] = this.vertexTangents[b].clone();
    return a;
  },
};
THREE.Face4 = function (a, b, c, d, e, f, g) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.normal = e instanceof THREE.Vector3 ? e : new THREE.Vector3();
  this.vertexNormals = e instanceof Array ? e : [];
  this.color = f instanceof THREE.Color ? f : new THREE.Color();
  this.vertexColors = f instanceof Array ? f : [];
  this.vertexTangents = [];
  this.materialIndex = void 0 !== g ? g : 0;
  this.centroid = new THREE.Vector3();
};
THREE.Face4.prototype = {
  constructor: THREE.Face4,
  clone: function () {
    var a = new THREE.Face4(this.a, this.b, this.c, this.d);
    a.normal.copy(this.normal);
    a.color.copy(this.color);
    a.centroid.copy(this.centroid);
    a.materialIndex = this.materialIndex;
    var b, c;
    b = 0;
    for (c = this.vertexNormals.length; b < c; b++)
      a.vertexNormals[b] = this.vertexNormals[b].clone();
    b = 0;
    for (c = this.vertexColors.length; b < c; b++)
      a.vertexColors[b] = this.vertexColors[b].clone();
    b = 0;
    for (c = this.vertexTangents.length; b < c; b++)
      a.vertexTangents[b] = this.vertexTangents[b].clone();
    return a;
  },
};
THREE.Geometry = function () {
  THREE.EventDispatcher.call(this);
  this.id = THREE.GeometryIdCount++;
  this.name = "";
  this.vertices = [];
  this.colors = [];
  this.normals = [];
  this.faces = [];
  this.faceUvs = [[]];
  this.faceVertexUvs = [[]];
  this.morphTargets = [];
  this.morphColors = [];
  this.morphNormals = [];
  this.skinWeights = [];
  this.skinIndices = [];
  this.lineDistances = [];
  this.boundingSphere = this.boundingBox = null;
  this.hasTangents = !1;
  this.dynamic = !0;
  this.buffersNeedUpdate =
    this.lineDistancesNeedUpdate =
    this.colorsNeedUpdate =
    this.tangentsNeedUpdate =
    this.normalsNeedUpdate =
    this.uvsNeedUpdate =
    this.elementsNeedUpdate =
    this.verticesNeedUpdate =
      !1;
};
THREE.Geometry.prototype = {
  constructor: THREE.Geometry,
  applyMatrix: function (a) {
    var b = new THREE.Matrix3();
    b.getInverse(a).transpose();
    for (var c = 0, d = this.vertices.length; c < d; c++)
      a.multiplyVector3(this.vertices[c]);
    c = 0;
    for (d = this.faces.length; c < d; c++) {
      var e = this.faces[c];
      b.multiplyVector3(e.normal).normalize();
      for (var f = 0, g = e.vertexNormals.length; f < g; f++)
        b.multiplyVector3(e.vertexNormals[f]).normalize();
      a.multiplyVector3(e.centroid);
    }
  },
  computeCentroids: function () {
    var a, b, c;
    a = 0;
    for (b = this.faces.length; a < b; a++)
      (c = this.faces[a]),
        c.centroid.set(0, 0, 0),
        c instanceof THREE.Face3
          ? (c.centroid.addSelf(this.vertices[c.a]),
            c.centroid.addSelf(this.vertices[c.b]),
            c.centroid.addSelf(this.vertices[c.c]),
            c.centroid.divideScalar(3))
          : c instanceof THREE.Face4 &&
            (c.centroid.addSelf(this.vertices[c.a]),
            c.centroid.addSelf(this.vertices[c.b]),
            c.centroid.addSelf(this.vertices[c.c]),
            c.centroid.addSelf(this.vertices[c.d]),
            c.centroid.divideScalar(4));
  },
  computeFaceNormals: function () {
    var a,
      b,
      c,
      d,
      e,
      f,
      g = new THREE.Vector3(),
      h = new THREE.Vector3();
    a = 0;
    for (b = this.faces.length; a < b; a++)
      (c = this.faces[a]),
        (d = this.vertices[c.a]),
        (e = this.vertices[c.b]),
        (f = this.vertices[c.c]),
        g.sub(f, e),
        h.sub(d, e),
        g.crossSelf(h),
        g.normalize(),
        c.normal.copy(g);
  },
  computeVertexNormals: function (a) {
    var b, c, d, e;
    if (void 0 === this.__tmpVertices) {
      e = this.__tmpVertices = Array(this.vertices.length);
      b = 0;
      for (c = this.vertices.length; b < c; b++) e[b] = new THREE.Vector3();
      b = 0;
      for (c = this.faces.length; b < c; b++)
        (d = this.faces[b]),
          d instanceof THREE.Face3
            ? (d.vertexNormals = [
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
              ])
            : d instanceof THREE.Face4 &&
              (d.vertexNormals = [
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
              ]);
    } else {
      e = this.__tmpVertices;
      b = 0;
      for (c = this.vertices.length; b < c; b++) e[b].set(0, 0, 0);
    }
    if (a) {
      var f,
        g,
        h,
        i = new THREE.Vector3(),
        k = new THREE.Vector3(),
        n = new THREE.Vector3(),
        p = new THREE.Vector3(),
        m = new THREE.Vector3();
      b = 0;
      for (c = this.faces.length; b < c; b++)
        (d = this.faces[b]),
          d instanceof THREE.Face3
            ? ((a = this.vertices[d.a]),
              (f = this.vertices[d.b]),
              (g = this.vertices[d.c]),
              i.sub(g, f),
              k.sub(a, f),
              i.crossSelf(k),
              e[d.a].addSelf(i),
              e[d.b].addSelf(i),
              e[d.c].addSelf(i))
            : d instanceof THREE.Face4 &&
              ((a = this.vertices[d.a]),
              (f = this.vertices[d.b]),
              (g = this.vertices[d.c]),
              (h = this.vertices[d.d]),
              n.sub(h, f),
              k.sub(a, f),
              n.crossSelf(k),
              e[d.a].addSelf(n),
              e[d.b].addSelf(n),
              e[d.d].addSelf(n),
              p.sub(h, g),
              m.sub(f, g),
              p.crossSelf(m),
              e[d.b].addSelf(p),
              e[d.c].addSelf(p),
              e[d.d].addSelf(p));
    } else {
      b = 0;
      for (c = this.faces.length; b < c; b++)
        (d = this.faces[b]),
          d instanceof THREE.Face3
            ? (e[d.a].addSelf(d.normal),
              e[d.b].addSelf(d.normal),
              e[d.c].addSelf(d.normal))
            : d instanceof THREE.Face4 &&
              (e[d.a].addSelf(d.normal),
              e[d.b].addSelf(d.normal),
              e[d.c].addSelf(d.normal),
              e[d.d].addSelf(d.normal));
    }
    b = 0;
    for (c = this.vertices.length; b < c; b++) e[b].normalize();
    b = 0;
    for (c = this.faces.length; b < c; b++)
      (d = this.faces[b]),
        d instanceof THREE.Face3
          ? (d.vertexNormals[0].copy(e[d.a]),
            d.vertexNormals[1].copy(e[d.b]),
            d.vertexNormals[2].copy(e[d.c]))
          : d instanceof THREE.Face4 &&
            (d.vertexNormals[0].copy(e[d.a]),
            d.vertexNormals[1].copy(e[d.b]),
            d.vertexNormals[2].copy(e[d.c]),
            d.vertexNormals[3].copy(e[d.d]));
  },
  computeMorphNormals: function () {
    var a, b, c, d, e;
    c = 0;
    for (d = this.faces.length; c < d; c++) {
      e = this.faces[c];
      e.__originalFaceNormal
        ? e.__originalFaceNormal.copy(e.normal)
        : (e.__originalFaceNormal = e.normal.clone());
      e.__originalVertexNormals || (e.__originalVertexNormals = []);
      a = 0;
      for (b = e.vertexNormals.length; a < b; a++)
        e.__originalVertexNormals[a]
          ? e.__originalVertexNormals[a].copy(e.vertexNormals[a])
          : (e.__originalVertexNormals[a] = e.vertexNormals[a].clone());
    }
    var f = new THREE.Geometry();
    f.faces = this.faces;
    a = 0;
    for (b = this.morphTargets.length; a < b; a++) {
      if (!this.morphNormals[a]) {
        this.morphNormals[a] = {};
        this.morphNormals[a].faceNormals = [];
        this.morphNormals[a].vertexNormals = [];
        var g = this.morphNormals[a].faceNormals,
          h = this.morphNormals[a].vertexNormals,
          i,
          k;
        c = 0;
        for (d = this.faces.length; c < d; c++)
          (e = this.faces[c]),
            (i = new THREE.Vector3()),
            (k =
              e instanceof THREE.Face3
                ? {
                    a: new THREE.Vector3(),
                    b: new THREE.Vector3(),
                    c: new THREE.Vector3(),
                  }
                : {
                    a: new THREE.Vector3(),
                    b: new THREE.Vector3(),
                    c: new THREE.Vector3(),
                    d: new THREE.Vector3(),
                  }),
            g.push(i),
            h.push(k);
      }
      g = this.morphNormals[a];
      f.vertices = this.morphTargets[a].vertices;
      f.computeFaceNormals();
      f.computeVertexNormals();
      c = 0;
      for (d = this.faces.length; c < d; c++)
        (e = this.faces[c]),
          (i = g.faceNormals[c]),
          (k = g.vertexNormals[c]),
          i.copy(e.normal),
          e instanceof THREE.Face3
            ? (k.a.copy(e.vertexNormals[0]),
              k.b.copy(e.vertexNormals[1]),
              k.c.copy(e.vertexNormals[2]))
            : (k.a.copy(e.vertexNormals[0]),
              k.b.copy(e.vertexNormals[1]),
              k.c.copy(e.vertexNormals[2]),
              k.d.copy(e.vertexNormals[3]));
    }
    c = 0;
    for (d = this.faces.length; c < d; c++)
      (e = this.faces[c]),
        (e.normal = e.__originalFaceNormal),
        (e.vertexNormals = e.__originalVertexNormals);
  },
  computeTangents: function () {
    function a(a, b, c, d, e, f, z) {
      h = a.vertices[b];
      i = a.vertices[c];
      k = a.vertices[d];
      n = g[e];
      p = g[f];
      m = g[z];
      r = i.x - h.x;
      s = k.x - h.x;
      l = i.y - h.y;
      q = k.y - h.y;
      u = i.z - h.z;
      B = k.z - h.z;
      x = p.x - n.x;
      t = m.x - n.x;
      F = p.y - n.y;
      C = m.y - n.y;
      A = 1 / (x * C - t * F);
      I.set((C * r - F * s) * A, (C * l - F * q) * A, (C * u - F * B) * A);
      $.set((x * s - t * r) * A, (x * q - t * l) * A, (x * B - t * u) * A);
      H[b].addSelf(I);
      H[c].addSelf(I);
      H[d].addSelf(I);
      G[b].addSelf($);
      G[c].addSelf($);
      G[d].addSelf($);
    }
    var b,
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      k,
      n,
      p,
      m,
      r,
      s,
      l,
      q,
      u,
      B,
      x,
      t,
      F,
      C,
      A,
      z,
      H = [],
      G = [],
      I = new THREE.Vector3(),
      $ = new THREE.Vector3(),
      D = new THREE.Vector3(),
      L = new THREE.Vector3(),
      y = new THREE.Vector3();
    b = 0;
    for (c = this.vertices.length; b < c; b++)
      (H[b] = new THREE.Vector3()), (G[b] = new THREE.Vector3());
    b = 0;
    for (c = this.faces.length; b < c; b++)
      (f = this.faces[b]),
        (g = this.faceVertexUvs[0][b]),
        f instanceof THREE.Face3
          ? a(this, f.a, f.b, f.c, 0, 1, 2)
          : f instanceof THREE.Face4 &&
            (a(this, f.a, f.b, f.d, 0, 1, 3), a(this, f.b, f.c, f.d, 1, 2, 3));
    var J = ["a", "b", "c", "d"];
    b = 0;
    for (c = this.faces.length; b < c; b++) {
      f = this.faces[b];
      for (d = 0; d < f.vertexNormals.length; d++)
        y.copy(f.vertexNormals[d]),
          (e = f[J[d]]),
          (z = H[e]),
          D.copy(z),
          D.subSelf(y.multiplyScalar(y.dot(z))).normalize(),
          L.cross(f.vertexNormals[d], z),
          (e = L.dot(G[e])),
          (e = 0 > e ? -1 : 1),
          (f.vertexTangents[d] = new THREE.Vector4(D.x, D.y, D.z, e));
    }
    this.hasTangents = !0;
  },
  computeLineDistances: function () {
    for (var a = 0, b = this.vertices, c = 0, d = b.length; c < d; c++)
      0 < c && (a += b[c].distanceTo(b[c - 1])), (this.lineDistances[c] = a);
  },
  computeBoundingBox: function () {
    null === this.boundingBox && (this.boundingBox = new THREE.Box3());
    this.boundingBox.setFromPoints(this.vertices);
  },
  computeBoundingSphere: function () {
    null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere());
    this.boundingSphere.setFromCenterAndPoints(
      this.boundingSphere.center,
      this.vertices
    );
  },
  mergeVertices: function () {
    var a = {},
      b = [],
      c = [],
      d,
      e = Math.pow(10, 4),
      f,
      g,
      h,
      i;
    f = 0;
    for (g = this.vertices.length; f < g; f++)
      (d = this.vertices[f]),
        (d = [
          Math.round(d.x * e),
          Math.round(d.y * e),
          Math.round(d.z * e),
        ].join("_")),
        void 0 === a[d]
          ? ((a[d] = f), b.push(this.vertices[f]), (c[f] = b.length - 1))
          : (c[f] = c[a[d]]);
    f = 0;
    for (g = this.faces.length; f < g; f++)
      if (((a = this.faces[f]), a instanceof THREE.Face3))
        (a.a = c[a.a]), (a.b = c[a.b]), (a.c = c[a.c]);
      else if (a instanceof THREE.Face4) {
        a.a = c[a.a];
        a.b = c[a.b];
        a.c = c[a.c];
        a.d = c[a.d];
        d = [a.a, a.b, a.c, a.d];
        for (e = 3; 0 < e; e--)
          if (d.indexOf(a["abcd"[e]]) !== e) {
            d.splice(e, 1);
            this.faces[f] = new THREE.Face3(
              d[0],
              d[1],
              d[2],
              a.normal,
              a.color,
              a.materialIndex
            );
            d = 0;
            for (h = this.faceVertexUvs.length; d < h; d++)
              (i = this.faceVertexUvs[d][f]) && i.splice(e, 1);
            this.faces[f].vertexColors = a.vertexColors;
            break;
          }
      }
    c = this.vertices.length - b.length;
    this.vertices = b;
    return c;
  },
  clone: function () {
    for (
      var a = new THREE.Geometry(), b = this.vertices, c = 0, d = b.length;
      c < d;
      c++
    )
      a.vertices.push(b[c].clone());
    b = this.faces;
    c = 0;
    for (d = b.length; c < d; c++) a.faces.push(b[c].clone());
    b = this.faceVertexUvs[0];
    c = 0;
    for (d = b.length; c < d; c++) {
      for (var e = b[c], f = [], g = 0, h = e.length; g < h; g++)
        f.push(new THREE.Vector2(e[g].x, e[g].y));
      a.faceVertexUvs[0].push(f);
    }
    return a;
  },
  dispose: function () {
    this.dispatchEvent({ type: "dispose" });
  },
};
THREE.GeometryIdCount = 0;
THREE.BufferGeometry = function () {
  THREE.EventDispatcher.call(this);
  this.id = THREE.GeometryIdCount++;
  this.attributes = {};
  this.dynamic = !1;
  this.offsets = [];
  this.boundingSphere = this.boundingBox = null;
  this.hasTangents = !1;
  this.morphTargets = [];
};
THREE.BufferGeometry.prototype = {
  constructor: THREE.BufferGeometry,
  applyMatrix: function (a) {
    var b, c;
    this.attributes.position && (b = this.attributes.position.array);
    this.attributes.normal && (c = this.attributes.normal.array);
    void 0 !== b && (a.multiplyVector3Array(b), (this.verticesNeedUpdate = !0));
    void 0 !== c &&
      ((b = new THREE.Matrix3()),
      b.getInverse(a).transpose(),
      b.multiplyVector3Array(c),
      this.normalizeNormals(),
      (this.normalsNeedUpdate = !0));
  },
  computeBoundingBox: function () {
    null === this.boundingBox && (this.boundingBox = new THREE.Box3());
    var a = this.attributes.position.array;
    if (a) {
      var b = this.boundingBox,
        c,
        d,
        e;
      3 <= a.length &&
        ((b.min.x = b.max.x = a[0]),
        (b.min.y = b.max.y = a[1]),
        (b.min.z = b.max.z = a[2]));
      for (var f = 3, g = a.length; f < g; f += 3)
        (c = a[f]),
          (d = a[f + 1]),
          (e = a[f + 2]),
          c < b.min.x ? (b.min.x = c) : c > b.max.x && (b.max.x = c),
          d < b.min.y ? (b.min.y = d) : d > b.max.y && (b.max.y = d),
          e < b.min.z ? (b.min.z = e) : e > b.max.z && (b.max.z = e);
    }
    if (void 0 === a || 0 === a.length)
      this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0);
  },
  computeBoundingSphere: function () {
    null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere());
    var a = this.attributes.position.array;
    if (a) {
      for (var b, c = 0, d, e, f = 0, g = a.length; f < g; f += 3)
        (b = a[f]),
          (d = a[f + 1]),
          (e = a[f + 2]),
          (b = b * b + d * d + e * e),
          b > c && (c = b);
      this.boundingSphere.radius = Math.sqrt(c);
    }
  },
  computeVertexNormals: function () {
    if (this.attributes.position) {
      var a, b, c, d;
      a = this.attributes.position.array.length;
      if (void 0 === this.attributes.normal)
        this.attributes.normal = {
          itemSize: 3,
          array: new Float32Array(a),
          numItems: a,
        };
      else {
        a = 0;
        for (b = this.attributes.normal.array.length; a < b; a++)
          this.attributes.normal.array[a] = 0;
      }
      var e = this.attributes.position.array,
        f = this.attributes.normal.array,
        g,
        h,
        i,
        k,
        n,
        p,
        m = new THREE.Vector3(),
        r = new THREE.Vector3(),
        s = new THREE.Vector3(),
        l = new THREE.Vector3(),
        q = new THREE.Vector3();
      if (this.attributes.index) {
        var u = this.attributes.index.array,
          B = this.offsets;
        c = 0;
        for (d = B.length; c < d; ++c) {
          b = B[c].start;
          g = B[c].count;
          var x = B[c].index;
          a = b;
          for (b += g; a < b; a += 3)
            (g = x + u[a]),
              (h = x + u[a + 1]),
              (i = x + u[a + 2]),
              (k = e[3 * g]),
              (n = e[3 * g + 1]),
              (p = e[3 * g + 2]),
              m.set(k, n, p),
              (k = e[3 * h]),
              (n = e[3 * h + 1]),
              (p = e[3 * h + 2]),
              r.set(k, n, p),
              (k = e[3 * i]),
              (n = e[3 * i + 1]),
              (p = e[3 * i + 2]),
              s.set(k, n, p),
              l.sub(s, r),
              q.sub(m, r),
              l.crossSelf(q),
              (f[3 * g] += l.x),
              (f[3 * g + 1] += l.y),
              (f[3 * g + 2] += l.z),
              (f[3 * h] += l.x),
              (f[3 * h + 1] += l.y),
              (f[3 * h + 2] += l.z),
              (f[3 * i] += l.x),
              (f[3 * i + 1] += l.y),
              (f[3 * i + 2] += l.z);
        }
      } else {
        a = 0;
        for (b = e.length; a < b; a += 9)
          (k = e[a]),
            (n = e[a + 1]),
            (p = e[a + 2]),
            m.set(k, n, p),
            (k = e[a + 3]),
            (n = e[a + 4]),
            (p = e[a + 5]),
            r.set(k, n, p),
            (k = e[a + 6]),
            (n = e[a + 7]),
            (p = e[a + 8]),
            s.set(k, n, p),
            l.sub(s, r),
            q.sub(m, r),
            l.crossSelf(q),
            (f[a] = l.x),
            (f[a + 1] = l.y),
            (f[a + 2] = l.z),
            (f[a + 3] = l.x),
            (f[a + 4] = l.y),
            (f[a + 5] = l.z),
            (f[a + 6] = l.x),
            (f[a + 7] = l.y),
            (f[a + 8] = l.z);
      }
      this.normalizeNormals();
      this.normalsNeedUpdate = !0;
    }
  },
  normalizeNormals: function () {
    for (
      var a = this.attributes.normal.array, b, c, d, e = 0, f = a.length;
      e < f;
      e += 3
    )
      (b = a[e]),
        (c = a[e + 1]),
        (d = a[e + 2]),
        (b = 1 / Math.sqrt(b * b + c * c + d * d)),
        (a[e] *= b),
        (a[e + 1] *= b),
        (a[e + 2] *= b);
  },
  computeTangents: function () {
    function a(a) {
      ca.x = d[3 * a];
      ca.y = d[3 * a + 1];
      ca.z = d[3 * a + 2];
      xa.copy(ca);
      pa = i[a];
      R.copy(pa);
      R.subSelf(ca.multiplyScalar(ca.dot(pa))).normalize();
      P.cross(xa, pa);
      ya = P.dot(k[a]);
      M = 0 > ya ? -1 : 1;
      h[4 * a] = R.x;
      h[4 * a + 1] = R.y;
      h[4 * a + 2] = R.z;
      h[4 * a + 3] = M;
    }
    if (
      void 0 === this.attributes.index ||
      void 0 === this.attributes.position ||
      void 0 === this.attributes.normal ||
      void 0 === this.attributes.uv
    )
      console.warn(
        "Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()"
      );
    else {
      var b = this.attributes.index.array,
        c = this.attributes.position.array,
        d = this.attributes.normal.array,
        e = this.attributes.uv.array,
        f = c.length / 3;
      if (void 0 === this.attributes.tangent) {
        var g = 4 * f;
        this.attributes.tangent = {
          itemSize: 4,
          array: new Float32Array(g),
          numItems: g,
        };
      }
      for (
        var h = this.attributes.tangent.array, i = [], k = [], g = 0;
        g < f;
        g++
      )
        (i[g] = new THREE.Vector3()), (k[g] = new THREE.Vector3());
      var n,
        p,
        m,
        r,
        s,
        l,
        q,
        u,
        B,
        x,
        t,
        F,
        C,
        A,
        z,
        f = new THREE.Vector3(),
        g = new THREE.Vector3(),
        H,
        G,
        I,
        $,
        D,
        L,
        y,
        J = this.offsets;
      I = 0;
      for ($ = J.length; I < $; ++I) {
        G = J[I].start;
        D = J[I].count;
        var K = J[I].index;
        H = G;
        for (G += D; H < G; H += 3)
          (D = K + b[H]),
            (L = K + b[H + 1]),
            (y = K + b[H + 2]),
            (n = c[3 * D]),
            (p = c[3 * D + 1]),
            (m = c[3 * D + 2]),
            (r = c[3 * L]),
            (s = c[3 * L + 1]),
            (l = c[3 * L + 2]),
            (q = c[3 * y]),
            (u = c[3 * y + 1]),
            (B = c[3 * y + 2]),
            (x = e[2 * D]),
            (t = e[2 * D + 1]),
            (F = e[2 * L]),
            (C = e[2 * L + 1]),
            (A = e[2 * y]),
            (z = e[2 * y + 1]),
            (r -= n),
            (n = q - n),
            (s -= p),
            (p = u - p),
            (l -= m),
            (m = B - m),
            (F -= x),
            (x = A - x),
            (C -= t),
            (t = z - t),
            (z = 1 / (F * t - x * C)),
            f.set(
              (t * r - C * n) * z,
              (t * s - C * p) * z,
              (t * l - C * m) * z
            ),
            g.set(
              (F * n - x * r) * z,
              (F * p - x * s) * z,
              (F * m - x * l) * z
            ),
            i[D].addSelf(f),
            i[L].addSelf(f),
            i[y].addSelf(f),
            k[D].addSelf(g),
            k[L].addSelf(g),
            k[y].addSelf(g);
      }
      var R = new THREE.Vector3(),
        P = new THREE.Vector3(),
        ca = new THREE.Vector3(),
        xa = new THREE.Vector3(),
        M,
        pa,
        ya;
      I = 0;
      for ($ = J.length; I < $; ++I) {
        G = J[I].start;
        D = J[I].count;
        K = J[I].index;
        H = G;
        for (G += D; H < G; H += 3)
          (D = K + b[H]),
            (L = K + b[H + 1]),
            (y = K + b[H + 2]),
            a(D),
            a(L),
            a(y);
      }
      this.tangentsNeedUpdate = this.hasTangents = !0;
    }
  },
  dispose: function () {
    this.dispatchEvent({ type: "dispose" });
  },
};
THREE.Camera = function () {
  THREE.Object3D.call(this);
  this.matrixWorldInverse = new THREE.Matrix4();
  this.projectionMatrix = new THREE.Matrix4();
  this.projectionMatrixInverse = new THREE.Matrix4();
};
THREE.Camera.prototype = Object.create(THREE.Object3D.prototype);
THREE.Camera.prototype.lookAt = function (a) {
  this.matrix.lookAt(this.position, a, this.up);
  !0 === this.rotationAutoUpdate &&
    (!1 === this.useQuaternion
      ? this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder)
      : this.quaternion.copy(this.matrix.decompose()[1]));
};
THREE.OrthographicCamera = function (a, b, c, d, e, f) {
  THREE.Camera.call(this);
  this.left = a;
  this.right = b;
  this.top = c;
  this.bottom = d;
  this.near = void 0 !== e ? e : 0.1;
  this.far = void 0 !== f ? f : 2e3;
  this.updateProjectionMatrix();
};
THREE.OrthographicCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {
  this.projectionMatrix.makeOrthographic(
    this.left,
    this.right,
    this.top,
    this.bottom,
    this.near,
    this.far
  );
};
THREE.PerspectiveCamera = function (a, b, c, d) {
  THREE.Camera.call(this);
  this.fov = void 0 !== a ? a : 50;
  this.aspect = void 0 !== b ? b : 1;
  this.near = void 0 !== c ? c : 0.1;
  this.far = void 0 !== d ? d : 2e3;
  this.updateProjectionMatrix();
};
THREE.PerspectiveCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.PerspectiveCamera.prototype.setLens = function (a, b) {
  void 0 === b && (b = 24);
  this.fov = 2 * THREE.Math.radToDeg(Math.atan(b / (2 * a)));
  this.updateProjectionMatrix();
};
THREE.PerspectiveCamera.prototype.setViewOffset = function (a, b, c, d, e, f) {
  this.fullWidth = a;
  this.fullHeight = b;
  this.x = c;
  this.y = d;
  this.width = e;
  this.height = f;
  this.updateProjectionMatrix();
};
THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function () {
  if (this.fullWidth) {
    var a = this.fullWidth / this.fullHeight,
      b = Math.tan(THREE.Math.degToRad(0.5 * this.fov)) * this.near,
      c = -b,
      d = a * c,
      a = Math.abs(a * b - d),
      c = Math.abs(b - c);
    this.projectionMatrix.makeFrustum(
      d + (this.x * a) / this.fullWidth,
      d + ((this.x + this.width) * a) / this.fullWidth,
      b - ((this.y + this.height) * c) / this.fullHeight,
      b - (this.y * c) / this.fullHeight,
      this.near,
      this.far
    );
  } else
    this.projectionMatrix.makePerspective(
      this.fov,
      this.aspect,
      this.near,
      this.far
    );
};
THREE.Light = function (a) {
  THREE.Object3D.call(this);
  this.color = new THREE.Color(a);
};
THREE.Light.prototype = Object.create(THREE.Object3D.prototype);
THREE.AmbientLight = function (a) {
  THREE.Light.call(this, a);
};
THREE.AmbientLight.prototype = Object.create(THREE.Light.prototype);
THREE.AreaLight = function (a, b) {
  THREE.Light.call(this, a);
  this.normal = new THREE.Vector3(0, -1, 0);
  this.right = new THREE.Vector3(1, 0, 0);
  this.intensity = void 0 !== b ? b : 1;
  this.height = this.width = 1;
  this.constantAttenuation = 1.5;
  this.linearAttenuation = 0.5;
  this.quadraticAttenuation = 0.1;
};
THREE.AreaLight.prototype = Object.create(THREE.Light.prototype);
THREE.DirectionalLight = function (a, b) {
  THREE.Light.call(this, a);
  this.position = new THREE.Vector3(0, 1, 0);
  this.target = new THREE.Object3D();
  this.intensity = void 0 !== b ? b : 1;
  this.onlyShadow = this.castShadow = !1;
  this.shadowCameraNear = 50;
  this.shadowCameraFar = 5e3;
  this.shadowCameraLeft = -500;
  this.shadowCameraTop = this.shadowCameraRight = 500;
  this.shadowCameraBottom = -500;
  this.shadowCameraVisible = !1;
  this.shadowBias = 0;
  this.shadowDarkness = 0.5;
  this.shadowMapHeight = this.shadowMapWidth = 512;
  this.shadowCascade = !1;
  this.shadowCascadeOffset = new THREE.Vector3(0, 0, -1e3);
  this.shadowCascadeCount = 2;
  this.shadowCascadeBias = [0, 0, 0];
  this.shadowCascadeWidth = [512, 512, 512];
  this.shadowCascadeHeight = [512, 512, 512];
  this.shadowCascadeNearZ = [-1, 0.99, 0.998];
  this.shadowCascadeFarZ = [0.99, 0.998, 1];
  this.shadowCascadeArray = [];
  this.shadowMatrix =
    this.shadowCamera =
    this.shadowMapSize =
    this.shadowMap =
      null;
};
THREE.DirectionalLight.prototype = Object.create(THREE.Light.prototype);
THREE.HemisphereLight = function (a, b, c) {
  THREE.Light.call(this, a);
  this.groundColor = new THREE.Color(b);
  this.position = new THREE.Vector3(0, 100, 0);
  this.intensity = void 0 !== c ? c : 1;
};
THREE.HemisphereLight.prototype = Object.create(THREE.Light.prototype);
THREE.PointLight = function (a, b, c) {
  THREE.Light.call(this, a);
  this.position = new THREE.Vector3(0, 0, 0);
  this.intensity = void 0 !== b ? b : 1;
  this.distance = void 0 !== c ? c : 0;
};
THREE.PointLight.prototype = Object.create(THREE.Light.prototype);
THREE.SpotLight = function (a, b, c, d, e) {
  THREE.Light.call(this, a);
  this.position = new THREE.Vector3(0, 1, 0);
  this.target = new THREE.Object3D();
  this.intensity = void 0 !== b ? b : 1;
  this.distance = void 0 !== c ? c : 0;
  this.angle = void 0 !== d ? d : Math.PI / 2;
  this.exponent = void 0 !== e ? e : 10;
  this.onlyShadow = this.castShadow = !1;
  this.shadowCameraNear = 50;
  this.shadowCameraFar = 5e3;
  this.shadowCameraFov = 50;
  this.shadowCameraVisible = !1;
  this.shadowBias = 0;
  this.shadowDarkness = 0.5;
  this.shadowMapHeight = this.shadowMapWidth = 512;
  this.shadowMatrix =
    this.shadowCamera =
    this.shadowMapSize =
    this.shadowMap =
      null;
};
THREE.SpotLight.prototype = Object.create(THREE.Light.prototype);
THREE.Loader = function (a) {
  this.statusDomElement = (this.showStatus = a)
    ? THREE.Loader.prototype.addStatusElement()
    : null;
  this.onLoadStart = function () {};
  this.onLoadProgress = function () {};
  this.onLoadComplete = function () {};
};
THREE.Loader.prototype = {
  constructor: THREE.Loader,
  crossOrigin: "anonymous",
  addStatusElement: function () {
    var a = document.createElement("div");
    a.style.position = "absolute";
    a.style.right = "0px";
    a.style.top = "0px";
    a.style.fontSize = "0.8em";
    a.style.textAlign = "left";
    a.style.background = "rgba(0,0,0,0.25)";
    a.style.color = "#fff";
    a.style.width = "120px";
    a.style.padding = "0.5em 0.5em 0.5em 0.5em";
    a.style.zIndex = 1e3;
    a.innerHTML = "Loading ...";
    return a;
  },
  updateProgress: function (a) {
    var b = "Loaded ",
      b = a.total
        ? b + (((100 * a.loaded) / a.total).toFixed(0) + "%")
        : b + ((a.loaded / 1e3).toFixed(2) + " KB");
    this.statusDomElement.innerHTML = b;
  },
  extractUrlBase: function (a) {
    a = a.split("/");
    a.pop();
    return (1 > a.length ? "." : a.join("/")) + "/";
  },
  initMaterials: function (a, b) {
    for (var c = [], d = 0; d < a.length; ++d)
      c[d] = THREE.Loader.prototype.createMaterial(a[d], b);
    return c;
  },
  needsTangents: function (a) {
    for (var b = 0, c = a.length; b < c; b++)
      if (a[b] instanceof THREE.ShaderMaterial) return !0;
    return !1;
  },
  createMaterial: function (a, b) {
    function c(a) {
      a = Math.log(a) / Math.LN2;
      return Math.floor(a) == a;
    }
    function d(a) {
      a = Math.log(a) / Math.LN2;
      return Math.pow(2, Math.round(a));
    }
    function e(a, e, f, h, i, k, q) {
      var u = f.toLowerCase().endsWith(".dds"),
        B = b + "/" + f;
      if (u) {
        var x = THREE.ImageUtils.loadCompressedTexture(B);
        a[e] = x;
      } else
        (x = document.createElement("canvas")), (a[e] = new THREE.Texture(x));
      a[e].sourceFile = f;
      h &&
        (a[e].repeat.set(h[0], h[1]),
        1 !== h[0] && (a[e].wrapS = THREE.RepeatWrapping),
        1 !== h[1] && (a[e].wrapT = THREE.RepeatWrapping));
      i && a[e].offset.set(i[0], i[1]);
      k &&
        ((f = {
          repeat: THREE.RepeatWrapping,
          mirror: THREE.MirroredRepeatWrapping,
        }),
        void 0 !== f[k[0]] && (a[e].wrapS = f[k[0]]),
        void 0 !== f[k[1]] && (a[e].wrapT = f[k[1]]));
      q && (a[e].anisotropy = q);
      if (!u) {
        var t = a[e],
          a = new Image();
        a.onload = function () {
          if (!c(this.width) || !c(this.height)) {
            var a = d(this.width),
              b = d(this.height);
            t.image.width = a;
            t.image.height = b;
            t.image.getContext("2d").drawImage(this, 0, 0, a, b);
          } else t.image = this;
          t.needsUpdate = !0;
        };
        a.crossOrigin = g.crossOrigin;
        a.src = B;
      }
    }
    function f(a) {
      return ((255 * a[0]) << 16) + ((255 * a[1]) << 8) + 255 * a[2];
    }
    var g = this,
      h = "MeshLambertMaterial",
      i = {
        color: 15658734,
        opacity: 1,
        map: null,
        lightMap: null,
        normalMap: null,
        bumpMap: null,
        wireframe: !1,
      };
    if (a.shading) {
      var k = a.shading.toLowerCase();
      "phong" === k
        ? (h = "MeshPhongMaterial")
        : "basic" === k && (h = "MeshBasicMaterial");
    }
    void 0 !== a.blending &&
      void 0 !== THREE[a.blending] &&
      (i.blending = THREE[a.blending]);
    if (void 0 !== a.transparent || 1 > a.opacity)
      i.transparent = a.transparent;
    void 0 !== a.depthTest && (i.depthTest = a.depthTest);
    void 0 !== a.depthWrite && (i.depthWrite = a.depthWrite);
    void 0 !== a.visible && (i.visible = a.visible);
    void 0 !== a.flipSided && (i.side = THREE.BackSide);
    void 0 !== a.doubleSided && (i.side = THREE.DoubleSide);
    void 0 !== a.wireframe && (i.wireframe = a.wireframe);
    void 0 !== a.vertexColors &&
      ("face" === a.vertexColors
        ? (i.vertexColors = THREE.FaceColors)
        : a.vertexColors && (i.vertexColors = THREE.VertexColors));
    a.colorDiffuse
      ? (i.color = f(a.colorDiffuse))
      : a.DbgColor && (i.color = a.DbgColor);
    a.colorSpecular && (i.specular = f(a.colorSpecular));
    a.colorAmbient && (i.ambient = f(a.colorAmbient));
    a.transparency && (i.opacity = a.transparency);
    a.specularCoef && (i.shininess = a.specularCoef);
    a.mapDiffuse &&
      b &&
      e(
        i,
        "map",
        a.mapDiffuse,
        a.mapDiffuseRepeat,
        a.mapDiffuseOffset,
        a.mapDiffuseWrap,
        a.mapDiffuseAnisotropy
      );
    a.mapLight &&
      b &&
      e(
        i,
        "lightMap",
        a.mapLight,
        a.mapLightRepeat,
        a.mapLightOffset,
        a.mapLightWrap,
        a.mapLightAnisotropy
      );
    a.mapBump &&
      b &&
      e(
        i,
        "bumpMap",
        a.mapBump,
        a.mapBumpRepeat,
        a.mapBumpOffset,
        a.mapBumpWrap,
        a.mapBumpAnisotropy
      );
    a.mapNormal &&
      b &&
      e(
        i,
        "normalMap",
        a.mapNormal,
        a.mapNormalRepeat,
        a.mapNormalOffset,
        a.mapNormalWrap,
        a.mapNormalAnisotropy
      );
    a.mapSpecular &&
      b &&
      e(
        i,
        "specularMap",
        a.mapSpecular,
        a.mapSpecularRepeat,
        a.mapSpecularOffset,
        a.mapSpecularWrap,
        a.mapSpecularAnisotropy
      );
    a.mapBumpScale && (i.bumpScale = a.mapBumpScale);
    a.mapNormal
      ? ((h = THREE.ShaderUtils.lib.normal),
        (k = THREE.UniformsUtils.clone(h.uniforms)),
        (k.tNormal.value = i.normalMap),
        a.mapNormalFactor &&
          k.uNormalScale.value.set(a.mapNormalFactor, a.mapNormalFactor),
        i.map && ((k.tDiffuse.value = i.map), (k.enableDiffuse.value = !0)),
        i.specularMap &&
          ((k.tSpecular.value = i.specularMap), (k.enableSpecular.value = !0)),
        i.lightMap && ((k.tAO.value = i.lightMap), (k.enableAO.value = !0)),
        k.uDiffuseColor.value.setHex(i.color),
        k.uSpecularColor.value.setHex(i.specular),
        k.uAmbientColor.value.setHex(i.ambient),
        (k.uShininess.value = i.shininess),
        void 0 !== i.opacity && (k.uOpacity.value = i.opacity),
        (h = new THREE.ShaderMaterial({
          fragmentShader: h.fragmentShader,
          vertexShader: h.vertexShader,
          uniforms: k,
          lights: !0,
          fog: !0,
        })),
        i.transparent && (h.transparent = !0))
      : (h = new THREE[h](i));
    void 0 !== a.DbgName && (h.name = a.DbgName);
    return h;
  },
};
THREE.BinaryLoader = function (a) {
  THREE.Loader.call(this, a);
};
THREE.BinaryLoader.prototype = Object.create(THREE.Loader.prototype);
THREE.BinaryLoader.prototype.load = function (a, b, c, d) {
  var c = c && "string" === typeof c ? c : this.extractUrlBase(a),
    d = d && "string" === typeof d ? d : this.extractUrlBase(a),
    e = this.showProgress ? THREE.Loader.prototype.updateProgress : null;
  this.onLoadStart();
  this.loadAjaxJSON(this, a, b, c, d, e);
};
THREE.BinaryLoader.prototype.loadAjaxJSON = function (a, b, c, d, e, f) {
  var g = new XMLHttpRequest();
  g.onreadystatechange = function () {
    if (4 == g.readyState)
      if (200 == g.status || 0 == g.status) {
        var h = JSON.parse(g.responseText);
        a.loadAjaxBuffers(h, c, e, d, f);
      } else
        console.error(
          "THREE.BinaryLoader: Couldn't load [" + b + "] [" + g.status + "]"
        );
  };
  g.open("GET", b, !0);
  g.send(null);
};
THREE.BinaryLoader.prototype.loadAjaxBuffers = function (a, b, c, d, e) {
  var f = new XMLHttpRequest(),
    g = c + "/" + a.buffers,
    h = 0;
  f.onreadystatechange = function () {
    if (4 == f.readyState)
      if (200 == f.status || 0 == f.status) {
        var c = f.response;
        void 0 === c && (c = new Uint8Array(f.responseBody).buffer);
        THREE.BinaryLoader.prototype.createBinModel(c, b, d, a.materials);
      } else
        console.error(
          "THREE.BinaryLoader: Couldn't load [" + g + "] [" + f.status + "]"
        );
    else
      3 == f.readyState
        ? e &&
          (0 == h && (h = f.getResponseHeader("Content-Length")),
          e({ total: h, loaded: f.responseText.length }))
        : 2 == f.readyState && (h = f.getResponseHeader("Content-Length"));
  };
  f.open("GET", g, !0);
  f.responseType = "arraybuffer";
  f.send(null);
};
THREE.BinaryLoader.prototype.createBinModel = function (a, b, c, d) {
  var e = function () {
    var b, c, d, e, k, n, p, m, r, s, l, q, u, B, x, t;
    function F(a) {
      return a % 4 ? 4 - (a % 4) : 0;
    }
    function C(a, b) {
      return new Uint8Array(a, b, 1)[0];
    }
    function A(a, b) {
      return new Uint32Array(a, b, 1)[0];
    }
    function z(b, c) {
      var d,
        e,
        f,
        g,
        h,
        i,
        k,
        n = new Uint32Array(a, c, 3 * b);
      for (d = 0; d < b; d++)
        (e = n[3 * d]),
          (f = n[3 * d + 1]),
          (g = n[3 * d + 2]),
          (h = K[2 * e]),
          (e = K[2 * e + 1]),
          (i = K[2 * f]),
          (k = K[2 * f + 1]),
          (f = K[2 * g]),
          (g = K[2 * g + 1]),
          L.faceVertexUvs[0].push([
            new THREE.Vector2(h, e),
            new THREE.Vector2(i, k),
            new THREE.Vector2(f, g),
          ]);
    }
    function H(b, c) {
      var d,
        e,
        f,
        g,
        h,
        i,
        k,
        n,
        m,
        p = new Uint32Array(a, c, 4 * b);
      for (d = 0; d < b; d++)
        (e = p[4 * d]),
          (f = p[4 * d + 1]),
          (g = p[4 * d + 2]),
          (h = p[4 * d + 3]),
          (i = K[2 * e]),
          (e = K[2 * e + 1]),
          (k = K[2 * f]),
          (n = K[2 * f + 1]),
          (f = K[2 * g]),
          (m = K[2 * g + 1]),
          (g = K[2 * h]),
          (h = K[2 * h + 1]),
          L.faceVertexUvs[0].push([
            new THREE.Vector2(i, e),
            new THREE.Vector2(k, n),
            new THREE.Vector2(f, m),
            new THREE.Vector2(g, h),
          ]);
    }
    function G(b, c, d) {
      for (
        var e,
          f,
          g,
          h,
          c = new Uint32Array(a, c, 3 * b),
          i = new Uint16Array(a, d, b),
          d = 0;
        d < b;
        d++
      )
        (e = c[3 * d]),
          (f = c[3 * d + 1]),
          (g = c[3 * d + 2]),
          (h = i[d]),
          L.faces.push(new THREE.Face3(e, f, g, null, null, h));
    }
    function I(b, c, d) {
      for (
        var e,
          f,
          g,
          h,
          i,
          c = new Uint32Array(a, c, 4 * b),
          k = new Uint16Array(a, d, b),
          d = 0;
        d < b;
        d++
      )
        (e = c[4 * d]),
          (f = c[4 * d + 1]),
          (g = c[4 * d + 2]),
          (h = c[4 * d + 3]),
          (i = k[d]),
          L.faces.push(new THREE.Face4(e, f, g, h, null, null, i));
    }
    function $(b, c, d, e) {
      for (
        var f,
          g,
          h,
          i,
          k,
          n,
          m,
          c = new Uint32Array(a, c, 3 * b),
          d = new Uint32Array(a, d, 3 * b),
          p = new Uint16Array(a, e, b),
          e = 0;
        e < b;
        e++
      ) {
        f = c[3 * e];
        g = c[3 * e + 1];
        h = c[3 * e + 2];
        k = d[3 * e];
        n = d[3 * e + 1];
        m = d[3 * e + 2];
        i = p[e];
        var r = J[3 * n],
          l = J[3 * n + 1];
        n = J[3 * n + 2];
        var s = J[3 * m],
          q = J[3 * m + 1];
        m = J[3 * m + 2];
        L.faces.push(
          new THREE.Face3(
            f,
            g,
            h,
            [
              new THREE.Vector3(J[3 * k], J[3 * k + 1], J[3 * k + 2]),
              new THREE.Vector3(r, l, n),
              new THREE.Vector3(s, q, m),
            ],
            null,
            i
          )
        );
      }
    }
    function D(b, c, d, e) {
      for (
        var f,
          g,
          h,
          i,
          k,
          n,
          m,
          p,
          r,
          c = new Uint32Array(a, c, 4 * b),
          d = new Uint32Array(a, d, 4 * b),
          l = new Uint16Array(a, e, b),
          e = 0;
        e < b;
        e++
      ) {
        f = c[4 * e];
        g = c[4 * e + 1];
        h = c[4 * e + 2];
        i = c[4 * e + 3];
        n = d[4 * e];
        m = d[4 * e + 1];
        p = d[4 * e + 2];
        r = d[4 * e + 3];
        k = l[e];
        var s = J[3 * m],
          q = J[3 * m + 1];
        m = J[3 * m + 2];
        var t = J[3 * p],
          u = J[3 * p + 1];
        p = J[3 * p + 2];
        var x = J[3 * r],
          z = J[3 * r + 1];
        r = J[3 * r + 2];
        L.faces.push(
          new THREE.Face4(
            f,
            g,
            h,
            i,
            [
              new THREE.Vector3(J[3 * n], J[3 * n + 1], J[3 * n + 2]),
              new THREE.Vector3(s, q, m),
              new THREE.Vector3(t, u, p),
              new THREE.Vector3(x, z, r),
            ],
            null,
            k
          )
        );
      }
    }
    var L = this,
      y = 0,
      J = [],
      K = [],
      R,
      P,
      ca;
    THREE.Geometry.call(this);
    t = a;
    P = y;
    B = new Uint8Array(t, P, 12);
    s = "";
    for (u = 0; 12 > u; u++) s += String.fromCharCode(B[P + u]);
    b = C(t, P + 12);
    C(t, P + 13);
    C(t, P + 14);
    C(t, P + 15);
    c = C(t, P + 16);
    d = C(t, P + 17);
    e = C(t, P + 18);
    k = C(t, P + 19);
    n = A(t, P + 20);
    p = A(t, P + 20 + 4);
    m = A(t, P + 20 + 8);
    r = A(t, P + 20 + 12);
    s = A(t, P + 20 + 16);
    l = A(t, P + 20 + 20);
    q = A(t, P + 20 + 24);
    u = A(t, P + 20 + 28);
    B = A(t, P + 20 + 32);
    x = A(t, P + 20 + 36);
    t = A(t, P + 20 + 40);
    y += b;
    P = 3 * c + k;
    ca = 4 * c + k;
    R = r * P;
    b = s * (P + 3 * d);
    c = l * (P + 3 * e);
    k = q * (P + 3 * d + 3 * e);
    P = u * ca;
    d = B * (ca + 4 * d);
    e = x * (ca + 4 * e);
    ca = y;
    var y = new Float32Array(a, y, 3 * n),
      xa,
      M,
      pa,
      ya;
    for (xa = 0; xa < n; xa++)
      (M = y[3 * xa]),
        (pa = y[3 * xa + 1]),
        (ya = y[3 * xa + 2]),
        L.vertices.push(new THREE.Vector3(M, pa, ya));
    n = y = ca + 3 * n * Float32Array.BYTES_PER_ELEMENT;
    if (p) {
      y = new Int8Array(a, y, 3 * p);
      for (ca = 0; ca < p; ca++)
        (xa = y[3 * ca]),
          (M = y[3 * ca + 1]),
          (pa = y[3 * ca + 2]),
          J.push(xa / 127, M / 127, pa / 127);
    }
    y = n + 3 * p * Int8Array.BYTES_PER_ELEMENT;
    p = y += F(3 * p);
    if (m) {
      n = new Float32Array(a, y, 2 * m);
      for (y = 0; y < m; y++)
        (ca = n[2 * y]), (xa = n[2 * y + 1]), K.push(ca, xa);
    }
    m = y = p + 2 * m * Float32Array.BYTES_PER_ELEMENT;
    R = m + R + F(2 * r);
    p = R + b + F(2 * s);
    b = p + c + F(2 * l);
    c = b + k + F(2 * q);
    P = c + P + F(2 * u);
    k = P + d + F(2 * B);
    d = k + e + F(2 * x);
    l &&
      ((e = p + 3 * l * Uint32Array.BYTES_PER_ELEMENT),
      G(l, p, e + 3 * l * Uint32Array.BYTES_PER_ELEMENT),
      z(l, e));
    q &&
      ((l = b + 3 * q * Uint32Array.BYTES_PER_ELEMENT),
      (e = l + 3 * q * Uint32Array.BYTES_PER_ELEMENT),
      $(q, b, l, e + 3 * q * Uint32Array.BYTES_PER_ELEMENT),
      z(q, e));
    x &&
      ((q = k + 4 * x * Uint32Array.BYTES_PER_ELEMENT),
      I(x, k, q + 4 * x * Uint32Array.BYTES_PER_ELEMENT),
      H(x, q));
    t &&
      ((x = d + 4 * t * Uint32Array.BYTES_PER_ELEMENT),
      (q = x + 4 * t * Uint32Array.BYTES_PER_ELEMENT),
      D(t, d, x, q + 4 * t * Uint32Array.BYTES_PER_ELEMENT),
      H(t, q));
    r && G(r, m, m + 3 * r * Uint32Array.BYTES_PER_ELEMENT);
    s &&
      ((r = R + 3 * s * Uint32Array.BYTES_PER_ELEMENT),
      $(s, R, r, r + 3 * s * Uint32Array.BYTES_PER_ELEMENT));
    u && I(u, c, c + 4 * u * Uint32Array.BYTES_PER_ELEMENT);
    B &&
      ((s = P + 4 * B * Uint32Array.BYTES_PER_ELEMENT),
      D(B, P, s, s + 4 * B * Uint32Array.BYTES_PER_ELEMENT));
    this.computeCentroids();
    this.computeFaceNormals();
  };
  e.prototype = Object.create(THREE.Geometry.prototype);
  e = new e(c);
  c = this.initMaterials(d, c);
  this.needsTangents(c) && e.computeTangents();
  b(e, c);
};
THREE.ImageLoader = function () {
  THREE.EventDispatcher.call(this);
  this.crossOrigin = null;
};
THREE.ImageLoader.prototype = {
  constructor: THREE.ImageLoader,
  load: function (a, b) {
    var c = this;
    void 0 === b && (b = new Image());
    b.addEventListener(
      "load",
      function () {
        c.dispatchEvent({ type: "load", content: b });
      },
      !1
    );
    b.addEventListener(
      "error",
      function () {
        c.dispatchEvent({
          type: "error",
          message: "Couldn't load URL [" + a + "]",
        });
      },
      !1
    );
    c.crossOrigin && (b.crossOrigin = c.crossOrigin);
    b.src = a;
  },
};
THREE.JSONLoader = function (a) {
  THREE.Loader.call(this, a);
  this.withCredentials = !1;
};
THREE.JSONLoader.prototype = Object.create(THREE.Loader.prototype);
THREE.JSONLoader.prototype.load = function (a, b, c) {
  c = c && "string" === typeof c ? c : this.extractUrlBase(a);
  this.onLoadStart();
  this.loadAjaxJSON(this, a, b, c);
};
THREE.JSONLoader.prototype.loadAjaxJSON = function (a, b, c, d, e) {
  var f = new XMLHttpRequest(),
    g = 0;
  f.withCredentials = this.withCredentials;
  f.onreadystatechange = function () {
    if (f.readyState === f.DONE)
      if (200 === f.status || 0 === f.status) {
        if (f.responseText) {
          var h = JSON.parse(f.responseText);
          a.createModel(h, c, d);
        } else
          console.warn(
            "THREE.JSONLoader: [" +
              b +
              "] seems to be unreachable or file there is empty"
          );
        a.onLoadComplete();
      } else
        console.error(
          "THREE.JSONLoader: Couldn't load [" + b + "] [" + f.status + "]"
        );
    else
      f.readyState === f.LOADING
        ? e &&
          (0 === g && (g = f.getResponseHeader("Content-Length")),
          e({ total: g, loaded: f.responseText.length }))
        : f.readyState === f.HEADERS_RECEIVED &&
          (g = f.getResponseHeader("Content-Length"));
  };
  f.open("GET", b, !0);
  f.send(null);
};
THREE.JSONLoader.prototype.createModel = function (a, b, c) {
  var d = new THREE.Geometry(),
    e = void 0 !== a.scale ? 1 / a.scale : 1,
    f,
    g,
    h,
    i,
    k,
    n,
    p,
    m,
    r,
    s,
    l,
    q,
    u,
    B,
    x,
    t = a.faces;
  s = a.vertices;
  var F = a.normals,
    C = a.colors,
    A = 0;
  for (f = 0; f < a.uvs.length; f++) a.uvs[f].length && A++;
  for (f = 0; f < A; f++) (d.faceUvs[f] = []), (d.faceVertexUvs[f] = []);
  i = 0;
  for (k = s.length; i < k; )
    (n = new THREE.Vector3()),
      (n.x = s[i++] * e),
      (n.y = s[i++] * e),
      (n.z = s[i++] * e),
      d.vertices.push(n);
  i = 0;
  for (k = t.length; i < k; ) {
    s = t[i++];
    n = s & 1;
    h = s & 2;
    f = s & 4;
    g = s & 8;
    m = s & 16;
    p = s & 32;
    l = s & 64;
    s &= 128;
    n
      ? ((q = new THREE.Face4()),
        (q.a = t[i++]),
        (q.b = t[i++]),
        (q.c = t[i++]),
        (q.d = t[i++]),
        (n = 4))
      : ((q = new THREE.Face3()),
        (q.a = t[i++]),
        (q.b = t[i++]),
        (q.c = t[i++]),
        (n = 3));
    h && ((h = t[i++]), (q.materialIndex = h));
    h = d.faces.length;
    if (f)
      for (f = 0; f < A; f++)
        (u = a.uvs[f]),
          (r = t[i++]),
          (x = u[2 * r]),
          (r = u[2 * r + 1]),
          (d.faceUvs[f][h] = new THREE.Vector2(x, r));
    if (g)
      for (f = 0; f < A; f++) {
        u = a.uvs[f];
        B = [];
        for (g = 0; g < n; g++)
          (r = t[i++]),
            (x = u[2 * r]),
            (r = u[2 * r + 1]),
            (B[g] = new THREE.Vector2(x, r));
        d.faceVertexUvs[f][h] = B;
      }
    m &&
      ((m = 3 * t[i++]),
      (g = new THREE.Vector3()),
      (g.x = F[m++]),
      (g.y = F[m++]),
      (g.z = F[m]),
      (q.normal = g));
    if (p)
      for (f = 0; f < n; f++)
        (m = 3 * t[i++]),
          (g = new THREE.Vector3()),
          (g.x = F[m++]),
          (g.y = F[m++]),
          (g.z = F[m]),
          q.vertexNormals.push(g);
    l && ((p = t[i++]), (p = new THREE.Color(C[p])), (q.color = p));
    if (s)
      for (f = 0; f < n; f++)
        (p = t[i++]), (p = new THREE.Color(C[p])), q.vertexColors.push(p);
    d.faces.push(q);
  }
  if (a.skinWeights) {
    i = 0;
    for (k = a.skinWeights.length; i < k; i += 2)
      (t = a.skinWeights[i]),
        (F = a.skinWeights[i + 1]),
        d.skinWeights.push(new THREE.Vector4(t, F, 0, 0));
  }
  if (a.skinIndices) {
    i = 0;
    for (k = a.skinIndices.length; i < k; i += 2)
      (t = a.skinIndices[i]),
        (F = a.skinIndices[i + 1]),
        d.skinIndices.push(new THREE.Vector4(t, F, 0, 0));
  }
  d.bones = a.bones;
  d.animation = a.animation;
  if (void 0 !== a.morphTargets) {
    i = 0;
    for (k = a.morphTargets.length; i < k; i++) {
      d.morphTargets[i] = {};
      d.morphTargets[i].name = a.morphTargets[i].name;
      d.morphTargets[i].vertices = [];
      C = d.morphTargets[i].vertices;
      A = a.morphTargets[i].vertices;
      t = 0;
      for (F = A.length; t < F; t += 3)
        (s = new THREE.Vector3()),
          (s.x = A[t] * e),
          (s.y = A[t + 1] * e),
          (s.z = A[t + 2] * e),
          C.push(s);
    }
  }
  if (void 0 !== a.morphColors) {
    i = 0;
    for (k = a.morphColors.length; i < k; i++) {
      d.morphColors[i] = {};
      d.morphColors[i].name = a.morphColors[i].name;
      d.morphColors[i].colors = [];
      F = d.morphColors[i].colors;
      C = a.morphColors[i].colors;
      e = 0;
      for (t = C.length; e < t; e += 3)
        (A = new THREE.Color(16755200)),
          A.setRGB(C[e], C[e + 1], C[e + 2]),
          F.push(A);
    }
  }
  d.computeCentroids();
  d.computeFaceNormals();
  a = this.initMaterials(a.materials, c);
  this.needsTangents(a) && d.computeTangents();
  b(d, a);
};
THREE.LoadingMonitor = function () {
  THREE.EventDispatcher.call(this);
  var a = this,
    b = 0,
    c = 0,
    d = function () {
      b++;
      a.dispatchEvent({ type: "progress", loaded: b, total: c });
      b === c && a.dispatchEvent({ type: "load" });
    };
  this.add = function (a) {
    c++;
    a.addEventListener("load", d, !1);
  };
};
THREE.SceneLoader = function () {
  this.onLoadStart = function () {};
  this.onLoadProgress = function () {};
  this.onLoadComplete = function () {};
  this.callbackSync = function () {};
  this.callbackProgress = function () {};
  this.geometryHandlerMap = {};
  this.hierarchyHandlerMap = {};
  this.addGeometryHandler("ascii", THREE.JSONLoader);
  this.addGeometryHandler("binary", THREE.BinaryLoader);
};
THREE.SceneLoader.prototype.constructor = THREE.SceneLoader;
THREE.SceneLoader.prototype.load = function (a, b) {
  var c = this,
    d = new XMLHttpRequest();
  d.onreadystatechange = function () {
    if (4 === d.readyState)
      if (200 === d.status || 0 === d.status) {
        var e = JSON.parse(d.responseText);
        c.parse(e, b, a);
      } else
        console.error(
          "THREE.SceneLoader: Couldn't load [" + a + "] [" + d.status + "]"
        );
  };
  d.open("GET", a, !0);
  d.send(null);
};
THREE.SceneLoader.prototype.addGeometryHandler = function (a, b) {
  this.geometryHandlerMap[a] = { loaderClass: b };
};
THREE.SceneLoader.prototype.addHierarchyHandler = function (a, b) {
  this.hierarchyHandlerMap[a] = { loaderClass: b };
};
THREE.SceneLoader.prototype.parse = function (a, b, c) {
  function d(a, b) {
    return "relativeToHTML" == b ? a : p + "/" + a;
  }
  function e() {
    f(z.scene, G.objects);
  }
  function f(a, b) {
    var c, e, g, i, k, p;
    for (p in b)
      if (void 0 === z.objects[p]) {
        var l = b[p],
          q = null;
        if (l.type && l.type in n.hierarchyHandlerMap) {
          if (void 0 === l.loading) {
            c = {
              type: 1,
              url: 1,
              material: 1,
              position: 1,
              rotation: 1,
              scale: 1,
              visible: 1,
              children: 1,
              properties: 1,
              skin: 1,
              morph: 1,
              mirroredLoop: 1,
              duration: 1,
            };
            e = {};
            for (var t in l) t in c || (e[t] = l[t]);
            r = z.materials[l.material];
            l.loading = !0;
            c = n.hierarchyHandlerMap[l.type].loaderObject;
            c.options
              ? c.load(d(l.url, G.urlBaseType), h(p, a, r, l))
              : c.load(d(l.url, G.urlBaseType), h(p, a, r, l), e);
          }
        } else if (void 0 !== l.geometry) {
          if ((m = z.geometries[l.geometry])) {
            q = !1;
            r = z.materials[l.material];
            q = r instanceof THREE.ShaderMaterial;
            e = l.position;
            g = l.rotation;
            i = l.scale;
            c = l.matrix;
            k = l.quaternion;
            l.material ||
              (r = new THREE.MeshFaceMaterial(z.face_materials[l.geometry]));
            r instanceof THREE.MeshFaceMaterial &&
              0 === r.materials.length &&
              (r = new THREE.MeshFaceMaterial(z.face_materials[l.geometry]));
            if (r instanceof THREE.MeshFaceMaterial)
              for (var y = 0; y < r.materials.length; y++)
                q = q || r.materials[y] instanceof THREE.ShaderMaterial;
            q && m.computeTangents();
            l.skin
              ? (q = new THREE.SkinnedMesh(m, r))
              : l.morph
              ? ((q = new THREE.MorphAnimMesh(m, r)),
                void 0 !== l.duration && (q.duration = l.duration),
                void 0 !== l.time && (q.time = l.time),
                void 0 !== l.mirroredLoop && (q.mirroredLoop = l.mirroredLoop),
                r.morphNormals && m.computeMorphNormals())
              : (q = new THREE.Mesh(m, r));
            q.name = p;
            c
              ? ((q.matrixAutoUpdate = !1),
                q.matrix.set(
                  c[0],
                  c[1],
                  c[2],
                  c[3],
                  c[4],
                  c[5],
                  c[6],
                  c[7],
                  c[8],
                  c[9],
                  c[10],
                  c[11],
                  c[12],
                  c[13],
                  c[14],
                  c[15]
                ))
              : (q.position.set(e[0], e[1], e[2]),
                k
                  ? (q.quaternion.set(k[0], k[1], k[2], k[3]),
                    (q.useQuaternion = !0))
                  : q.rotation.set(g[0], g[1], g[2]),
                q.scale.set(i[0], i[1], i[2]));
            q.visible = l.visible;
            q.castShadow = l.castShadow;
            q.receiveShadow = l.receiveShadow;
            a.add(q);
            z.objects[p] = q;
          }
        } else
          "DirectionalLight" === l.type ||
          "PointLight" === l.type ||
          "AmbientLight" === l.type
            ? ((B = void 0 !== l.color ? l.color : 16777215),
              (x = void 0 !== l.intensity ? l.intensity : 1),
              "DirectionalLight" === l.type
                ? ((e = l.direction),
                  (u = new THREE.DirectionalLight(B, x)),
                  u.position.set(e[0], e[1], e[2]),
                  l.target &&
                    (H.push({ object: u, targetName: l.target }),
                    (u.target = null)))
                : "PointLight" === l.type
                ? ((e = l.position),
                  (c = l.distance),
                  (u = new THREE.PointLight(B, x, c)),
                  u.position.set(e[0], e[1], e[2]))
                : "AmbientLight" === l.type && (u = new THREE.AmbientLight(B)),
              a.add(u),
              (u.name = p),
              (z.lights[p] = u),
              (z.objects[p] = u))
            : "PerspectiveCamera" === l.type || "OrthographicCamera" === l.type
            ? ("PerspectiveCamera" === l.type
                ? (s = new THREE.PerspectiveCamera(
                    l.fov,
                    l.aspect,
                    l.near,
                    l.far
                  ))
                : "OrthographicCamera" === l.type &&
                  (s = new THREE.OrthographicCamera(
                    l.left,
                    l.right,
                    l.top,
                    l.bottom,
                    l.near,
                    l.far
                  )),
              (e = l.position),
              s.position.set(e[0], e[1], e[2]),
              a.add(s),
              (s.name = p),
              (z.cameras[p] = s),
              (z.objects[p] = s))
            : ((e = l.position),
              (g = l.rotation),
              (i = l.scale),
              (k = l.quaternion),
              (q = new THREE.Object3D()),
              (q.name = p),
              q.position.set(e[0], e[1], e[2]),
              k
                ? (q.quaternion.set(k[0], k[1], k[2], k[3]),
                  (q.useQuaternion = !0))
                : q.rotation.set(g[0], g[1], g[2]),
              q.scale.set(i[0], i[1], i[2]),
              (q.visible = void 0 !== l.visible ? l.visible : !1),
              a.add(q),
              (z.objects[p] = q),
              (z.empties[p] = q));
        if (q) {
          if (void 0 !== l.properties)
            for (var A in l.properties) q.properties[A] = l.properties[A];
          void 0 !== l.children && f(q, l.children);
        }
      }
  }
  function g(a) {
    return function (b, c) {
      z.geometries[a] = b;
      z.face_materials[a] = c;
      e();
      t -= 1;
      n.onLoadComplete();
      k();
    };
  }
  function h(a, b, c, d) {
    return function (f) {
      var f = f.content ? f.content : f.dae ? f.scene : f,
        g = d.position,
        h = d.rotation,
        i = d.quaternion,
        l = d.scale;
      f.position.set(g[0], g[1], g[2]);
      i
        ? (f.quaternion.set(i[0], i[1], i[2], i[3]), (f.useQuaternion = !0))
        : f.rotation.set(h[0], h[1], h[2]);
      f.scale.set(l[0], l[1], l[2]);
      c &&
        f.traverse(function (a) {
          a.material = c;
        });
      var m = void 0 !== d.visible ? d.visible : !0;
      f.traverse(function (a) {
        a.visible = m;
      });
      b.add(f);
      f.name = a;
      z.objects[a] = f;
      e();
      t -= 1;
      n.onLoadComplete();
      k();
    };
  }
  function i(a) {
    return function (b, c) {
      z.geometries[a] = b;
      z.face_materials[a] = c;
    };
  }
  function k() {
    n.callbackProgress(
      {
        totalModels: C,
        totalTextures: A,
        loadedModels: C - t,
        loadedTextures: A - F,
      },
      z
    );
    n.onLoadProgress();
    if (0 === t && 0 === F) {
      for (var a = 0; a < H.length; a++) {
        var c = H[a],
          d = z.objects[c.targetName];
        d
          ? (c.object.target = d)
          : ((c.object.target = new THREE.Object3D()),
            z.scene.add(c.object.target));
        c.object.target.properties.targetInverse = c.object;
      }
      b(z);
    }
  }
  var n = this,
    p = THREE.Loader.prototype.extractUrlBase(c),
    m,
    r,
    s,
    l,
    q,
    u,
    B,
    x,
    t,
    F,
    C,
    A,
    z,
    H = [],
    G = a,
    I;
  for (I in this.geometryHandlerMap)
    (a = this.geometryHandlerMap[I].loaderClass),
      (this.geometryHandlerMap[I].loaderObject = new a());
  for (I in this.hierarchyHandlerMap)
    (a = this.hierarchyHandlerMap[I].loaderClass),
      (this.hierarchyHandlerMap[I].loaderObject = new a());
  F = t = 0;
  z = {
    scene: new THREE.Scene(),
    geometries: {},
    face_materials: {},
    materials: {},
    textures: {},
    objects: {},
    cameras: {},
    lights: {},
    fogs: {},
    empties: {},
  };
  if (
    G.transform &&
    ((I = G.transform.position),
    (a = G.transform.rotation),
    (c = G.transform.scale),
    I && z.scene.position.set(I[0], I[1], I[2]),
    a && z.scene.rotation.set(a[0], a[1], a[2]),
    c && z.scene.scale.set(c[0], c[1], c[2]),
    I || a || c)
  )
    z.scene.updateMatrix(), z.scene.updateMatrixWorld();
  I = function (a) {
    return function () {
      F -= a;
      k();
      n.onLoadComplete();
    };
  };
  for (var $ in G.fogs)
    (a = G.fogs[$]),
      "linear" === a.type
        ? (l = new THREE.Fog(0, a.near, a.far))
        : "exp2" === a.type && (l = new THREE.FogExp2(0, a.density)),
      (a = a.color),
      l.color.setRGB(a[0], a[1], a[2]),
      (z.fogs[$] = l);
  for (var D in G.geometries)
    (l = G.geometries[D]),
      l.type in this.geometryHandlerMap && ((t += 1), n.onLoadStart());
  for (var L in G.objects)
    (l = G.objects[L]),
      l.type &&
        l.type in this.hierarchyHandlerMap &&
        ((t += 1), n.onLoadStart());
  C = t;
  for (D in G.geometries)
    if (((l = G.geometries[D]), "cube" === l.type))
      (m = new THREE.CubeGeometry(
        l.width,
        l.height,
        l.depth,
        l.widthSegments,
        l.heightSegments,
        l.depthSegments
      )),
        (z.geometries[D] = m);
    else if ("plane" === l.type)
      (m = new THREE.PlaneGeometry(
        l.width,
        l.height,
        l.widthSegments,
        l.heightSegments
      )),
        (z.geometries[D] = m);
    else if ("sphere" === l.type)
      (m = new THREE.SphereGeometry(
        l.radius,
        l.widthSegments,
        l.heightSegments
      )),
        (z.geometries[D] = m);
    else if ("cylinder" === l.type)
      (m = new THREE.CylinderGeometry(
        l.topRad,
        l.botRad,
        l.height,
        l.radSegs,
        l.heightSegs
      )),
        (z.geometries[D] = m);
    else if ("torus" === l.type)
      (m = new THREE.TorusGeometry(l.radius, l.tube, l.segmentsR, l.segmentsT)),
        (z.geometries[D] = m);
    else if ("icosahedron" === l.type)
      (m = new THREE.IcosahedronGeometry(l.radius, l.subdivisions)),
        (z.geometries[D] = m);
    else if (l.type in this.geometryHandlerMap) {
      L = {};
      for (q in l) "type" !== q && "url" !== q && (L[q] = l[q]);
      this.geometryHandlerMap[l.type].loaderObject.load(
        d(l.url, G.urlBaseType),
        g(D),
        L
      );
    } else
      "embedded" === l.type &&
        ((L = G.embeds[l.id]),
        (L.metadata = G.metadata),
        L &&
          this.geometryHandlerMap.ascii.loaderObject.createModel(L, i(D), ""));
  for (var y in G.textures)
    if (((D = G.textures[y]), D.url instanceof Array)) {
      F += D.url.length;
      for (q = 0; q < D.url.length; q++) n.onLoadStart();
    } else (F += 1), n.onLoadStart();
  A = F;
  for (y in G.textures) {
    D = G.textures[y];
    void 0 !== D.mapping &&
      void 0 !== THREE[D.mapping] &&
      (D.mapping = new THREE[D.mapping]());
    if (D.url instanceof Array) {
      L = D.url.length;
      l = [];
      for (q = 0; q < L; q++) l[q] = d(D.url[q], G.urlBaseType);
      q = (q = l[0].endsWith(".dds"))
        ? THREE.ImageUtils.loadCompressedTextureCube(l, D.mapping, I(L))
        : THREE.ImageUtils.loadTextureCube(l, D.mapping, I(L));
    } else
      (q = D.url.toLowerCase().endsWith(".dds")),
        (L = d(D.url, G.urlBaseType)),
        (l = I(1)),
        (q = q
          ? THREE.ImageUtils.loadCompressedTexture(L, D.mapping, l)
          : THREE.ImageUtils.loadTexture(L, D.mapping, l)),
        void 0 !== THREE[D.minFilter] && (q.minFilter = THREE[D.minFilter]),
        void 0 !== THREE[D.magFilter] && (q.magFilter = THREE[D.magFilter]),
        D.anisotropy && (q.anisotropy = D.anisotropy),
        D.repeat &&
          (q.repeat.set(D.repeat[0], D.repeat[1]),
          1 !== D.repeat[0] && (q.wrapS = THREE.RepeatWrapping),
          1 !== D.repeat[1] && (q.wrapT = THREE.RepeatWrapping)),
        D.offset && q.offset.set(D.offset[0], D.offset[1]),
        D.wrap &&
          ((L = {
            repeat: THREE.RepeatWrapping,
            mirror: THREE.MirroredRepeatWrapping,
          }),
          void 0 !== L[D.wrap[0]] && (q.wrapS = L[D.wrap[0]]),
          void 0 !== L[D.wrap[1]] && (q.wrapT = L[D.wrap[1]]));
    z.textures[y] = q;
  }
  var J, K;
  for (J in G.materials) {
    y = G.materials[J];
    for (K in y.parameters)
      "envMap" === K || "map" === K || "lightMap" === K || "bumpMap" === K
        ? (y.parameters[K] = z.textures[y.parameters[K]])
        : "shading" === K
        ? (y.parameters[K] =
            "flat" === y.parameters[K]
              ? THREE.FlatShading
              : THREE.SmoothShading)
        : "side" === K
        ? (y.parameters[K] =
            "double" == y.parameters[K]
              ? THREE.DoubleSide
              : "back" == y.parameters[K]
              ? THREE.BackSide
              : THREE.FrontSide)
        : "blending" === K
        ? (y.parameters[K] =
            y.parameters[K] in THREE
              ? THREE[y.parameters[K]]
              : THREE.NormalBlending)
        : "combine" === K
        ? (y.parameters[K] =
            y.parameters[K] in THREE
              ? THREE[y.parameters[K]]
              : THREE.MultiplyOperation)
        : "vertexColors" === K
        ? "face" == y.parameters[K]
          ? (y.parameters[K] = THREE.FaceColors)
          : y.parameters[K] && (y.parameters[K] = THREE.VertexColors)
        : "wrapRGB" === K &&
          ((I = y.parameters[K]),
          (y.parameters[K] = new THREE.Vector3(I[0], I[1], I[2])));
    void 0 !== y.parameters.opacity &&
      1 > y.parameters.opacity &&
      (y.parameters.transparent = !0);
    y.parameters.normalMap
      ? ((I = THREE.ShaderUtils.lib.normal),
        (D = THREE.UniformsUtils.clone(I.uniforms)),
        (q = y.parameters.color),
        (L = y.parameters.specular),
        (l = y.parameters.ambient),
        ($ = y.parameters.shininess),
        (D.tNormal.value = z.textures[y.parameters.normalMap]),
        y.parameters.normalScale &&
          D.uNormalScale.value.set(
            y.parameters.normalScale[0],
            y.parameters.normalScale[1]
          ),
        y.parameters.map &&
          ((D.tDiffuse.value = y.parameters.map), (D.enableDiffuse.value = !0)),
        y.parameters.envMap &&
          ((D.tCube.value = y.parameters.envMap),
          (D.enableReflection.value = !0),
          (D.uReflectivity.value = y.parameters.reflectivity)),
        y.parameters.lightMap &&
          ((D.tAO.value = y.parameters.lightMap), (D.enableAO.value = !0)),
        y.parameters.specularMap &&
          ((D.tSpecular.value = z.textures[y.parameters.specularMap]),
          (D.enableSpecular.value = !0)),
        y.parameters.displacementMap &&
          ((D.tDisplacement.value = z.textures[y.parameters.displacementMap]),
          (D.enableDisplacement.value = !0),
          (D.uDisplacementBias.value = y.parameters.displacementBias),
          (D.uDisplacementScale.value = y.parameters.displacementScale)),
        D.uDiffuseColor.value.setHex(q),
        D.uSpecularColor.value.setHex(L),
        D.uAmbientColor.value.setHex(l),
        (D.uShininess.value = $),
        y.parameters.opacity && (D.uOpacity.value = y.parameters.opacity),
        (r = new THREE.ShaderMaterial({
          fragmentShader: I.fragmentShader,
          vertexShader: I.vertexShader,
          uniforms: D,
          lights: !0,
          fog: !0,
        })))
      : (r = new THREE[y.type](y.parameters));
    z.materials[J] = r;
  }
  for (J in G.materials)
    if (((y = G.materials[J]), y.parameters.materials)) {
      K = [];
      for (q = 0; q < y.parameters.materials.length; q++)
        K.push(z.materials[y.parameters.materials[q]]);
      z.materials[J].materials = K;
    }
  e();
  z.cameras &&
    G.defaults.camera &&
    (z.currentCamera = z.cameras[G.defaults.camera]);
  z.fogs && G.defaults.fog && (z.scene.fog = z.fogs[G.defaults.fog]);
  a = G.defaults.bgcolor;
  z.bgColor = new THREE.Color();
  z.bgColor.setRGB(a[0], a[1], a[2]);
  z.bgColorAlpha = G.defaults.bgalpha;
  n.callbackSync(z);
  k();
};
THREE.TextureLoader = function () {
  THREE.EventDispatcher.call(this);
  this.crossOrigin = null;
};
THREE.TextureLoader.prototype = {
  constructor: THREE.TextureLoader,
  load: function (a) {
    var b = this,
      c = new Image();
    c.addEventListener(
      "load",
      function () {
        var a = new THREE.Texture(c);
        a.needsUpdate = !0;
        b.dispatchEvent({ type: "load", content: a });
      },
      !1
    );
    c.addEventListener(
      "error",
      function () {
        b.dispatchEvent({
          type: "error",
          message: "Couldn't load URL [" + a + "]",
        });
      },
      !1
    );
    b.crossOrigin && (c.crossOrigin = b.crossOrigin);
    c.src = a;
  },
};
THREE.Material = function () {
  THREE.EventDispatcher.call(this);
  this.id = THREE.MaterialIdCount++;
  this.name = "";
  this.side = THREE.FrontSide;
  this.opacity = 1;
  this.transparent = !1;
  this.blending = THREE.NormalBlending;
  this.blendSrc = THREE.SrcAlphaFactor;
  this.blendDst = THREE.OneMinusSrcAlphaFactor;
  this.blendEquation = THREE.AddEquation;
  this.depthWrite = this.depthTest = !0;
  this.polygonOffset = !1;
  this.alphaTest = this.polygonOffsetUnits = this.polygonOffsetFactor = 0;
  this.overdraw = !1;
  this.needsUpdate = this.visible = !0;
};
THREE.Material.prototype.setValues = function (a) {
  if (void 0 !== a)
    for (var b in a) {
      var c = a[b];
      if (void 0 === c)
        console.warn("THREE.Material: '" + b + "' parameter is undefined.");
      else if (b in this) {
        var d = this[b];
        d instanceof THREE.Color && c instanceof THREE.Color
          ? d.copy(c)
          : d instanceof THREE.Color
          ? d.set(c)
          : d instanceof THREE.Vector3 && c instanceof THREE.Vector3
          ? d.copy(c)
          : (this[b] = c);
      }
    }
};
THREE.Material.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.Material());
  a.name = this.name;
  a.side = this.side;
  a.opacity = this.opacity;
  a.transparent = this.transparent;
  a.blending = this.blending;
  a.blendSrc = this.blendSrc;
  a.blendDst = this.blendDst;
  a.blendEquation = this.blendEquation;
  a.depthTest = this.depthTest;
  a.depthWrite = this.depthWrite;
  a.polygonOffset = this.polygonOffset;
  a.polygonOffsetFactor = this.polygonOffsetFactor;
  a.polygonOffsetUnits = this.polygonOffsetUnits;
  a.alphaTest = this.alphaTest;
  a.overdraw = this.overdraw;
  a.visible = this.visible;
  return a;
};
THREE.Material.prototype.dispose = function () {
  this.dispatchEvent({ type: "dispose" });
};
THREE.MaterialIdCount = 0;
THREE.LineBasicMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.linewidth = 1;
  this.linejoin = this.linecap = "round";
  this.vertexColors = !1;
  this.fog = !0;
  this.setValues(a);
};
THREE.LineBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.LineBasicMaterial.prototype.clone = function () {
  var a = new THREE.LineBasicMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.linewidth = this.linewidth;
  a.linecap = this.linecap;
  a.linejoin = this.linejoin;
  a.vertexColors = this.vertexColors;
  a.fog = this.fog;
  return a;
};
THREE.LineDashedMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.scale = this.linewidth = 1;
  this.dashSize = 3;
  this.gapSize = 1;
  this.vertexColors = !1;
  this.fog = !0;
  this.setValues(a);
};
THREE.LineDashedMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.LineDashedMaterial.prototype.clone = function () {
  var a = new THREE.LineDashedMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.linewidth = this.linewidth;
  a.scale = this.scale;
  a.dashSize = this.dashSize;
  a.gapSize = this.gapSize;
  a.vertexColors = this.vertexColors;
  a.fog = this.fog;
  return a;
};
THREE.MeshBasicMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.envMap = this.specularMap = this.lightMap = this.map = null;
  this.combine = THREE.MultiplyOperation;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;
  this.fog = !0;
  this.shading = THREE.SmoothShading;
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.wireframeLinejoin = this.wireframeLinecap = "round";
  this.vertexColors = THREE.NoColors;
  this.morphTargets = this.skinning = !1;
  this.setValues(a);
};
THREE.MeshBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshBasicMaterial.prototype.clone = function () {
  var a = new THREE.MeshBasicMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.map = this.map;
  a.lightMap = this.lightMap;
  a.specularMap = this.specularMap;
  a.envMap = this.envMap;
  a.combine = this.combine;
  a.reflectivity = this.reflectivity;
  a.refractionRatio = this.refractionRatio;
  a.fog = this.fog;
  a.shading = this.shading;
  a.wireframe = this.wireframe;
  a.wireframeLinewidth = this.wireframeLinewidth;
  a.wireframeLinecap = this.wireframeLinecap;
  a.wireframeLinejoin = this.wireframeLinejoin;
  a.vertexColors = this.vertexColors;
  a.skinning = this.skinning;
  a.morphTargets = this.morphTargets;
  return a;
};
THREE.MeshLambertMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.ambient = new THREE.Color(16777215);
  this.emissive = new THREE.Color(0);
  this.wrapAround = !1;
  this.wrapRGB = new THREE.Vector3(1, 1, 1);
  this.envMap = this.specularMap = this.lightMap = this.map = null;
  this.combine = THREE.MultiplyOperation;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;
  this.fog = !0;
  this.shading = THREE.SmoothShading;
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.wireframeLinejoin = this.wireframeLinecap = "round";
  this.vertexColors = THREE.NoColors;
  this.morphNormals = this.morphTargets = this.skinning = !1;
  this.setValues(a);
};
THREE.MeshLambertMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshLambertMaterial.prototype.clone = function () {
  var a = new THREE.MeshLambertMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.ambient.copy(this.ambient);
  a.emissive.copy(this.emissive);
  a.wrapAround = this.wrapAround;
  a.wrapRGB.copy(this.wrapRGB);
  a.map = this.map;
  a.lightMap = this.lightMap;
  a.specularMap = this.specularMap;
  a.envMap = this.envMap;
  a.combine = this.combine;
  a.reflectivity = this.reflectivity;
  a.refractionRatio = this.refractionRatio;
  a.fog = this.fog;
  a.shading = this.shading;
  a.wireframe = this.wireframe;
  a.wireframeLinewidth = this.wireframeLinewidth;
  a.wireframeLinecap = this.wireframeLinecap;
  a.wireframeLinejoin = this.wireframeLinejoin;
  a.vertexColors = this.vertexColors;
  a.skinning = this.skinning;
  a.morphTargets = this.morphTargets;
  a.morphNormals = this.morphNormals;
  return a;
};
THREE.MeshPhongMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.ambient = new THREE.Color(16777215);
  this.emissive = new THREE.Color(0);
  this.specular = new THREE.Color(1118481);
  this.shininess = 30;
  this.metal = !1;
  this.perPixel = !0;
  this.wrapAround = !1;
  this.wrapRGB = new THREE.Vector3(1, 1, 1);
  this.bumpMap = this.lightMap = this.map = null;
  this.bumpScale = 1;
  this.normalMap = null;
  this.normalScale = new THREE.Vector2(1, 1);
  this.envMap = this.specularMap = null;
  this.combine = THREE.MultiplyOperation;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;
  this.fog = !0;
  this.shading = THREE.SmoothShading;
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.wireframeLinejoin = this.wireframeLinecap = "round";
  this.vertexColors = THREE.NoColors;
  this.morphNormals = this.morphTargets = this.skinning = !1;
  this.setValues(a);
};
THREE.MeshPhongMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshPhongMaterial.prototype.clone = function () {
  var a = new THREE.MeshPhongMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.ambient.copy(this.ambient);
  a.emissive.copy(this.emissive);
  a.specular.copy(this.specular);
  a.shininess = this.shininess;
  a.metal = this.metal;
  a.perPixel = this.perPixel;
  a.wrapAround = this.wrapAround;
  a.wrapRGB.copy(this.wrapRGB);
  a.map = this.map;
  a.lightMap = this.lightMap;
  a.bumpMap = this.bumpMap;
  a.bumpScale = this.bumpScale;
  a.normalMap = this.normalMap;
  a.normalScale.copy(this.normalScale);
  a.specularMap = this.specularMap;
  a.envMap = this.envMap;
  a.combine = this.combine;
  a.reflectivity = this.reflectivity;
  a.refractionRatio = this.refractionRatio;
  a.fog = this.fog;
  a.shading = this.shading;
  a.wireframe = this.wireframe;
  a.wireframeLinewidth = this.wireframeLinewidth;
  a.wireframeLinecap = this.wireframeLinecap;
  a.wireframeLinejoin = this.wireframeLinejoin;
  a.vertexColors = this.vertexColors;
  a.skinning = this.skinning;
  a.morphTargets = this.morphTargets;
  a.morphNormals = this.morphNormals;
  return a;
};
THREE.MeshDepthMaterial = function (a) {
  THREE.Material.call(this);
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.setValues(a);
};
THREE.MeshDepthMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshDepthMaterial.prototype.clone = function () {
  var a = new THREE.LineBasicMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.wireframe = this.wireframe;
  a.wireframeLinewidth = this.wireframeLinewidth;
  return a;
};
THREE.MeshNormalMaterial = function (a) {
  THREE.Material.call(this, a);
  this.shading = THREE.FlatShading;
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.setValues(a);
};
THREE.MeshNormalMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshNormalMaterial.prototype.clone = function () {
  var a = new THREE.MeshNormalMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.shading = this.shading;
  a.wireframe = this.wireframe;
  a.wireframeLinewidth = this.wireframeLinewidth;
  return a;
};
THREE.MeshFaceMaterial = function (a) {
  this.materials = a instanceof Array ? a : [];
};
THREE.MeshFaceMaterial.prototype.clone = function () {
  return new THREE.MeshFaceMaterial(this.materials.slice(0));
};
THREE.ParticleBasicMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.map = null;
  this.size = 1;
  this.sizeAttenuation = !0;
  this.vertexColors = !1;
  this.fog = !0;
  this.setValues(a);
};
THREE.ParticleBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ParticleBasicMaterial.prototype.clone = function () {
  var a = new THREE.ParticleBasicMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.map = this.map;
  a.size = this.size;
  a.sizeAttenuation = this.sizeAttenuation;
  a.vertexColors = this.vertexColors;
  a.fog = this.fog;
  return a;
};
THREE.ParticleCanvasMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.program = function () {};
  this.setValues(a);
};
THREE.ParticleCanvasMaterial.prototype = Object.create(
  THREE.Material.prototype
);
THREE.ParticleCanvasMaterial.prototype.clone = function () {
  var a = new THREE.ParticleCanvasMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.program = this.program;
  return a;
};
THREE.ParticleDOMMaterial = function (a) {
  this.element = a;
};
THREE.ParticleDOMMaterial.prototype.clone = function () {
  return new THREE.ParticleDOMMaterial(this.element);
};
THREE.ShaderMaterial = function (a) {
  THREE.Material.call(this);
  this.vertexShader = this.fragmentShader = "void main() {}";
  this.uniforms = {};
  this.defines = {};
  this.attributes = null;
  this.shading = THREE.SmoothShading;
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.lights = this.fog = !1;
  this.vertexColors = THREE.NoColors;
  this.morphNormals = this.morphTargets = this.skinning = !1;
  this.setValues(a);
};
THREE.ShaderMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ShaderMaterial.prototype.clone = function () {
  var a = new THREE.ShaderMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.fragmentShader = this.fragmentShader;
  a.vertexShader = this.vertexShader;
  a.uniforms = THREE.UniformsUtils.clone(this.uniforms);
  a.attributes = this.attributes;
  a.defines = this.defines;
  a.shading = this.shading;
  a.wireframe = this.wireframe;
  a.wireframeLinewidth = this.wireframeLinewidth;
  a.fog = this.fog;
  a.lights = this.lights;
  a.vertexColors = this.vertexColors;
  a.skinning = this.skinning;
  a.morphTargets = this.morphTargets;
  a.morphNormals = this.morphNormals;
  return a;
};
THREE.SpriteMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.map = new THREE.Texture();
  this.useScreenCoordinates = !0;
  this.depthTest = !this.useScreenCoordinates;
  this.sizeAttenuation = !this.useScreenCoordinates;
  this.scaleByViewport = !this.sizeAttenuation;
  this.alignment = THREE.SpriteAlignment.center.clone();
  this.fog = !1;
  this.uvOffset = new THREE.Vector2(0, 0);
  this.uvScale = new THREE.Vector2(1, 1);
  this.setValues(a);
  a = a || {};
  void 0 === a.depthTest && (this.depthTest = !this.useScreenCoordinates);
  void 0 === a.sizeAttenuation &&
    (this.sizeAttenuation = !this.useScreenCoordinates);
  void 0 === a.scaleByViewport &&
    (this.scaleByViewport = !this.sizeAttenuation);
};
THREE.SpriteMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.SpriteMaterial.prototype.clone = function () {
  var a = new THREE.SpriteMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.map = this.map;
  a.useScreenCoordinates = this.useScreenCoordinates;
  a.sizeAttenuation = this.sizeAttenuation;
  a.scaleByViewport = this.scaleByViewport;
  a.alignment.copy(this.alignment);
  a.uvOffset.copy(this.uvOffset);
  a.uvScale.copy(this.uvScale);
  a.fog = this.fog;
  return a;
};
THREE.SpriteAlignment = {};
THREE.SpriteAlignment.topLeft = new THREE.Vector2(1, -1);
THREE.SpriteAlignment.topCenter = new THREE.Vector2(0, -1);
THREE.SpriteAlignment.topRight = new THREE.Vector2(-1, -1);
THREE.SpriteAlignment.centerLeft = new THREE.Vector2(1, 0);
THREE.SpriteAlignment.center = new THREE.Vector2(0, 0);
THREE.SpriteAlignment.centerRight = new THREE.Vector2(-1, 0);
THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(1, 1);
THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(0, 1);
THREE.SpriteAlignment.bottomRight = new THREE.Vector2(-1, 1);
THREE.Texture = function (a, b, c, d, e, f, g, h, i) {
  THREE.EventDispatcher.call(this);
  this.id = THREE.TextureIdCount++;
  this.name = "";
  this.image = a;
  this.mipmaps = [];
  this.mapping = void 0 !== b ? b : new THREE.UVMapping();
  this.wrapS = void 0 !== c ? c : THREE.ClampToEdgeWrapping;
  this.wrapT = void 0 !== d ? d : THREE.ClampToEdgeWrapping;
  this.magFilter = void 0 !== e ? e : THREE.LinearFilter;
  this.minFilter = void 0 !== f ? f : THREE.LinearMipMapLinearFilter;
  this.anisotropy = void 0 !== i ? i : 1;
  this.format = void 0 !== g ? g : THREE.RGBAFormat;
  this.type = void 0 !== h ? h : THREE.UnsignedByteType;
  this.offset = new THREE.Vector2(0, 0);
  this.repeat = new THREE.Vector2(1, 1);
  this.generateMipmaps = !0;
  this.premultiplyAlpha = !1;
  this.flipY = !0;
  this.unpackAlignment = 4;
  this.needsUpdate = !1;
  this.onUpdate = null;
};
THREE.Texture.prototype = {
  constructor: THREE.Texture,
  clone: function (a) {
    void 0 === a && (a = new THREE.Texture());
    a.image = this.image;
    a.mipmaps = this.mipmaps.slice(0);
    a.mapping = this.mapping;
    a.wrapS = this.wrapS;
    a.wrapT = this.wrapT;
    a.magFilter = this.magFilter;
    a.minFilter = this.minFilter;
    a.anisotropy = this.anisotropy;
    a.format = this.format;
    a.type = this.type;
    a.offset.copy(this.offset);
    a.repeat.copy(this.repeat);
    a.generateMipmaps = this.generateMipmaps;
    a.premultiplyAlpha = this.premultiplyAlpha;
    a.flipY = this.flipY;
    a.unpackAlignment = this.unpackAlignment;
    return a;
  },
  dispose: function () {
    this.dispatchEvent({ type: "dispose" });
  },
};
THREE.TextureIdCount = 0;
THREE.CompressedTexture = function (a, b, c, d, e, f, g, h, i, k, n) {
  THREE.Texture.call(this, null, f, g, h, i, k, d, e, n);
  this.image = { width: b, height: c };
  this.mipmaps = a;
  this.generateMipmaps = !1;
};
THREE.CompressedTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.CompressedTexture.prototype.clone = function () {
  var a = new THREE.CompressedTexture();
  THREE.Texture.prototype.clone.call(this, a);
  return a;
};
THREE.DataTexture = function (a, b, c, d, e, f, g, h, i, k, n) {
  THREE.Texture.call(this, null, f, g, h, i, k, d, e, n);
  this.image = { data: a, width: b, height: c };
};
THREE.DataTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.DataTexture.prototype.clone = function () {
  var a = new THREE.DataTexture();
  THREE.Texture.prototype.clone.call(this, a);
  return a;
};
THREE.Particle = function (a) {
  THREE.Object3D.call(this);
  this.material = a;
};
THREE.Particle.prototype = Object.create(THREE.Object3D.prototype);
THREE.Particle.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.Particle(this.material));
  THREE.Object3D.prototype.clone.call(this, a);
  return a;
};
THREE.ParticleSystem = function (a, b) {
  THREE.Object3D.call(this);
  this.geometry = a;
  this.material =
    void 0 !== b
      ? b
      : new THREE.ParticleBasicMaterial({ color: 16777215 * Math.random() });
  this.sortParticles = !1;
  this.geometry &&
    null === this.geometry.boundingSphere &&
    this.geometry.computeBoundingSphere();
  this.frustumCulled = !1;
};
THREE.ParticleSystem.prototype = Object.create(THREE.Object3D.prototype);
THREE.ParticleSystem.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.ParticleSystem(this.geometry, this.material));
  a.sortParticles = this.sortParticles;
  THREE.Object3D.prototype.clone.call(this, a);
  return a;
};
THREE.Line = function (a, b, c) {
  THREE.Object3D.call(this);
  this.geometry = a;
  this.material =
    void 0 !== b
      ? b
      : new THREE.LineBasicMaterial({ color: 16777215 * Math.random() });
  this.type = void 0 !== c ? c : THREE.LineStrip;
  this.geometry &&
    (this.geometry.boundingSphere || this.geometry.computeBoundingSphere());
};
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = Object.create(THREE.Object3D.prototype);
THREE.Line.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.Line(this.geometry, this.material, this.type));
  THREE.Object3D.prototype.clone.call(this, a);
  return a;
};
THREE.Mesh = function (a, b) {
  THREE.Object3D.call(this);
  this.geometry = a;
  this.material =
    void 0 !== b
      ? b
      : new THREE.MeshBasicMaterial({
          color: 16777215 * Math.random(),
          wireframe: !0,
        });
  if (
    this.geometry &&
    (null === this.geometry.boundingSphere &&
      this.geometry.computeBoundingSphere(),
    this.geometry.morphTargets.length)
  ) {
    this.morphTargetBase = -1;
    this.morphTargetForcedOrder = [];
    this.morphTargetInfluences = [];
    this.morphTargetDictionary = {};
    for (var c = 0; c < this.geometry.morphTargets.length; c++)
      this.morphTargetInfluences.push(0),
        (this.morphTargetDictionary[this.geometry.morphTargets[c].name] = c);
  }
};
THREE.Mesh.prototype = Object.create(THREE.Object3D.prototype);
THREE.Mesh.prototype.getMorphTargetIndexByName = function (a) {
  if (void 0 !== this.morphTargetDictionary[a])
    return this.morphTargetDictionary[a];
  console.log(
    "THREE.Mesh.getMorphTargetIndexByName: morph target " +
      a +
      " does not exist. Returning 0."
  );
  return 0;
};
THREE.Mesh.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.Mesh(this.geometry, this.material));
  THREE.Object3D.prototype.clone.call(this, a);
  return a;
};
THREE.Bone = function (a) {
  THREE.Object3D.call(this);
  this.skin = a;
  this.skinMatrix = new THREE.Matrix4();
};
THREE.Bone.prototype = Object.create(THREE.Object3D.prototype);
THREE.Bone.prototype.update = function (a, b) {
  this.matrixAutoUpdate && (b |= this.updateMatrix());
  if (b || this.matrixWorldNeedsUpdate)
    a
      ? this.skinMatrix.multiply(a, this.matrix)
      : this.skinMatrix.copy(this.matrix),
      (this.matrixWorldNeedsUpdate = !1),
      (b = !0);
  var c,
    d = this.children.length;
  for (c = 0; c < d; c++) this.children[c].update(this.skinMatrix, b);
};
THREE.SkinnedMesh = function (a, b, c) {
  THREE.Mesh.call(this, a, b);
  this.useVertexTexture = void 0 !== c ? c : !0;
  this.identityMatrix = new THREE.Matrix4();
  this.bones = [];
  this.boneMatrices = [];
  var d, e, f;
  if (this.geometry && void 0 !== this.geometry.bones) {
    for (a = 0; a < this.geometry.bones.length; a++)
      (c = this.geometry.bones[a]),
        (d = c.pos),
        (e = c.rotq),
        (f = c.scl),
        (b = this.addBone()),
        (b.name = c.name),
        b.position.set(d[0], d[1], d[2]),
        b.quaternion.set(e[0], e[1], e[2], e[3]),
        (b.useQuaternion = !0),
        void 0 !== f ? b.scale.set(f[0], f[1], f[2]) : b.scale.set(1, 1, 1);
    for (a = 0; a < this.bones.length; a++)
      (c = this.geometry.bones[a]),
        (b = this.bones[a]),
        -1 === c.parent ? this.add(b) : this.bones[c.parent].add(b);
    a = this.bones.length;
    this.useVertexTexture
      ? ((this.boneTextureHeight =
          this.boneTextureWidth =
          a =
            256 < a ? 64 : 64 < a ? 32 : 16 < a ? 16 : 8),
        (this.boneMatrices = new Float32Array(
          4 * this.boneTextureWidth * this.boneTextureHeight
        )),
        (this.boneTexture = new THREE.DataTexture(
          this.boneMatrices,
          this.boneTextureWidth,
          this.boneTextureHeight,
          THREE.RGBAFormat,
          THREE.FloatType
        )),
        (this.boneTexture.minFilter = THREE.NearestFilter),
        (this.boneTexture.magFilter = THREE.NearestFilter),
        (this.boneTexture.generateMipmaps = !1),
        (this.boneTexture.flipY = !1))
      : (this.boneMatrices = new Float32Array(16 * a));
    this.pose();
  }
};
THREE.SkinnedMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.SkinnedMesh.prototype.addBone = function (a) {
  void 0 === a && (a = new THREE.Bone(this));
  this.bones.push(a);
  return a;
};
THREE.SkinnedMesh.prototype.updateMatrixWorld = function (a) {
  this.matrixAutoUpdate && this.updateMatrix();
  if (this.matrixWorldNeedsUpdate || a)
    this.parent
      ? this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix)
      : this.matrixWorld.copy(this.matrix),
      (this.matrixWorldNeedsUpdate = !1);
  for (var a = 0, b = this.children.length; a < b; a++) {
    var c = this.children[a];
    c instanceof THREE.Bone
      ? c.update(this.identityMatrix, !1)
      : c.updateMatrixWorld(!0);
  }
  if (void 0 == this.boneInverses) {
    this.boneInverses = [];
    a = 0;
    for (b = this.bones.length; a < b; a++)
      (c = new THREE.Matrix4()),
        c.getInverse(this.bones[a].skinMatrix),
        this.boneInverses.push(c);
  }
  a = 0;
  for (b = this.bones.length; a < b; a++)
    THREE.SkinnedMesh.offsetMatrix.multiply(
      this.bones[a].skinMatrix,
      this.boneInverses[a]
    ),
      THREE.SkinnedMesh.offsetMatrix.flattenToArrayOffset(
        this.boneMatrices,
        16 * a
      );
  this.useVertexTexture && (this.boneTexture.needsUpdate = !0);
};
THREE.SkinnedMesh.prototype.pose = function () {
  this.updateMatrixWorld(!0);
  for (var a = 0; a < this.geometry.skinIndices.length; a++) {
    var b = this.geometry.skinWeights[a],
      c = 1 / b.lengthManhattan();
    Infinity !== c ? b.multiplyScalar(c) : b.set(1);
  }
};
THREE.SkinnedMesh.prototype.clone = function (a) {
  void 0 === a &&
    (a = new THREE.SkinnedMesh(
      this.geometry,
      this.material,
      this.useVertexTexture
    ));
  THREE.Mesh.prototype.clone.call(this, a);
  return a;
};
THREE.SkinnedMesh.offsetMatrix = new THREE.Matrix4();
THREE.MorphAnimMesh = function (a, b) {
  THREE.Mesh.call(this, a, b);
  this.duration = 1e3;
  this.mirroredLoop = !1;
  this.currentKeyframe = this.lastKeyframe = this.time = 0;
  this.direction = 1;
  this.directionBackwards = !1;
  this.setFrameRange(0, this.geometry.morphTargets.length - 1);
};
THREE.MorphAnimMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphAnimMesh.prototype.setFrameRange = function (a, b) {
  this.startKeyframe = a;
  this.endKeyframe = b;
  this.length = this.endKeyframe - this.startKeyframe + 1;
};
THREE.MorphAnimMesh.prototype.setDirectionForward = function () {
  this.direction = 1;
  this.directionBackwards = !1;
};
THREE.MorphAnimMesh.prototype.setDirectionBackward = function () {
  this.direction = -1;
  this.directionBackwards = !0;
};
THREE.MorphAnimMesh.prototype.parseAnimations = function () {
  var a = this.geometry;
  a.animations || (a.animations = {});
  for (
    var b,
      c = a.animations,
      d = /([a-z]+)(\d+)/,
      e = 0,
      f = a.morphTargets.length;
    e < f;
    e++
  ) {
    var g = a.morphTargets[e].name.match(d);
    if (g && 1 < g.length) {
      g = g[1];
      c[g] || (c[g] = { start: Infinity, end: -Infinity });
      var h = c[g];
      e < h.start && (h.start = e);
      e > h.end && (h.end = e);
      b || (b = g);
    }
  }
  a.firstAnimation = b;
};
THREE.MorphAnimMesh.prototype.setAnimationLabel = function (a, b, c) {
  this.geometry.animations || (this.geometry.animations = {});
  this.geometry.animations[a] = { start: b, end: c };
};
THREE.MorphAnimMesh.prototype.playAnimation = function (a, b) {
  var c = this.geometry.animations[a];
  c
    ? (this.setFrameRange(c.start, c.end),
      (this.duration = 1e3 * ((c.end - c.start) / b)),
      (this.time = 0))
    : console.warn("animation[" + a + "] undefined");
};
THREE.MorphAnimMesh.prototype.updateAnimation = function (a) {
  var b = this.duration / this.length;
  this.time += this.direction * a;
  if (this.mirroredLoop) {
    if (this.time > this.duration || 0 > this.time)
      (this.direction *= -1),
        this.time > this.duration &&
          ((this.time = this.duration), (this.directionBackwards = !0)),
        0 > this.time && ((this.time = 0), (this.directionBackwards = !1));
  } else
    (this.time %= this.duration), 0 > this.time && (this.time += this.duration);
  a =
    this.startKeyframe +
    THREE.Math.clamp(Math.floor(this.time / b), 0, this.length - 1);
  a !== this.currentKeyframe &&
    ((this.morphTargetInfluences[this.lastKeyframe] = 0),
    (this.morphTargetInfluences[this.currentKeyframe] = 1),
    (this.morphTargetInfluences[a] = 0),
    (this.lastKeyframe = this.currentKeyframe),
    (this.currentKeyframe = a));
  b = (this.time % b) / b;
  this.directionBackwards && (b = 1 - b);
  this.morphTargetInfluences[this.currentKeyframe] = b;
  this.morphTargetInfluences[this.lastKeyframe] = 1 - b;
};
THREE.MorphAnimMesh.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.MorphAnimMesh(this.geometry, this.material));
  a.duration = this.duration;
  a.mirroredLoop = this.mirroredLoop;
  a.time = this.time;
  a.lastKeyframe = this.lastKeyframe;
  a.currentKeyframe = this.currentKeyframe;
  a.direction = this.direction;
  a.directionBackwards = this.directionBackwards;
  THREE.Mesh.prototype.clone.call(this, a);
  return a;
};
THREE.Ribbon = function (a, b) {
  THREE.Object3D.call(this);
  this.geometry = a;
  this.material = b;
};
THREE.Ribbon.prototype = Object.create(THREE.Object3D.prototype);
THREE.Ribbon.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.Ribbon(this.geometry, this.material));
  THREE.Object3D.prototype.clone.call(this, a);
  return a;
};
THREE.LOD = function () {
  THREE.Object3D.call(this);
  this.LODs = [];
};
THREE.LOD.prototype = Object.create(THREE.Object3D.prototype);
THREE.LOD.prototype.addLevel = function (a, b) {
  void 0 === b && (b = 0);
  for (
    var b = Math.abs(b), c = 0;
    c < this.LODs.length && !(b < this.LODs[c].visibleAtDistance);
    c++
  );
  this.LODs.splice(c, 0, { visibleAtDistance: b, object3D: a });
  this.add(a);
};
THREE.LOD.prototype.update = function (a) {
  if (1 < this.LODs.length) {
    a.matrixWorldInverse.getInverse(a.matrixWorld);
    a = a.matrixWorldInverse;
    a = -(
      a.elements[2] * this.matrixWorld.elements[12] +
      a.elements[6] * this.matrixWorld.elements[13] +
      a.elements[10] * this.matrixWorld.elements[14] +
      a.elements[14]
    );
    this.LODs[0].object3D.visible = !0;
    for (var b = 1; b < this.LODs.length; b++)
      if (a >= this.LODs[b].visibleAtDistance)
        (this.LODs[b - 1].object3D.visible = !1),
          (this.LODs[b].object3D.visible = !0);
      else break;
    for (; b < this.LODs.length; b++) this.LODs[b].object3D.visible = !1;
  }
};
THREE.LOD.prototype.clone = function () {};
THREE.Sprite = function (a) {
  THREE.Object3D.call(this);
  this.material = void 0 !== a ? a : new THREE.SpriteMaterial();
  this.rotation3d = this.rotation;
  this.rotation = 0;
};
THREE.Sprite.prototype = Object.create(THREE.Object3D.prototype);
THREE.Sprite.prototype.updateMatrix = function () {
  this.matrix.setPosition(this.position);
  this.rotation3d.set(0, 0, this.rotation);
  this.matrix.setRotationFromEuler(this.rotation3d);
  (1 !== this.scale.x || 1 !== this.scale.y) && this.matrix.scale(this.scale);
  this.matrixWorldNeedsUpdate = !0;
};
THREE.Sprite.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.Sprite(this.material));
  THREE.Object3D.prototype.clone.call(this, a);
  return a;
};
THREE.Scene = function () {
  THREE.Object3D.call(this);
  this.overrideMaterial = this.fog = null;
  this.matrixAutoUpdate = !1;
  this.__objects = [];
  this.__lights = [];
  this.__objectsAdded = [];
  this.__objectsRemoved = [];
};
THREE.Scene.prototype = Object.create(THREE.Object3D.prototype);
THREE.Scene.prototype.__addObject = function (a) {
  if (a instanceof THREE.Light)
    -1 === this.__lights.indexOf(a) && this.__lights.push(a),
      a.target && void 0 === a.target.parent && this.add(a.target);
  else if (
    !(a instanceof THREE.Camera || a instanceof THREE.Bone) &&
    -1 === this.__objects.indexOf(a)
  ) {
    this.__objects.push(a);
    this.__objectsAdded.push(a);
    var b = this.__objectsRemoved.indexOf(a);
    -1 !== b && this.__objectsRemoved.splice(b, 1);
  }
  for (b = 0; b < a.children.length; b++) this.__addObject(a.children[b]);
};
THREE.Scene.prototype.__removeObject = function (a) {
  if (a instanceof THREE.Light) {
    var b = this.__lights.indexOf(a);
    -1 !== b && this.__lights.splice(b, 1);
  } else
    a instanceof THREE.Camera ||
      ((b = this.__objects.indexOf(a)),
      -1 !== b &&
        (this.__objects.splice(b, 1),
        this.__objectsRemoved.push(a),
        (b = this.__objectsAdded.indexOf(a)),
        -1 !== b && this.__objectsAdded.splice(b, 1)));
  for (b = 0; b < a.children.length; b++) this.__removeObject(a.children[b]);
};
THREE.Fog = function (a, b, c) {
  this.name = "";
  this.color = new THREE.Color(a);
  this.near = void 0 !== b ? b : 1;
  this.far = void 0 !== c ? c : 1e3;
};
THREE.Fog.prototype.clone = function () {
  return new THREE.Fog(this.color.getHex(), this.near, this.far);
};
THREE.FogExp2 = function (a, b) {
  this.name = "";
  this.color = new THREE.Color(a);
  this.density = void 0 !== b ? b : 2.5e-4;
};
THREE.FogExp2.prototype.clone = function () {
  return new THREE.FogExp2(this.color.getHex(), this.density);
};
THREE.CanvasRenderer = function (a) {
  function b(a) {
    B !== a && (B = l.globalAlpha = a);
  }
  function c(a) {
    x !== a &&
      (a === THREE.NormalBlending
        ? (l.globalCompositeOperation = "source-over")
        : a === THREE.AdditiveBlending
        ? (l.globalCompositeOperation = "lighter")
        : a === THREE.SubtractiveBlending &&
          (l.globalCompositeOperation = "darker"),
      (x = a));
  }
  function d(a) {
    t !== a && (t = l.strokeStyle = a);
  }
  function e(a) {
    F !== a && (F = l.fillStyle = a);
  }
  console.log("THREE.CanvasRenderer", THREE.REVISION);
  var a = a || {},
    f = this,
    g,
    h,
    i,
    k = new THREE.Projector(),
    n = void 0 !== a.canvas ? a.canvas : document.createElement("canvas"),
    p,
    m,
    r,
    s,
    l = n.getContext("2d"),
    q = new THREE.Color(0),
    u = 0,
    B = 1,
    x = 0,
    t = null,
    F = null,
    C = null,
    A = null,
    z = null,
    H,
    G,
    I,
    $,
    D = new THREE.RenderableVertex(),
    L = new THREE.RenderableVertex(),
    y,
    J,
    K,
    R,
    P,
    ca,
    xa,
    M,
    pa,
    ya,
    ua,
    N,
    O = new THREE.Color(),
    aa = new THREE.Color(),
    fa = new THREE.Color(),
    V = new THREE.Color(),
    ja = new THREE.Color(),
    Z = new THREE.Color(),
    ga = new THREE.Color(),
    oa = {},
    za = {},
    Da,
    Ta,
    sa,
    nb,
    Bb,
    kb,
    eb,
    pb,
    jc,
    Lb,
    Ua = new THREE.Box2(),
    ma = new THREE.Box2(),
    Ra = new THREE.Box2(),
    Cb = !1,
    Ha = new THREE.Color(),
    qb = new THREE.Color(),
    fb = new THREE.Color(),
    Oa = new THREE.Vector3(),
    Za,
    yb,
    kc,
    sb,
    Ib,
    Ea,
    Va = 16;
  Za = document.createElement("canvas");
  Za.width = Za.height = 2;
  yb = Za.getContext("2d");
  yb.fillStyle = "rgba(0,0,0,1)";
  yb.fillRect(0, 0, 2, 2);
  kc = yb.getImageData(0, 0, 2, 2);
  sb = kc.data;
  Ib = document.createElement("canvas");
  Ib.width = Ib.height = Va;
  Ea = Ib.getContext("2d");
  Ea.translate(-Va / 2, -Va / 2);
  Ea.scale(Va, Va);
  Va--;
  this.domElement = n;
  this.devicePixelRatio =
    void 0 !== a.devicePixelRatio
      ? a.devicePixelRatio
      : void 0 !== window.devicePixelRatio
      ? window.devicePixelRatio
      : 1;
  this.sortElements = this.sortObjects = this.autoClear = !0;
  this.info = { render: { vertices: 0, faces: 0 } };
  this.setSize = function (a, b) {
    p = a * this.devicePixelRatio;
    m = b * this.devicePixelRatio;
    r = Math.floor(p / 2);
    s = Math.floor(m / 2);
    n.width = p;
    n.height = m;
    n.style.width = a + "px";
    n.style.height = b + "px";
    Ua.min.set(-r, -s);
    Ua.max.set(r, s);
    ma.min.set(-r, -s);
    ma.max.set(r, s);
    B = 1;
    x = 0;
    z = A = C = F = t = null;
  };
  this.setClearColor = function (a, b) {
    q.copy(a);
    u = void 0 !== b ? b : 1;
    ma.min.set(-r, -s);
    ma.max.set(r, s);
  };
  this.setClearColorHex = function (a, b) {
    q.setHex(a);
    u = void 0 !== b ? b : 1;
    ma.min.set(-r, -s);
    ma.max.set(r, s);
  };
  this.getMaxAnisotropy = function () {
    return 0;
  };
  this.clear = function () {
    l.setTransform(1, 0, 0, -1, r, s);
    !1 === ma.empty() &&
      (ma.intersect(Ua),
      ma.expandByScalar(2),
      1 > u &&
        l.clearRect(
          ma.min.x | 0,
          ma.min.y | 0,
          (ma.max.x - ma.min.x) | 0,
          (ma.max.y - ma.min.y) | 0
        ),
      0 < u &&
        (c(THREE.NormalBlending),
        b(1),
        e(
          "rgba(" +
            Math.floor(255 * q.r) +
            "," +
            Math.floor(255 * q.g) +
            "," +
            Math.floor(255 * q.b) +
            "," +
            u +
            ")"
        ),
        l.fillRect(
          ma.min.x | 0,
          ma.min.y | 0,
          (ma.max.x - ma.min.x) | 0,
          (ma.max.y - ma.min.y) | 0
        )),
      ma.makeEmpty());
  };
  this.render = function (a, j) {
    function n(a, b, c) {
      for (var d = 0, e = i.length; d < e; d++) {
        var f = i[d],
          g = f.color;
        if (f instanceof THREE.DirectionalLight) {
          var h = f.matrixWorld.getPosition().normalize(),
            j = b.dot(h);
          0 >= j ||
            ((j *= f.intensity),
            (c.r += g.r * j),
            (c.g += g.g * j),
            (c.b += g.b * j));
        } else
          f instanceof THREE.PointLight &&
            ((h = f.matrixWorld.getPosition()),
            (j = b.dot(Oa.sub(h, a).normalize())),
            0 >= j ||
              ((j *=
                0 == f.distance
                  ? 1
                  : 1 - Math.min(a.distanceTo(h) / f.distance, 1)),
              0 != j &&
                ((j *= f.intensity),
                (c.r += g.r * j),
                (c.g += g.g * j),
                (c.b += g.b * j))));
      }
    }
    function m(a, d, e, g, h, i, k, da) {
      f.info.render.vertices += 3;
      f.info.render.faces++;
      b(da.opacity);
      c(da.blending);
      y = a.positionScreen.x;
      J = a.positionScreen.y;
      K = d.positionScreen.x;
      R = d.positionScreen.y;
      P = e.positionScreen.x;
      ca = e.positionScreen.y;
      p(y, J, K, R, P, ca);
      (da instanceof THREE.MeshLambertMaterial ||
        da instanceof THREE.MeshPhongMaterial) &&
      null === da.map &&
      null === da.map
        ? (Z.copy(da.color),
          ga.copy(da.emissive),
          da.vertexColors === THREE.FaceColors &&
            ((Z.r *= k.color.r), (Z.g *= k.color.g), (Z.b *= k.color.b)),
          !0 === Cb
            ? !1 === da.wireframe &&
              da.shading == THREE.SmoothShading &&
              3 == k.vertexNormalsLength
              ? ((aa.r = fa.r = V.r = Ha.r),
                (aa.g = fa.g = V.g = Ha.g),
                (aa.b = fa.b = V.b = Ha.b),
                n(k.v1.positionWorld, k.vertexNormalsWorld[0], aa),
                n(k.v2.positionWorld, k.vertexNormalsWorld[1], fa),
                n(k.v3.positionWorld, k.vertexNormalsWorld[2], V),
                (aa.r = aa.r * Z.r + ga.r),
                (aa.g = aa.g * Z.g + ga.g),
                (aa.b = aa.b * Z.b + ga.b),
                (fa.r = fa.r * Z.r + ga.r),
                (fa.g = fa.g * Z.g + ga.g),
                (fa.b = fa.b * Z.b + ga.b),
                (V.r = V.r * Z.r + ga.r),
                (V.g = V.g * Z.g + ga.g),
                (V.b = V.b * Z.b + ga.b),
                (ja.r = 0.5 * (fa.r + V.r)),
                (ja.g = 0.5 * (fa.g + V.g)),
                (ja.b = 0.5 * (fa.b + V.b)),
                (sa = F(aa, fa, V, ja)),
                B(y, J, K, R, P, ca, 0, 0, 1, 0, 0, 1, sa))
              : ((O.r = Ha.r),
                (O.g = Ha.g),
                (O.b = Ha.b),
                n(k.centroidWorld, k.normalWorld, O),
                (O.r = O.r * Z.r + ga.r),
                (O.g = O.g * Z.g + ga.g),
                (O.b = O.b * Z.b + ga.b),
                !0 === da.wireframe
                  ? t(
                      O,
                      da.wireframeLinewidth,
                      da.wireframeLinecap,
                      da.wireframeLinejoin
                    )
                  : u(O))
            : !0 === da.wireframe
            ? t(
                da.color,
                da.wireframeLinewidth,
                da.wireframeLinecap,
                da.wireframeLinejoin
              )
            : u(da.color))
        : da instanceof THREE.MeshBasicMaterial ||
          da instanceof THREE.MeshLambertMaterial ||
          da instanceof THREE.MeshPhongMaterial
        ? null !== da.map
          ? da.map.mapping instanceof THREE.UVMapping &&
            ((nb = k.uvs[0]),
            x(
              y,
              J,
              K,
              R,
              P,
              ca,
              nb[g].x,
              nb[g].y,
              nb[h].x,
              nb[h].y,
              nb[i].x,
              nb[i].y,
              da.map
            ))
          : null !== da.envMap
          ? da.envMap.mapping instanceof THREE.SphericalReflectionMapping &&
            ((a = j.matrixWorldInverse),
            Oa.copy(k.vertexNormalsWorld[g]),
            (Bb =
              0.5 *
                (Oa.x * a.elements[0] +
                  Oa.y * a.elements[4] +
                  Oa.z * a.elements[8]) +
              0.5),
            (kb =
              0.5 *
                (Oa.x * a.elements[1] +
                  Oa.y * a.elements[5] +
                  Oa.z * a.elements[9]) +
              0.5),
            Oa.copy(k.vertexNormalsWorld[h]),
            (eb =
              0.5 *
                (Oa.x * a.elements[0] +
                  Oa.y * a.elements[4] +
                  Oa.z * a.elements[8]) +
              0.5),
            (pb =
              0.5 *
                (Oa.x * a.elements[1] +
                  Oa.y * a.elements[5] +
                  Oa.z * a.elements[9]) +
              0.5),
            Oa.copy(k.vertexNormalsWorld[i]),
            (jc =
              0.5 *
                (Oa.x * a.elements[0] +
                  Oa.y * a.elements[4] +
                  Oa.z * a.elements[8]) +
              0.5),
            (Lb =
              0.5 *
                (Oa.x * a.elements[1] +
                  Oa.y * a.elements[5] +
                  Oa.z * a.elements[9]) +
              0.5),
            x(y, J, K, R, P, ca, Bb, kb, eb, pb, jc, Lb, da.envMap))
          : (O.copy(da.color),
            da.vertexColors === THREE.FaceColors &&
              ((O.r *= k.color.r), (O.g *= k.color.g), (O.b *= k.color.b)),
            !0 === da.wireframe
              ? t(
                  O,
                  da.wireframeLinewidth,
                  da.wireframeLinecap,
                  da.wireframeLinejoin
                )
              : u(O))
        : da instanceof THREE.MeshDepthMaterial
        ? ((Da = j.near),
          (Ta = j.far),
          (aa.r = aa.g = aa.b = 1 - Va(a.positionScreen.z, Da, Ta)),
          (fa.r = fa.g = fa.b = 1 - Va(d.positionScreen.z, Da, Ta)),
          (V.r = V.g = V.b = 1 - Va(e.positionScreen.z, Da, Ta)),
          (ja.r = 0.5 * (fa.r + V.r)),
          (ja.g = 0.5 * (fa.g + V.g)),
          (ja.b = 0.5 * (fa.b + V.b)),
          (sa = F(aa, fa, V, ja)),
          B(y, J, K, R, P, ca, 0, 0, 1, 0, 0, 1, sa))
        : da instanceof THREE.MeshNormalMaterial &&
          ((O.r = gb(k.normalWorld.x)),
          (O.g = gb(k.normalWorld.y)),
          (O.b = gb(k.normalWorld.z)),
          !0 === da.wireframe
            ? t(
                O,
                da.wireframeLinewidth,
                da.wireframeLinecap,
                da.wireframeLinejoin
              )
            : u(O));
    }
    function p(a, b, c, d, e, f) {
      l.beginPath();
      l.moveTo(a, b);
      l.lineTo(c, d);
      l.lineTo(e, f);
      l.closePath();
    }
    function q(a, b, c, d, e, f, g, h) {
      l.beginPath();
      l.moveTo(a, b);
      l.lineTo(c, d);
      l.lineTo(e, f);
      l.lineTo(g, h);
      l.closePath();
    }
    function t(a, b, c, e) {
      C !== b && (C = l.lineWidth = b);
      A !== c && (A = l.lineCap = c);
      z !== e && (z = l.lineJoin = e);
      d(a.getStyle());
      l.stroke();
      Ra.expandByScalar(2 * b);
    }
    function u(a) {
      e(a.getStyle());
      l.fill();
    }
    function x(a, b, c, d, f, g, h, j, i, k, da, n, m) {
      if (
        !(
          m instanceof THREE.DataTexture ||
          void 0 === m.image ||
          0 == m.image.width
        )
      ) {
        if (!0 === m.needsUpdate) {
          var p = m.wrapS == THREE.RepeatWrapping,
            r = m.wrapT == THREE.RepeatWrapping;
          oa[m.id] = l.createPattern(
            m.image,
            !0 === p && !0 === r
              ? "repeat"
              : !0 === p && !1 === r
              ? "repeat-x"
              : !1 === p && !0 === r
              ? "repeat-y"
              : "no-repeat"
          );
          m.needsUpdate = !1;
        }
        void 0 === oa[m.id] ? e("rgba(0,0,0,1)") : e(oa[m.id]);
        var p = m.offset.x / m.repeat.x,
          r = m.offset.y / m.repeat.y,
          s = m.image.width * m.repeat.x,
          q = m.image.height * m.repeat.y,
          h = (h + p) * s,
          j = (1 - j + r) * q,
          c = c - a,
          d = d - b,
          f = f - a,
          g = g - b,
          i = (i + p) * s - h,
          k = (1 - k + r) * q - j,
          da = (da + p) * s - h,
          n = (1 - n + r) * q - j,
          p = i * n - da * k;
        0 === p
          ? (void 0 === za[m.id] &&
              ((b = document.createElement("canvas")),
              (b.width = m.image.width),
              (b.height = m.image.height),
              (b = b.getContext("2d")),
              b.drawImage(m.image, 0, 0),
              (za[m.id] = b.getImageData(
                0,
                0,
                m.image.width,
                m.image.height
              ).data)),
            (b = za[m.id]),
            (h = 4 * (Math.floor(h) + Math.floor(j) * m.image.width)),
            O.setRGB(b[h] / 255, b[h + 1] / 255, b[h + 2] / 255),
            u(O))
          : ((p = 1 / p),
            (m = (n * c - k * f) * p),
            (k = (n * d - k * g) * p),
            (c = (i * f - da * c) * p),
            (d = (i * g - da * d) * p),
            (a = a - m * h - c * j),
            (h = b - k * h - d * j),
            l.save(),
            l.transform(m, k, c, d, a, h),
            l.fill(),
            l.restore());
      }
    }
    function B(a, b, c, d, e, f, g, h, j, i, k, da, n) {
      var m, p;
      m = n.width - 1;
      p = n.height - 1;
      g *= m;
      h *= p;
      c -= a;
      d -= b;
      e -= a;
      f -= b;
      j = j * m - g;
      i = i * p - h;
      k = k * m - g;
      da = da * p - h;
      p = 1 / (j * da - k * i);
      m = (da * c - i * e) * p;
      i = (da * d - i * f) * p;
      c = (j * e - k * c) * p;
      d = (j * f - k * d) * p;
      a = a - m * g - c * h;
      b = b - i * g - d * h;
      l.save();
      l.transform(m, i, c, d, a, b);
      l.clip();
      l.drawImage(n, 0, 0);
      l.restore();
    }
    function F(a, b, c, d) {
      sb[0] = (255 * a.r) | 0;
      sb[1] = (255 * a.g) | 0;
      sb[2] = (255 * a.b) | 0;
      sb[4] = (255 * b.r) | 0;
      sb[5] = (255 * b.g) | 0;
      sb[6] = (255 * b.b) | 0;
      sb[8] = (255 * c.r) | 0;
      sb[9] = (255 * c.g) | 0;
      sb[10] = (255 * c.b) | 0;
      sb[12] = (255 * d.r) | 0;
      sb[13] = (255 * d.g) | 0;
      sb[14] = (255 * d.b) | 0;
      yb.putImageData(kc, 0, 0);
      Ea.drawImage(Za, 0, 0);
      return Ib;
    }
    function Va(a, b, c) {
      a = (a - b) / (c - b);
      return a * a * (3 - 2 * a);
    }
    function gb(a) {
      a = 0.5 * (a + 1);
      return 0 > a ? 0 : 1 < a ? 1 : a;
    }
    function tb(a, b) {
      var c = b.x - a.x,
        d = b.y - a.y,
        e = c * c + d * d;
      0 !== e &&
        ((e = 1 / Math.sqrt(e)),
        (c *= e),
        (d *= e),
        (b.x += c),
        (b.y += d),
        (a.x -= c),
        (a.y -= d));
    }
    if (!1 === j instanceof THREE.Camera)
      console.error(
        "THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera."
      );
    else {
      !0 === this.autoClear && this.clear();
      l.setTransform(1, 0, 0, -1, r, s);
      f.info.render.vertices = 0;
      f.info.render.faces = 0;
      g = k.projectScene(a, j, this.sortObjects, this.sortElements);
      h = g.elements;
      i = g.lights;
      Cb = 0 < i.length;
      if (!0 === Cb) {
        Ha.setRGB(0, 0, 0);
        qb.setRGB(0, 0, 0);
        fb.setRGB(0, 0, 0);
        for (var zb = 0, Mb = i.length; zb < Mb; zb++) {
          var X = i[zb],
            la = X.color;
          X instanceof THREE.AmbientLight
            ? ((Ha.r += la.r), (Ha.g += la.g), (Ha.b += la.b))
            : X instanceof THREE.DirectionalLight
            ? ((qb.r += la.r), (qb.g += la.g), (qb.b += la.b))
            : X instanceof THREE.PointLight &&
              ((fb.r += la.r), (fb.g += la.g), (fb.b += la.b));
        }
      }
      zb = 0;
      for (Mb = h.length; zb < Mb; zb++) {
        var ka = h[zb],
          X = ka.material;
        if (!(void 0 === X || !1 === X.visible)) {
          Ra.makeEmpty();
          if (ka instanceof THREE.RenderableParticle) {
            H = ka;
            H.x *= r;
            H.y *= s;
            var la = H,
              $a = ka;
            b(X.opacity);
            c(X.blending);
            var Wa = void 0,
              ab = void 0,
              ob = void 0,
              hb = void 0,
              da = (ka = void 0),
              ed = void 0;
            X instanceof THREE.ParticleBasicMaterial
              ? null === X.map
                ? ((ob = $a.object.scale.x),
                  (hb = $a.object.scale.y),
                  (ob *= $a.scale.x * r),
                  (hb *= $a.scale.y * s),
                  Ra.min.set(la.x - ob, la.y - hb),
                  Ra.max.set(la.x + ob, la.y + hb),
                  !1 !== Ua.isIntersectionBox(Ra) &&
                    (e(X.color.getStyle()),
                    l.save(),
                    l.translate(la.x, la.y),
                    l.rotate(-$a.rotation),
                    l.scale(ob, hb),
                    l.fillRect(-1, -1, 2, 2),
                    l.restore()))
                : ((ka = X.map.image),
                  (da = ka.width >> 1),
                  (ed = ka.height >> 1),
                  (ob = $a.scale.x * r),
                  (hb = $a.scale.y * s),
                  (Wa = ob * da),
                  (ab = hb * ed),
                  Ra.min.set(la.x - Wa, la.y - ab),
                  Ra.max.set(la.x + Wa, la.y + ab),
                  !1 !== Ua.isIntersectionBox(Ra) &&
                    (l.save(),
                    l.translate(la.x, la.y),
                    l.rotate(-$a.rotation),
                    l.scale(ob, -hb),
                    l.translate(-da, -ed),
                    l.drawImage(ka, 0, 0),
                    l.restore()))
              : X instanceof THREE.ParticleCanvasMaterial &&
                ((Wa = $a.scale.x * r),
                (ab = $a.scale.y * s),
                Ra.min.set(la.x - Wa, la.y - ab),
                Ra.max.set(la.x + Wa, la.y + ab),
                !1 !== Ua.isIntersectionBox(Ra) &&
                  (d(X.color.getStyle()),
                  e(X.color.getStyle()),
                  l.save(),
                  l.translate(la.x, la.y),
                  l.rotate(-$a.rotation),
                  l.scale(Wa, ab),
                  X.program(l),
                  l.restore()));
          } else
            ka instanceof THREE.RenderableLine
              ? ((H = ka.v1),
                (G = ka.v2),
                (H.positionScreen.x *= r),
                (H.positionScreen.y *= s),
                (G.positionScreen.x *= r),
                (G.positionScreen.y *= s),
                Ra.setFromPoints([H.positionScreen, G.positionScreen]),
                !0 === Ua.isIntersectionBox(Ra) &&
                  ((la = H),
                  ($a = G),
                  b(X.opacity),
                  c(X.blending),
                  l.beginPath(),
                  l.moveTo(la.positionScreen.x, la.positionScreen.y),
                  l.lineTo($a.positionScreen.x, $a.positionScreen.y),
                  X instanceof THREE.LineBasicMaterial &&
                    ((la = X.linewidth),
                    C !== la && (C = l.lineWidth = la),
                    (la = X.linecap),
                    A !== la && (A = l.lineCap = la),
                    (la = X.linejoin),
                    z !== la && (z = l.lineJoin = la),
                    d(X.color.getStyle()),
                    l.stroke(),
                    Ra.expandByScalar(2 * X.linewidth))))
              : ka instanceof THREE.RenderableFace3
              ? ((H = ka.v1),
                (G = ka.v2),
                (I = ka.v3),
                (H.positionScreen.x *= r),
                (H.positionScreen.y *= s),
                (G.positionScreen.x *= r),
                (G.positionScreen.y *= s),
                (I.positionScreen.x *= r),
                (I.positionScreen.y *= s),
                !0 === X.overdraw &&
                  (tb(H.positionScreen, G.positionScreen),
                  tb(G.positionScreen, I.positionScreen),
                  tb(I.positionScreen, H.positionScreen)),
                Ra.setFromPoints([
                  H.positionScreen,
                  G.positionScreen,
                  I.positionScreen,
                ]),
                !0 === Ua.isIntersectionBox(Ra) &&
                  m(H, G, I, 0, 1, 2, ka, X, a))
              : ka instanceof THREE.RenderableFace4 &&
                ((H = ka.v1),
                (G = ka.v2),
                (I = ka.v3),
                ($ = ka.v4),
                (H.positionScreen.x *= r),
                (H.positionScreen.y *= s),
                (G.positionScreen.x *= r),
                (G.positionScreen.y *= s),
                (I.positionScreen.x *= r),
                (I.positionScreen.y *= s),
                ($.positionScreen.x *= r),
                ($.positionScreen.y *= s),
                D.positionScreen.copy(G.positionScreen),
                L.positionScreen.copy($.positionScreen),
                !0 === X.overdraw &&
                  (tb(H.positionScreen, G.positionScreen),
                  tb(G.positionScreen, $.positionScreen),
                  tb($.positionScreen, H.positionScreen),
                  tb(I.positionScreen, D.positionScreen),
                  tb(I.positionScreen, L.positionScreen)),
                Ra.setFromPoints([
                  H.positionScreen,
                  G.positionScreen,
                  I.positionScreen,
                  $.positionScreen,
                ]),
                !0 === Ua.isIntersectionBox(Ra) &&
                  ((la = H),
                  ($a = G),
                  (Wa = I),
                  (ab = $),
                  (ob = D),
                  (hb = L),
                  (da = a),
                  (f.info.render.vertices += 4),
                  f.info.render.faces++,
                  b(X.opacity),
                  c(X.blending),
                  (void 0 !== X.map && null !== X.map) ||
                  (void 0 !== X.envMap && null !== X.envMap)
                    ? (m(la, $a, ab, 0, 1, 3, ka, X, da),
                      m(ob, Wa, hb, 1, 2, 3, ka, X, da))
                    : ((y = la.positionScreen.x),
                      (J = la.positionScreen.y),
                      (K = $a.positionScreen.x),
                      (R = $a.positionScreen.y),
                      (P = Wa.positionScreen.x),
                      (ca = Wa.positionScreen.y),
                      (xa = ab.positionScreen.x),
                      (M = ab.positionScreen.y),
                      (pa = ob.positionScreen.x),
                      (ya = ob.positionScreen.y),
                      (ua = hb.positionScreen.x),
                      (N = hb.positionScreen.y),
                      X instanceof THREE.MeshLambertMaterial ||
                      X instanceof THREE.MeshPhongMaterial
                        ? (Z.copy(X.color),
                          ga.copy(X.emissive),
                          X.vertexColors === THREE.FaceColors &&
                            ((Z.r *= ka.color.r),
                            (Z.g *= ka.color.g),
                            (Z.b *= ka.color.b)),
                          !0 === Cb
                            ? !1 === X.wireframe &&
                              X.shading == THREE.SmoothShading &&
                              4 == ka.vertexNormalsLength
                              ? ((aa.r = fa.r = V.r = ja.r = Ha.r),
                                (aa.g = fa.g = V.g = ja.g = Ha.g),
                                (aa.b = fa.b = V.b = ja.b = Ha.b),
                                n(
                                  ka.v1.positionWorld,
                                  ka.vertexNormalsWorld[0],
                                  aa
                                ),
                                n(
                                  ka.v2.positionWorld,
                                  ka.vertexNormalsWorld[1],
                                  fa
                                ),
                                n(
                                  ka.v4.positionWorld,
                                  ka.vertexNormalsWorld[3],
                                  V
                                ),
                                n(
                                  ka.v3.positionWorld,
                                  ka.vertexNormalsWorld[2],
                                  ja
                                ),
                                (aa.r = aa.r * Z.r + ga.r),
                                (aa.g = aa.g * Z.g + ga.g),
                                (aa.b = aa.b * Z.b + ga.b),
                                (fa.r = fa.r * Z.r + ga.r),
                                (fa.g = fa.g * Z.g + ga.g),
                                (fa.b = fa.b * Z.b + ga.b),
                                (V.r = V.r * Z.r + ga.r),
                                (V.g = V.g * Z.g + ga.g),
                                (V.b = V.b * Z.b + ga.b),
                                (ja.r = ja.r * Z.r + ga.r),
                                (ja.g = ja.g * Z.g + ga.g),
                                (ja.b = ja.b * Z.b + ga.b),
                                (sa = F(aa, fa, V, ja)),
                                p(y, J, K, R, xa, M),
                                B(y, J, K, R, xa, M, 0, 0, 1, 0, 0, 1, sa),
                                p(pa, ya, P, ca, ua, N),
                                B(pa, ya, P, ca, ua, N, 1, 0, 1, 1, 0, 1, sa))
                              : ((O.r = Ha.r),
                                (O.g = Ha.g),
                                (O.b = Ha.b),
                                n(ka.centroidWorld, ka.normalWorld, O),
                                (O.r = O.r * Z.r + ga.r),
                                (O.g = O.g * Z.g + ga.g),
                                (O.b = O.b * Z.b + ga.b),
                                q(y, J, K, R, P, ca, xa, M),
                                !0 === X.wireframe
                                  ? t(
                                      O,
                                      X.wireframeLinewidth,
                                      X.wireframeLinecap,
                                      X.wireframeLinejoin
                                    )
                                  : u(O))
                            : ((O.r = Z.r + ga.r),
                              (O.g = Z.g + ga.g),
                              (O.b = Z.b + ga.b),
                              q(y, J, K, R, P, ca, xa, M),
                              !0 === X.wireframe
                                ? t(
                                    O,
                                    X.wireframeLinewidth,
                                    X.wireframeLinecap,
                                    X.wireframeLinejoin
                                  )
                                : u(O)))
                        : X instanceof THREE.MeshBasicMaterial
                        ? (O.copy(X.color),
                          X.vertexColors === THREE.FaceColors &&
                            ((O.r *= ka.color.r),
                            (O.g *= ka.color.g),
                            (O.b *= ka.color.b)),
                          q(y, J, K, R, P, ca, xa, M),
                          !0 === X.wireframe
                            ? t(
                                O,
                                X.wireframeLinewidth,
                                X.wireframeLinecap,
                                X.wireframeLinejoin
                              )
                            : u(O))
                        : X instanceof THREE.MeshNormalMaterial
                        ? ((O.r = gb(ka.normalWorld.x)),
                          (O.g = gb(ka.normalWorld.y)),
                          (O.b = gb(ka.normalWorld.z)),
                          q(y, J, K, R, P, ca, xa, M),
                          !0 === X.wireframe
                            ? t(
                                O,
                                X.wireframeLinewidth,
                                X.wireframeLinecap,
                                X.wireframeLinejoin
                              )
                            : u(O))
                        : X instanceof THREE.MeshDepthMaterial &&
                          ((Da = j.near),
                          (Ta = j.far),
                          (aa.r =
                            aa.g =
                            aa.b =
                              1 - Va(la.positionScreen.z, Da, Ta)),
                          (fa.r =
                            fa.g =
                            fa.b =
                              1 - Va($a.positionScreen.z, Da, Ta)),
                          (V.r =
                            V.g =
                            V.b =
                              1 - Va(ab.positionScreen.z, Da, Ta)),
                          (ja.r =
                            ja.g =
                            ja.b =
                              1 - Va(Wa.positionScreen.z, Da, Ta)),
                          (sa = F(aa, fa, V, ja)),
                          p(y, J, K, R, xa, M),
                          B(y, J, K, R, xa, M, 0, 0, 1, 0, 0, 1, sa),
                          p(pa, ya, P, ca, ua, N),
                          B(pa, ya, P, ca, ua, N, 1, 0, 1, 1, 0, 1, sa)))));
          ma.union(Ra);
        }
      }
      l.setTransform(1, 0, 0, 1, 0, 0);
    }
  };
};
THREE.ShaderChunk = {
  fog_pars_fragment:
    "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
  fog_fragment:
    "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
  envmap_pars_fragment:
    "#ifdef USE_ENVMAP\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform float flipEnvMap;\nuniform int combine;\n#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\nuniform bool useRefract;\nuniform float refractionRatio;\n#else\nvarying vec3 vReflect;\n#endif\n#endif",
  envmap_fragment:
    "#ifdef USE_ENVMAP\nvec3 reflectVec;\n#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\nvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\nif ( useRefract ) {\nreflectVec = refract( cameraToVertex, normal, refractionRatio );\n} else { \nreflectVec = reflect( cameraToVertex, normal );\n}\n#else\nreflectVec = vReflect;\n#endif\n#ifdef DOUBLE_SIDED\nfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\nvec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n#else\nvec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n#endif\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\nif ( combine == 1 ) {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );\n} else if ( combine == 2 ) {\ngl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;\n} else {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );\n}\n#endif",
  envmap_pars_vertex:
    "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
  worldpos_vertex:
    "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n#ifdef USE_SKINNING\nvec4 worldPosition = modelMatrix * skinned;\n#endif\n#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\nvec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n#endif\n#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\nvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n#endif\n#endif",
  envmap_vertex:
    "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\nvec3 worldNormal = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;\nworldNormal = normalize( worldNormal );\nvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\nif ( useRefract ) {\nvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n} else {\nvReflect = reflect( cameraToVertex, worldNormal );\n}\n#endif",
  map_particle_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
  map_particle_fragment:
    "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );\n#endif",
  map_pars_vertex:
    "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",
  map_pars_fragment:
    "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
  map_vertex:
    "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
  map_fragment:
    "#ifdef USE_MAP\nvec4 texelColor = texture2D( map, vUv );\n#ifdef GAMMA_INPUT\ntexelColor.xyz *= texelColor.xyz;\n#endif\ngl_FragColor = gl_FragColor * texelColor;\n#endif",
  lightmap_pars_fragment:
    "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
  lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
  lightmap_fragment:
    "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
  lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
  bumpmap_pars_fragment:
    "#ifdef USE_BUMPMAP\nuniform sampler2D bumpMap;\nuniform float bumpScale;\nvec2 dHdxy_fwd() {\nvec2 dSTdx = dFdx( vUv );\nvec2 dSTdy = dFdy( vUv );\nfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\nfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\nfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\nreturn vec2( dBx, dBy );\n}\nvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\nvec3 vSigmaX = dFdx( surf_pos );\nvec3 vSigmaY = dFdy( surf_pos );\nvec3 vN = surf_norm;\nvec3 R1 = cross( vSigmaY, vN );\nvec3 R2 = cross( vN, vSigmaX );\nfloat fDet = dot( vSigmaX, R1 );\nvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\nreturn normalize( abs( fDet ) * surf_norm - vGrad );\n}\n#endif",
  normalmap_pars_fragment:
    "#ifdef USE_NORMALMAP\nuniform sampler2D normalMap;\nuniform vec2 normalScale;\nvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\nvec3 q0 = dFdx( eye_pos.xyz );\nvec3 q1 = dFdy( eye_pos.xyz );\nvec2 st0 = dFdx( vUv.st );\nvec2 st1 = dFdy( vUv.st );\nvec3 S = normalize(  q0 * st1.t - q1 * st0.t );\nvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\nvec3 N = normalize( surf_norm );\nvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\nmapN.xy = normalScale * mapN.xy;\nmat3 tsn = mat3( S, T, N );\nreturn normalize( tsn * mapN );\n}\n#endif",
  specularmap_pars_fragment:
    "#ifdef USE_SPECULARMAP\nuniform sampler2D specularMap;\n#endif",
  specularmap_fragment:
    "float specularStrength;\n#ifdef USE_SPECULARMAP\nvec4 texelSpecular = texture2D( specularMap, vUv );\nspecularStrength = texelSpecular.r;\n#else\nspecularStrength = 1.0;\n#endif",
  lights_lambert_pars_vertex:
    "uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif",
  lights_lambert_vertex:
    "vLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\nvLightBack = vec3( 0.0 );\n#endif\ntransformedNormal = normalize( transformedNormal );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, dirVector );\nvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\ndirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\ndirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n#ifdef DOUBLE_SIDED\nvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n#endif\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\npointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\npointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef DOUBLE_SIDED\nvLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\nspotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\nspotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n#ifdef DOUBLE_SIDED\nvLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nfloat hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\nvLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n#ifdef DOUBLE_SIDED\nvLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n#endif\n}\n#endif\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n#ifdef DOUBLE_SIDED\nvLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n#endif",
  lights_phong_pars_vertex:
    "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvarying vec3 vWorldPosition;\n#endif",
  lights_phong_vertex:
    "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nvSpotLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvWorldPosition = worldPosition.xyz;\n#endif",
  lights_phong_pars_fragment:
    "uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#else\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#else\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvarying vec3 vWorldPosition;\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
  lights_phong_fragment:
    "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#ifdef DOUBLE_SIDED\nnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n#endif\n#ifdef USE_NORMALMAP\nnormal = perturbNormal2Arb( -viewPosition, normal );\n#elif defined( USE_BUMPMAP )\nnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vPointLight[ i ].xyz );\nfloat lDistance = vPointLight[ i ].w;\n#endif\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n#endif\npointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\nvec3 pointHalfVector = normalize( lVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n#else\npointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse  = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vSpotLight[ i ].xyz );\nfloat lDistance = vSpotLight[ i ].w;\n#endif\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dotProduct, 0.0 );\n#endif\nspotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\nvec3 spotHalfVector = normalize( lVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse  = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, dirVector );\n#ifdef WRAP_AROUND\nfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n#endif\ndirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nvec3 hemiDiffuse  = vec3( 0.0 );\nvec3 hemiSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\nhemiDiffuse += diffuse * hemiColor;\nvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\nfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\nfloat hemiSpecularWeightSky = specularStrength * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );\nvec3 lVectorGround = -lVector;\nvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\nfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\nfloat hemiSpecularWeightGround = specularStrength * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat dotProductGround = dot( normal, lVectorGround );\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\nvec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\nhemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n#else\nhemiSpecular += specular * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\ntotalDiffuse += hemiDiffuse;\ntotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
  color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
  color_fragment:
    "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
  color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
  color_vertex:
    "#ifdef USE_COLOR\n#ifdef GAMMA_INPUT\nvColor = color * color;\n#else\nvColor = color;\n#endif\n#endif",
  skinning_pars_vertex:
    "#ifdef USE_SKINNING\n#ifdef BONE_TEXTURE\nuniform sampler2D boneTexture;\nmat4 getBoneMatrix( const in float i ) {\nfloat j = i * 4.0;\nfloat x = mod( j, N_BONE_PIXEL_X );\nfloat y = floor( j / N_BONE_PIXEL_X );\nconst float dx = 1.0 / N_BONE_PIXEL_X;\nconst float dy = 1.0 / N_BONE_PIXEL_Y;\ny = dy * ( y + 0.5 );\nvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\nvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\nvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\nvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\nmat4 bone = mat4( v1, v2, v3, v4 );\nreturn bone;\n}\n#else\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\nmat4 getBoneMatrix( const in float i ) {\nmat4 bone = boneGlobalMatrices[ int(i) ];\nreturn bone;\n}\n#endif\n#endif",
  skinbase_vertex:
    "#ifdef USE_SKINNING\nmat4 boneMatX = getBoneMatrix( skinIndex.x );\nmat4 boneMatY = getBoneMatrix( skinIndex.y );\n#endif",
  skinning_vertex:
    "#ifdef USE_SKINNING\n#ifdef USE_MORPHTARGETS\nvec4 skinVertex = vec4( morphed, 1.0 );\n#else\nvec4 skinVertex = vec4( position, 1.0 );\n#endif\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\n#endif",
  morphtarget_pars_vertex:
    "#ifdef USE_MORPHTARGETS\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[ 8 ];\n#else\nuniform float morphTargetInfluences[ 4 ];\n#endif\n#endif",
  morphtarget_vertex:
    "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n#ifndef USE_MORPHNORMALS\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n#endif\nmorphed += position;\n#endif",
  default_vertex:
    "vec4 mvPosition;\n#ifdef USE_SKINNING\nmvPosition = modelViewMatrix * skinned;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )\nmvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )\nmvPosition = modelViewMatrix * vec4( position, 1.0 );\n#endif\ngl_Position = projectionMatrix * mvPosition;",
  morphnormal_vertex:
    "#ifdef USE_MORPHNORMALS\nvec3 morphedNormal = vec3( 0.0 );\nmorphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\nmorphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\nmorphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\nmorphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\nmorphedNormal += normal;\n#endif",
  skinnormal_vertex:
    "#ifdef USE_SKINNING\nmat4 skinMatrix = skinWeight.x * boneMatX;\nskinMatrix \t+= skinWeight.y * boneMatY;\n#ifdef USE_MORPHNORMALS\nvec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n#else\nvec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n#endif\n#endif",
  defaultnormal_vertex:
    "vec3 objectNormal;\n#ifdef USE_SKINNING\nobjectNormal = skinnedNormal.xyz;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )\nobjectNormal = morphedNormal;\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )\nobjectNormal = normal;\n#endif\n#ifdef FLIP_SIDED\nobjectNormal = -objectNormal;\n#endif\nvec3 transformedNormal = normalMatrix * objectNormal;",
  shadowmap_pars_fragment:
    "#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform vec2 shadowMapSize[ MAX_SHADOWS ];\nuniform float shadowDarkness[ MAX_SHADOWS ];\nuniform float shadowBias[ MAX_SHADOWS ];\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",
  shadowmap_fragment:
    "#ifdef USE_SHADOWMAP\n#ifdef SHADOWMAP_DEBUG\nvec3 frustumColors[3];\nfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\nfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\nfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n#endif\n#ifdef SHADOWMAP_CASCADE\nint inFrustumCount = 0;\n#endif\nfloat fDepth;\nvec3 shadowColor = vec3( 1.0 );\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\nbool inFrustum = all( inFrustumVec );\n#ifdef SHADOWMAP_CASCADE\ninFrustumCount += int( inFrustum );\nbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n#else\nbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n#endif\nbool frustumTest = all( frustumTestVec );\nif ( frustumTest ) {\nshadowCoord.z += shadowBias[ i ];\n#if defined( SHADOWMAP_TYPE_PCF )\nfloat shadow = 0.0;\nconst float shadowDelta = 1.0 / 9.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.25 * xPixelOffset;\nfloat dy0 = -1.25 * yPixelOffset;\nfloat dx1 = 1.25 * xPixelOffset;\nfloat dy1 = 1.25 * yPixelOffset;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\nfloat shadow = 0.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.0 * xPixelOffset;\nfloat dy0 = -1.0 * yPixelOffset;\nfloat dx1 = 1.0 * xPixelOffset;\nfloat dy1 = 1.0 * yPixelOffset;\nmat3 shadowKernel;\nmat3 depthKernel;\ndepthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( depthKernel[0][0] < shadowCoord.z ) shadowKernel[0][0] = 0.25;\nelse shadowKernel[0][0] = 0.0;\ndepthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( depthKernel[0][1] < shadowCoord.z ) shadowKernel[0][1] = 0.25;\nelse shadowKernel[0][1] = 0.0;\ndepthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( depthKernel[0][2] < shadowCoord.z ) shadowKernel[0][2] = 0.25;\nelse shadowKernel[0][2] = 0.0;\ndepthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( depthKernel[1][0] < shadowCoord.z ) shadowKernel[1][0] = 0.25;\nelse shadowKernel[1][0] = 0.0;\ndepthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( depthKernel[1][1] < shadowCoord.z ) shadowKernel[1][1] = 0.25;\nelse shadowKernel[1][1] = 0.0;\ndepthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( depthKernel[1][2] < shadowCoord.z ) shadowKernel[1][2] = 0.25;\nelse shadowKernel[1][2] = 0.0;\ndepthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( depthKernel[2][0] < shadowCoord.z ) shadowKernel[2][0] = 0.25;\nelse shadowKernel[2][0] = 0.0;\ndepthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( depthKernel[2][1] < shadowCoord.z ) shadowKernel[2][1] = 0.25;\nelse shadowKernel[2][1] = 0.0;\ndepthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( depthKernel[2][2] < shadowCoord.z ) shadowKernel[2][2] = 0.25;\nelse shadowKernel[2][2] = 0.0;\nvec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\nshadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\nshadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\nvec4 shadowValues;\nshadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\nshadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\nshadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\nshadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\nshadow = dot( shadowValues, vec4( 1.0 ) );\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n#endif\n}\n#ifdef SHADOWMAP_DEBUG\n#ifdef SHADOWMAP_CASCADE\nif ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n#else\nif ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n#endif\n#endif\n}\n#ifdef GAMMA_OUTPUT\nshadowColor *= shadowColor;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
  shadowmap_pars_vertex:
    "#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",
  shadowmap_vertex:
    "#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n}\n#endif",
  alphatest_fragment:
    "#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",
  linear_to_gamma_fragment:
    "#ifdef GAMMA_OUTPUT\ngl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif",
};
THREE.UniformsUtils = {
  merge: function (a) {
    var b,
      c,
      d,
      e = {};
    for (b = 0; b < a.length; b++)
      for (c in ((d = this.clone(a[b])), d)) e[c] = d[c];
    return e;
  },
  clone: function (a) {
    var b,
      c,
      d,
      e = {};
    for (b in a)
      for (c in ((e[b] = {}), a[b]))
        (d = a[b][c]),
          (e[b][c] =
            d instanceof THREE.Color ||
            d instanceof THREE.Vector2 ||
            d instanceof THREE.Vector3 ||
            d instanceof THREE.Vector4 ||
            d instanceof THREE.Matrix4 ||
            d instanceof THREE.Texture
              ? d.clone()
              : d instanceof Array
              ? d.slice()
              : d);
    return e;
  },
};
THREE.UniformsLib = {
  common: {
    diffuse: { type: "c", value: new THREE.Color(15658734) },
    opacity: { type: "f", value: 1 },
    map: { type: "t", value: null },
    offsetRepeat: { type: "v4", value: new THREE.Vector4(0, 0, 1, 1) },
    lightMap: { type: "t", value: null },
    specularMap: { type: "t", value: null },
    envMap: { type: "t", value: null },
    flipEnvMap: { type: "f", value: -1 },
    useRefract: { type: "i", value: 0 },
    reflectivity: { type: "f", value: 1 },
    refractionRatio: { type: "f", value: 0.98 },
    combine: { type: "i", value: 0 },
    morphTargetInfluences: { type: "f", value: 0 },
  },
  bump: {
    bumpMap: { type: "t", value: null },
    bumpScale: { type: "f", value: 1 },
  },
  normalmap: {
    normalMap: { type: "t", value: null },
    normalScale: { type: "v2", value: new THREE.Vector2(1, 1) },
  },
  fog: {
    fogDensity: { type: "f", value: 2.5e-4 },
    fogNear: { type: "f", value: 1 },
    fogFar: { type: "f", value: 2e3 },
    fogColor: { type: "c", value: new THREE.Color(16777215) },
  },
  lights: {
    ambientLightColor: { type: "fv", value: [] },
    directionalLightDirection: { type: "fv", value: [] },
    directionalLightColor: { type: "fv", value: [] },
    hemisphereLightDirection: { type: "fv", value: [] },
    hemisphereLightSkyColor: { type: "fv", value: [] },
    hemisphereLightGroundColor: { type: "fv", value: [] },
    pointLightColor: { type: "fv", value: [] },
    pointLightPosition: { type: "fv", value: [] },
    pointLightDistance: { type: "fv1", value: [] },
    spotLightColor: { type: "fv", value: [] },
    spotLightPosition: { type: "fv", value: [] },
    spotLightDirection: { type: "fv", value: [] },
    spotLightDistance: { type: "fv1", value: [] },
    spotLightAngleCos: { type: "fv1", value: [] },
    spotLightExponent: { type: "fv1", value: [] },
  },
  particle: {
    psColor: { type: "c", value: new THREE.Color(15658734) },
    opacity: { type: "f", value: 1 },
    size: { type: "f", value: 1 },
    scale: { type: "f", value: 1 },
    map: { type: "t", value: null },
    fogDensity: { type: "f", value: 2.5e-4 },
    fogNear: { type: "f", value: 1 },
    fogFar: { type: "f", value: 2e3 },
    fogColor: { type: "c", value: new THREE.Color(16777215) },
  },
  shadowmap: {
    shadowMap: { type: "tv", value: [] },
    shadowMapSize: { type: "v2v", value: [] },
    shadowBias: { type: "fv1", value: [] },
    shadowDarkness: { type: "fv1", value: [] },
    shadowMatrix: { type: "m4v", value: [] },
  },
};
THREE.ShaderLib = {
  depth: {
    uniforms: {
      mNear: { type: "f", value: 1 },
      mFar: { type: "f", value: 2e3 },
      opacity: { type: "f", value: 1 },
    },
    vertexShader:
      "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
    fragmentShader:
      "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}",
  },
  normal: {
    uniforms: { opacity: { type: "f", value: 1 } },
    vertexShader:
      "varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\ngl_Position = projectionMatrix * mvPosition;\n}",
    fragmentShader:
      "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}",
  },
  basic: {
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.common,
      THREE.UniformsLib.fog,
      THREE.UniformsLib.shadowmap,
    ]),
    vertexShader: [
      THREE.ShaderChunk.map_pars_vertex,
      THREE.ShaderChunk.lightmap_pars_vertex,
      THREE.ShaderChunk.envmap_pars_vertex,
      THREE.ShaderChunk.color_pars_vertex,
      THREE.ShaderChunk.morphtarget_pars_vertex,
      THREE.ShaderChunk.skinning_pars_vertex,
      THREE.ShaderChunk.shadowmap_pars_vertex,
      "void main() {",
      THREE.ShaderChunk.map_vertex,
      THREE.ShaderChunk.lightmap_vertex,
      THREE.ShaderChunk.color_vertex,
      THREE.ShaderChunk.skinbase_vertex,
      "#ifdef USE_ENVMAP",
      THREE.ShaderChunk.morphnormal_vertex,
      THREE.ShaderChunk.skinnormal_vertex,
      THREE.ShaderChunk.defaultnormal_vertex,
      "#endif",
      THREE.ShaderChunk.morphtarget_vertex,
      THREE.ShaderChunk.skinning_vertex,
      THREE.ShaderChunk.default_vertex,
      THREE.ShaderChunk.worldpos_vertex,
      THREE.ShaderChunk.envmap_vertex,
      THREE.ShaderChunk.shadowmap_vertex,
      "}",
    ].join("\n"),
    fragmentShader: [
      "uniform vec3 diffuse;\nuniform float opacity;",
      THREE.ShaderChunk.color_pars_fragment,
      THREE.ShaderChunk.map_pars_fragment,
      THREE.ShaderChunk.lightmap_pars_fragment,
      THREE.ShaderChunk.envmap_pars_fragment,
      THREE.ShaderChunk.fog_pars_fragment,
      THREE.ShaderChunk.shadowmap_pars_fragment,
      THREE.ShaderChunk.specularmap_pars_fragment,
      "void main() {\ngl_FragColor = vec4( diffuse, opacity );",
      THREE.ShaderChunk.map_fragment,
      THREE.ShaderChunk.alphatest_fragment,
      THREE.ShaderChunk.specularmap_fragment,
      THREE.ShaderChunk.lightmap_fragment,
      THREE.ShaderChunk.color_fragment,
      THREE.ShaderChunk.envmap_fragment,
      THREE.ShaderChunk.shadowmap_fragment,
      THREE.ShaderChunk.linear_to_gamma_fragment,
      THREE.ShaderChunk.fog_fragment,
      "}",
    ].join("\n"),
  },
  lambert: {
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.common,
      THREE.UniformsLib.fog,
      THREE.UniformsLib.lights,
      THREE.UniformsLib.shadowmap,
      {
        ambient: { type: "c", value: new THREE.Color(16777215) },
        emissive: { type: "c", value: new THREE.Color(0) },
        wrapRGB: { type: "v3", value: new THREE.Vector3(1, 1, 1) },
      },
    ]),
    vertexShader: [
      "#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif",
      THREE.ShaderChunk.map_pars_vertex,
      THREE.ShaderChunk.lightmap_pars_vertex,
      THREE.ShaderChunk.envmap_pars_vertex,
      THREE.ShaderChunk.lights_lambert_pars_vertex,
      THREE.ShaderChunk.color_pars_vertex,
      THREE.ShaderChunk.morphtarget_pars_vertex,
      THREE.ShaderChunk.skinning_pars_vertex,
      THREE.ShaderChunk.shadowmap_pars_vertex,
      "void main() {",
      THREE.ShaderChunk.map_vertex,
      THREE.ShaderChunk.lightmap_vertex,
      THREE.ShaderChunk.color_vertex,
      THREE.ShaderChunk.morphnormal_vertex,
      THREE.ShaderChunk.skinbase_vertex,
      THREE.ShaderChunk.skinnormal_vertex,
      THREE.ShaderChunk.defaultnormal_vertex,
      THREE.ShaderChunk.morphtarget_vertex,
      THREE.ShaderChunk.skinning_vertex,
      THREE.ShaderChunk.default_vertex,
      THREE.ShaderChunk.worldpos_vertex,
      THREE.ShaderChunk.envmap_vertex,
      THREE.ShaderChunk.lights_lambert_vertex,
      THREE.ShaderChunk.shadowmap_vertex,
      "}",
    ].join("\n"),
    fragmentShader: [
      "uniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif",
      THREE.ShaderChunk.color_pars_fragment,
      THREE.ShaderChunk.map_pars_fragment,
      THREE.ShaderChunk.lightmap_pars_fragment,
      THREE.ShaderChunk.envmap_pars_fragment,
      THREE.ShaderChunk.fog_pars_fragment,
      THREE.ShaderChunk.shadowmap_pars_fragment,
      THREE.ShaderChunk.specularmap_pars_fragment,
      "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );",
      THREE.ShaderChunk.map_fragment,
      THREE.ShaderChunk.alphatest_fragment,
      THREE.ShaderChunk.specularmap_fragment,
      "#ifdef DOUBLE_SIDED\nif ( gl_FrontFacing )\ngl_FragColor.xyz *= vLightFront;\nelse\ngl_FragColor.xyz *= vLightBack;\n#else\ngl_FragColor.xyz *= vLightFront;\n#endif",
      THREE.ShaderChunk.lightmap_fragment,
      THREE.ShaderChunk.color_fragment,
      THREE.ShaderChunk.envmap_fragment,
      THREE.ShaderChunk.shadowmap_fragment,
      THREE.ShaderChunk.linear_to_gamma_fragment,
      THREE.ShaderChunk.fog_fragment,
      "}",
    ].join("\n"),
  },
  phong: {
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.common,
      THREE.UniformsLib.bump,
      THREE.UniformsLib.normalmap,
      THREE.UniformsLib.fog,
      THREE.UniformsLib.lights,
      THREE.UniformsLib.shadowmap,
      {
        ambient: { type: "c", value: new THREE.Color(16777215) },
        emissive: { type: "c", value: new THREE.Color(0) },
        specular: { type: "c", value: new THREE.Color(1118481) },
        shininess: { type: "f", value: 30 },
        wrapRGB: { type: "v3", value: new THREE.Vector3(1, 1, 1) },
      },
    ]),
    vertexShader: [
      "#define PHONG\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
      THREE.ShaderChunk.map_pars_vertex,
      THREE.ShaderChunk.lightmap_pars_vertex,
      THREE.ShaderChunk.envmap_pars_vertex,
      THREE.ShaderChunk.lights_phong_pars_vertex,
      THREE.ShaderChunk.color_pars_vertex,
      THREE.ShaderChunk.morphtarget_pars_vertex,
      THREE.ShaderChunk.skinning_pars_vertex,
      THREE.ShaderChunk.shadowmap_pars_vertex,
      "void main() {",
      THREE.ShaderChunk.map_vertex,
      THREE.ShaderChunk.lightmap_vertex,
      THREE.ShaderChunk.color_vertex,
      THREE.ShaderChunk.morphnormal_vertex,
      THREE.ShaderChunk.skinbase_vertex,
      THREE.ShaderChunk.skinnormal_vertex,
      THREE.ShaderChunk.defaultnormal_vertex,
      "vNormal = normalize( transformedNormal );",
      THREE.ShaderChunk.morphtarget_vertex,
      THREE.ShaderChunk.skinning_vertex,
      THREE.ShaderChunk.default_vertex,
      "vViewPosition = -mvPosition.xyz;",
      THREE.ShaderChunk.worldpos_vertex,
      THREE.ShaderChunk.envmap_vertex,
      THREE.ShaderChunk.lights_phong_vertex,
      THREE.ShaderChunk.shadowmap_vertex,
      "}",
    ].join("\n"),
    fragmentShader: [
      "uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;",
      THREE.ShaderChunk.color_pars_fragment,
      THREE.ShaderChunk.map_pars_fragment,
      THREE.ShaderChunk.lightmap_pars_fragment,
      THREE.ShaderChunk.envmap_pars_fragment,
      THREE.ShaderChunk.fog_pars_fragment,
      THREE.ShaderChunk.lights_phong_pars_fragment,
      THREE.ShaderChunk.shadowmap_pars_fragment,
      THREE.ShaderChunk.bumpmap_pars_fragment,
      THREE.ShaderChunk.normalmap_pars_fragment,
      THREE.ShaderChunk.specularmap_pars_fragment,
      "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );",
      THREE.ShaderChunk.map_fragment,
      THREE.ShaderChunk.alphatest_fragment,
      THREE.ShaderChunk.specularmap_fragment,
      THREE.ShaderChunk.lights_phong_fragment,
      THREE.ShaderChunk.lightmap_fragment,
      THREE.ShaderChunk.color_fragment,
      THREE.ShaderChunk.envmap_fragment,
      THREE.ShaderChunk.shadowmap_fragment,
      THREE.ShaderChunk.linear_to_gamma_fragment,
      THREE.ShaderChunk.fog_fragment,
      "}",
    ].join("\n"),
  },
  particle_basic: {
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.particle,
      THREE.UniformsLib.shadowmap,
    ]),
    vertexShader: [
      "uniform float size;\nuniform float scale;",
      THREE.ShaderChunk.color_pars_vertex,
      THREE.ShaderChunk.shadowmap_pars_vertex,
      "void main() {",
      THREE.ShaderChunk.color_vertex,
      "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;",
      THREE.ShaderChunk.worldpos_vertex,
      THREE.ShaderChunk.shadowmap_vertex,
      "}",
    ].join("\n"),
    fragmentShader: [
      "uniform vec3 psColor;\nuniform float opacity;",
      THREE.ShaderChunk.color_pars_fragment,
      THREE.ShaderChunk.map_particle_pars_fragment,
      THREE.ShaderChunk.fog_pars_fragment,
      THREE.ShaderChunk.shadowmap_pars_fragment,
      "void main() {\ngl_FragColor = vec4( psColor, opacity );",
      THREE.ShaderChunk.map_particle_fragment,
      THREE.ShaderChunk.alphatest_fragment,
      THREE.ShaderChunk.color_fragment,
      THREE.ShaderChunk.shadowmap_fragment,
      THREE.ShaderChunk.fog_fragment,
      "}",
    ].join("\n"),
  },
  dashed: {
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.common,
      THREE.UniformsLib.fog,
      {
        scale: { type: "f", value: 1 },
        dashSize: { type: "f", value: 1 },
        totalSize: { type: "f", value: 2 },
      },
    ]),
    vertexShader: [
      "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;",
      THREE.ShaderChunk.color_pars_vertex,
      "void main() {",
      THREE.ShaderChunk.color_vertex,
      "vLineDistance = scale * lineDistance;\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\n}",
    ].join("\n"),
    fragmentShader: [
      "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;",
      THREE.ShaderChunk.color_pars_fragment,
      THREE.ShaderChunk.fog_pars_fragment,
      "void main() {\nif ( mod( vLineDistance, totalSize ) > dashSize ) {\ndiscard;\n}\ngl_FragColor = vec4( diffuse, opacity );",
      THREE.ShaderChunk.color_fragment,
      THREE.ShaderChunk.fog_fragment,
      "}",
    ].join("\n"),
  },
  depthRGBA: {
    uniforms: {},
    vertexShader: [
      THREE.ShaderChunk.morphtarget_pars_vertex,
      THREE.ShaderChunk.skinning_pars_vertex,
      "void main() {",
      THREE.ShaderChunk.skinbase_vertex,
      THREE.ShaderChunk.morphtarget_vertex,
      THREE.ShaderChunk.skinning_vertex,
      THREE.ShaderChunk.default_vertex,
      "}",
    ].join("\n"),
    fragmentShader:
      "vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}",
  },
};
THREE.WebGLRenderer = function (a) {
  function b(a) {
    if (a.__webglCustomAttributesList)
      for (var b in a.__webglCustomAttributesList)
        j.deleteBuffer(a.__webglCustomAttributesList[b].buffer);
  }
  function c(a, b) {
    var c = a.vertices.length,
      d = b.material;
    if (d.attributes) {
      void 0 === a.__webglCustomAttributesList &&
        (a.__webglCustomAttributesList = []);
      for (var e in d.attributes) {
        var f = d.attributes[e];
        if (!f.__webglInitialized || f.createUniqueBuffers) {
          f.__webglInitialized = !0;
          var g = 1;
          "v2" === f.type
            ? (g = 2)
            : "v3" === f.type
            ? (g = 3)
            : "v4" === f.type
            ? (g = 4)
            : "c" === f.type && (g = 3);
          f.size = g;
          f.array = new Float32Array(c * g);
          f.buffer = j.createBuffer();
          f.buffer.belongsToAttribute = e;
          f.needsUpdate = !0;
        }
        a.__webglCustomAttributesList.push(f);
      }
    }
  }
  function d(a, b) {
    var c = b.geometry,
      d = a.faces3,
      h = a.faces4,
      i = 3 * d.length + 4 * h.length,
      k = 1 * d.length + 2 * h.length,
      h = 3 * d.length + 4 * h.length,
      d = e(b, a),
      n = g(d),
      m = f(d),
      l = d.vertexColors ? d.vertexColors : !1;
    a.__vertexArray = new Float32Array(3 * i);
    m && (a.__normalArray = new Float32Array(3 * i));
    c.hasTangents && (a.__tangentArray = new Float32Array(4 * i));
    l && (a.__colorArray = new Float32Array(3 * i));
    if (n) {
      if (0 < c.faceUvs.length || 0 < c.faceVertexUvs.length)
        a.__uvArray = new Float32Array(2 * i);
      if (1 < c.faceUvs.length || 1 < c.faceVertexUvs.length)
        a.__uv2Array = new Float32Array(2 * i);
    }
    b.geometry.skinWeights.length &&
      b.geometry.skinIndices.length &&
      ((a.__skinIndexArray = new Float32Array(4 * i)),
      (a.__skinWeightArray = new Float32Array(4 * i)));
    a.__faceArray = new Uint16Array(3 * k);
    a.__lineArray = new Uint16Array(2 * h);
    if (a.numMorphTargets) {
      a.__morphTargetsArrays = [];
      c = 0;
      for (n = a.numMorphTargets; c < n; c++)
        a.__morphTargetsArrays.push(new Float32Array(3 * i));
    }
    if (a.numMorphNormals) {
      a.__morphNormalsArrays = [];
      c = 0;
      for (n = a.numMorphNormals; c < n; c++)
        a.__morphNormalsArrays.push(new Float32Array(3 * i));
    }
    a.__webglFaceCount = 3 * k;
    a.__webglLineCount = 2 * h;
    if (d.attributes) {
      void 0 === a.__webglCustomAttributesList &&
        (a.__webglCustomAttributesList = []);
      for (var p in d.attributes) {
        var k = d.attributes[p],
          c = {},
          r;
        for (r in k) c[r] = k[r];
        if (!c.__webglInitialized || c.createUniqueBuffers)
          (c.__webglInitialized = !0),
            (h = 1),
            "v2" === c.type
              ? (h = 2)
              : "v3" === c.type
              ? (h = 3)
              : "v4" === c.type
              ? (h = 4)
              : "c" === c.type && (h = 3),
            (c.size = h),
            (c.array = new Float32Array(i * h)),
            (c.buffer = j.createBuffer()),
            (c.buffer.belongsToAttribute = p),
            (k.needsUpdate = !0),
            (c.__original = k);
        a.__webglCustomAttributesList.push(c);
      }
    }
    a.__inittedArrays = !0;
  }
  function e(a, b) {
    return a.material instanceof THREE.MeshFaceMaterial
      ? a.material.materials[b.materialIndex]
      : a.material;
  }
  function f(a) {
    return (a instanceof THREE.MeshBasicMaterial && !a.envMap) ||
      a instanceof THREE.MeshDepthMaterial
      ? !1
      : a && void 0 !== a.shading && a.shading === THREE.SmoothShading
      ? THREE.SmoothShading
      : THREE.FlatShading;
  }
  function g(a) {
    return a.map ||
      a.lightMap ||
      a.bumpMap ||
      a.normalMap ||
      a.specularMap ||
      a instanceof THREE.ShaderMaterial
      ? !0
      : !1;
  }
  function h(a) {
    var b, c, d;
    for (b in a.attributes)
      (d = "index" === b ? j.ELEMENT_ARRAY_BUFFER : j.ARRAY_BUFFER),
        (c = a.attributes[b]),
        (c.buffer = j.createBuffer()),
        j.bindBuffer(d, c.buffer),
        j.bufferData(d, c.array, j.STATIC_DRAW);
  }
  function i(a, b, c) {
    var d = a.attributes,
      e = d.index,
      f = d.position,
      g = d.normal,
      h = d.uv,
      i = d.color,
      d = d.tangent;
    a.elementsNeedUpdate &&
      void 0 !== e &&
      (j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, e.buffer),
      j.bufferData(j.ELEMENT_ARRAY_BUFFER, e.array, b));
    a.verticesNeedUpdate &&
      void 0 !== f &&
      (j.bindBuffer(j.ARRAY_BUFFER, f.buffer),
      j.bufferData(j.ARRAY_BUFFER, f.array, b));
    a.normalsNeedUpdate &&
      void 0 !== g &&
      (j.bindBuffer(j.ARRAY_BUFFER, g.buffer),
      j.bufferData(j.ARRAY_BUFFER, g.array, b));
    a.uvsNeedUpdate &&
      void 0 !== h &&
      (j.bindBuffer(j.ARRAY_BUFFER, h.buffer),
      j.bufferData(j.ARRAY_BUFFER, h.array, b));
    a.colorsNeedUpdate &&
      void 0 !== i &&
      (j.bindBuffer(j.ARRAY_BUFFER, i.buffer),
      j.bufferData(j.ARRAY_BUFFER, i.array, b));
    a.tangentsNeedUpdate &&
      void 0 !== d &&
      (j.bindBuffer(j.ARRAY_BUFFER, d.buffer),
      j.bufferData(j.ARRAY_BUFFER, d.array, b));
    if (c) for (var k in a.attributes) delete a.attributes[k].array;
  }
  function k(a) {
    Za[a] || (j.enableVertexAttribArray(a), (Za[a] = !0));
  }
  function n() {
    for (var a in Za) Za[a] && (j.disableVertexAttribArray(a), (Za[a] = !1));
  }
  function p(a, b) {
    return a.z !== b.z ? b.z - a.z : b.id - a.id;
  }
  function m(a, b) {
    return b[0] - a[0];
  }
  function r(a, b, c) {
    if (a.length)
      for (var d = 0, e = a.length; d < e; d++)
        (ga = fa = null),
          (ja = Z = Ta = Da = pb = eb = sa = -1),
          (Va = !0),
          a[d].render(b, c, fb, Oa),
          (ga = fa = null),
          (ja = Z = Ta = Da = pb = eb = sa = -1),
          (Va = !0);
  }
  function s(a, b, c, d, e, f, g, h) {
    var j, i, k, n;
    b ? ((i = a.length - 1), (n = b = -1)) : ((i = 0), (b = a.length), (n = 1));
    for (var m = i; m !== b; m += n)
      if (((j = a[m]), j.render)) {
        i = j.object;
        k = j.buffer;
        if (h) j = h;
        else {
          j = j[c];
          if (!j) continue;
          g &&
            N.setBlending(j.blending, j.blendEquation, j.blendSrc, j.blendDst);
          N.setDepthTest(j.depthTest);
          N.setDepthWrite(j.depthWrite);
          G(j.polygonOffset, j.polygonOffsetFactor, j.polygonOffsetUnits);
        }
        N.setMaterialFaces(j);
        k instanceof THREE.BufferGeometry
          ? N.renderBufferDirect(d, e, f, j, k, i)
          : N.renderBuffer(d, e, f, j, k, i);
      }
  }
  function l(a, b, c, d, e, f, g) {
    for (var h, j, i = 0, k = a.length; i < k; i++)
      if (((h = a[i]), (j = h.object), j.visible)) {
        if (g) h = g;
        else {
          h = h[b];
          if (!h) continue;
          f &&
            N.setBlending(h.blending, h.blendEquation, h.blendSrc, h.blendDst);
          N.setDepthTest(h.depthTest);
          N.setDepthWrite(h.depthWrite);
          G(h.polygonOffset, h.polygonOffsetFactor, h.polygonOffsetUnits);
        }
        N.renderImmediateObject(c, d, e, h, j);
      }
  }
  function q(a, b, c) {
    a.push({ buffer: b, object: c, opaque: null, transparent: null });
  }
  function u(a) {
    for (var b in a.attributes) if (a.attributes[b].needsUpdate) return !0;
    return !1;
  }
  function B(a) {
    for (var b in a.attributes) a.attributes[b].needsUpdate = !1;
  }
  function x(a, b) {
    for (var c = a.length - 1; 0 <= c; c--) a[c].object === b && a.splice(c, 1);
  }
  function t(a, b) {
    for (var c = a.length - 1; 0 <= c; c--) a[c] === b && a.splice(c, 1);
  }
  function F(a, b, c, d, e) {
    za = 0;
    d.needsUpdate &&
      (d.program && hb(d), N.initMaterial(d, b, c, e), (d.needsUpdate = !1));
    d.morphTargets &&
      !e.__webglMorphTargetInfluences &&
      (e.__webglMorphTargetInfluences = new Float32Array(N.maxMorphTargets));
    var f = !1,
      g = d.program,
      h = g.uniforms,
      i = d.uniforms;
    g !== fa && (j.useProgram(g), (fa = g), (f = !0));
    d.id !== ja && ((ja = d.id), (f = !0));
    if (f || a !== ga)
      j.uniformMatrix4fv(h.projectionMatrix, !1, a.projectionMatrix.elements),
        a !== ga && (ga = a);
    if (d.skinning)
      if (gb && e.useVertexTexture) {
        if (null !== h.boneTexture) {
          var k = C();
          j.uniform1i(h.boneTexture, k);
          N.setTexture(e.boneTexture, k);
        }
      } else
        null !== h.boneGlobalMatrices &&
          j.uniformMatrix4fv(h.boneGlobalMatrices, !1, e.boneMatrices);
    if (f) {
      c &&
        d.fog &&
        ((i.fogColor.value = c.color),
        c instanceof THREE.Fog
          ? ((i.fogNear.value = c.near), (i.fogFar.value = c.far))
          : c instanceof THREE.FogExp2 && (i.fogDensity.value = c.density));
      if (
        d instanceof THREE.MeshPhongMaterial ||
        d instanceof THREE.MeshLambertMaterial ||
        d.lights
      ) {
        if (Va) {
          for (
            var n,
              m = (k = 0),
              l = 0,
              p,
              r,
              s,
              q = Jc,
              t = q.directional.colors,
              u = q.directional.positions,
              x = q.point.colors,
              y = q.point.positions,
              B = q.point.distances,
              A = q.spot.colors,
              F = q.spot.positions,
              G = q.spot.distances,
              O = q.spot.directions,
              I = q.spot.anglesCos,
              L = q.spot.exponents,
              V = q.hemi.skyColors,
              M = q.hemi.groundColors,
              Z = q.hemi.positions,
              aa = 0,
              R = 0,
              P = 0,
              X = 0,
              $ = 0,
              la = 0,
              ka = 0,
              ca = 0,
              W = (n = 0),
              c = (s = W = 0),
              f = b.length;
            c < f;
            c++
          )
            (n = b[c]),
              n.onlyShadow ||
                ((p = n.color),
                (r = n.intensity),
                (s = n.distance),
                n instanceof THREE.AmbientLight
                  ? n.visible &&
                    (N.gammaInput
                      ? ((k += p.r * p.r), (m += p.g * p.g), (l += p.b * p.b))
                      : ((k += p.r), (m += p.g), (l += p.b)))
                  : n instanceof THREE.DirectionalLight
                  ? (($ += 1),
                    n.visible &&
                      (Ea.copy(n.matrixWorld.getPosition()),
                      Ea.subSelf(n.target.matrixWorld.getPosition()),
                      Ea.normalize(),
                      (0 === Ea.x && 0 === Ea.y && 0 === Ea.z) ||
                        ((n = 3 * aa),
                        (u[n] = Ea.x),
                        (u[n + 1] = Ea.y),
                        (u[n + 2] = Ea.z),
                        N.gammaInput ? z(t, n, p, r * r) : H(t, n, p, r),
                        (aa += 1))))
                  : n instanceof THREE.PointLight
                  ? ((la += 1),
                    n.visible &&
                      ((W = 3 * R),
                      N.gammaInput ? z(x, W, p, r * r) : H(x, W, p, r),
                      (r = n.matrixWorld.getPosition()),
                      (y[W] = r.x),
                      (y[W + 1] = r.y),
                      (y[W + 2] = r.z),
                      (B[R] = s),
                      (R += 1)))
                  : n instanceof THREE.SpotLight
                  ? ((ka += 1),
                    n.visible &&
                      ((W = 3 * P),
                      N.gammaInput ? z(A, W, p, r * r) : H(A, W, p, r),
                      (r = n.matrixWorld.getPosition()),
                      (F[W] = r.x),
                      (F[W + 1] = r.y),
                      (F[W + 2] = r.z),
                      (G[P] = s),
                      Ea.copy(r),
                      Ea.subSelf(n.target.matrixWorld.getPosition()),
                      Ea.normalize(),
                      (O[W] = Ea.x),
                      (O[W + 1] = Ea.y),
                      (O[W + 2] = Ea.z),
                      (I[P] = Math.cos(n.angle)),
                      (L[P] = n.exponent),
                      (P += 1)))
                  : n instanceof THREE.HemisphereLight &&
                    ((ca += 1),
                    n.visible &&
                      (Ea.copy(n.matrixWorld.getPosition()),
                      Ea.normalize(),
                      (0 === Ea.x && 0 === Ea.y && 0 === Ea.z) ||
                        ((s = 3 * X),
                        (Z[s] = Ea.x),
                        (Z[s + 1] = Ea.y),
                        (Z[s + 2] = Ea.z),
                        (p = n.color),
                        (n = n.groundColor),
                        N.gammaInput
                          ? ((r *= r), z(V, s, p, r), z(M, s, n, r))
                          : (H(V, s, p, r), H(M, s, n, r)),
                        (X += 1)))));
          c = 3 * aa;
          for (f = Math.max(t.length, 3 * $); c < f; c++) t[c] = 0;
          c = 3 * R;
          for (f = Math.max(x.length, 3 * la); c < f; c++) x[c] = 0;
          c = 3 * P;
          for (f = Math.max(A.length, 3 * ka); c < f; c++) A[c] = 0;
          c = 3 * X;
          for (f = Math.max(V.length, 3 * ca); c < f; c++) V[c] = 0;
          c = 3 * X;
          for (f = Math.max(M.length, 3 * ca); c < f; c++) M[c] = 0;
          q.directional.length = aa;
          q.point.length = R;
          q.spot.length = P;
          q.hemi.length = X;
          q.ambient[0] = k;
          q.ambient[1] = m;
          q.ambient[2] = l;
          Va = !1;
        }
        c = Jc;
        i.ambientLightColor.value = c.ambient;
        i.directionalLightColor.value = c.directional.colors;
        i.directionalLightDirection.value = c.directional.positions;
        i.pointLightColor.value = c.point.colors;
        i.pointLightPosition.value = c.point.positions;
        i.pointLightDistance.value = c.point.distances;
        i.spotLightColor.value = c.spot.colors;
        i.spotLightPosition.value = c.spot.positions;
        i.spotLightDistance.value = c.spot.distances;
        i.spotLightDirection.value = c.spot.directions;
        i.spotLightAngleCos.value = c.spot.anglesCos;
        i.spotLightExponent.value = c.spot.exponents;
        i.hemisphereLightSkyColor.value = c.hemi.skyColors;
        i.hemisphereLightGroundColor.value = c.hemi.groundColors;
        i.hemisphereLightDirection.value = c.hemi.positions;
      }
      if (
        d instanceof THREE.MeshBasicMaterial ||
        d instanceof THREE.MeshLambertMaterial ||
        d instanceof THREE.MeshPhongMaterial
      ) {
        i.opacity.value = d.opacity;
        N.gammaInput
          ? i.diffuse.value.copyGammaToLinear(d.color)
          : (i.diffuse.value = d.color);
        i.map.value = d.map;
        i.lightMap.value = d.lightMap;
        i.specularMap.value = d.specularMap;
        d.bumpMap &&
          ((i.bumpMap.value = d.bumpMap), (i.bumpScale.value = d.bumpScale));
        d.normalMap &&
          ((i.normalMap.value = d.normalMap),
          i.normalScale.value.copy(d.normalScale));
        var oa;
        d.map
          ? (oa = d.map)
          : d.specularMap
          ? (oa = d.specularMap)
          : d.normalMap
          ? (oa = d.normalMap)
          : d.bumpMap && (oa = d.bumpMap);
        void 0 !== oa &&
          ((c = oa.offset),
          (oa = oa.repeat),
          i.offsetRepeat.value.set(c.x, c.y, oa.x, oa.y));
        i.envMap.value = d.envMap;
        i.flipEnvMap.value =
          d.envMap instanceof THREE.WebGLRenderTargetCube ? 1 : -1;
        i.reflectivity.value = d.reflectivity;
        i.refractionRatio.value = d.refractionRatio;
        i.combine.value = d.combine;
        i.useRefract.value =
          d.envMap && d.envMap.mapping instanceof THREE.CubeRefractionMapping;
      }
      d instanceof THREE.LineBasicMaterial
        ? ((i.diffuse.value = d.color), (i.opacity.value = d.opacity))
        : d instanceof THREE.LineDashedMaterial
        ? ((i.diffuse.value = d.color),
          (i.opacity.value = d.opacity),
          (i.dashSize.value = d.dashSize),
          (i.totalSize.value = d.dashSize + d.gapSize),
          (i.scale.value = d.scale))
        : d instanceof THREE.ParticleBasicMaterial
        ? ((i.psColor.value = d.color),
          (i.opacity.value = d.opacity),
          (i.size.value = d.size),
          (i.scale.value = K.height / 2),
          (i.map.value = d.map))
        : d instanceof THREE.MeshPhongMaterial
        ? ((i.shininess.value = d.shininess),
          N.gammaInput
            ? (i.ambient.value.copyGammaToLinear(d.ambient),
              i.emissive.value.copyGammaToLinear(d.emissive),
              i.specular.value.copyGammaToLinear(d.specular))
            : ((i.ambient.value = d.ambient),
              (i.emissive.value = d.emissive),
              (i.specular.value = d.specular)),
          d.wrapAround && i.wrapRGB.value.copy(d.wrapRGB))
        : d instanceof THREE.MeshLambertMaterial
        ? (N.gammaInput
            ? (i.ambient.value.copyGammaToLinear(d.ambient),
              i.emissive.value.copyGammaToLinear(d.emissive))
            : ((i.ambient.value = d.ambient), (i.emissive.value = d.emissive)),
          d.wrapAround && i.wrapRGB.value.copy(d.wrapRGB))
        : d instanceof THREE.MeshDepthMaterial
        ? ((i.mNear.value = a.near),
          (i.mFar.value = a.far),
          (i.opacity.value = d.opacity))
        : d instanceof THREE.MeshNormalMaterial &&
          (i.opacity.value = d.opacity);
      if (e.receiveShadow && !d._shadowPass && i.shadowMatrix) {
        c = oa = 0;
        for (f = b.length; c < f; c++)
          if (
            ((k = b[c]),
            k.castShadow &&
              (k instanceof THREE.SpotLight ||
                (k instanceof THREE.DirectionalLight && !k.shadowCascade)))
          )
            (i.shadowMap.value[oa] = k.shadowMap),
              (i.shadowMapSize.value[oa] = k.shadowMapSize),
              (i.shadowMatrix.value[oa] = k.shadowMatrix),
              (i.shadowDarkness.value[oa] = k.shadowDarkness),
              (i.shadowBias.value[oa] = k.shadowBias),
              oa++;
      }
      b = d.uniformsList;
      i = 0;
      for (oa = b.length; i < oa; i++)
        if ((f = g.uniforms[b[i][1]]))
          if (((c = b[i][0]), (m = c.type), (k = c.value), "i" === m))
            j.uniform1i(f, k);
          else if ("f" === m) j.uniform1f(f, k);
          else if ("v2" === m) j.uniform2f(f, k.x, k.y);
          else if ("v3" === m) j.uniform3f(f, k.x, k.y, k.z);
          else if ("v4" === m) j.uniform4f(f, k.x, k.y, k.z, k.w);
          else if ("c" === m) j.uniform3f(f, k.r, k.g, k.b);
          else if ("iv1" === m) j.uniform1iv(f, k);
          else if ("iv" === m) j.uniform3iv(f, k);
          else if ("fv1" === m) j.uniform1fv(f, k);
          else if ("fv" === m) j.uniform3fv(f, k);
          else if ("v2v" === m) {
            void 0 === c._array && (c._array = new Float32Array(2 * k.length));
            m = 0;
            for (l = k.length; m < l; m++)
              (q = 2 * m), (c._array[q] = k[m].x), (c._array[q + 1] = k[m].y);
            j.uniform2fv(f, c._array);
          } else if ("v3v" === m) {
            void 0 === c._array && (c._array = new Float32Array(3 * k.length));
            m = 0;
            for (l = k.length; m < l; m++)
              (q = 3 * m),
                (c._array[q] = k[m].x),
                (c._array[q + 1] = k[m].y),
                (c._array[q + 2] = k[m].z);
            j.uniform3fv(f, c._array);
          } else if ("v4v" === m) {
            void 0 === c._array && (c._array = new Float32Array(4 * k.length));
            m = 0;
            for (l = k.length; m < l; m++)
              (q = 4 * m),
                (c._array[q] = k[m].x),
                (c._array[q + 1] = k[m].y),
                (c._array[q + 2] = k[m].z),
                (c._array[q + 3] = k[m].w);
            j.uniform4fv(f, c._array);
          } else if ("m4" === m)
            void 0 === c._array && (c._array = new Float32Array(16)),
              k.flattenToArray(c._array),
              j.uniformMatrix4fv(f, !1, c._array);
          else if ("m4v" === m) {
            void 0 === c._array && (c._array = new Float32Array(16 * k.length));
            m = 0;
            for (l = k.length; m < l; m++)
              k[m].flattenToArrayOffset(c._array, 16 * m);
            j.uniformMatrix4fv(f, !1, c._array);
          } else if ("t" === m) {
            if (((q = k), (k = C()), j.uniform1i(f, k), q))
              if (q.image instanceof Array && 6 === q.image.length) {
                if (((c = q), (f = k), 6 === c.image.length))
                  if (c.needsUpdate) {
                    c.image.__webglTextureCube ||
                      ((c.image.__webglTextureCube = j.createTexture()),
                      N.info.memory.textures++);
                    j.activeTexture(j.TEXTURE0 + f);
                    j.bindTexture(
                      j.TEXTURE_CUBE_MAP,
                      c.image.__webglTextureCube
                    );
                    j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL, c.flipY);
                    f = c instanceof THREE.CompressedTexture;
                    k = [];
                    for (m = 0; 6 > m; m++)
                      N.autoScaleCubemaps && !f
                        ? ((l = k),
                          (q = m),
                          (t = c.image[m]),
                          (x = bd),
                          (t.width <= x && t.height <= x) ||
                            ((y = Math.max(t.width, t.height)),
                            (u = Math.floor((t.width * x) / y)),
                            (x = Math.floor((t.height * x) / y)),
                            (y = document.createElement("canvas")),
                            (y.width = u),
                            (y.height = x),
                            y
                              .getContext("2d")
                              .drawImage(
                                t,
                                0,
                                0,
                                t.width,
                                t.height,
                                0,
                                0,
                                u,
                                x
                              ),
                            (t = y)),
                          (l[q] = t))
                        : (k[m] = c.image[m]);
                    m = k[0];
                    l =
                      0 === (m.width & (m.width - 1)) &&
                      0 === (m.height & (m.height - 1));
                    q = J(c.format);
                    t = J(c.type);
                    D(j.TEXTURE_CUBE_MAP, c, l);
                    for (m = 0; 6 > m; m++)
                      if (f) {
                        x = k[m].mipmaps;
                        y = 0;
                        for (B = x.length; y < B; y++)
                          (u = x[y]),
                            j.compressedTexImage2D(
                              j.TEXTURE_CUBE_MAP_POSITIVE_X + m,
                              y,
                              q,
                              u.width,
                              u.height,
                              0,
                              u.data
                            );
                      } else
                        j.texImage2D(
                          j.TEXTURE_CUBE_MAP_POSITIVE_X + m,
                          0,
                          q,
                          q,
                          t,
                          k[m]
                        );
                    c.generateMipmaps &&
                      l &&
                      j.generateMipmap(j.TEXTURE_CUBE_MAP);
                    c.needsUpdate = !1;
                    if (c.onUpdate) c.onUpdate();
                  } else
                    j.activeTexture(j.TEXTURE0 + f),
                      j.bindTexture(
                        j.TEXTURE_CUBE_MAP,
                        c.image.__webglTextureCube
                      );
              } else
                q instanceof THREE.WebGLRenderTargetCube
                  ? ((c = q),
                    j.activeTexture(j.TEXTURE0 + k),
                    j.bindTexture(j.TEXTURE_CUBE_MAP, c.__webglTexture))
                  : N.setTexture(q, k);
          } else if ("tv" === m) {
            void 0 === c._array && (c._array = []);
            m = 0;
            for (l = c.value.length; m < l; m++) c._array[m] = C();
            j.uniform1iv(f, c._array);
            m = 0;
            for (l = c.value.length; m < l; m++)
              (q = c.value[m]), (k = c._array[m]), q && N.setTexture(q, k);
          }
      if (
        (d instanceof THREE.ShaderMaterial ||
          d instanceof THREE.MeshPhongMaterial ||
          d.envMap) &&
        null !== h.cameraPosition
      )
        (b = a.matrixWorld.getPosition()),
          j.uniform3f(h.cameraPosition, b.x, b.y, b.z);
      (d instanceof THREE.MeshPhongMaterial ||
        d instanceof THREE.MeshLambertMaterial ||
        d instanceof THREE.ShaderMaterial ||
        d.skinning) &&
        null !== h.viewMatrix &&
        j.uniformMatrix4fv(h.viewMatrix, !1, a.matrixWorldInverse.elements);
    }
    j.uniformMatrix4fv(h.modelViewMatrix, !1, e._modelViewMatrix.elements);
    h.normalMatrix &&
      j.uniformMatrix3fv(h.normalMatrix, !1, e._normalMatrix.elements);
    null !== h.modelMatrix &&
      j.uniformMatrix4fv(h.modelMatrix, !1, e.matrixWorld.elements);
    return g;
  }
  function C() {
    var a = za;
    a >= Lc &&
      console.warn(
        "WebGLRenderer: trying to use " +
          a +
          " texture units while this GPU supports only " +
          Lc
      );
    za += 1;
    return a;
  }
  function A(a, b) {
    a._modelViewMatrix.multiply(b.matrixWorldInverse, a.matrixWorld);
    a._normalMatrix.getInverse(a._modelViewMatrix);
    a._normalMatrix.transpose();
  }
  function z(a, b, c, d) {
    a[b] = c.r * c.r * d;
    a[b + 1] = c.g * c.g * d;
    a[b + 2] = c.b * c.b * d;
  }
  function H(a, b, c, d) {
    a[b] = c.r * d;
    a[b + 1] = c.g * d;
    a[b + 2] = c.b * d;
  }
  function G(a, b, c) {
    jc !== a &&
      (a ? j.enable(j.POLYGON_OFFSET_FILL) : j.disable(j.POLYGON_OFFSET_FILL),
      (jc = a));
    if (a && (Lb !== b || Ua !== c)) j.polygonOffset(b, c), (Lb = b), (Ua = c);
  }
  function I(a) {
    for (var a = a.split("\n"), b = 0, c = a.length; b < c; b++)
      a[b] = b + 1 + ": " + a[b];
    return a.join("\n");
  }
  function $(a, b) {
    var c;
    "fragment" === a
      ? (c = j.createShader(j.FRAGMENT_SHADER))
      : "vertex" === a && (c = j.createShader(j.VERTEX_SHADER));
    j.shaderSource(c, b);
    j.compileShader(c);
    return !j.getShaderParameter(c, j.COMPILE_STATUS)
      ? (console.error(j.getShaderInfoLog(c)), console.error(I(b)), null)
      : c;
  }
  function D(a, b, c) {
    c
      ? (j.texParameteri(a, j.TEXTURE_WRAP_S, J(b.wrapS)),
        j.texParameteri(a, j.TEXTURE_WRAP_T, J(b.wrapT)),
        j.texParameteri(a, j.TEXTURE_MAG_FILTER, J(b.magFilter)),
        j.texParameteri(a, j.TEXTURE_MIN_FILTER, J(b.minFilter)))
      : (j.texParameteri(a, j.TEXTURE_WRAP_S, j.CLAMP_TO_EDGE),
        j.texParameteri(a, j.TEXTURE_WRAP_T, j.CLAMP_TO_EDGE),
        j.texParameteri(a, j.TEXTURE_MAG_FILTER, y(b.magFilter)),
        j.texParameteri(a, j.TEXTURE_MIN_FILTER, y(b.minFilter)));
    if (
      dc &&
      b.type !== THREE.FloatType &&
      (1 < b.anisotropy || b.__oldAnisotropy)
    )
      j.texParameterf(
        a,
        dc.TEXTURE_MAX_ANISOTROPY_EXT,
        Math.min(b.anisotropy, Kc)
      ),
        (b.__oldAnisotropy = b.anisotropy);
  }
  function L(a, b) {
    j.bindRenderbuffer(j.RENDERBUFFER, a);
    b.depthBuffer && !b.stencilBuffer
      ? (j.renderbufferStorage(
          j.RENDERBUFFER,
          j.DEPTH_COMPONENT16,
          b.width,
          b.height
        ),
        j.framebufferRenderbuffer(
          j.FRAMEBUFFER,
          j.DEPTH_ATTACHMENT,
          j.RENDERBUFFER,
          a
        ))
      : b.depthBuffer && b.stencilBuffer
      ? (j.renderbufferStorage(
          j.RENDERBUFFER,
          j.DEPTH_STENCIL,
          b.width,
          b.height
        ),
        j.framebufferRenderbuffer(
          j.FRAMEBUFFER,
          j.DEPTH_STENCIL_ATTACHMENT,
          j.RENDERBUFFER,
          a
        ))
      : j.renderbufferStorage(j.RENDERBUFFER, j.RGBA4, b.width, b.height);
  }
  function y(a) {
    return a === THREE.NearestFilter ||
      a === THREE.NearestMipMapNearestFilter ||
      a === THREE.NearestMipMapLinearFilter
      ? j.NEAREST
      : j.LINEAR;
  }
  function J(a) {
    if (a === THREE.RepeatWrapping) return j.REPEAT;
    if (a === THREE.ClampToEdgeWrapping) return j.CLAMP_TO_EDGE;
    if (a === THREE.MirroredRepeatWrapping) return j.MIRRORED_REPEAT;
    if (a === THREE.NearestFilter) return j.NEAREST;
    if (a === THREE.NearestMipMapNearestFilter) return j.NEAREST_MIPMAP_NEAREST;
    if (a === THREE.NearestMipMapLinearFilter) return j.NEAREST_MIPMAP_LINEAR;
    if (a === THREE.LinearFilter) return j.LINEAR;
    if (a === THREE.LinearMipMapNearestFilter) return j.LINEAR_MIPMAP_NEAREST;
    if (a === THREE.LinearMipMapLinearFilter) return j.LINEAR_MIPMAP_LINEAR;
    if (a === THREE.UnsignedByteType) return j.UNSIGNED_BYTE;
    if (a === THREE.UnsignedShort4444Type) return j.UNSIGNED_SHORT_4_4_4_4;
    if (a === THREE.UnsignedShort5551Type) return j.UNSIGNED_SHORT_5_5_5_1;
    if (a === THREE.UnsignedShort565Type) return j.UNSIGNED_SHORT_5_6_5;
    if (a === THREE.ByteType) return j.BYTE;
    if (a === THREE.ShortType) return j.SHORT;
    if (a === THREE.UnsignedShortType) return j.UNSIGNED_SHORT;
    if (a === THREE.IntType) return j.INT;
    if (a === THREE.UnsignedIntType) return j.UNSIGNED_INT;
    if (a === THREE.FloatType) return j.FLOAT;
    if (a === THREE.AlphaFormat) return j.ALPHA;
    if (a === THREE.RGBFormat) return j.RGB;
    if (a === THREE.RGBAFormat) return j.RGBA;
    if (a === THREE.LuminanceFormat) return j.LUMINANCE;
    if (a === THREE.LuminanceAlphaFormat) return j.LUMINANCE_ALPHA;
    if (a === THREE.AddEquation) return j.FUNC_ADD;
    if (a === THREE.SubtractEquation) return j.FUNC_SUBTRACT;
    if (a === THREE.ReverseSubtractEquation) return j.FUNC_REVERSE_SUBTRACT;
    if (a === THREE.ZeroFactor) return j.ZERO;
    if (a === THREE.OneFactor) return j.ONE;
    if (a === THREE.SrcColorFactor) return j.SRC_COLOR;
    if (a === THREE.OneMinusSrcColorFactor) return j.ONE_MINUS_SRC_COLOR;
    if (a === THREE.SrcAlphaFactor) return j.SRC_ALPHA;
    if (a === THREE.OneMinusSrcAlphaFactor) return j.ONE_MINUS_SRC_ALPHA;
    if (a === THREE.DstAlphaFactor) return j.DST_ALPHA;
    if (a === THREE.OneMinusDstAlphaFactor) return j.ONE_MINUS_DST_ALPHA;
    if (a === THREE.DstColorFactor) return j.DST_COLOR;
    if (a === THREE.OneMinusDstColorFactor) return j.ONE_MINUS_DST_COLOR;
    if (a === THREE.SrcAlphaSaturateFactor) return j.SRC_ALPHA_SATURATE;
    if (void 0 !== Db) {
      if (a === THREE.RGB_S3TC_DXT1_Format)
        return Db.COMPRESSED_RGB_S3TC_DXT1_EXT;
      if (a === THREE.RGBA_S3TC_DXT1_Format)
        return Db.COMPRESSED_RGBA_S3TC_DXT1_EXT;
      if (a === THREE.RGBA_S3TC_DXT3_Format)
        return Db.COMPRESSED_RGBA_S3TC_DXT3_EXT;
      if (a === THREE.RGBA_S3TC_DXT5_Format)
        return Db.COMPRESSED_RGBA_S3TC_DXT5_EXT;
    }
    return 0;
  }
  console.log("THREE.WebGLRenderer", THREE.REVISION);
  var a = a || {},
    K = void 0 !== a.canvas ? a.canvas : document.createElement("canvas"),
    R = void 0 !== a.precision ? a.precision : "highp",
    P = void 0 !== a.alpha ? a.alpha : !0,
    ca = void 0 !== a.premultipliedAlpha ? a.premultipliedAlpha : !0,
    xa = void 0 !== a.antialias ? a.antialias : !1,
    M = void 0 !== a.stencil ? a.stencil : !0,
    pa = void 0 !== a.preserveDrawingBuffer ? a.preserveDrawingBuffer : !1,
    ya =
      void 0 !== a.clearColor
        ? new THREE.Color(a.clearColor)
        : new THREE.Color(0),
    ua = void 0 !== a.clearAlpha ? a.clearAlpha : 0;
  this.domElement = K;
  this.context = null;
  this.devicePixelRatio =
    void 0 !== a.devicePixelRatio
      ? a.devicePixelRatio
      : void 0 !== window.devicePixelRatio
      ? window.devicePixelRatio
      : 1;
  this.autoUpdateScene =
    this.autoUpdateObjects =
    this.sortObjects =
    this.autoClearStencil =
    this.autoClearDepth =
    this.autoClearColor =
    this.autoClear =
      !0;
  this.shadowMapEnabled =
    this.physicallyBasedShading =
    this.gammaOutput =
    this.gammaInput =
      !1;
  this.shadowMapAutoUpdate = !0;
  this.shadowMapType = THREE.PCFShadowMap;
  this.shadowMapCullFace = THREE.CullFaceFront;
  this.shadowMapCascade = this.shadowMapDebug = !1;
  this.maxMorphTargets = 8;
  this.maxMorphNormals = 4;
  this.autoScaleCubemaps = !0;
  this.renderPluginsPre = [];
  this.renderPluginsPost = [];
  this.info = {
    memory: { programs: 0, geometries: 0, textures: 0 },
    render: { calls: 0, vertices: 0, faces: 0, points: 0 },
  };
  var N = this,
    O = [],
    aa = 0,
    fa = null,
    V = null,
    ja = -1,
    Z = null,
    ga = null,
    oa = 0,
    za = 0,
    Da = -1,
    Ta = -1,
    sa = -1,
    nb = -1,
    Bb = -1,
    kb = -1,
    eb = -1,
    pb = -1,
    jc = null,
    Lb = null,
    Ua = null,
    ma = null,
    Ra = 0,
    Cb = 0,
    Ha = 0,
    qb = 0,
    fb = 0,
    Oa = 0,
    Za = {},
    yb = new THREE.Frustum(),
    kc = new THREE.Matrix4(),
    sb = new THREE.Matrix4(),
    Ib = new THREE.Vector3(),
    Ea = new THREE.Vector3(),
    Va = !0,
    Jc = {
      ambient: [0, 0, 0],
      directional: { length: 0, colors: [], positions: [] },
      point: { length: 0, colors: [], positions: [], distances: [] },
      spot: {
        length: 0,
        colors: [],
        positions: [],
        distances: [],
        directions: [],
        anglesCos: [],
        exponents: [],
      },
      hemi: { length: 0, skyColors: [], groundColors: [], positions: [] },
    },
    j,
    qc,
    Bc,
    dc,
    Db;
  try {
    if (
      !(j = K.getContext("experimental-webgl", {
        alpha: P,
        premultipliedAlpha: ca,
        antialias: xa,
        stencil: M,
        preserveDrawingBuffer: pa,
      }))
    )
      throw "Error creating WebGL context.";
  } catch (cd) {
    console.error(cd);
  }
  qc = j.getExtension("OES_texture_float");
  Bc = j.getExtension("OES_standard_derivatives");
  dc =
    j.getExtension("EXT_texture_filter_anisotropic") ||
    j.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
    j.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
  Db =
    j.getExtension("WEBGL_compressed_texture_s3tc") ||
    j.getExtension("MOZ_WEBGL_compressed_texture_s3tc") ||
    j.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
  qc || console.log("THREE.WebGLRenderer: Float textures not supported.");
  Bc || console.log("THREE.WebGLRenderer: Standard derivatives not supported.");
  dc ||
    console.log(
      "THREE.WebGLRenderer: Anisotropic texture filtering not supported."
    );
  Db ||
    console.log("THREE.WebGLRenderer: S3TC compressed textures not supported.");
  j.clearColor(0, 0, 0, 1);
  j.clearDepth(1);
  j.clearStencil(0);
  j.enable(j.DEPTH_TEST);
  j.depthFunc(j.LEQUAL);
  j.frontFace(j.CCW);
  j.cullFace(j.BACK);
  j.enable(j.CULL_FACE);
  j.enable(j.BLEND);
  j.blendEquation(j.FUNC_ADD);
  j.blendFunc(j.SRC_ALPHA, j.ONE_MINUS_SRC_ALPHA);
  j.clearColor(ya.r, ya.g, ya.b, ua);
  this.context = j;
  var Lc = j.getParameter(j.MAX_TEXTURE_IMAGE_UNITS),
    dd = j.getParameter(j.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
  j.getParameter(j.MAX_TEXTURE_SIZE);
  var bd = j.getParameter(j.MAX_CUBE_MAP_TEXTURE_SIZE),
    Kc = dc ? j.getParameter(dc.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0,
    rc = 0 < dd,
    gb = rc && qc;
  Db && j.getParameter(j.COMPRESSED_TEXTURE_FORMATS);
  var tb = j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.HIGH_FLOAT),
    zb = j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.MEDIUM_FLOAT);
  j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.LOW_FLOAT);
  var Mb = j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.HIGH_FLOAT),
    X = j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.MEDIUM_FLOAT);
  j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.LOW_FLOAT);
  j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.HIGH_INT);
  j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.MEDIUM_INT);
  j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.LOW_INT);
  j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.HIGH_INT);
  j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.MEDIUM_INT);
  j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.LOW_INT);
  var la = 0 < tb.precision && 0 < Mb.precision,
    ka = 0 < zb.precision && 0 < X.precision;
  "highp" === R &&
    !la &&
    (ka
      ? ((R = "mediump"),
        console.warn("WebGLRenderer: highp not supported, using mediump"))
      : ((R = "lowp"),
        console.warn(
          "WebGLRenderer: highp and mediump not supported, using lowp"
        )));
  "mediump" === R &&
    !ka &&
    ((R = "lowp"),
    console.warn("WebGLRenderer: mediump not supported, using lowp"));
  this.getContext = function () {
    return j;
  };
  this.supportsVertexTextures = function () {
    return rc;
  };
  this.getMaxAnisotropy = function () {
    return Kc;
  };
  this.setSize = function (a, b) {
    K.width = a * this.devicePixelRatio;
    K.height = b * this.devicePixelRatio;
    K.style.width = a + "px";
    K.style.height = b + "px";
    this.setViewport(0, 0, K.width, K.height);
  };
  this.setViewport = function (a, b, c, d) {
    Ra = void 0 !== a ? a : 0;
    Cb = void 0 !== b ? b : 0;
    Ha = void 0 !== c ? c : K.width;
    qb = void 0 !== d ? d : K.height;
    j.viewport(Ra, Cb, Ha, qb);
  };
  this.setScissor = function (a, b, c, d) {
    j.scissor(a, b, c, d);
  };
  this.enableScissorTest = function (a) {
    a ? j.enable(j.SCISSOR_TEST) : j.disable(j.SCISSOR_TEST);
  };
  this.setClearColorHex = function (a, b) {
    ya.setHex(a);
    ua = b;
    j.clearColor(ya.r, ya.g, ya.b, ua);
  };
  this.setClearColor = function (a, b) {
    ya.copy(a);
    ua = b;
    j.clearColor(ya.r, ya.g, ya.b, ua);
  };
  this.getClearColor = function () {
    return ya;
  };
  this.getClearAlpha = function () {
    return ua;
  };
  this.clear = function (a, b, c) {
    var d = 0;
    if (void 0 === a || a) d |= j.COLOR_BUFFER_BIT;
    if (void 0 === b || b) d |= j.DEPTH_BUFFER_BIT;
    if (void 0 === c || c) d |= j.STENCIL_BUFFER_BIT;
    j.clear(d);
  };
  this.clearTarget = function (a, b, c, d) {
    this.setRenderTarget(a);
    this.clear(b, c, d);
  };
  this.addPostPlugin = function (a) {
    a.init(this);
    this.renderPluginsPost.push(a);
  };
  this.addPrePlugin = function (a) {
    a.init(this);
    this.renderPluginsPre.push(a);
  };
  this.updateShadowMap = function (a, b) {
    fa = null;
    ja = Z = pb = eb = sa = -1;
    Va = !0;
    Ta = Da = -1;
    this.shadowMapPlugin.update(a, b);
  };
  var $a = function (a) {
      a = a.target;
      a.removeEventListener("dispose", $a);
      a.__webglInit = void 0;
      void 0 !== a.__webglVertexBuffer && j.deleteBuffer(a.__webglVertexBuffer);
      void 0 !== a.__webglNormalBuffer && j.deleteBuffer(a.__webglNormalBuffer);
      void 0 !== a.__webglTangentBuffer &&
        j.deleteBuffer(a.__webglTangentBuffer);
      void 0 !== a.__webglColorBuffer && j.deleteBuffer(a.__webglColorBuffer);
      void 0 !== a.__webglUVBuffer && j.deleteBuffer(a.__webglUVBuffer);
      void 0 !== a.__webglUV2Buffer && j.deleteBuffer(a.__webglUV2Buffer);
      void 0 !== a.__webglSkinIndicesBuffer &&
        j.deleteBuffer(a.__webglSkinIndicesBuffer);
      void 0 !== a.__webglSkinWeightsBuffer &&
        j.deleteBuffer(a.__webglSkinWeightsBuffer);
      void 0 !== a.__webglFaceBuffer && j.deleteBuffer(a.__webglFaceBuffer);
      void 0 !== a.__webglLineBuffer && j.deleteBuffer(a.__webglLineBuffer);
      void 0 !== a.__webglLineDistanceBuffer &&
        j.deleteBuffer(a.__webglLineDistanceBuffer);
      if (void 0 !== a.geometryGroups)
        for (var c in a.geometryGroups) {
          var d = a.geometryGroups[c];
          if (void 0 !== d.numMorphTargets)
            for (var e = 0, f = d.numMorphTargets; e < f; e++)
              j.deleteBuffer(d.__webglMorphTargetsBuffers[e]);
          if (void 0 !== d.numMorphNormals) {
            e = 0;
            for (f = d.numMorphNormals; e < f; e++)
              j.deleteBuffer(d.__webglMorphNormalsBuffers[e]);
          }
          b(d);
        }
      b(a);
      N.info.memory.geometries--;
    },
    Wa = function (a) {
      a = a.target;
      a.removeEventListener("dispose", Wa);
      a.image && a.image.__webglTextureCube
        ? j.deleteTexture(a.image.__webglTextureCube)
        : a.__webglInit &&
          ((a.__webglInit = !1), j.deleteTexture(a.__webglTexture));
      N.info.memory.textures--;
    },
    ab = function (a) {
      a = a.target;
      a.removeEventListener("dispose", ab);
      if (a && a.__webglTexture)
        if (
          (j.deleteTexture(a.__webglTexture),
          a instanceof THREE.WebGLRenderTargetCube)
        )
          for (var b = 0; 6 > b; b++)
            j.deleteFramebuffer(a.__webglFramebuffer[b]),
              j.deleteRenderbuffer(a.__webglRenderbuffer[b]);
        else
          j.deleteFramebuffer(a.__webglFramebuffer),
            j.deleteRenderbuffer(a.__webglRenderbuffer);
      N.info.memory.textures--;
    },
    ob = function (a) {
      a = a.target;
      a.removeEventListener("dispose", ob);
      hb(a);
    },
    hb = function (a) {
      var b = a.program;
      if (void 0 !== b) {
        a.program = void 0;
        var c,
          d,
          e = !1,
          a = 0;
        for (c = O.length; a < c; a++)
          if (((d = O[a]), d.program === b)) {
            d.usedTimes--;
            0 === d.usedTimes && (e = !0);
            break;
          }
        if (!0 === e) {
          e = [];
          a = 0;
          for (c = O.length; a < c; a++)
            (d = O[a]), d.program !== b && e.push(d);
          O = e;
          j.deleteProgram(b);
          N.info.memory.programs--;
        }
      }
    };
  this.renderBufferImmediate = function (a, b, c) {
    a.hasPositions &&
      !a.__webglVertexBuffer &&
      (a.__webglVertexBuffer = j.createBuffer());
    a.hasNormals &&
      !a.__webglNormalBuffer &&
      (a.__webglNormalBuffer = j.createBuffer());
    a.hasUvs && !a.__webglUvBuffer && (a.__webglUvBuffer = j.createBuffer());
    a.hasColors &&
      !a.__webglColorBuffer &&
      (a.__webglColorBuffer = j.createBuffer());
    a.hasPositions &&
      (j.bindBuffer(j.ARRAY_BUFFER, a.__webglVertexBuffer),
      j.bufferData(j.ARRAY_BUFFER, a.positionArray, j.DYNAMIC_DRAW),
      j.enableVertexAttribArray(b.attributes.position),
      j.vertexAttribPointer(b.attributes.position, 3, j.FLOAT, !1, 0, 0));
    if (a.hasNormals) {
      j.bindBuffer(j.ARRAY_BUFFER, a.__webglNormalBuffer);
      if (c.shading === THREE.FlatShading) {
        var d,
          e,
          f,
          g,
          h,
          i,
          k,
          n,
          m,
          l,
          p,
          r = 3 * a.count;
        for (p = 0; p < r; p += 9)
          (l = a.normalArray),
            (d = l[p]),
            (e = l[p + 1]),
            (f = l[p + 2]),
            (g = l[p + 3]),
            (i = l[p + 4]),
            (n = l[p + 5]),
            (h = l[p + 6]),
            (k = l[p + 7]),
            (m = l[p + 8]),
            (d = (d + g + h) / 3),
            (e = (e + i + k) / 3),
            (f = (f + n + m) / 3),
            (l[p] = d),
            (l[p + 1] = e),
            (l[p + 2] = f),
            (l[p + 3] = d),
            (l[p + 4] = e),
            (l[p + 5] = f),
            (l[p + 6] = d),
            (l[p + 7] = e),
            (l[p + 8] = f);
      }
      j.bufferData(j.ARRAY_BUFFER, a.normalArray, j.DYNAMIC_DRAW);
      j.enableVertexAttribArray(b.attributes.normal);
      j.vertexAttribPointer(b.attributes.normal, 3, j.FLOAT, !1, 0, 0);
    }
    a.hasUvs &&
      c.map &&
      (j.bindBuffer(j.ARRAY_BUFFER, a.__webglUvBuffer),
      j.bufferData(j.ARRAY_BUFFER, a.uvArray, j.DYNAMIC_DRAW),
      j.enableVertexAttribArray(b.attributes.uv),
      j.vertexAttribPointer(b.attributes.uv, 2, j.FLOAT, !1, 0, 0));
    a.hasColors &&
      c.vertexColors !== THREE.NoColors &&
      (j.bindBuffer(j.ARRAY_BUFFER, a.__webglColorBuffer),
      j.bufferData(j.ARRAY_BUFFER, a.colorArray, j.DYNAMIC_DRAW),
      j.enableVertexAttribArray(b.attributes.color),
      j.vertexAttribPointer(b.attributes.color, 3, j.FLOAT, !1, 0, 0));
    j.drawArrays(j.TRIANGLES, 0, a.count);
    a.count = 0;
  };
  this.renderBufferDirect = function (a, b, c, d, e, f) {
    if (!1 !== d.visible)
      if (
        ((c = F(a, b, c, d, f)),
        (a = c.attributes),
        (b = !1),
        (d = 16777215 * e.id + 2 * c.id + (d.wireframe ? 1 : 0)),
        d !== Z && ((Z = d), (b = !0)),
        b && n(),
        f instanceof THREE.Mesh)
      )
        if ((f = e.attributes.index)) {
          d = e.offsets;
          1 < d.length && (b = !0);
          for (var c = 0, g = d.length; c < g; c++) {
            var h = d[c].index;
            if (b) {
              var i = e.attributes.position,
                m = i.itemSize;
              j.bindBuffer(j.ARRAY_BUFFER, i.buffer);
              k(a.position);
              j.vertexAttribPointer(a.position, m, j.FLOAT, !1, 0, 4 * h * m);
              m = e.attributes.normal;
              if (0 <= a.normal && m) {
                var l = m.itemSize;
                j.bindBuffer(j.ARRAY_BUFFER, m.buffer);
                k(a.normal);
                j.vertexAttribPointer(a.normal, l, j.FLOAT, !1, 0, 4 * h * l);
              }
              m = e.attributes.uv;
              0 <= a.uv &&
                m &&
                ((l = m.itemSize),
                j.bindBuffer(j.ARRAY_BUFFER, m.buffer),
                k(a.uv),
                j.vertexAttribPointer(a.uv, l, j.FLOAT, !1, 0, 4 * h * l));
              m = e.attributes.color;
              0 <= a.color &&
                m &&
                ((l = m.itemSize),
                j.bindBuffer(j.ARRAY_BUFFER, m.buffer),
                k(a.color),
                j.vertexAttribPointer(a.color, l, j.FLOAT, !1, 0, 4 * h * l));
              m = e.attributes.tangent;
              0 <= a.tangent &&
                m &&
                ((l = m.itemSize),
                j.bindBuffer(j.ARRAY_BUFFER, m.buffer),
                k(a.tangent),
                j.vertexAttribPointer(a.tangent, l, j.FLOAT, !1, 0, 4 * h * l));
              j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, f.buffer);
            }
            j.drawElements(
              j.TRIANGLES,
              d[c].count,
              j.UNSIGNED_SHORT,
              2 * d[c].start
            );
            N.info.render.calls++;
            N.info.render.vertices += d[c].count;
            N.info.render.faces += d[c].count / 3;
          }
        } else
          b &&
            ((i = e.attributes.position),
            (m = i.itemSize),
            j.bindBuffer(j.ARRAY_BUFFER, i.buffer),
            k(a.position),
            j.vertexAttribPointer(a.position, m, j.FLOAT, !1, 0, 0),
            (m = e.attributes.normal),
            0 <= a.normal &&
              m &&
              ((l = m.itemSize),
              j.bindBuffer(j.ARRAY_BUFFER, m.buffer),
              k(a.normal),
              j.vertexAttribPointer(a.normal, l, j.FLOAT, !1, 0, 0)),
            (m = e.attributes.uv),
            0 <= a.uv &&
              m &&
              ((l = m.itemSize),
              j.bindBuffer(j.ARRAY_BUFFER, m.buffer),
              k(a.uv),
              j.vertexAttribPointer(a.uv, l, j.FLOAT, !1, 0, 0)),
            (m = e.attributes.color),
            0 <= a.color &&
              m &&
              ((l = m.itemSize),
              j.bindBuffer(j.ARRAY_BUFFER, m.buffer),
              k(a.color),
              j.vertexAttribPointer(a.color, l, j.FLOAT, !1, 0, 0)),
            (m = e.attributes.tangent),
            0 <= a.tangent &&
              m &&
              ((l = m.itemSize),
              j.bindBuffer(j.ARRAY_BUFFER, m.buffer),
              k(a.tangent),
              j.vertexAttribPointer(a.tangent, l, j.FLOAT, !1, 0, 0))),
            j.drawArrays(j.TRIANGLES, 0, i.numItems / 3),
            N.info.render.calls++,
            (N.info.render.vertices += i.numItems / 3),
            (N.info.render.faces += i.numItems / 3 / 3);
      else
        f instanceof THREE.ParticleSystem &&
          b &&
          ((i = e.attributes.position),
          (m = i.itemSize),
          j.bindBuffer(j.ARRAY_BUFFER, i.buffer),
          k(a.position),
          j.vertexAttribPointer(a.position, m, j.FLOAT, !1, 0, 0),
          (m = e.attributes.color),
          0 <= a.color &&
            m &&
            ((l = m.itemSize),
            j.bindBuffer(j.ARRAY_BUFFER, m.buffer),
            k(a.color),
            j.vertexAttribPointer(a.color, l, j.FLOAT, !1, 0, 0)),
          j.drawArrays(j.POINTS, 0, i.numItems / 3),
          N.info.render.calls++,
          (N.info.render.points += i.numItems / 3));
  };
  this.renderBuffer = function (a, b, c, d, e, f) {
    if (!1 !== d.visible) {
      var g,
        h,
        c = F(a, b, c, d, f),
        b = c.attributes,
        a = !1,
        c = 16777215 * e.id + 2 * c.id + (d.wireframe ? 1 : 0);
      c !== Z && ((Z = c), (a = !0));
      a && n();
      if (!d.morphTargets && 0 <= b.position)
        a &&
          (j.bindBuffer(j.ARRAY_BUFFER, e.__webglVertexBuffer),
          k(b.position),
          j.vertexAttribPointer(b.position, 3, j.FLOAT, !1, 0, 0));
      else if (f.morphTargetBase) {
        c = d.program.attributes;
        -1 !== f.morphTargetBase && 0 <= c.position
          ? (j.bindBuffer(
              j.ARRAY_BUFFER,
              e.__webglMorphTargetsBuffers[f.morphTargetBase]
            ),
            k(c.position),
            j.vertexAttribPointer(c.position, 3, j.FLOAT, !1, 0, 0))
          : 0 <= c.position &&
            (j.bindBuffer(j.ARRAY_BUFFER, e.__webglVertexBuffer),
            k(c.position),
            j.vertexAttribPointer(c.position, 3, j.FLOAT, !1, 0, 0));
        if (f.morphTargetForcedOrder.length) {
          var i = 0;
          h = f.morphTargetForcedOrder;
          for (
            g = f.morphTargetInfluences;
            i < d.numSupportedMorphTargets && i < h.length;

          )
            0 <= c["morphTarget" + i] &&
              (j.bindBuffer(j.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[h[i]]),
              k(c["morphTarget" + i]),
              j.vertexAttribPointer(
                c["morphTarget" + i],
                3,
                j.FLOAT,
                !1,
                0,
                0
              )),
              0 <= c["morphNormal" + i] &&
                d.morphNormals &&
                (j.bindBuffer(
                  j.ARRAY_BUFFER,
                  e.__webglMorphNormalsBuffers[h[i]]
                ),
                k(c["morphNormal" + i]),
                j.vertexAttribPointer(
                  c["morphNormal" + i],
                  3,
                  j.FLOAT,
                  !1,
                  0,
                  0
                )),
              (f.__webglMorphTargetInfluences[i] = g[h[i]]),
              i++;
        } else {
          h = [];
          g = f.morphTargetInfluences;
          var l,
            p = g.length;
          for (l = 0; l < p; l++) (i = g[l]), 0 < i && h.push([i, l]);
          h.length > d.numSupportedMorphTargets
            ? (h.sort(m), (h.length = d.numSupportedMorphTargets))
            : h.length > d.numSupportedMorphNormals
            ? h.sort(m)
            : 0 === h.length && h.push([0, 0]);
          for (i = 0; i < d.numSupportedMorphTargets; )
            h[i]
              ? ((l = h[i][1]),
                0 <= c["morphTarget" + i] &&
                  (j.bindBuffer(
                    j.ARRAY_BUFFER,
                    e.__webglMorphTargetsBuffers[l]
                  ),
                  k(c["morphTarget" + i]),
                  j.vertexAttribPointer(
                    c["morphTarget" + i],
                    3,
                    j.FLOAT,
                    !1,
                    0,
                    0
                  )),
                0 <= c["morphNormal" + i] &&
                  d.morphNormals &&
                  (j.bindBuffer(
                    j.ARRAY_BUFFER,
                    e.__webglMorphNormalsBuffers[l]
                  ),
                  k(c["morphNormal" + i]),
                  j.vertexAttribPointer(
                    c["morphNormal" + i],
                    3,
                    j.FLOAT,
                    !1,
                    0,
                    0
                  )),
                (f.__webglMorphTargetInfluences[i] = g[l]))
              : (f.__webglMorphTargetInfluences[i] = 0),
              i++;
        }
        null !== d.program.uniforms.morphTargetInfluences &&
          j.uniform1fv(
            d.program.uniforms.morphTargetInfluences,
            f.__webglMorphTargetInfluences
          );
      }
      if (a) {
        if (e.__webglCustomAttributesList) {
          g = 0;
          for (h = e.__webglCustomAttributesList.length; g < h; g++)
            (c = e.__webglCustomAttributesList[g]),
              0 <= b[c.buffer.belongsToAttribute] &&
                (j.bindBuffer(j.ARRAY_BUFFER, c.buffer),
                k(b[c.buffer.belongsToAttribute]),
                j.vertexAttribPointer(
                  b[c.buffer.belongsToAttribute],
                  c.size,
                  j.FLOAT,
                  !1,
                  0,
                  0
                ));
        }
        0 <= b.color &&
          (j.bindBuffer(j.ARRAY_BUFFER, e.__webglColorBuffer),
          k(b.color),
          j.vertexAttribPointer(b.color, 3, j.FLOAT, !1, 0, 0));
        0 <= b.normal &&
          (j.bindBuffer(j.ARRAY_BUFFER, e.__webglNormalBuffer),
          k(b.normal),
          j.vertexAttribPointer(b.normal, 3, j.FLOAT, !1, 0, 0));
        0 <= b.tangent &&
          (j.bindBuffer(j.ARRAY_BUFFER, e.__webglTangentBuffer),
          k(b.tangent),
          j.vertexAttribPointer(b.tangent, 4, j.FLOAT, !1, 0, 0));
        0 <= b.uv &&
          (j.bindBuffer(j.ARRAY_BUFFER, e.__webglUVBuffer),
          k(b.uv),
          j.vertexAttribPointer(b.uv, 2, j.FLOAT, !1, 0, 0));
        0 <= b.uv2 &&
          (j.bindBuffer(j.ARRAY_BUFFER, e.__webglUV2Buffer),
          k(b.uv2),
          j.vertexAttribPointer(b.uv2, 2, j.FLOAT, !1, 0, 0));
        d.skinning &&
          0 <= b.skinIndex &&
          0 <= b.skinWeight &&
          (j.bindBuffer(j.ARRAY_BUFFER, e.__webglSkinIndicesBuffer),
          k(b.skinIndex),
          j.vertexAttribPointer(b.skinIndex, 4, j.FLOAT, !1, 0, 0),
          j.bindBuffer(j.ARRAY_BUFFER, e.__webglSkinWeightsBuffer),
          k(b.skinWeight),
          j.vertexAttribPointer(b.skinWeight, 4, j.FLOAT, !1, 0, 0));
        0 <= b.lineDistance &&
          (j.bindBuffer(j.ARRAY_BUFFER, e.__webglLineDistanceBuffer),
          k(b.lineDistance),
          j.vertexAttribPointer(b.lineDistance, 1, j.FLOAT, !1, 0, 0));
      }
      f instanceof THREE.Mesh
        ? (d.wireframe
            ? ((d = d.wireframeLinewidth),
              d !== ma && (j.lineWidth(d), (ma = d)),
              a && j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, e.__webglLineBuffer),
              j.drawElements(j.LINES, e.__webglLineCount, j.UNSIGNED_SHORT, 0))
            : (a && j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, e.__webglFaceBuffer),
              j.drawElements(
                j.TRIANGLES,
                e.__webglFaceCount,
                j.UNSIGNED_SHORT,
                0
              )),
          N.info.render.calls++,
          (N.info.render.vertices += e.__webglFaceCount),
          (N.info.render.faces += e.__webglFaceCount / 3))
        : f instanceof THREE.Line
        ? ((f = f.type === THREE.LineStrip ? j.LINE_STRIP : j.LINES),
          (d = d.linewidth),
          d !== ma && (j.lineWidth(d), (ma = d)),
          j.drawArrays(f, 0, e.__webglLineCount),
          N.info.render.calls++)
        : f instanceof THREE.ParticleSystem
        ? (j.drawArrays(j.POINTS, 0, e.__webglParticleCount),
          N.info.render.calls++,
          (N.info.render.points += e.__webglParticleCount))
        : f instanceof THREE.Ribbon &&
          (j.drawArrays(j.TRIANGLE_STRIP, 0, e.__webglVertexCount),
          N.info.render.calls++);
    }
  };
  this.render = function (a, b, c, d) {
    if (!1 === b instanceof THREE.Camera)
      console.error(
        "THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera."
      );
    else {
      var e,
        f,
        g,
        h,
        i = a.__lights,
        k = a.fog;
      ja = -1;
      Va = !0;
      this.autoUpdateScene && a.updateMatrixWorld();
      void 0 === b.parent && b.updateMatrixWorld();
      b.matrixWorldInverse.getInverse(b.matrixWorld);
      kc.multiply(b.projectionMatrix, b.matrixWorldInverse);
      yb.setFromMatrix(kc);
      this.autoUpdateObjects && this.initWebGLObjects(a);
      r(this.renderPluginsPre, a, b);
      N.info.render.calls = 0;
      N.info.render.vertices = 0;
      N.info.render.faces = 0;
      N.info.render.points = 0;
      this.setRenderTarget(c);
      (this.autoClear || d) &&
        this.clear(
          this.autoClearColor,
          this.autoClearDepth,
          this.autoClearStencil
        );
      h = a.__webglObjects;
      d = 0;
      for (e = h.length; d < e; d++)
        if (
          ((f = h[d]),
          (g = f.object),
          (f.render = !1),
          g.visible &&
            (!(g instanceof THREE.Mesh || g instanceof THREE.ParticleSystem) ||
              !g.frustumCulled ||
              yb.contains(g)))
        ) {
          A(g, b);
          var m = f,
            n = m.buffer,
            q = void 0,
            t = (q = void 0),
            t = m.object.material;
          if (t instanceof THREE.MeshFaceMaterial)
            (q = n.materialIndex),
              (q = t.materials[q]),
              q.transparent
                ? ((m.transparent = q), (m.opaque = null))
                : ((m.opaque = q), (m.transparent = null));
          else if ((q = t))
            q.transparent
              ? ((m.transparent = q), (m.opaque = null))
              : ((m.opaque = q), (m.transparent = null));
          f.render = !0;
          !0 === this.sortObjects &&
            (null !== g.renderDepth
              ? (f.z = g.renderDepth)
              : (Ib.copy(g.matrixWorld.getPosition()),
                kc.multiplyVector3(Ib),
                (f.z = Ib.z)),
            (f.id = g.id));
        }
      this.sortObjects && h.sort(p);
      h = a.__webglObjectsImmediate;
      d = 0;
      for (e = h.length; d < e; d++)
        (f = h[d]),
          (g = f.object),
          g.visible &&
            (A(g, b),
            (g = f.object.material),
            g.transparent
              ? ((f.transparent = g), (f.opaque = null))
              : ((f.opaque = g), (f.transparent = null)));
      a.overrideMaterial
        ? ((d = a.overrideMaterial),
          this.setBlending(d.blending, d.blendEquation, d.blendSrc, d.blendDst),
          this.setDepthTest(d.depthTest),
          this.setDepthWrite(d.depthWrite),
          G(d.polygonOffset, d.polygonOffsetFactor, d.polygonOffsetUnits),
          s(a.__webglObjects, !1, "", b, i, k, !0, d),
          l(a.__webglObjectsImmediate, "", b, i, k, !1, d))
        : ((d = null),
          this.setBlending(THREE.NoBlending),
          s(a.__webglObjects, !0, "opaque", b, i, k, !1, d),
          l(a.__webglObjectsImmediate, "opaque", b, i, k, !1, d),
          s(a.__webglObjects, !1, "transparent", b, i, k, !0, d),
          l(a.__webglObjectsImmediate, "transparent", b, i, k, !0, d));
      r(this.renderPluginsPost, a, b);
      c &&
        c.generateMipmaps &&
        c.minFilter !== THREE.NearestFilter &&
        c.minFilter !== THREE.LinearFilter &&
        (c instanceof THREE.WebGLRenderTargetCube
          ? (j.bindTexture(j.TEXTURE_CUBE_MAP, c.__webglTexture),
            j.generateMipmap(j.TEXTURE_CUBE_MAP),
            j.bindTexture(j.TEXTURE_CUBE_MAP, null))
          : (j.bindTexture(j.TEXTURE_2D, c.__webglTexture),
            j.generateMipmap(j.TEXTURE_2D),
            j.bindTexture(j.TEXTURE_2D, null)));
      this.setDepthTest(!0);
      this.setDepthWrite(!0);
    }
  };
  this.renderImmediateObject = function (a, b, c, d, e) {
    var f = F(a, b, c, d, e);
    Z = -1;
    N.setMaterialFaces(d);
    e.immediateRenderCallback
      ? e.immediateRenderCallback(f, j, yb)
      : e.render(function (a) {
          N.renderBufferImmediate(a, f, d);
        });
  };
  this.initWebGLObjects = function (a) {
    a.__webglObjects ||
      ((a.__webglObjects = []),
      (a.__webglObjectsImmediate = []),
      (a.__webglSprites = []),
      (a.__webglFlares = []));
    for (; a.__objectsAdded.length; ) {
      var b = a.__objectsAdded[0],
        k = a,
        n = void 0,
        l = void 0,
        p = void 0,
        r = void 0;
      if (!b.__webglInit)
        if (
          ((b.__webglInit = !0),
          (b._modelViewMatrix = new THREE.Matrix4()),
          (b._normalMatrix = new THREE.Matrix3()),
          void 0 !== b.geometry &&
            void 0 === b.geometry.__webglInit &&
            ((b.geometry.__webglInit = !0),
            b.geometry.addEventListener("dispose", $a)),
          b instanceof THREE.Mesh)
        )
          if (
            ((l = b.geometry), (p = b.material), l instanceof THREE.Geometry)
          ) {
            if (void 0 === l.geometryGroups) {
              var s = l,
                y = void 0,
                z = void 0,
                A = void 0,
                C = void 0,
                D = void 0,
                F = void 0,
                G = {},
                O = s.morphTargets.length,
                H = s.morphNormals.length,
                I = p instanceof THREE.MeshFaceMaterial;
              s.geometryGroups = {};
              y = 0;
              for (z = s.faces.length; y < z; y++)
                (A = s.faces[y]),
                  (C = I ? A.materialIndex : 0),
                  void 0 === G[C] && (G[C] = { hash: C, counter: 0 }),
                  (F = G[C].hash + "_" + G[C].counter),
                  void 0 === s.geometryGroups[F] &&
                    (s.geometryGroups[F] = {
                      faces3: [],
                      faces4: [],
                      materialIndex: C,
                      vertices: 0,
                      numMorphTargets: O,
                      numMorphNormals: H,
                    }),
                  (D = A instanceof THREE.Face3 ? 3 : 4),
                  65535 < s.geometryGroups[F].vertices + D &&
                    ((G[C].counter += 1),
                    (F = G[C].hash + "_" + G[C].counter),
                    void 0 === s.geometryGroups[F] &&
                      (s.geometryGroups[F] = {
                        faces3: [],
                        faces4: [],
                        materialIndex: C,
                        vertices: 0,
                        numMorphTargets: O,
                        numMorphNormals: H,
                      })),
                  A instanceof THREE.Face3
                    ? s.geometryGroups[F].faces3.push(y)
                    : s.geometryGroups[F].faces4.push(y),
                  (s.geometryGroups[F].vertices += D);
              s.geometryGroupsList = [];
              var K = void 0;
              for (K in s.geometryGroups)
                (s.geometryGroups[K].id = oa++),
                  s.geometryGroupsList.push(s.geometryGroups[K]);
            }
            for (n in l.geometryGroups)
              if (((r = l.geometryGroups[n]), !r.__webglVertexBuffer)) {
                var J = r;
                J.__webglVertexBuffer = j.createBuffer();
                J.__webglNormalBuffer = j.createBuffer();
                J.__webglTangentBuffer = j.createBuffer();
                J.__webglColorBuffer = j.createBuffer();
                J.__webglUVBuffer = j.createBuffer();
                J.__webglUV2Buffer = j.createBuffer();
                J.__webglSkinIndicesBuffer = j.createBuffer();
                J.__webglSkinWeightsBuffer = j.createBuffer();
                J.__webglFaceBuffer = j.createBuffer();
                J.__webglLineBuffer = j.createBuffer();
                var L = void 0,
                  V = void 0;
                if (J.numMorphTargets) {
                  J.__webglMorphTargetsBuffers = [];
                  L = 0;
                  for (V = J.numMorphTargets; L < V; L++)
                    J.__webglMorphTargetsBuffers.push(j.createBuffer());
                }
                if (J.numMorphNormals) {
                  J.__webglMorphNormalsBuffers = [];
                  L = 0;
                  for (V = J.numMorphNormals; L < V; L++)
                    J.__webglMorphNormalsBuffers.push(j.createBuffer());
                }
                N.info.memory.geometries++;
                d(r, b);
                l.verticesNeedUpdate = !0;
                l.morphTargetsNeedUpdate = !0;
                l.elementsNeedUpdate = !0;
                l.uvsNeedUpdate = !0;
                l.normalsNeedUpdate = !0;
                l.tangentsNeedUpdate = !0;
                l.colorsNeedUpdate = !0;
              }
          } else l instanceof THREE.BufferGeometry && h(l);
        else if (b instanceof THREE.Ribbon) {
          if (((l = b.geometry), !l.__webglVertexBuffer)) {
            var M = l;
            M.__webglVertexBuffer = j.createBuffer();
            M.__webglColorBuffer = j.createBuffer();
            M.__webglNormalBuffer = j.createBuffer();
            N.info.memory.geometries++;
            var aa = l,
              Z = b,
              fa = aa.vertices.length;
            aa.__vertexArray = new Float32Array(3 * fa);
            aa.__colorArray = new Float32Array(3 * fa);
            aa.__normalArray = new Float32Array(3 * fa);
            aa.__webglVertexCount = fa;
            c(aa, Z);
            l.verticesNeedUpdate = !0;
            l.colorsNeedUpdate = !0;
            l.normalsNeedUpdate = !0;
          }
        } else if (b instanceof THREE.Line) {
          if (((l = b.geometry), !l.__webglVertexBuffer)) {
            var R = l;
            R.__webglVertexBuffer = j.createBuffer();
            R.__webglColorBuffer = j.createBuffer();
            R.__webglLineDistanceBuffer = j.createBuffer();
            N.info.memory.geometries++;
            var P = l,
              ga = b,
              X = P.vertices.length;
            P.__vertexArray = new Float32Array(3 * X);
            P.__colorArray = new Float32Array(3 * X);
            P.__lineDistanceArray = new Float32Array(1 * X);
            P.__webglLineCount = X;
            c(P, ga);
            l.verticesNeedUpdate = !0;
            l.colorsNeedUpdate = !0;
            l.lineDistancesNeedUpdate = !0;
          }
        } else if (
          b instanceof THREE.ParticleSystem &&
          ((l = b.geometry), !l.__webglVertexBuffer)
        )
          if (l instanceof THREE.Geometry) {
            var $ = l;
            $.__webglVertexBuffer = j.createBuffer();
            $.__webglColorBuffer = j.createBuffer();
            N.info.memory.geometries++;
            var ja = l,
              la = b,
              ka = ja.vertices.length;
            ja.__vertexArray = new Float32Array(3 * ka);
            ja.__colorArray = new Float32Array(3 * ka);
            ja.__sortArray = [];
            ja.__webglParticleCount = ka;
            c(ja, la);
            l.verticesNeedUpdate = !0;
            l.colorsNeedUpdate = !0;
          } else l instanceof THREE.BufferGeometry && h(l);
      if (!b.__webglActive) {
        if (b instanceof THREE.Mesh)
          if (((l = b.geometry), l instanceof THREE.BufferGeometry))
            q(k.__webglObjects, l, b);
          else
            for (n in l.geometryGroups)
              (r = l.geometryGroups[n]), q(k.__webglObjects, r, b);
        else
          b instanceof THREE.Ribbon ||
          b instanceof THREE.Line ||
          b instanceof THREE.ParticleSystem
            ? ((l = b.geometry), q(k.__webglObjects, l, b))
            : b instanceof THREE.ImmediateRenderObject ||
              b.immediateRenderCallback
            ? k.__webglObjectsImmediate.push({
                object: b,
                opaque: null,
                transparent: null,
              })
            : b instanceof THREE.Sprite
            ? k.__webglSprites.push(b)
            : b instanceof THREE.LensFlare && k.__webglFlares.push(b);
        b.__webglActive = !0;
      }
      a.__objectsAdded.splice(0, 1);
    }
    for (; a.__objectsRemoved.length; ) {
      var ca = a.__objectsRemoved[0],
        pa = a;
      ca instanceof THREE.Mesh ||
      ca instanceof THREE.ParticleSystem ||
      ca instanceof THREE.Ribbon ||
      ca instanceof THREE.Line
        ? x(pa.__webglObjects, ca)
        : ca instanceof THREE.Sprite
        ? t(pa.__webglSprites, ca)
        : ca instanceof THREE.LensFlare
        ? t(pa.__webglFlares, ca)
        : (ca instanceof THREE.ImmediateRenderObject ||
            ca.immediateRenderCallback) &&
          x(pa.__webglObjectsImmediate, ca);
      ca.__webglActive = !1;
      a.__objectsRemoved.splice(0, 1);
    }
    for (var sa = 0, ya = a.__webglObjects.length; sa < ya; sa++) {
      var za = a.__webglObjects[sa].object,
        W = za.geometry,
        xa = void 0,
        Da = void 0,
        ma = void 0;
      if (za instanceof THREE.Mesh)
        if (W instanceof THREE.BufferGeometry)
          (W.verticesNeedUpdate ||
            W.elementsNeedUpdate ||
            W.uvsNeedUpdate ||
            W.normalsNeedUpdate ||
            W.colorsNeedUpdate ||
            W.tangentsNeedUpdate) &&
            i(W, j.DYNAMIC_DRAW, !W.dynamic),
            (W.verticesNeedUpdate = !1),
            (W.elementsNeedUpdate = !1),
            (W.uvsNeedUpdate = !1),
            (W.normalsNeedUpdate = !1),
            (W.colorsNeedUpdate = !1),
            (W.tangentsNeedUpdate = !1);
        else {
          for (var Ea = 0, Oa = W.geometryGroupsList.length; Ea < Oa; Ea++)
            if (
              ((xa = W.geometryGroupsList[Ea]),
              (ma = e(za, xa)),
              W.buffersNeedUpdate && d(xa, za),
              (Da = ma.attributes && u(ma)),
              W.verticesNeedUpdate ||
                W.morphTargetsNeedUpdate ||
                W.elementsNeedUpdate ||
                W.uvsNeedUpdate ||
                W.normalsNeedUpdate ||
                W.colorsNeedUpdate ||
                W.tangentsNeedUpdate ||
                Da)
            ) {
              var ta = xa,
                Ta = za,
                ua = j.DYNAMIC_DRAW,
                Ra = !W.dynamic,
                Ha = ma;
              if (ta.__inittedArrays) {
                var Va = f(Ha),
                  nb = Ha.vertexColors ? Ha.vertexColors : !1,
                  ob = g(Ha),
                  hb = Va === THREE.SmoothShading,
                  E = void 0,
                  Y = void 0,
                  Wa = void 0,
                  Q = void 0,
                  ab = void 0,
                  kb = void 0,
                  Ua = void 0,
                  Bb = void 0,
                  eb = void 0,
                  pb = void 0,
                  qb = void 0,
                  S = void 0,
                  T = void 0,
                  U = void 0,
                  ra = void 0,
                  Za = void 0,
                  fb = void 0,
                  gb = void 0,
                  tb = void 0,
                  Nb = void 0,
                  Ob = void 0,
                  Pb = void 0,
                  yb = void 0,
                  Qb = void 0,
                  Rb = void 0,
                  Sb = void 0,
                  zb = void 0,
                  Tb = void 0,
                  Ub = void 0,
                  Vb = void 0,
                  Cb = void 0,
                  Wb = void 0,
                  Xb = void 0,
                  Yb = void 0,
                  Db = void 0,
                  Aa = void 0,
                  dc = void 0,
                  lc = void 0,
                  wc = void 0,
                  xc = void 0,
                  bb = void 0,
                  jc = void 0,
                  Xa = void 0,
                  Ya = void 0,
                  mc = void 0,
                  ec = void 0,
                  Pa = 0,
                  Sa = 0,
                  fc = 0,
                  gc = 0,
                  Eb = 0,
                  lb = 0,
                  Fa = 0,
                  rb = 0,
                  Qa = 0,
                  ea = 0,
                  na = 0,
                  w = 0,
                  Ba = void 0,
                  cb = ta.__vertexArray,
                  Lb = ta.__uvArray,
                  Mb = ta.__uv2Array,
                  Fb = ta.__normalArray,
                  Ka = ta.__tangentArray,
                  db = ta.__colorArray,
                  La = ta.__skinIndexArray,
                  Ma = ta.__skinWeightArray,
                  qc = ta.__morphTargetsArrays,
                  rc = ta.__morphNormalsArrays,
                  fd = ta.__webglCustomAttributesList,
                  v = void 0,
                  Zb = ta.__faceArray,
                  Ab = ta.__lineArray,
                  ub = Ta.geometry,
                  Jc = ub.elementsNeedUpdate,
                  Bc = ub.uvsNeedUpdate,
                  Kc = ub.normalsNeedUpdate,
                  Lc = ub.tangentsNeedUpdate,
                  bd = ub.colorsNeedUpdate,
                  cd = ub.morphTargetsNeedUpdate,
                  sc = ub.vertices,
                  va = ta.faces3,
                  wa = ta.faces4,
                  mb = ub.faces,
                  gd = ub.faceVertexUvs[0],
                  hd = ub.faceVertexUvs[1],
                  tc = ub.skinIndices,
                  nc = ub.skinWeights,
                  oc = ub.morphTargets,
                  Mc = ub.morphNormals;
                if (ub.verticesNeedUpdate) {
                  E = 0;
                  for (Y = va.length; E < Y; E++)
                    (Q = mb[va[E]]),
                      (S = sc[Q.a]),
                      (T = sc[Q.b]),
                      (U = sc[Q.c]),
                      (cb[Sa] = S.x),
                      (cb[Sa + 1] = S.y),
                      (cb[Sa + 2] = S.z),
                      (cb[Sa + 3] = T.x),
                      (cb[Sa + 4] = T.y),
                      (cb[Sa + 5] = T.z),
                      (cb[Sa + 6] = U.x),
                      (cb[Sa + 7] = U.y),
                      (cb[Sa + 8] = U.z),
                      (Sa += 9);
                  E = 0;
                  for (Y = wa.length; E < Y; E++)
                    (Q = mb[wa[E]]),
                      (S = sc[Q.a]),
                      (T = sc[Q.b]),
                      (U = sc[Q.c]),
                      (ra = sc[Q.d]),
                      (cb[Sa] = S.x),
                      (cb[Sa + 1] = S.y),
                      (cb[Sa + 2] = S.z),
                      (cb[Sa + 3] = T.x),
                      (cb[Sa + 4] = T.y),
                      (cb[Sa + 5] = T.z),
                      (cb[Sa + 6] = U.x),
                      (cb[Sa + 7] = U.y),
                      (cb[Sa + 8] = U.z),
                      (cb[Sa + 9] = ra.x),
                      (cb[Sa + 10] = ra.y),
                      (cb[Sa + 11] = ra.z),
                      (Sa += 12);
                  j.bindBuffer(j.ARRAY_BUFFER, ta.__webglVertexBuffer);
                  j.bufferData(j.ARRAY_BUFFER, cb, ua);
                }
                if (cd) {
                  bb = 0;
                  for (jc = oc.length; bb < jc; bb++) {
                    E = na = 0;
                    for (Y = va.length; E < Y; E++)
                      (mc = va[E]),
                        (Q = mb[mc]),
                        (S = oc[bb].vertices[Q.a]),
                        (T = oc[bb].vertices[Q.b]),
                        (U = oc[bb].vertices[Q.c]),
                        (Xa = qc[bb]),
                        (Xa[na] = S.x),
                        (Xa[na + 1] = S.y),
                        (Xa[na + 2] = S.z),
                        (Xa[na + 3] = T.x),
                        (Xa[na + 4] = T.y),
                        (Xa[na + 5] = T.z),
                        (Xa[na + 6] = U.x),
                        (Xa[na + 7] = U.y),
                        (Xa[na + 8] = U.z),
                        Ha.morphNormals &&
                          (hb
                            ? ((ec = Mc[bb].vertexNormals[mc]),
                              (Nb = ec.a),
                              (Ob = ec.b),
                              (Pb = ec.c))
                            : (Pb = Ob = Nb = Mc[bb].faceNormals[mc]),
                          (Ya = rc[bb]),
                          (Ya[na] = Nb.x),
                          (Ya[na + 1] = Nb.y),
                          (Ya[na + 2] = Nb.z),
                          (Ya[na + 3] = Ob.x),
                          (Ya[na + 4] = Ob.y),
                          (Ya[na + 5] = Ob.z),
                          (Ya[na + 6] = Pb.x),
                          (Ya[na + 7] = Pb.y),
                          (Ya[na + 8] = Pb.z)),
                        (na += 9);
                    E = 0;
                    for (Y = wa.length; E < Y; E++)
                      (mc = wa[E]),
                        (Q = mb[mc]),
                        (S = oc[bb].vertices[Q.a]),
                        (T = oc[bb].vertices[Q.b]),
                        (U = oc[bb].vertices[Q.c]),
                        (ra = oc[bb].vertices[Q.d]),
                        (Xa = qc[bb]),
                        (Xa[na] = S.x),
                        (Xa[na + 1] = S.y),
                        (Xa[na + 2] = S.z),
                        (Xa[na + 3] = T.x),
                        (Xa[na + 4] = T.y),
                        (Xa[na + 5] = T.z),
                        (Xa[na + 6] = U.x),
                        (Xa[na + 7] = U.y),
                        (Xa[na + 8] = U.z),
                        (Xa[na + 9] = ra.x),
                        (Xa[na + 10] = ra.y),
                        (Xa[na + 11] = ra.z),
                        Ha.morphNormals &&
                          (hb
                            ? ((ec = Mc[bb].vertexNormals[mc]),
                              (Nb = ec.a),
                              (Ob = ec.b),
                              (Pb = ec.c),
                              (yb = ec.d))
                            : (yb = Pb = Ob = Nb = Mc[bb].faceNormals[mc]),
                          (Ya = rc[bb]),
                          (Ya[na] = Nb.x),
                          (Ya[na + 1] = Nb.y),
                          (Ya[na + 2] = Nb.z),
                          (Ya[na + 3] = Ob.x),
                          (Ya[na + 4] = Ob.y),
                          (Ya[na + 5] = Ob.z),
                          (Ya[na + 6] = Pb.x),
                          (Ya[na + 7] = Pb.y),
                          (Ya[na + 8] = Pb.z),
                          (Ya[na + 9] = yb.x),
                          (Ya[na + 10] = yb.y),
                          (Ya[na + 11] = yb.z)),
                        (na += 12);
                    j.bindBuffer(
                      j.ARRAY_BUFFER,
                      ta.__webglMorphTargetsBuffers[bb]
                    );
                    j.bufferData(j.ARRAY_BUFFER, qc[bb], ua);
                    Ha.morphNormals &&
                      (j.bindBuffer(
                        j.ARRAY_BUFFER,
                        ta.__webglMorphNormalsBuffers[bb]
                      ),
                      j.bufferData(j.ARRAY_BUFFER, rc[bb], ua));
                  }
                }
                if (nc.length) {
                  E = 0;
                  for (Y = va.length; E < Y; E++)
                    (Q = mb[va[E]]),
                      (Tb = nc[Q.a]),
                      (Ub = nc[Q.b]),
                      (Vb = nc[Q.c]),
                      (Ma[ea] = Tb.x),
                      (Ma[ea + 1] = Tb.y),
                      (Ma[ea + 2] = Tb.z),
                      (Ma[ea + 3] = Tb.w),
                      (Ma[ea + 4] = Ub.x),
                      (Ma[ea + 5] = Ub.y),
                      (Ma[ea + 6] = Ub.z),
                      (Ma[ea + 7] = Ub.w),
                      (Ma[ea + 8] = Vb.x),
                      (Ma[ea + 9] = Vb.y),
                      (Ma[ea + 10] = Vb.z),
                      (Ma[ea + 11] = Vb.w),
                      (Wb = tc[Q.a]),
                      (Xb = tc[Q.b]),
                      (Yb = tc[Q.c]),
                      (La[ea] = Wb.x),
                      (La[ea + 1] = Wb.y),
                      (La[ea + 2] = Wb.z),
                      (La[ea + 3] = Wb.w),
                      (La[ea + 4] = Xb.x),
                      (La[ea + 5] = Xb.y),
                      (La[ea + 6] = Xb.z),
                      (La[ea + 7] = Xb.w),
                      (La[ea + 8] = Yb.x),
                      (La[ea + 9] = Yb.y),
                      (La[ea + 10] = Yb.z),
                      (La[ea + 11] = Yb.w),
                      (ea += 12);
                  E = 0;
                  for (Y = wa.length; E < Y; E++)
                    (Q = mb[wa[E]]),
                      (Tb = nc[Q.a]),
                      (Ub = nc[Q.b]),
                      (Vb = nc[Q.c]),
                      (Cb = nc[Q.d]),
                      (Ma[ea] = Tb.x),
                      (Ma[ea + 1] = Tb.y),
                      (Ma[ea + 2] = Tb.z),
                      (Ma[ea + 3] = Tb.w),
                      (Ma[ea + 4] = Ub.x),
                      (Ma[ea + 5] = Ub.y),
                      (Ma[ea + 6] = Ub.z),
                      (Ma[ea + 7] = Ub.w),
                      (Ma[ea + 8] = Vb.x),
                      (Ma[ea + 9] = Vb.y),
                      (Ma[ea + 10] = Vb.z),
                      (Ma[ea + 11] = Vb.w),
                      (Ma[ea + 12] = Cb.x),
                      (Ma[ea + 13] = Cb.y),
                      (Ma[ea + 14] = Cb.z),
                      (Ma[ea + 15] = Cb.w),
                      (Wb = tc[Q.a]),
                      (Xb = tc[Q.b]),
                      (Yb = tc[Q.c]),
                      (Db = tc[Q.d]),
                      (La[ea] = Wb.x),
                      (La[ea + 1] = Wb.y),
                      (La[ea + 2] = Wb.z),
                      (La[ea + 3] = Wb.w),
                      (La[ea + 4] = Xb.x),
                      (La[ea + 5] = Xb.y),
                      (La[ea + 6] = Xb.z),
                      (La[ea + 7] = Xb.w),
                      (La[ea + 8] = Yb.x),
                      (La[ea + 9] = Yb.y),
                      (La[ea + 10] = Yb.z),
                      (La[ea + 11] = Yb.w),
                      (La[ea + 12] = Db.x),
                      (La[ea + 13] = Db.y),
                      (La[ea + 14] = Db.z),
                      (La[ea + 15] = Db.w),
                      (ea += 16);
                  0 < ea &&
                    (j.bindBuffer(j.ARRAY_BUFFER, ta.__webglSkinIndicesBuffer),
                    j.bufferData(j.ARRAY_BUFFER, La, ua),
                    j.bindBuffer(j.ARRAY_BUFFER, ta.__webglSkinWeightsBuffer),
                    j.bufferData(j.ARRAY_BUFFER, Ma, ua));
                }
                if (bd && nb) {
                  E = 0;
                  for (Y = va.length; E < Y; E++)
                    (Q = mb[va[E]]),
                      (Ua = Q.vertexColors),
                      (Bb = Q.color),
                      3 === Ua.length && nb === THREE.VertexColors
                        ? ((Qb = Ua[0]), (Rb = Ua[1]), (Sb = Ua[2]))
                        : (Sb = Rb = Qb = Bb),
                      (db[Qa] = Qb.r),
                      (db[Qa + 1] = Qb.g),
                      (db[Qa + 2] = Qb.b),
                      (db[Qa + 3] = Rb.r),
                      (db[Qa + 4] = Rb.g),
                      (db[Qa + 5] = Rb.b),
                      (db[Qa + 6] = Sb.r),
                      (db[Qa + 7] = Sb.g),
                      (db[Qa + 8] = Sb.b),
                      (Qa += 9);
                  E = 0;
                  for (Y = wa.length; E < Y; E++)
                    (Q = mb[wa[E]]),
                      (Ua = Q.vertexColors),
                      (Bb = Q.color),
                      4 === Ua.length && nb === THREE.VertexColors
                        ? ((Qb = Ua[0]),
                          (Rb = Ua[1]),
                          (Sb = Ua[2]),
                          (zb = Ua[3]))
                        : (zb = Sb = Rb = Qb = Bb),
                      (db[Qa] = Qb.r),
                      (db[Qa + 1] = Qb.g),
                      (db[Qa + 2] = Qb.b),
                      (db[Qa + 3] = Rb.r),
                      (db[Qa + 4] = Rb.g),
                      (db[Qa + 5] = Rb.b),
                      (db[Qa + 6] = Sb.r),
                      (db[Qa + 7] = Sb.g),
                      (db[Qa + 8] = Sb.b),
                      (db[Qa + 9] = zb.r),
                      (db[Qa + 10] = zb.g),
                      (db[Qa + 11] = zb.b),
                      (Qa += 12);
                  0 < Qa &&
                    (j.bindBuffer(j.ARRAY_BUFFER, ta.__webglColorBuffer),
                    j.bufferData(j.ARRAY_BUFFER, db, ua));
                }
                if (Lc && ub.hasTangents) {
                  E = 0;
                  for (Y = va.length; E < Y; E++)
                    (Q = mb[va[E]]),
                      (eb = Q.vertexTangents),
                      (Za = eb[0]),
                      (fb = eb[1]),
                      (gb = eb[2]),
                      (Ka[Fa] = Za.x),
                      (Ka[Fa + 1] = Za.y),
                      (Ka[Fa + 2] = Za.z),
                      (Ka[Fa + 3] = Za.w),
                      (Ka[Fa + 4] = fb.x),
                      (Ka[Fa + 5] = fb.y),
                      (Ka[Fa + 6] = fb.z),
                      (Ka[Fa + 7] = fb.w),
                      (Ka[Fa + 8] = gb.x),
                      (Ka[Fa + 9] = gb.y),
                      (Ka[Fa + 10] = gb.z),
                      (Ka[Fa + 11] = gb.w),
                      (Fa += 12);
                  E = 0;
                  for (Y = wa.length; E < Y; E++)
                    (Q = mb[wa[E]]),
                      (eb = Q.vertexTangents),
                      (Za = eb[0]),
                      (fb = eb[1]),
                      (gb = eb[2]),
                      (tb = eb[3]),
                      (Ka[Fa] = Za.x),
                      (Ka[Fa + 1] = Za.y),
                      (Ka[Fa + 2] = Za.z),
                      (Ka[Fa + 3] = Za.w),
                      (Ka[Fa + 4] = fb.x),
                      (Ka[Fa + 5] = fb.y),
                      (Ka[Fa + 6] = fb.z),
                      (Ka[Fa + 7] = fb.w),
                      (Ka[Fa + 8] = gb.x),
                      (Ka[Fa + 9] = gb.y),
                      (Ka[Fa + 10] = gb.z),
                      (Ka[Fa + 11] = gb.w),
                      (Ka[Fa + 12] = tb.x),
                      (Ka[Fa + 13] = tb.y),
                      (Ka[Fa + 14] = tb.z),
                      (Ka[Fa + 15] = tb.w),
                      (Fa += 16);
                  j.bindBuffer(j.ARRAY_BUFFER, ta.__webglTangentBuffer);
                  j.bufferData(j.ARRAY_BUFFER, Ka, ua);
                }
                if (Kc && Va) {
                  E = 0;
                  for (Y = va.length; E < Y; E++)
                    if (
                      ((Q = mb[va[E]]),
                      (ab = Q.vertexNormals),
                      (kb = Q.normal),
                      3 === ab.length && hb)
                    )
                      for (Aa = 0; 3 > Aa; Aa++)
                        (lc = ab[Aa]),
                          (Fb[lb] = lc.x),
                          (Fb[lb + 1] = lc.y),
                          (Fb[lb + 2] = lc.z),
                          (lb += 3);
                    else
                      for (Aa = 0; 3 > Aa; Aa++)
                        (Fb[lb] = kb.x),
                          (Fb[lb + 1] = kb.y),
                          (Fb[lb + 2] = kb.z),
                          (lb += 3);
                  E = 0;
                  for (Y = wa.length; E < Y; E++)
                    if (
                      ((Q = mb[wa[E]]),
                      (ab = Q.vertexNormals),
                      (kb = Q.normal),
                      4 === ab.length && hb)
                    )
                      for (Aa = 0; 4 > Aa; Aa++)
                        (lc = ab[Aa]),
                          (Fb[lb] = lc.x),
                          (Fb[lb + 1] = lc.y),
                          (Fb[lb + 2] = lc.z),
                          (lb += 3);
                    else
                      for (Aa = 0; 4 > Aa; Aa++)
                        (Fb[lb] = kb.x),
                          (Fb[lb + 1] = kb.y),
                          (Fb[lb + 2] = kb.z),
                          (lb += 3);
                  j.bindBuffer(j.ARRAY_BUFFER, ta.__webglNormalBuffer);
                  j.bufferData(j.ARRAY_BUFFER, Fb, ua);
                }
                if (Bc && gd && ob) {
                  E = 0;
                  for (Y = va.length; E < Y; E++)
                    if (((Wa = va[E]), (pb = gd[Wa]), void 0 !== pb))
                      for (Aa = 0; 3 > Aa; Aa++)
                        (wc = pb[Aa]),
                          (Lb[fc] = wc.x),
                          (Lb[fc + 1] = wc.y),
                          (fc += 2);
                  E = 0;
                  for (Y = wa.length; E < Y; E++)
                    if (((Wa = wa[E]), (pb = gd[Wa]), void 0 !== pb))
                      for (Aa = 0; 4 > Aa; Aa++)
                        (wc = pb[Aa]),
                          (Lb[fc] = wc.x),
                          (Lb[fc + 1] = wc.y),
                          (fc += 2);
                  0 < fc &&
                    (j.bindBuffer(j.ARRAY_BUFFER, ta.__webglUVBuffer),
                    j.bufferData(j.ARRAY_BUFFER, Lb, ua));
                }
                if (Bc && hd && ob) {
                  E = 0;
                  for (Y = va.length; E < Y; E++)
                    if (((Wa = va[E]), (qb = hd[Wa]), void 0 !== qb))
                      for (Aa = 0; 3 > Aa; Aa++)
                        (xc = qb[Aa]),
                          (Mb[gc] = xc.x),
                          (Mb[gc + 1] = xc.y),
                          (gc += 2);
                  E = 0;
                  for (Y = wa.length; E < Y; E++)
                    if (((Wa = wa[E]), (qb = hd[Wa]), void 0 !== qb))
                      for (Aa = 0; 4 > Aa; Aa++)
                        (xc = qb[Aa]),
                          (Mb[gc] = xc.x),
                          (Mb[gc + 1] = xc.y),
                          (gc += 2);
                  0 < gc &&
                    (j.bindBuffer(j.ARRAY_BUFFER, ta.__webglUV2Buffer),
                    j.bufferData(j.ARRAY_BUFFER, Mb, ua));
                }
                if (Jc) {
                  E = 0;
                  for (Y = va.length; E < Y; E++)
                    (Zb[Eb] = Pa),
                      (Zb[Eb + 1] = Pa + 1),
                      (Zb[Eb + 2] = Pa + 2),
                      (Eb += 3),
                      (Ab[rb] = Pa),
                      (Ab[rb + 1] = Pa + 1),
                      (Ab[rb + 2] = Pa),
                      (Ab[rb + 3] = Pa + 2),
                      (Ab[rb + 4] = Pa + 1),
                      (Ab[rb + 5] = Pa + 2),
                      (rb += 6),
                      (Pa += 3);
                  E = 0;
                  for (Y = wa.length; E < Y; E++)
                    (Zb[Eb] = Pa),
                      (Zb[Eb + 1] = Pa + 1),
                      (Zb[Eb + 2] = Pa + 3),
                      (Zb[Eb + 3] = Pa + 1),
                      (Zb[Eb + 4] = Pa + 2),
                      (Zb[Eb + 5] = Pa + 3),
                      (Eb += 6),
                      (Ab[rb] = Pa),
                      (Ab[rb + 1] = Pa + 1),
                      (Ab[rb + 2] = Pa),
                      (Ab[rb + 3] = Pa + 3),
                      (Ab[rb + 4] = Pa + 1),
                      (Ab[rb + 5] = Pa + 2),
                      (Ab[rb + 6] = Pa + 2),
                      (Ab[rb + 7] = Pa + 3),
                      (rb += 8),
                      (Pa += 4);
                  j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, ta.__webglFaceBuffer);
                  j.bufferData(j.ELEMENT_ARRAY_BUFFER, Zb, ua);
                  j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, ta.__webglLineBuffer);
                  j.bufferData(j.ELEMENT_ARRAY_BUFFER, Ab, ua);
                }
                if (fd) {
                  Aa = 0;
                  for (dc = fd.length; Aa < dc; Aa++)
                    if (((v = fd[Aa]), v.__original.needsUpdate)) {
                      w = 0;
                      if (1 === v.size)
                        if (void 0 === v.boundTo || "vertices" === v.boundTo) {
                          E = 0;
                          for (Y = va.length; E < Y; E++)
                            (Q = mb[va[E]]),
                              (v.array[w] = v.value[Q.a]),
                              (v.array[w + 1] = v.value[Q.b]),
                              (v.array[w + 2] = v.value[Q.c]),
                              (w += 3);
                          E = 0;
                          for (Y = wa.length; E < Y; E++)
                            (Q = mb[wa[E]]),
                              (v.array[w] = v.value[Q.a]),
                              (v.array[w + 1] = v.value[Q.b]),
                              (v.array[w + 2] = v.value[Q.c]),
                              (v.array[w + 3] = v.value[Q.d]),
                              (w += 4);
                        } else {
                          if ("faces" === v.boundTo) {
                            E = 0;
                            for (Y = va.length; E < Y; E++)
                              (Ba = v.value[va[E]]),
                                (v.array[w] = Ba),
                                (v.array[w + 1] = Ba),
                                (v.array[w + 2] = Ba),
                                (w += 3);
                            E = 0;
                            for (Y = wa.length; E < Y; E++)
                              (Ba = v.value[wa[E]]),
                                (v.array[w] = Ba),
                                (v.array[w + 1] = Ba),
                                (v.array[w + 2] = Ba),
                                (v.array[w + 3] = Ba),
                                (w += 4);
                          }
                        }
                      else if (2 === v.size)
                        if (void 0 === v.boundTo || "vertices" === v.boundTo) {
                          E = 0;
                          for (Y = va.length; E < Y; E++)
                            (Q = mb[va[E]]),
                              (S = v.value[Q.a]),
                              (T = v.value[Q.b]),
                              (U = v.value[Q.c]),
                              (v.array[w] = S.x),
                              (v.array[w + 1] = S.y),
                              (v.array[w + 2] = T.x),
                              (v.array[w + 3] = T.y),
                              (v.array[w + 4] = U.x),
                              (v.array[w + 5] = U.y),
                              (w += 6);
                          E = 0;
                          for (Y = wa.length; E < Y; E++)
                            (Q = mb[wa[E]]),
                              (S = v.value[Q.a]),
                              (T = v.value[Q.b]),
                              (U = v.value[Q.c]),
                              (ra = v.value[Q.d]),
                              (v.array[w] = S.x),
                              (v.array[w + 1] = S.y),
                              (v.array[w + 2] = T.x),
                              (v.array[w + 3] = T.y),
                              (v.array[w + 4] = U.x),
                              (v.array[w + 5] = U.y),
                              (v.array[w + 6] = ra.x),
                              (v.array[w + 7] = ra.y),
                              (w += 8);
                        } else {
                          if ("faces" === v.boundTo) {
                            E = 0;
                            for (Y = va.length; E < Y; E++)
                              (U = T = S = Ba = v.value[va[E]]),
                                (v.array[w] = S.x),
                                (v.array[w + 1] = S.y),
                                (v.array[w + 2] = T.x),
                                (v.array[w + 3] = T.y),
                                (v.array[w + 4] = U.x),
                                (v.array[w + 5] = U.y),
                                (w += 6);
                            E = 0;
                            for (Y = wa.length; E < Y; E++)
                              (ra = U = T = S = Ba = v.value[wa[E]]),
                                (v.array[w] = S.x),
                                (v.array[w + 1] = S.y),
                                (v.array[w + 2] = T.x),
                                (v.array[w + 3] = T.y),
                                (v.array[w + 4] = U.x),
                                (v.array[w + 5] = U.y),
                                (v.array[w + 6] = ra.x),
                                (v.array[w + 7] = ra.y),
                                (w += 8);
                          }
                        }
                      else if (3 === v.size) {
                        var ba;
                        ba = "c" === v.type ? ["r", "g", "b"] : ["x", "y", "z"];
                        if (void 0 === v.boundTo || "vertices" === v.boundTo) {
                          E = 0;
                          for (Y = va.length; E < Y; E++)
                            (Q = mb[va[E]]),
                              (S = v.value[Q.a]),
                              (T = v.value[Q.b]),
                              (U = v.value[Q.c]),
                              (v.array[w] = S[ba[0]]),
                              (v.array[w + 1] = S[ba[1]]),
                              (v.array[w + 2] = S[ba[2]]),
                              (v.array[w + 3] = T[ba[0]]),
                              (v.array[w + 4] = T[ba[1]]),
                              (v.array[w + 5] = T[ba[2]]),
                              (v.array[w + 6] = U[ba[0]]),
                              (v.array[w + 7] = U[ba[1]]),
                              (v.array[w + 8] = U[ba[2]]),
                              (w += 9);
                          E = 0;
                          for (Y = wa.length; E < Y; E++)
                            (Q = mb[wa[E]]),
                              (S = v.value[Q.a]),
                              (T = v.value[Q.b]),
                              (U = v.value[Q.c]),
                              (ra = v.value[Q.d]),
                              (v.array[w] = S[ba[0]]),
                              (v.array[w + 1] = S[ba[1]]),
                              (v.array[w + 2] = S[ba[2]]),
                              (v.array[w + 3] = T[ba[0]]),
                              (v.array[w + 4] = T[ba[1]]),
                              (v.array[w + 5] = T[ba[2]]),
                              (v.array[w + 6] = U[ba[0]]),
                              (v.array[w + 7] = U[ba[1]]),
                              (v.array[w + 8] = U[ba[2]]),
                              (v.array[w + 9] = ra[ba[0]]),
                              (v.array[w + 10] = ra[ba[1]]),
                              (v.array[w + 11] = ra[ba[2]]),
                              (w += 12);
                        } else if ("faces" === v.boundTo) {
                          E = 0;
                          for (Y = va.length; E < Y; E++)
                            (U = T = S = Ba = v.value[va[E]]),
                              (v.array[w] = S[ba[0]]),
                              (v.array[w + 1] = S[ba[1]]),
                              (v.array[w + 2] = S[ba[2]]),
                              (v.array[w + 3] = T[ba[0]]),
                              (v.array[w + 4] = T[ba[1]]),
                              (v.array[w + 5] = T[ba[2]]),
                              (v.array[w + 6] = U[ba[0]]),
                              (v.array[w + 7] = U[ba[1]]),
                              (v.array[w + 8] = U[ba[2]]),
                              (w += 9);
                          E = 0;
                          for (Y = wa.length; E < Y; E++)
                            (ra = U = T = S = Ba = v.value[wa[E]]),
                              (v.array[w] = S[ba[0]]),
                              (v.array[w + 1] = S[ba[1]]),
                              (v.array[w + 2] = S[ba[2]]),
                              (v.array[w + 3] = T[ba[0]]),
                              (v.array[w + 4] = T[ba[1]]),
                              (v.array[w + 5] = T[ba[2]]),
                              (v.array[w + 6] = U[ba[0]]),
                              (v.array[w + 7] = U[ba[1]]),
                              (v.array[w + 8] = U[ba[2]]),
                              (v.array[w + 9] = ra[ba[0]]),
                              (v.array[w + 10] = ra[ba[1]]),
                              (v.array[w + 11] = ra[ba[2]]),
                              (w += 12);
                        } else if ("faceVertices" === v.boundTo) {
                          E = 0;
                          for (Y = va.length; E < Y; E++)
                            (Ba = v.value[va[E]]),
                              (S = Ba[0]),
                              (T = Ba[1]),
                              (U = Ba[2]),
                              (v.array[w] = S[ba[0]]),
                              (v.array[w + 1] = S[ba[1]]),
                              (v.array[w + 2] = S[ba[2]]),
                              (v.array[w + 3] = T[ba[0]]),
                              (v.array[w + 4] = T[ba[1]]),
                              (v.array[w + 5] = T[ba[2]]),
                              (v.array[w + 6] = U[ba[0]]),
                              (v.array[w + 7] = U[ba[1]]),
                              (v.array[w + 8] = U[ba[2]]),
                              (w += 9);
                          E = 0;
                          for (Y = wa.length; E < Y; E++)
                            (Ba = v.value[wa[E]]),
                              (S = Ba[0]),
                              (T = Ba[1]),
                              (U = Ba[2]),
                              (ra = Ba[3]),
                              (v.array[w] = S[ba[0]]),
                              (v.array[w + 1] = S[ba[1]]),
                              (v.array[w + 2] = S[ba[2]]),
                              (v.array[w + 3] = T[ba[0]]),
                              (v.array[w + 4] = T[ba[1]]),
                              (v.array[w + 5] = T[ba[2]]),
                              (v.array[w + 6] = U[ba[0]]),
                              (v.array[w + 7] = U[ba[1]]),
                              (v.array[w + 8] = U[ba[2]]),
                              (v.array[w + 9] = ra[ba[0]]),
                              (v.array[w + 10] = ra[ba[1]]),
                              (v.array[w + 11] = ra[ba[2]]),
                              (w += 12);
                        }
                      } else if (4 === v.size)
                        if (void 0 === v.boundTo || "vertices" === v.boundTo) {
                          E = 0;
                          for (Y = va.length; E < Y; E++)
                            (Q = mb[va[E]]),
                              (S = v.value[Q.a]),
                              (T = v.value[Q.b]),
                              (U = v.value[Q.c]),
                              (v.array[w] = S.x),
                              (v.array[w + 1] = S.y),
                              (v.array[w + 2] = S.z),
                              (v.array[w + 3] = S.w),
                              (v.array[w + 4] = T.x),
                              (v.array[w + 5] = T.y),
                              (v.array[w + 6] = T.z),
                              (v.array[w + 7] = T.w),
                              (v.array[w + 8] = U.x),
                              (v.array[w + 9] = U.y),
                              (v.array[w + 10] = U.z),
                              (v.array[w + 11] = U.w),
                              (w += 12);
                          E = 0;
                          for (Y = wa.length; E < Y; E++)
                            (Q = mb[wa[E]]),
                              (S = v.value[Q.a]),
                              (T = v.value[Q.b]),
                              (U = v.value[Q.c]),
                              (ra = v.value[Q.d]),
                              (v.array[w] = S.x),
                              (v.array[w + 1] = S.y),
                              (v.array[w + 2] = S.z),
                              (v.array[w + 3] = S.w),
                              (v.array[w + 4] = T.x),
                              (v.array[w + 5] = T.y),
                              (v.array[w + 6] = T.z),
                              (v.array[w + 7] = T.w),
                              (v.array[w + 8] = U.x),
                              (v.array[w + 9] = U.y),
                              (v.array[w + 10] = U.z),
                              (v.array[w + 11] = U.w),
                              (v.array[w + 12] = ra.x),
                              (v.array[w + 13] = ra.y),
                              (v.array[w + 14] = ra.z),
                              (v.array[w + 15] = ra.w),
                              (w += 16);
                        } else if ("faces" === v.boundTo) {
                          E = 0;
                          for (Y = va.length; E < Y; E++)
                            (U = T = S = Ba = v.value[va[E]]),
                              (v.array[w] = S.x),
                              (v.array[w + 1] = S.y),
                              (v.array[w + 2] = S.z),
                              (v.array[w + 3] = S.w),
                              (v.array[w + 4] = T.x),
                              (v.array[w + 5] = T.y),
                              (v.array[w + 6] = T.z),
                              (v.array[w + 7] = T.w),
                              (v.array[w + 8] = U.x),
                              (v.array[w + 9] = U.y),
                              (v.array[w + 10] = U.z),
                              (v.array[w + 11] = U.w),
                              (w += 12);
                          E = 0;
                          for (Y = wa.length; E < Y; E++)
                            (ra = U = T = S = Ba = v.value[wa[E]]),
                              (v.array[w] = S.x),
                              (v.array[w + 1] = S.y),
                              (v.array[w + 2] = S.z),
                              (v.array[w + 3] = S.w),
                              (v.array[w + 4] = T.x),
                              (v.array[w + 5] = T.y),
                              (v.array[w + 6] = T.z),
                              (v.array[w + 7] = T.w),
                              (v.array[w + 8] = U.x),
                              (v.array[w + 9] = U.y),
                              (v.array[w + 10] = U.z),
                              (v.array[w + 11] = U.w),
                              (v.array[w + 12] = ra.x),
                              (v.array[w + 13] = ra.y),
                              (v.array[w + 14] = ra.z),
                              (v.array[w + 15] = ra.w),
                              (w += 16);
                        } else if ("faceVertices" === v.boundTo) {
                          E = 0;
                          for (Y = va.length; E < Y; E++)
                            (Ba = v.value[va[E]]),
                              (S = Ba[0]),
                              (T = Ba[1]),
                              (U = Ba[2]),
                              (v.array[w] = S.x),
                              (v.array[w + 1] = S.y),
                              (v.array[w + 2] = S.z),
                              (v.array[w + 3] = S.w),
                              (v.array[w + 4] = T.x),
                              (v.array[w + 5] = T.y),
                              (v.array[w + 6] = T.z),
                              (v.array[w + 7] = T.w),
                              (v.array[w + 8] = U.x),
                              (v.array[w + 9] = U.y),
                              (v.array[w + 10] = U.z),
                              (v.array[w + 11] = U.w),
                              (w += 12);
                          E = 0;
                          for (Y = wa.length; E < Y; E++)
                            (Ba = v.value[wa[E]]),
                              (S = Ba[0]),
                              (T = Ba[1]),
                              (U = Ba[2]),
                              (ra = Ba[3]),
                              (v.array[w] = S.x),
                              (v.array[w + 1] = S.y),
                              (v.array[w + 2] = S.z),
                              (v.array[w + 3] = S.w),
                              (v.array[w + 4] = T.x),
                              (v.array[w + 5] = T.y),
                              (v.array[w + 6] = T.z),
                              (v.array[w + 7] = T.w),
                              (v.array[w + 8] = U.x),
                              (v.array[w + 9] = U.y),
                              (v.array[w + 10] = U.z),
                              (v.array[w + 11] = U.w),
                              (v.array[w + 12] = ra.x),
                              (v.array[w + 13] = ra.y),
                              (v.array[w + 14] = ra.z),
                              (v.array[w + 15] = ra.w),
                              (w += 16);
                        }
                      j.bindBuffer(j.ARRAY_BUFFER, v.buffer);
                      j.bufferData(j.ARRAY_BUFFER, v.array, ua);
                    }
                }
                Ra &&
                  (delete ta.__inittedArrays,
                  delete ta.__colorArray,
                  delete ta.__normalArray,
                  delete ta.__tangentArray,
                  delete ta.__uvArray,
                  delete ta.__uv2Array,
                  delete ta.__faceArray,
                  delete ta.__vertexArray,
                  delete ta.__lineArray,
                  delete ta.__skinIndexArray,
                  delete ta.__skinWeightArray);
              }
            }
          W.verticesNeedUpdate = !1;
          W.morphTargetsNeedUpdate = !1;
          W.elementsNeedUpdate = !1;
          W.uvsNeedUpdate = !1;
          W.normalsNeedUpdate = !1;
          W.colorsNeedUpdate = !1;
          W.tangentsNeedUpdate = !1;
          W.buffersNeedUpdate = !1;
          ma.attributes && B(ma);
        }
      else if (za instanceof THREE.Ribbon) {
        ma = e(za, W);
        Da = ma.attributes && u(ma);
        if (
          W.verticesNeedUpdate ||
          W.colorsNeedUpdate ||
          W.normalsNeedUpdate ||
          Da
        ) {
          var Gb = W,
            Nc = j.DYNAMIC_DRAW,
            Cc = void 0,
            Dc = void 0,
            Ec = void 0,
            Oc = void 0,
            Ca = void 0,
            Pc = void 0,
            Qc = void 0,
            Rc = void 0,
            nd = void 0,
            ib = void 0,
            yc = void 0,
            Ia = void 0,
            vb = void 0,
            od = Gb.vertices,
            pd = Gb.colors,
            qd = Gb.normals,
            dd = od.length,
            zd = pd.length,
            Ad = qd.length,
            Sc = Gb.__vertexArray,
            Tc = Gb.__colorArray,
            Uc = Gb.__normalArray,
            Bd = Gb.colorsNeedUpdate,
            Cd = Gb.normalsNeedUpdate,
            id = Gb.__webglCustomAttributesList;
          if (Gb.verticesNeedUpdate) {
            for (Cc = 0; Cc < dd; Cc++)
              (Oc = od[Cc]),
                (Ca = 3 * Cc),
                (Sc[Ca] = Oc.x),
                (Sc[Ca + 1] = Oc.y),
                (Sc[Ca + 2] = Oc.z);
            j.bindBuffer(j.ARRAY_BUFFER, Gb.__webglVertexBuffer);
            j.bufferData(j.ARRAY_BUFFER, Sc, Nc);
          }
          if (Bd) {
            for (Dc = 0; Dc < zd; Dc++)
              (Pc = pd[Dc]),
                (Ca = 3 * Dc),
                (Tc[Ca] = Pc.r),
                (Tc[Ca + 1] = Pc.g),
                (Tc[Ca + 2] = Pc.b);
            j.bindBuffer(j.ARRAY_BUFFER, Gb.__webglColorBuffer);
            j.bufferData(j.ARRAY_BUFFER, Tc, Nc);
          }
          if (Cd) {
            for (Ec = 0; Ec < Ad; Ec++)
              (Qc = qd[Ec]),
                (Ca = 3 * Ec),
                (Uc[Ca] = Qc.x),
                (Uc[Ca + 1] = Qc.y),
                (Uc[Ca + 2] = Qc.z);
            j.bindBuffer(j.ARRAY_BUFFER, Gb.__webglNormalBuffer);
            j.bufferData(j.ARRAY_BUFFER, Uc, Nc);
          }
          if (id) {
            Rc = 0;
            for (nd = id.length; Rc < nd; Rc++)
              if (
                ((Ia = id[Rc]),
                Ia.needsUpdate &&
                  (void 0 === Ia.boundTo || "vertices" === Ia.boundTo))
              ) {
                Ca = 0;
                yc = Ia.value.length;
                if (1 === Ia.size)
                  for (ib = 0; ib < yc; ib++) Ia.array[ib] = Ia.value[ib];
                else if (2 === Ia.size)
                  for (ib = 0; ib < yc; ib++)
                    (vb = Ia.value[ib]),
                      (Ia.array[Ca] = vb.x),
                      (Ia.array[Ca + 1] = vb.y),
                      (Ca += 2);
                else if (3 === Ia.size)
                  if ("c" === Ia.type)
                    for (ib = 0; ib < yc; ib++)
                      (vb = Ia.value[ib]),
                        (Ia.array[Ca] = vb.r),
                        (Ia.array[Ca + 1] = vb.g),
                        (Ia.array[Ca + 2] = vb.b),
                        (Ca += 3);
                  else
                    for (ib = 0; ib < yc; ib++)
                      (vb = Ia.value[ib]),
                        (Ia.array[Ca] = vb.x),
                        (Ia.array[Ca + 1] = vb.y),
                        (Ia.array[Ca + 2] = vb.z),
                        (Ca += 3);
                else if (4 === Ia.size)
                  for (ib = 0; ib < yc; ib++)
                    (vb = Ia.value[ib]),
                      (Ia.array[Ca] = vb.x),
                      (Ia.array[Ca + 1] = vb.y),
                      (Ia.array[Ca + 2] = vb.z),
                      (Ia.array[Ca + 3] = vb.w),
                      (Ca += 4);
                j.bindBuffer(j.ARRAY_BUFFER, Ia.buffer);
                j.bufferData(j.ARRAY_BUFFER, Ia.array, Nc);
              }
          }
        }
        W.verticesNeedUpdate = !1;
        W.colorsNeedUpdate = !1;
        W.normalsNeedUpdate = !1;
        ma.attributes && B(ma);
      } else if (za instanceof THREE.Line) {
        ma = e(za, W);
        Da = ma.attributes && u(ma);
        if (
          W.verticesNeedUpdate ||
          W.colorsNeedUpdate ||
          W.lineDistancesNeedUpdate ||
          Da
        ) {
          var Hb = W,
            Vc = j.DYNAMIC_DRAW,
            Fc = void 0,
            Gc = void 0,
            Hc = void 0,
            Wc = void 0,
            Na = void 0,
            Xc = void 0,
            rd = Hb.vertices,
            sd = Hb.colors,
            td = Hb.lineDistances,
            Dd = rd.length,
            Ed = sd.length,
            Fd = td.length,
            Yc = Hb.__vertexArray,
            Zc = Hb.__colorArray,
            ud = Hb.__lineDistanceArray,
            Gd = Hb.colorsNeedUpdate,
            Hd = Hb.lineDistancesNeedUpdate,
            jd = Hb.__webglCustomAttributesList,
            $c = void 0,
            vd = void 0,
            jb = void 0,
            zc = void 0,
            wb = void 0,
            Ja = void 0;
          if (Hb.verticesNeedUpdate) {
            for (Fc = 0; Fc < Dd; Fc++)
              (Wc = rd[Fc]),
                (Na = 3 * Fc),
                (Yc[Na] = Wc.x),
                (Yc[Na + 1] = Wc.y),
                (Yc[Na + 2] = Wc.z);
            j.bindBuffer(j.ARRAY_BUFFER, Hb.__webglVertexBuffer);
            j.bufferData(j.ARRAY_BUFFER, Yc, Vc);
          }
          if (Gd) {
            for (Gc = 0; Gc < Ed; Gc++)
              (Xc = sd[Gc]),
                (Na = 3 * Gc),
                (Zc[Na] = Xc.r),
                (Zc[Na + 1] = Xc.g),
                (Zc[Na + 2] = Xc.b);
            j.bindBuffer(j.ARRAY_BUFFER, Hb.__webglColorBuffer);
            j.bufferData(j.ARRAY_BUFFER, Zc, Vc);
          }
          if (Hd) {
            for (Hc = 0; Hc < Fd; Hc++) ud[Hc] = td[Hc];
            j.bindBuffer(j.ARRAY_BUFFER, Hb.__webglLineDistanceBuffer);
            j.bufferData(j.ARRAY_BUFFER, ud, Vc);
          }
          if (jd) {
            $c = 0;
            for (vd = jd.length; $c < vd; $c++)
              if (
                ((Ja = jd[$c]),
                Ja.needsUpdate &&
                  (void 0 === Ja.boundTo || "vertices" === Ja.boundTo))
              ) {
                Na = 0;
                zc = Ja.value.length;
                if (1 === Ja.size)
                  for (jb = 0; jb < zc; jb++) Ja.array[jb] = Ja.value[jb];
                else if (2 === Ja.size)
                  for (jb = 0; jb < zc; jb++)
                    (wb = Ja.value[jb]),
                      (Ja.array[Na] = wb.x),
                      (Ja.array[Na + 1] = wb.y),
                      (Na += 2);
                else if (3 === Ja.size)
                  if ("c" === Ja.type)
                    for (jb = 0; jb < zc; jb++)
                      (wb = Ja.value[jb]),
                        (Ja.array[Na] = wb.r),
                        (Ja.array[Na + 1] = wb.g),
                        (Ja.array[Na + 2] = wb.b),
                        (Na += 3);
                  else
                    for (jb = 0; jb < zc; jb++)
                      (wb = Ja.value[jb]),
                        (Ja.array[Na] = wb.x),
                        (Ja.array[Na + 1] = wb.y),
                        (Ja.array[Na + 2] = wb.z),
                        (Na += 3);
                else if (4 === Ja.size)
                  for (jb = 0; jb < zc; jb++)
                    (wb = Ja.value[jb]),
                      (Ja.array[Na] = wb.x),
                      (Ja.array[Na + 1] = wb.y),
                      (Ja.array[Na + 2] = wb.z),
                      (Ja.array[Na + 3] = wb.w),
                      (Na += 4);
                j.bindBuffer(j.ARRAY_BUFFER, Ja.buffer);
                j.bufferData(j.ARRAY_BUFFER, Ja.array, Vc);
              }
          }
        }
        W.verticesNeedUpdate = !1;
        W.colorsNeedUpdate = !1;
        W.lineDistancesNeedUpdate = !1;
        ma.attributes && B(ma);
      } else if (za instanceof THREE.ParticleSystem)
        if (W instanceof THREE.BufferGeometry)
          (W.verticesNeedUpdate || W.colorsNeedUpdate) &&
            i(W, j.DYNAMIC_DRAW, !W.dynamic),
            (W.verticesNeedUpdate = !1),
            (W.colorsNeedUpdate = !1);
        else {
          ma = e(za, W);
          Da = ma.attributes && u(ma);
          if (
            W.verticesNeedUpdate ||
            W.colorsNeedUpdate ||
            za.sortParticles ||
            Da
          ) {
            var $b = W,
              kd = j.DYNAMIC_DRAW,
              Ic = za,
              xb = void 0,
              ac = void 0,
              bc = void 0,
              ia = void 0,
              cc = void 0,
              pc = void 0,
              ad = $b.vertices,
              ld = ad.length,
              md = $b.colors,
              wd = md.length,
              uc = $b.__vertexArray,
              vc = $b.__colorArray,
              hc = $b.__sortArray,
              xd = $b.verticesNeedUpdate,
              yd = $b.colorsNeedUpdate,
              ic = $b.__webglCustomAttributesList,
              Jb = void 0,
              Ac = void 0,
              qa = void 0,
              Kb = void 0,
              Ga = void 0,
              ha = void 0;
            if (Ic.sortParticles) {
              sb.copy(kc);
              sb.multiplySelf(Ic.matrixWorld);
              for (xb = 0; xb < ld; xb++)
                (bc = ad[xb]),
                  Ib.copy(bc),
                  sb.multiplyVector3(Ib),
                  (hc[xb] = [Ib.z, xb]);
              hc.sort(m);
              for (xb = 0; xb < ld; xb++)
                (bc = ad[hc[xb][1]]),
                  (ia = 3 * xb),
                  (uc[ia] = bc.x),
                  (uc[ia + 1] = bc.y),
                  (uc[ia + 2] = bc.z);
              for (ac = 0; ac < wd; ac++)
                (ia = 3 * ac),
                  (pc = md[hc[ac][1]]),
                  (vc[ia] = pc.r),
                  (vc[ia + 1] = pc.g),
                  (vc[ia + 2] = pc.b);
              if (ic) {
                Jb = 0;
                for (Ac = ic.length; Jb < Ac; Jb++)
                  if (
                    ((ha = ic[Jb]),
                    void 0 === ha.boundTo || "vertices" === ha.boundTo)
                  )
                    if (((ia = 0), (Kb = ha.value.length), 1 === ha.size))
                      for (qa = 0; qa < Kb; qa++)
                        (cc = hc[qa][1]), (ha.array[qa] = ha.value[cc]);
                    else if (2 === ha.size)
                      for (qa = 0; qa < Kb; qa++)
                        (cc = hc[qa][1]),
                          (Ga = ha.value[cc]),
                          (ha.array[ia] = Ga.x),
                          (ha.array[ia + 1] = Ga.y),
                          (ia += 2);
                    else if (3 === ha.size)
                      if ("c" === ha.type)
                        for (qa = 0; qa < Kb; qa++)
                          (cc = hc[qa][1]),
                            (Ga = ha.value[cc]),
                            (ha.array[ia] = Ga.r),
                            (ha.array[ia + 1] = Ga.g),
                            (ha.array[ia + 2] = Ga.b),
                            (ia += 3);
                      else
                        for (qa = 0; qa < Kb; qa++)
                          (cc = hc[qa][1]),
                            (Ga = ha.value[cc]),
                            (ha.array[ia] = Ga.x),
                            (ha.array[ia + 1] = Ga.y),
                            (ha.array[ia + 2] = Ga.z),
                            (ia += 3);
                    else if (4 === ha.size)
                      for (qa = 0; qa < Kb; qa++)
                        (cc = hc[qa][1]),
                          (Ga = ha.value[cc]),
                          (ha.array[ia] = Ga.x),
                          (ha.array[ia + 1] = Ga.y),
                          (ha.array[ia + 2] = Ga.z),
                          (ha.array[ia + 3] = Ga.w),
                          (ia += 4);
              }
            } else {
              if (xd)
                for (xb = 0; xb < ld; xb++)
                  (bc = ad[xb]),
                    (ia = 3 * xb),
                    (uc[ia] = bc.x),
                    (uc[ia + 1] = bc.y),
                    (uc[ia + 2] = bc.z);
              if (yd)
                for (ac = 0; ac < wd; ac++)
                  (pc = md[ac]),
                    (ia = 3 * ac),
                    (vc[ia] = pc.r),
                    (vc[ia + 1] = pc.g),
                    (vc[ia + 2] = pc.b);
              if (ic) {
                Jb = 0;
                for (Ac = ic.length; Jb < Ac; Jb++)
                  if (
                    ((ha = ic[Jb]),
                    ha.needsUpdate &&
                      (void 0 === ha.boundTo || "vertices" === ha.boundTo))
                  )
                    if (((Kb = ha.value.length), (ia = 0), 1 === ha.size))
                      for (qa = 0; qa < Kb; qa++) ha.array[qa] = ha.value[qa];
                    else if (2 === ha.size)
                      for (qa = 0; qa < Kb; qa++)
                        (Ga = ha.value[qa]),
                          (ha.array[ia] = Ga.x),
                          (ha.array[ia + 1] = Ga.y),
                          (ia += 2);
                    else if (3 === ha.size)
                      if ("c" === ha.type)
                        for (qa = 0; qa < Kb; qa++)
                          (Ga = ha.value[qa]),
                            (ha.array[ia] = Ga.r),
                            (ha.array[ia + 1] = Ga.g),
                            (ha.array[ia + 2] = Ga.b),
                            (ia += 3);
                      else
                        for (qa = 0; qa < Kb; qa++)
                          (Ga = ha.value[qa]),
                            (ha.array[ia] = Ga.x),
                            (ha.array[ia + 1] = Ga.y),
                            (ha.array[ia + 2] = Ga.z),
                            (ia += 3);
                    else if (4 === ha.size)
                      for (qa = 0; qa < Kb; qa++)
                        (Ga = ha.value[qa]),
                          (ha.array[ia] = Ga.x),
                          (ha.array[ia + 1] = Ga.y),
                          (ha.array[ia + 2] = Ga.z),
                          (ha.array[ia + 3] = Ga.w),
                          (ia += 4);
              }
            }
            if (xd || Ic.sortParticles)
              j.bindBuffer(j.ARRAY_BUFFER, $b.__webglVertexBuffer),
                j.bufferData(j.ARRAY_BUFFER, uc, kd);
            if (yd || Ic.sortParticles)
              j.bindBuffer(j.ARRAY_BUFFER, $b.__webglColorBuffer),
                j.bufferData(j.ARRAY_BUFFER, vc, kd);
            if (ic) {
              Jb = 0;
              for (Ac = ic.length; Jb < Ac; Jb++)
                if (((ha = ic[Jb]), ha.needsUpdate || Ic.sortParticles))
                  j.bindBuffer(j.ARRAY_BUFFER, ha.buffer),
                    j.bufferData(j.ARRAY_BUFFER, ha.array, kd);
            }
          }
          W.verticesNeedUpdate = !1;
          W.colorsNeedUpdate = !1;
          ma.attributes && B(ma);
        }
    }
  };
  this.initMaterial = function (a, b, c, d) {
    var e, f, g, h;
    a.addEventListener("dispose", ob);
    var i, k, m, n, l;
    a instanceof THREE.MeshDepthMaterial
      ? (l = "depth")
      : a instanceof THREE.MeshNormalMaterial
      ? (l = "normal")
      : a instanceof THREE.MeshBasicMaterial
      ? (l = "basic")
      : a instanceof THREE.MeshLambertMaterial
      ? (l = "lambert")
      : a instanceof THREE.MeshPhongMaterial
      ? (l = "phong")
      : a instanceof THREE.LineBasicMaterial
      ? (l = "basic")
      : a instanceof THREE.LineDashedMaterial
      ? (l = "dashed")
      : a instanceof THREE.ParticleBasicMaterial && (l = "particle_basic");
    if (l) {
      var p = THREE.ShaderLib[l];
      a.uniforms = THREE.UniformsUtils.clone(p.uniforms);
      a.vertexShader = p.vertexShader;
      a.fragmentShader = p.fragmentShader;
    }
    var r, s, q;
    e = g = s = q = p = 0;
    for (f = b.length; e < f; e++)
      (r = b[e]),
        r.onlyShadow ||
          (r instanceof THREE.DirectionalLight && g++,
          r instanceof THREE.PointLight && s++,
          r instanceof THREE.SpotLight && q++,
          r instanceof THREE.HemisphereLight && p++);
    e = g;
    f = s;
    g = q;
    h = p;
    p = r = 0;
    for (q = b.length; p < q; p++)
      (s = b[p]),
        s.castShadow &&
          (s instanceof THREE.SpotLight && r++,
          s instanceof THREE.DirectionalLight && !s.shadowCascade && r++);
    n = r;
    gb && d && d.useVertexTexture
      ? (m = 1024)
      : ((b = j.getParameter(j.MAX_VERTEX_UNIFORM_VECTORS)),
        (b = Math.floor((b - 20) / 4)),
        void 0 !== d &&
          d instanceof THREE.SkinnedMesh &&
          ((b = Math.min(d.bones.length, b)),
          b < d.bones.length &&
            console.warn(
              "WebGLRenderer: too many bones - " +
                d.bones.length +
                ", this GPU supports just " +
                b +
                " (try OpenGL instead of ANGLE)"
            )),
        (m = b));
    a: {
      s = a.fragmentShader;
      q = a.vertexShader;
      p = a.uniforms;
      b = a.attributes;
      r = a.defines;
      var c = {
          map: !!a.map,
          envMap: !!a.envMap,
          lightMap: !!a.lightMap,
          bumpMap: !!a.bumpMap,
          normalMap: !!a.normalMap,
          specularMap: !!a.specularMap,
          vertexColors: a.vertexColors,
          fog: c,
          useFog: a.fog,
          fogExp: c instanceof THREE.FogExp2,
          sizeAttenuation: a.sizeAttenuation,
          skinning: a.skinning,
          maxBones: m,
          useVertexTexture: gb && d && d.useVertexTexture,
          boneTextureWidth: d && d.boneTextureWidth,
          boneTextureHeight: d && d.boneTextureHeight,
          morphTargets: a.morphTargets,
          morphNormals: a.morphNormals,
          maxMorphTargets: this.maxMorphTargets,
          maxMorphNormals: this.maxMorphNormals,
          maxDirLights: e,
          maxPointLights: f,
          maxSpotLights: g,
          maxHemiLights: h,
          maxShadows: n,
          shadowMapEnabled: this.shadowMapEnabled && d.receiveShadow,
          shadowMapType: this.shadowMapType,
          shadowMapDebug: this.shadowMapDebug,
          shadowMapCascade: this.shadowMapCascade,
          alphaTest: a.alphaTest,
          metal: a.metal,
          perPixel: a.perPixel,
          wrapAround: a.wrapAround,
          doubleSided: a.side === THREE.DoubleSide,
          flipSided: a.side === THREE.BackSide,
        },
        t,
        u,
        x,
        d = [];
      l ? d.push(l) : (d.push(s), d.push(q));
      for (u in r) d.push(u), d.push(r[u]);
      for (t in c) d.push(t), d.push(c[t]);
      l = d.join();
      t = 0;
      for (u = O.length; t < u; t++)
        if (((d = O[t]), d.code === l)) {
          d.usedTimes++;
          k = d.program;
          break a;
        }
      t = "SHADOWMAP_TYPE_BASIC";
      c.shadowMapType === THREE.PCFShadowMap
        ? (t = "SHADOWMAP_TYPE_PCF")
        : c.shadowMapType === THREE.PCFSoftShadowMap &&
          (t = "SHADOWMAP_TYPE_PCF_SOFT");
      u = [];
      for (x in r)
        (d = r[x]), !1 !== d && ((d = "#define " + x + " " + d), u.push(d));
      d = u.join("\n");
      x = j.createProgram();
      u = [
        "precision " + R + " float;",
        d,
        rc ? "#define VERTEX_TEXTURES" : "",
        N.gammaInput ? "#define GAMMA_INPUT" : "",
        N.gammaOutput ? "#define GAMMA_OUTPUT" : "",
        N.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "",
        "#define MAX_DIR_LIGHTS " + c.maxDirLights,
        "#define MAX_POINT_LIGHTS " + c.maxPointLights,
        "#define MAX_SPOT_LIGHTS " + c.maxSpotLights,
        "#define MAX_HEMI_LIGHTS " + c.maxHemiLights,
        "#define MAX_SHADOWS " + c.maxShadows,
        "#define MAX_BONES " + c.maxBones,
        c.map ? "#define USE_MAP" : "",
        c.envMap ? "#define USE_ENVMAP" : "",
        c.lightMap ? "#define USE_LIGHTMAP" : "",
        c.bumpMap ? "#define USE_BUMPMAP" : "",
        c.normalMap ? "#define USE_NORMALMAP" : "",
        c.specularMap ? "#define USE_SPECULARMAP" : "",
        c.vertexColors ? "#define USE_COLOR" : "",
        c.skinning ? "#define USE_SKINNING" : "",
        c.useVertexTexture ? "#define BONE_TEXTURE" : "",
        c.boneTextureWidth
          ? "#define N_BONE_PIXEL_X " + c.boneTextureWidth.toFixed(1)
          : "",
        c.boneTextureHeight
          ? "#define N_BONE_PIXEL_Y " + c.boneTextureHeight.toFixed(1)
          : "",
        c.morphTargets ? "#define USE_MORPHTARGETS" : "",
        c.morphNormals ? "#define USE_MORPHNORMALS" : "",
        c.perPixel ? "#define PHONG_PER_PIXEL" : "",
        c.wrapAround ? "#define WRAP_AROUND" : "",
        c.doubleSided ? "#define DOUBLE_SIDED" : "",
        c.flipSided ? "#define FLIP_SIDED" : "",
        c.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        c.shadowMapEnabled ? "#define " + t : "",
        c.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "",
        c.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "",
        c.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
        "uniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\n#ifdef USE_MORPHNORMALS\nattribute vec3 morphNormal0;\nattribute vec3 morphNormal1;\nattribute vec3 morphNormal2;\nattribute vec3 morphNormal3;\n#else\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n",
      ].join("\n");
      t = [
        "precision " + R + " float;",
        c.bumpMap || c.normalMap
          ? "#extension GL_OES_standard_derivatives : enable"
          : "",
        d,
        "#define MAX_DIR_LIGHTS " + c.maxDirLights,
        "#define MAX_POINT_LIGHTS " + c.maxPointLights,
        "#define MAX_SPOT_LIGHTS " + c.maxSpotLights,
        "#define MAX_HEMI_LIGHTS " + c.maxHemiLights,
        "#define MAX_SHADOWS " + c.maxShadows,
        c.alphaTest ? "#define ALPHATEST " + c.alphaTest : "",
        N.gammaInput ? "#define GAMMA_INPUT" : "",
        N.gammaOutput ? "#define GAMMA_OUTPUT" : "",
        N.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "",
        c.useFog && c.fog ? "#define USE_FOG" : "",
        c.useFog && c.fogExp ? "#define FOG_EXP2" : "",
        c.map ? "#define USE_MAP" : "",
        c.envMap ? "#define USE_ENVMAP" : "",
        c.lightMap ? "#define USE_LIGHTMAP" : "",
        c.bumpMap ? "#define USE_BUMPMAP" : "",
        c.normalMap ? "#define USE_NORMALMAP" : "",
        c.specularMap ? "#define USE_SPECULARMAP" : "",
        c.vertexColors ? "#define USE_COLOR" : "",
        c.metal ? "#define METAL" : "",
        c.perPixel ? "#define PHONG_PER_PIXEL" : "",
        c.wrapAround ? "#define WRAP_AROUND" : "",
        c.doubleSided ? "#define DOUBLE_SIDED" : "",
        c.flipSided ? "#define FLIP_SIDED" : "",
        c.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        c.shadowMapEnabled ? "#define " + t : "",
        c.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "",
        c.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "",
        "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n",
      ].join("\n");
      t = $("fragment", t + s);
      u = $("vertex", u + q);
      j.attachShader(x, u);
      j.attachShader(x, t);
      j.linkProgram(x);
      j.getProgramParameter(x, j.LINK_STATUS) ||
        console.error(
          "Could not initialise shader\nVALIDATE_STATUS: " +
            j.getProgramParameter(x, j.VALIDATE_STATUS) +
            ", gl error [" +
            j.getError() +
            "]"
        );
      j.deleteShader(t);
      j.deleteShader(u);
      x.uniforms = {};
      x.attributes = {};
      var y;
      t =
        "viewMatrix modelViewMatrix projectionMatrix normalMatrix modelMatrix cameraPosition morphTargetInfluences".split(
          " "
        );
      c.useVertexTexture ? t.push("boneTexture") : t.push("boneGlobalMatrices");
      for (y in p) t.push(y);
      y = t;
      t = 0;
      for (u = y.length; t < u; t++)
        (p = y[t]), (x.uniforms[p] = j.getUniformLocation(x, p));
      t =
        "position normal uv uv2 tangent color skinIndex skinWeight lineDistance".split(
          " "
        );
      for (y = 0; y < c.maxMorphTargets; y++) t.push("morphTarget" + y);
      for (y = 0; y < c.maxMorphNormals; y++) t.push("morphNormal" + y);
      for (k in b) t.push(k);
      k = t;
      y = 0;
      for (b = k.length; y < b; y++)
        (t = k[y]), (x.attributes[t] = j.getAttribLocation(x, t));
      x.id = aa++;
      O.push({ program: x, code: l, usedTimes: 1 });
      N.info.memory.programs = O.length;
      k = x;
    }
    a.program = k;
    y = a.program.attributes;
    if (a.morphTargets) {
      a.numSupportedMorphTargets = 0;
      b = "morphTarget";
      for (k = 0; k < this.maxMorphTargets; k++)
        (x = b + k), 0 <= y[x] && a.numSupportedMorphTargets++;
    }
    if (a.morphNormals) {
      a.numSupportedMorphNormals = 0;
      b = "morphNormal";
      for (k = 0; k < this.maxMorphNormals; k++)
        (x = b + k), 0 <= y[x] && a.numSupportedMorphNormals++;
    }
    a.uniformsList = [];
    for (i in a.uniforms) a.uniformsList.push([a.uniforms[i], i]);
  };
  this.setFaceCulling = function (a, b) {
    a === THREE.CullFaceNone
      ? j.disable(j.CULL_FACE)
      : (b === THREE.FrontFaceDirectionCW
          ? j.frontFace(j.CW)
          : j.frontFace(j.CCW),
        a === THREE.CullFaceBack
          ? j.cullFace(j.BACK)
          : a === THREE.CullFaceFront
          ? j.cullFace(j.FRONT)
          : j.cullFace(j.FRONT_AND_BACK),
        j.enable(j.CULL_FACE));
  };
  this.setMaterialFaces = function (a) {
    var b = a.side === THREE.DoubleSide,
      a = a.side === THREE.BackSide;
    Da !== b && (b ? j.disable(j.CULL_FACE) : j.enable(j.CULL_FACE), (Da = b));
    Ta !== a && (a ? j.frontFace(j.CW) : j.frontFace(j.CCW), (Ta = a));
  };
  this.setDepthTest = function (a) {
    eb !== a &&
      (a ? j.enable(j.DEPTH_TEST) : j.disable(j.DEPTH_TEST), (eb = a));
  };
  this.setDepthWrite = function (a) {
    pb !== a && (j.depthMask(a), (pb = a));
  };
  this.setBlending = function (a, b, c, d) {
    a !== sa &&
      (a === THREE.NoBlending
        ? j.disable(j.BLEND)
        : a === THREE.AdditiveBlending
        ? (j.enable(j.BLEND),
          j.blendEquation(j.FUNC_ADD),
          j.blendFunc(j.SRC_ALPHA, j.ONE))
        : a === THREE.SubtractiveBlending
        ? (j.enable(j.BLEND),
          j.blendEquation(j.FUNC_ADD),
          j.blendFunc(j.ZERO, j.ONE_MINUS_SRC_COLOR))
        : a === THREE.MultiplyBlending
        ? (j.enable(j.BLEND),
          j.blendEquation(j.FUNC_ADD),
          j.blendFunc(j.ZERO, j.SRC_COLOR))
        : a === THREE.CustomBlending
        ? j.enable(j.BLEND)
        : (j.enable(j.BLEND),
          j.blendEquationSeparate(j.FUNC_ADD, j.FUNC_ADD),
          j.blendFuncSeparate(
            j.SRC_ALPHA,
            j.ONE_MINUS_SRC_ALPHA,
            j.ONE,
            j.ONE_MINUS_SRC_ALPHA
          )),
      (sa = a));
    if (a === THREE.CustomBlending) {
      if ((b !== nb && (j.blendEquation(J(b)), (nb = b)), c !== Bb || d !== kb))
        j.blendFunc(J(c), J(d)), (Bb = c), (kb = d);
    } else kb = Bb = nb = null;
  };
  this.setTexture = function (a, b) {
    if (a.needsUpdate) {
      a.__webglInit ||
        ((a.__webglInit = !0),
        a.addEventListener("dispose", Wa),
        (a.__webglTexture = j.createTexture()),
        N.info.memory.textures++);
      j.activeTexture(j.TEXTURE0 + b);
      j.bindTexture(j.TEXTURE_2D, a.__webglTexture);
      j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL, a.flipY);
      j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL, a.premultiplyAlpha);
      j.pixelStorei(j.UNPACK_ALIGNMENT, a.unpackAlignment);
      var c = a.image,
        d =
          0 === (c.width & (c.width - 1)) && 0 === (c.height & (c.height - 1)),
        e = J(a.format),
        f = J(a.type);
      D(j.TEXTURE_2D, a, d);
      var g = a.mipmaps;
      if (a instanceof THREE.DataTexture)
        if (0 < g.length && d) {
          for (var h = 0, i = g.length; h < i; h++)
            (c = g[h]),
              j.texImage2D(
                j.TEXTURE_2D,
                h,
                e,
                c.width,
                c.height,
                0,
                e,
                f,
                c.data
              );
          a.generateMipmaps = !1;
        } else
          j.texImage2D(j.TEXTURE_2D, 0, e, c.width, c.height, 0, e, f, c.data);
      else if (a instanceof THREE.CompressedTexture) {
        h = 0;
        for (i = g.length; h < i; h++)
          (c = g[h]),
            j.compressedTexImage2D(
              j.TEXTURE_2D,
              h,
              e,
              c.width,
              c.height,
              0,
              c.data
            );
      } else if (0 < g.length && d) {
        h = 0;
        for (i = g.length; h < i; h++)
          (c = g[h]), j.texImage2D(j.TEXTURE_2D, h, e, e, f, c);
        a.generateMipmaps = !1;
      } else j.texImage2D(j.TEXTURE_2D, 0, e, e, f, a.image);
      a.generateMipmaps && d && j.generateMipmap(j.TEXTURE_2D);
      a.needsUpdate = !1;
      if (a.onUpdate) a.onUpdate();
    } else
      j.activeTexture(j.TEXTURE0 + b),
        j.bindTexture(j.TEXTURE_2D, a.__webglTexture);
  };
  this.setRenderTarget = function (a) {
    var b = a instanceof THREE.WebGLRenderTargetCube;
    if (a && !a.__webglFramebuffer) {
      void 0 === a.depthBuffer && (a.depthBuffer = !0);
      void 0 === a.stencilBuffer && (a.stencilBuffer = !0);
      a.addEventListener("dispose", ab);
      a.__webglTexture = j.createTexture();
      N.info.memory.textures++;
      var c =
          0 === (a.width & (a.width - 1)) && 0 === (a.height & (a.height - 1)),
        d = J(a.format),
        e = J(a.type);
      if (b) {
        a.__webglFramebuffer = [];
        a.__webglRenderbuffer = [];
        j.bindTexture(j.TEXTURE_CUBE_MAP, a.__webglTexture);
        D(j.TEXTURE_CUBE_MAP, a, c);
        for (var f = 0; 6 > f; f++) {
          a.__webglFramebuffer[f] = j.createFramebuffer();
          a.__webglRenderbuffer[f] = j.createRenderbuffer();
          j.texImage2D(
            j.TEXTURE_CUBE_MAP_POSITIVE_X + f,
            0,
            d,
            a.width,
            a.height,
            0,
            d,
            e,
            null
          );
          var g = a,
            h = j.TEXTURE_CUBE_MAP_POSITIVE_X + f;
          j.bindFramebuffer(j.FRAMEBUFFER, a.__webglFramebuffer[f]);
          j.framebufferTexture2D(
            j.FRAMEBUFFER,
            j.COLOR_ATTACHMENT0,
            h,
            g.__webglTexture,
            0
          );
          L(a.__webglRenderbuffer[f], a);
        }
        c && j.generateMipmap(j.TEXTURE_CUBE_MAP);
      } else
        (a.__webglFramebuffer = j.createFramebuffer()),
          (a.__webglRenderbuffer = a.shareDepthFrom
            ? a.shareDepthFrom.__webglRenderbuffer
            : j.createRenderbuffer()),
          j.bindTexture(j.TEXTURE_2D, a.__webglTexture),
          D(j.TEXTURE_2D, a, c),
          j.texImage2D(j.TEXTURE_2D, 0, d, a.width, a.height, 0, d, e, null),
          (d = j.TEXTURE_2D),
          j.bindFramebuffer(j.FRAMEBUFFER, a.__webglFramebuffer),
          j.framebufferTexture2D(
            j.FRAMEBUFFER,
            j.COLOR_ATTACHMENT0,
            d,
            a.__webglTexture,
            0
          ),
          a.shareDepthFrom
            ? a.depthBuffer && !a.stencilBuffer
              ? j.framebufferRenderbuffer(
                  j.FRAMEBUFFER,
                  j.DEPTH_ATTACHMENT,
                  j.RENDERBUFFER,
                  a.__webglRenderbuffer
                )
              : a.depthBuffer &&
                a.stencilBuffer &&
                j.framebufferRenderbuffer(
                  j.FRAMEBUFFER,
                  j.DEPTH_STENCIL_ATTACHMENT,
                  j.RENDERBUFFER,
                  a.__webglRenderbuffer
                )
            : L(a.__webglRenderbuffer, a),
          c && j.generateMipmap(j.TEXTURE_2D);
      b
        ? j.bindTexture(j.TEXTURE_CUBE_MAP, null)
        : j.bindTexture(j.TEXTURE_2D, null);
      j.bindRenderbuffer(j.RENDERBUFFER, null);
      j.bindFramebuffer(j.FRAMEBUFFER, null);
    }
    a
      ? ((b = b
          ? a.__webglFramebuffer[a.activeCubeFace]
          : a.__webglFramebuffer),
        (c = a.width),
        (a = a.height),
        (e = d = 0))
      : ((b = null), (c = Ha), (a = qb), (d = Ra), (e = Cb));
    b !== V &&
      (j.bindFramebuffer(j.FRAMEBUFFER, b), j.viewport(d, e, c, a), (V = b));
    fb = c;
    Oa = a;
  };
  this.shadowMapPlugin = new THREE.ShadowMapPlugin();
  this.addPrePlugin(this.shadowMapPlugin);
  this.addPostPlugin(new THREE.SpritePlugin());
  this.addPostPlugin(new THREE.LensFlarePlugin());
};
THREE.WebGLRenderTarget = function (a, b, c) {
  THREE.EventDispatcher.call(this);
  this.width = a;
  this.height = b;
  c = c || {};
  this.wrapS = void 0 !== c.wrapS ? c.wrapS : THREE.ClampToEdgeWrapping;
  this.wrapT = void 0 !== c.wrapT ? c.wrapT : THREE.ClampToEdgeWrapping;
  this.magFilter = void 0 !== c.magFilter ? c.magFilter : THREE.LinearFilter;
  this.minFilter =
    void 0 !== c.minFilter ? c.minFilter : THREE.LinearMipMapLinearFilter;
  this.anisotropy = void 0 !== c.anisotropy ? c.anisotropy : 1;
  this.offset = new THREE.Vector2(0, 0);
  this.repeat = new THREE.Vector2(1, 1);
  this.format = void 0 !== c.format ? c.format : THREE.RGBAFormat;
  this.type = void 0 !== c.type ? c.type : THREE.UnsignedByteType;
  this.depthBuffer = void 0 !== c.depthBuffer ? c.depthBuffer : !0;
  this.stencilBuffer = void 0 !== c.stencilBuffer ? c.stencilBuffer : !0;
  this.generateMipmaps = !0;
  this.shareDepthFrom = null;
};
THREE.WebGLRenderTarget.prototype.clone = function () {
  var a = new THREE.WebGLRenderTarget(this.width, this.height);
  a.wrapS = this.wrapS;
  a.wrapT = this.wrapT;
  a.magFilter = this.magFilter;
  a.minFilter = this.minFilter;
  a.anisotropy = this.anisotropy;
  a.offset.copy(this.offset);
  a.repeat.copy(this.repeat);
  a.format = this.format;
  a.type = this.type;
  a.depthBuffer = this.depthBuffer;
  a.stencilBuffer = this.stencilBuffer;
  a.generateMipmaps = this.generateMipmaps;
  a.shareDepthFrom = this.shareDepthFrom;
  return a;
};
THREE.WebGLRenderTarget.prototype.dispose = function () {
  this.dispatchEvent({ type: "dispose" });
};
THREE.WebGLRenderTargetCube = function (a, b, c) {
  THREE.WebGLRenderTarget.call(this, a, b, c);
  this.activeCubeFace = 0;
};
THREE.WebGLRenderTargetCube.prototype = Object.create(
  THREE.WebGLRenderTarget.prototype
);
THREE.RenderableVertex = function () {
  this.positionWorld = new THREE.Vector3();
  this.positionScreen = new THREE.Vector4();
  this.visible = !0;
};
THREE.RenderableVertex.prototype.copy = function (a) {
  this.positionWorld.copy(a.positionWorld);
  this.positionScreen.copy(a.positionScreen);
};
THREE.RenderableFace3 = function () {
  this.v1 = new THREE.RenderableVertex();
  this.v2 = new THREE.RenderableVertex();
  this.v3 = new THREE.RenderableVertex();
  this.centroidWorld = new THREE.Vector3();
  this.centroidScreen = new THREE.Vector3();
  this.normalWorld = new THREE.Vector3();
  this.vertexNormalsWorld = [
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
  ];
  this.vertexNormalsLength = 0;
  this.material = this.color = null;
  this.uvs = [[]];
  this.z = null;
};
THREE.RenderableFace4 = function () {
  this.v1 = new THREE.RenderableVertex();
  this.v2 = new THREE.RenderableVertex();
  this.v3 = new THREE.RenderableVertex();
  this.v4 = new THREE.RenderableVertex();
  this.centroidWorld = new THREE.Vector3();
  this.centroidScreen = new THREE.Vector3();
  this.normalWorld = new THREE.Vector3();
  this.vertexNormalsWorld = [
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
  ];
  this.vertexNormalsLength = 0;
  this.material = this.color = null;
  this.uvs = [[]];
  this.z = null;
};
THREE.RenderableObject = function () {
  this.z = this.object = null;
};
THREE.RenderableParticle = function () {
  this.rotation = this.z = this.y = this.x = this.object = null;
  this.scale = new THREE.Vector2();
  this.material = null;
};
THREE.RenderableLine = function () {
  this.z = null;
  this.v1 = new THREE.RenderableVertex();
  this.v2 = new THREE.RenderableVertex();
  this.material = null;
};
THREE.ColorUtils = {
  adjustHSV: function (a, b, c, d) {
    var e = THREE.ColorUtils.__hsv;
    a.getHSV(e);
    e.h = THREE.Math.clamp(e.h + b, 0, 1);
    e.s = THREE.Math.clamp(e.s + c, 0, 1);
    e.v = THREE.Math.clamp(e.v + d, 0, 1);
    a.setHSV(e.h, e.s, e.v);
  },
};
THREE.ColorUtils.__hsv = { h: 0, s: 0, v: 0 };
THREE.GeometryUtils = {
  merge: function (a, b) {
    var c,
      d,
      e = a.vertices.length,
      f = b instanceof THREE.Mesh ? b.geometry : b,
      g = a.vertices,
      h = f.vertices,
      i = a.faces,
      k = f.faces,
      n = a.faceVertexUvs[0],
      f = f.faceVertexUvs[0];
    b instanceof THREE.Mesh &&
      (b.matrixAutoUpdate && b.updateMatrix(),
      (c = b.matrix),
      (d = new THREE.Matrix4()),
      d.extractRotation(c, b.scale));
    for (var p = 0, m = h.length; p < m; p++) {
      var r = h[p].clone();
      c && c.multiplyVector3(r);
      g.push(r);
    }
    p = 0;
    for (m = k.length; p < m; p++) {
      var r = k[p],
        s,
        l,
        q = r.vertexNormals,
        u = r.vertexColors;
      r instanceof THREE.Face3
        ? (s = new THREE.Face3(r.a + e, r.b + e, r.c + e))
        : r instanceof THREE.Face4 &&
          (s = new THREE.Face4(r.a + e, r.b + e, r.c + e, r.d + e));
      s.normal.copy(r.normal);
      d && d.multiplyVector3(s.normal);
      g = 0;
      for (h = q.length; g < h; g++)
        (l = q[g].clone()), d && d.multiplyVector3(l), s.vertexNormals.push(l);
      s.color.copy(r.color);
      g = 0;
      for (h = u.length; g < h; g++) (l = u[g]), s.vertexColors.push(l.clone());
      s.materialIndex = r.materialIndex;
      s.centroid.copy(r.centroid);
      c && c.multiplyVector3(s.centroid);
      i.push(s);
    }
    p = 0;
    for (m = f.length; p < m; p++) {
      c = f[p];
      d = [];
      g = 0;
      for (h = c.length; g < h; g++) d.push(new THREE.Vector2(c[g].x, c[g].y));
      n.push(d);
    }
  },
  removeMaterials: function (a, b) {
    for (var c = {}, d = 0, e = b.length; d < e; d++) c[b[d]] = !0;
    for (var f, g = [], d = 0, e = a.faces.length; d < e; d++)
      (f = a.faces[d]), f.materialIndex in c || g.push(f);
    a.faces = g;
  },
  randomPointInTriangle: function (a, b, c) {
    var d,
      e,
      f,
      g = new THREE.Vector3(),
      h = THREE.GeometryUtils.__v1;
    d = THREE.GeometryUtils.random();
    e = THREE.GeometryUtils.random();
    1 < d + e && ((d = 1 - d), (e = 1 - e));
    f = 1 - d - e;
    g.copy(a);
    g.multiplyScalar(d);
    h.copy(b);
    h.multiplyScalar(e);
    g.addSelf(h);
    h.copy(c);
    h.multiplyScalar(f);
    g.addSelf(h);
    return g;
  },
  randomPointInFace: function (a, b, c) {
    var d, e, f;
    if (a instanceof THREE.Face3)
      return (
        (d = b.vertices[a.a]),
        (e = b.vertices[a.b]),
        (f = b.vertices[a.c]),
        THREE.GeometryUtils.randomPointInTriangle(d, e, f)
      );
    if (a instanceof THREE.Face4) {
      d = b.vertices[a.a];
      e = b.vertices[a.b];
      f = b.vertices[a.c];
      var b = b.vertices[a.d],
        g;
      c
        ? a._area1 && a._area2
          ? ((c = a._area1), (g = a._area2))
          : ((c = THREE.GeometryUtils.triangleArea(d, e, b)),
            (g = THREE.GeometryUtils.triangleArea(e, f, b)),
            (a._area1 = c),
            (a._area2 = g))
        : ((c = THREE.GeometryUtils.triangleArea(d, e, b)),
          (g = THREE.GeometryUtils.triangleArea(e, f, b)));
      return THREE.GeometryUtils.random() * (c + g) < c
        ? THREE.GeometryUtils.randomPointInTriangle(d, e, b)
        : THREE.GeometryUtils.randomPointInTriangle(e, f, b);
    }
  },
  randomPointsInGeometry: function (a, b) {
    function c(a) {
      function b(c, d) {
        if (d < c) return c;
        var e = c + Math.floor((d - c) / 2);
        return k[e] > a ? b(c, e - 1) : k[e] < a ? b(e + 1, d) : e;
      }
      return b(0, k.length - 1);
    }
    var d,
      e,
      f = a.faces,
      g = a.vertices,
      h = f.length,
      i = 0,
      k = [],
      n,
      p,
      m,
      r;
    for (e = 0; e < h; e++)
      (d = f[e]),
        d instanceof THREE.Face3
          ? ((n = g[d.a]),
            (p = g[d.b]),
            (m = g[d.c]),
            (d._area = THREE.GeometryUtils.triangleArea(n, p, m)))
          : d instanceof THREE.Face4 &&
            ((n = g[d.a]),
            (p = g[d.b]),
            (m = g[d.c]),
            (r = g[d.d]),
            (d._area1 = THREE.GeometryUtils.triangleArea(n, p, r)),
            (d._area2 = THREE.GeometryUtils.triangleArea(p, m, r)),
            (d._area = d._area1 + d._area2)),
        (i += d._area),
        (k[e] = i);
    d = [];
    for (e = 0; e < b; e++)
      (g = THREE.GeometryUtils.random() * i),
        (g = c(g)),
        (d[e] = THREE.GeometryUtils.randomPointInFace(f[g], a, !0));
    return d;
  },
  triangleArea: function (a, b, c) {
    var d = THREE.GeometryUtils.__v1,
      e = THREE.GeometryUtils.__v2;
    d.sub(b, a);
    e.sub(c, a);
    d.crossSelf(e);
    return 0.5 * d.length();
  },
  center: function (a) {
    a.computeBoundingBox();
    var b = a.boundingBox,
      c = new THREE.Vector3();
    c.add(b.min, b.max);
    c.multiplyScalar(-0.5);
    a.applyMatrix(new THREE.Matrix4().makeTranslation(c));
    a.computeBoundingBox();
    return c;
  },
  normalizeUVs: function (a) {
    for (var a = a.faceVertexUvs[0], b = 0, c = a.length; b < c; b++)
      for (var d = a[b], e = 0, f = d.length; e < f; e++)
        1 !== d[e].x && (d[e].x -= Math.floor(d[e].x)),
          1 !== d[e].y && (d[e].y -= Math.floor(d[e].y));
  },
  triangulateQuads: function (a) {
    var b,
      c,
      d,
      e,
      f = [],
      g = [],
      h = [];
    b = 0;
    for (c = a.faceUvs.length; b < c; b++) g[b] = [];
    b = 0;
    for (c = a.faceVertexUvs.length; b < c; b++) h[b] = [];
    b = 0;
    for (c = a.faces.length; b < c; b++)
      if (((d = a.faces[b]), d instanceof THREE.Face4)) {
        e = d.a;
        var i = d.b,
          k = d.c,
          n = d.d,
          p = new THREE.Face3(),
          m = new THREE.Face3();
        p.color.copy(d.color);
        m.color.copy(d.color);
        p.materialIndex = d.materialIndex;
        m.materialIndex = d.materialIndex;
        p.a = e;
        p.b = i;
        p.c = n;
        m.a = i;
        m.b = k;
        m.c = n;
        4 === d.vertexColors.length &&
          ((p.vertexColors[0] = d.vertexColors[0].clone()),
          (p.vertexColors[1] = d.vertexColors[1].clone()),
          (p.vertexColors[2] = d.vertexColors[3].clone()),
          (m.vertexColors[0] = d.vertexColors[1].clone()),
          (m.vertexColors[1] = d.vertexColors[2].clone()),
          (m.vertexColors[2] = d.vertexColors[3].clone()));
        f.push(p, m);
        d = 0;
        for (e = a.faceVertexUvs.length; d < e; d++)
          a.faceVertexUvs[d].length &&
            ((p = a.faceVertexUvs[d][b]),
            (i = p[1]),
            (k = p[2]),
            (n = p[3]),
            (p = [p[0].clone(), i.clone(), n.clone()]),
            (i = [i.clone(), k.clone(), n.clone()]),
            h[d].push(p, i));
        d = 0;
        for (e = a.faceUvs.length; d < e; d++)
          a.faceUvs[d].length && ((i = a.faceUvs[d][b]), g[d].push(i, i));
      } else {
        f.push(d);
        d = 0;
        for (e = a.faceUvs.length; d < e; d++) g[d].push(a.faceUvs[d][b]);
        d = 0;
        for (e = a.faceVertexUvs.length; d < e; d++)
          h[d].push(a.faceVertexUvs[d][b]);
      }
    a.faces = f;
    a.faceUvs = g;
    a.faceVertexUvs = h;
    a.computeCentroids();
    a.computeFaceNormals();
    a.computeVertexNormals();
    a.hasTangents && a.computeTangents();
  },
  explode: function (a) {
    for (var b = [], c = 0, d = a.faces.length; c < d; c++) {
      var e = b.length,
        f = a.faces[c];
      if (f instanceof THREE.Face4) {
        var g = f.a,
          h = f.b,
          i = f.c,
          g = a.vertices[g],
          h = a.vertices[h],
          i = a.vertices[i],
          k = a.vertices[f.d];
        b.push(g.clone());
        b.push(h.clone());
        b.push(i.clone());
        b.push(k.clone());
        f.a = e;
        f.b = e + 1;
        f.c = e + 2;
        f.d = e + 3;
      } else
        (g = f.a),
          (h = f.b),
          (i = f.c),
          (g = a.vertices[g]),
          (h = a.vertices[h]),
          (i = a.vertices[i]),
          b.push(g.clone()),
          b.push(h.clone()),
          b.push(i.clone()),
          (f.a = e),
          (f.b = e + 1),
          (f.c = e + 2);
    }
    a.vertices = b;
    delete a.__tmpVertices;
  },
  tessellate: function (a, b) {
    var c,
      d,
      e,
      f,
      g,
      h,
      i,
      k,
      n,
      p,
      m,
      r,
      s,
      l,
      q,
      u,
      B,
      x,
      t,
      F = [],
      C = [];
    c = 0;
    for (d = a.faceVertexUvs.length; c < d; c++) C[c] = [];
    c = 0;
    for (d = a.faces.length; c < d; c++)
      if (((e = a.faces[c]), e instanceof THREE.Face3))
        if (
          ((f = e.a),
          (g = e.b),
          (h = e.c),
          (k = a.vertices[f]),
          (n = a.vertices[g]),
          (p = a.vertices[h]),
          (r = k.distanceTo(n)),
          (s = n.distanceTo(p)),
          (m = k.distanceTo(p)),
          r > b || s > b || m > b)
        ) {
          i = a.vertices.length;
          x = e.clone();
          t = e.clone();
          r >= s && r >= m
            ? ((k = k.clone()),
              k.lerpSelf(n, 0.5),
              (x.a = f),
              (x.b = i),
              (x.c = h),
              (t.a = i),
              (t.b = g),
              (t.c = h),
              3 === e.vertexNormals.length &&
                ((f = e.vertexNormals[0].clone()),
                f.lerpSelf(e.vertexNormals[1], 0.5),
                x.vertexNormals[1].copy(f),
                t.vertexNormals[0].copy(f)),
              3 === e.vertexColors.length &&
                ((f = e.vertexColors[0].clone()),
                f.lerpSelf(e.vertexColors[1], 0.5),
                x.vertexColors[1].copy(f),
                t.vertexColors[0].copy(f)),
              (e = 0))
            : s >= r && s >= m
            ? ((k = n.clone()),
              k.lerpSelf(p, 0.5),
              (x.a = f),
              (x.b = g),
              (x.c = i),
              (t.a = i),
              (t.b = h),
              (t.c = f),
              3 === e.vertexNormals.length &&
                ((f = e.vertexNormals[1].clone()),
                f.lerpSelf(e.vertexNormals[2], 0.5),
                x.vertexNormals[2].copy(f),
                t.vertexNormals[0].copy(f),
                t.vertexNormals[1].copy(e.vertexNormals[2]),
                t.vertexNormals[2].copy(e.vertexNormals[0])),
              3 === e.vertexColors.length &&
                ((f = e.vertexColors[1].clone()),
                f.lerpSelf(e.vertexColors[2], 0.5),
                x.vertexColors[2].copy(f),
                t.vertexColors[0].copy(f),
                t.vertexColors[1].copy(e.vertexColors[2]),
                t.vertexColors[2].copy(e.vertexColors[0])),
              (e = 1))
            : ((k = k.clone()),
              k.lerpSelf(p, 0.5),
              (x.a = f),
              (x.b = g),
              (x.c = i),
              (t.a = i),
              (t.b = g),
              (t.c = h),
              3 === e.vertexNormals.length &&
                ((f = e.vertexNormals[0].clone()),
                f.lerpSelf(e.vertexNormals[2], 0.5),
                x.vertexNormals[2].copy(f),
                t.vertexNormals[0].copy(f)),
              3 === e.vertexColors.length &&
                ((f = e.vertexColors[0].clone()),
                f.lerpSelf(e.vertexColors[2], 0.5),
                x.vertexColors[2].copy(f),
                t.vertexColors[0].copy(f)),
              (e = 2));
          F.push(x, t);
          a.vertices.push(k);
          f = 0;
          for (g = a.faceVertexUvs.length; f < g; f++)
            a.faceVertexUvs[f].length &&
              ((k = a.faceVertexUvs[f][c]),
              (t = k[0]),
              (h = k[1]),
              (x = k[2]),
              0 === e
                ? ((n = t.clone()),
                  n.lerpSelf(h, 0.5),
                  (k = [t.clone(), n.clone(), x.clone()]),
                  (h = [n.clone(), h.clone(), x.clone()]))
                : 1 === e
                ? ((n = h.clone()),
                  n.lerpSelf(x, 0.5),
                  (k = [t.clone(), h.clone(), n.clone()]),
                  (h = [n.clone(), x.clone(), t.clone()]))
                : ((n = t.clone()),
                  n.lerpSelf(x, 0.5),
                  (k = [t.clone(), h.clone(), n.clone()]),
                  (h = [n.clone(), h.clone(), x.clone()])),
              C[f].push(k, h));
        } else {
          F.push(e);
          f = 0;
          for (g = a.faceVertexUvs.length; f < g; f++)
            C[f].push(a.faceVertexUvs[f][c]);
        }
      else if (
        ((f = e.a),
        (g = e.b),
        (h = e.c),
        (i = e.d),
        (k = a.vertices[f]),
        (n = a.vertices[g]),
        (p = a.vertices[h]),
        (m = a.vertices[i]),
        (r = k.distanceTo(n)),
        (s = n.distanceTo(p)),
        (l = p.distanceTo(m)),
        (q = k.distanceTo(m)),
        r > b || s > b || l > b || q > b)
      ) {
        u = a.vertices.length;
        B = a.vertices.length + 1;
        x = e.clone();
        t = e.clone();
        (r >= s && r >= l && r >= q) || (l >= s && l >= r && l >= q)
          ? ((r = k.clone()),
            r.lerpSelf(n, 0.5),
            (n = p.clone()),
            n.lerpSelf(m, 0.5),
            (x.a = f),
            (x.b = u),
            (x.c = B),
            (x.d = i),
            (t.a = u),
            (t.b = g),
            (t.c = h),
            (t.d = B),
            4 === e.vertexNormals.length &&
              ((f = e.vertexNormals[0].clone()),
              f.lerpSelf(e.vertexNormals[1], 0.5),
              (g = e.vertexNormals[2].clone()),
              g.lerpSelf(e.vertexNormals[3], 0.5),
              x.vertexNormals[1].copy(f),
              x.vertexNormals[2].copy(g),
              t.vertexNormals[0].copy(f),
              t.vertexNormals[3].copy(g)),
            4 === e.vertexColors.length &&
              ((f = e.vertexColors[0].clone()),
              f.lerpSelf(e.vertexColors[1], 0.5),
              (g = e.vertexColors[2].clone()),
              g.lerpSelf(e.vertexColors[3], 0.5),
              x.vertexColors[1].copy(f),
              x.vertexColors[2].copy(g),
              t.vertexColors[0].copy(f),
              t.vertexColors[3].copy(g)),
            (e = 0))
          : ((r = n.clone()),
            r.lerpSelf(p, 0.5),
            (n = m.clone()),
            n.lerpSelf(k, 0.5),
            (x.a = f),
            (x.b = g),
            (x.c = u),
            (x.d = B),
            (t.a = B),
            (t.b = u),
            (t.c = h),
            (t.d = i),
            4 === e.vertexNormals.length &&
              ((f = e.vertexNormals[1].clone()),
              f.lerpSelf(e.vertexNormals[2], 0.5),
              (g = e.vertexNormals[3].clone()),
              g.lerpSelf(e.vertexNormals[0], 0.5),
              x.vertexNormals[2].copy(f),
              x.vertexNormals[3].copy(g),
              t.vertexNormals[0].copy(g),
              t.vertexNormals[1].copy(f)),
            4 === e.vertexColors.length &&
              ((f = e.vertexColors[1].clone()),
              f.lerpSelf(e.vertexColors[2], 0.5),
              (g = e.vertexColors[3].clone()),
              g.lerpSelf(e.vertexColors[0], 0.5),
              x.vertexColors[2].copy(f),
              x.vertexColors[3].copy(g),
              t.vertexColors[0].copy(g),
              t.vertexColors[1].copy(f)),
            (e = 1));
        F.push(x, t);
        a.vertices.push(r, n);
        f = 0;
        for (g = a.faceVertexUvs.length; f < g; f++)
          a.faceVertexUvs[f].length &&
            ((k = a.faceVertexUvs[f][c]),
            (t = k[0]),
            (h = k[1]),
            (x = k[2]),
            (k = k[3]),
            0 === e
              ? ((n = t.clone()),
                n.lerpSelf(h, 0.5),
                (p = x.clone()),
                p.lerpSelf(k, 0.5),
                (t = [t.clone(), n.clone(), p.clone(), k.clone()]),
                (h = [n.clone(), h.clone(), x.clone(), p.clone()]))
              : ((n = h.clone()),
                n.lerpSelf(x, 0.5),
                (p = k.clone()),
                p.lerpSelf(t, 0.5),
                (t = [t.clone(), h.clone(), n.clone(), p.clone()]),
                (h = [p.clone(), n.clone(), x.clone(), k.clone()])),
            C[f].push(t, h));
      } else {
        F.push(e);
        f = 0;
        for (g = a.faceVertexUvs.length; f < g; f++)
          C[f].push(a.faceVertexUvs[f][c]);
      }
    a.faces = F;
    a.faceVertexUvs = C;
  },
  setMaterialIndex: function (a, b, c, d) {
    a = a.faces;
    d = d || a.length - 1;
    for (c = c || 0; c <= d; c++) a[c].materialIndex = b;
  },
};
THREE.GeometryUtils.random = THREE.Math.random16;
THREE.GeometryUtils.__v1 = new THREE.Vector3();
THREE.GeometryUtils.__v2 = new THREE.Vector3();
THREE.ImageUtils = {
  crossOrigin: "anonymous",
  loadTexture: function (a, b, c, d) {
    var e = new Image(),
      f = new THREE.Texture(e, b),
      b = new THREE.ImageLoader();
    b.addEventListener("load", function (a) {
      f.image = a.content;
      f.needsUpdate = !0;
      c && c(f);
    });
    b.addEventListener("error", function (a) {
      d && d(a.message);
    });
    b.crossOrigin = this.crossOrigin;
    b.load(a, e);
    f.sourceFile = a;
    return f;
  },
  loadCompressedTexture: function (a, b, c, d) {
    var e = new THREE.CompressedTexture();
    e.mapping = b;
    var f = new XMLHttpRequest();
    f.onload = function () {
      var a = THREE.ImageUtils.parseDDS(f.response, !0);
      e.format = a.format;
      e.mipmaps = a.mipmaps;
      e.image.width = a.width;
      e.image.height = a.height;
      e.generateMipmaps = !1;
      e.needsUpdate = !0;
      c && c(e);
    };
    f.onerror = d;
    f.open("GET", a, !0);
    f.responseType = "arraybuffer";
    f.send(null);
    return e;
  },
  loadTextureCube: function (a, b, c, d) {
    var e = [];
    e.loadCount = 0;
    var f = new THREE.Texture();
    f.image = e;
    void 0 !== b && (f.mapping = b);
    f.flipY = !1;
    for (var b = 0, g = a.length; b < g; ++b) {
      var h = new Image();
      e[b] = h;
      h.onload = function () {
        e.loadCount += 1;
        6 === e.loadCount && ((f.needsUpdate = !0), c && c(f));
      };
      h.onerror = d;
      h.crossOrigin = this.crossOrigin;
      h.src = a[b];
    }
    return f;
  },
  loadCompressedTextureCube: function (a, b, c, d) {
    var e = [];
    e.loadCount = 0;
    var f = new THREE.CompressedTexture();
    f.image = e;
    void 0 !== b && (f.mapping = b);
    f.flipY = !1;
    f.generateMipmaps = !1;
    b = function (a, b) {
      return function () {
        var d = THREE.ImageUtils.parseDDS(a.response, !0);
        b.format = d.format;
        b.mipmaps = d.mipmaps;
        b.width = d.width;
        b.height = d.height;
        e.loadCount += 1;
        6 === e.loadCount &&
          ((f.format = d.format), (f.needsUpdate = !0), c && c(f));
      };
    };
    if (a instanceof Array)
      for (var g = 0, h = a.length; g < h; ++g) {
        var i = {};
        e[g] = i;
        var k = new XMLHttpRequest();
        k.onload = b(k, i);
        k.onerror = d;
        i = a[g];
        k.open("GET", i, !0);
        k.responseType = "arraybuffer";
        k.send(null);
      }
    else
      (k = new XMLHttpRequest()),
        (k.onload = function () {
          var a = THREE.ImageUtils.parseDDS(k.response, !0);
          if (a.isCubemap) {
            for (var b = a.mipmaps.length / a.mipmapCount, d = 0; d < b; d++) {
              e[d] = { mipmaps: [] };
              for (var g = 0; g < a.mipmapCount; g++)
                e[d].mipmaps.push(a.mipmaps[d * a.mipmapCount + g]),
                  (e[d].format = a.format),
                  (e[d].width = a.width),
                  (e[d].height = a.height);
            }
            f.format = a.format;
            f.needsUpdate = !0;
            c && c(f);
          }
        }),
        (k.onerror = d),
        k.open("GET", a, !0),
        (k.responseType = "arraybuffer"),
        k.send(null);
    return f;
  },
  parseDDS: function (a, b) {
    function c(a) {
      return (
        a.charCodeAt(0) +
        (a.charCodeAt(1) << 8) +
        (a.charCodeAt(2) << 16) +
        (a.charCodeAt(3) << 24)
      );
    }
    var d = { mipmaps: [], width: 0, height: 0, format: null, mipmapCount: 1 },
      e = c("DXT1"),
      f = c("DXT3"),
      g = c("DXT5"),
      h = new Int32Array(a, 0, 31);
    if (542327876 !== h[0])
      return (
        console.error(
          "ImageUtils.parseDDS(): Invalid magic number in DDS header"
        ),
        d
      );
    if (!h[20] & 4)
      return (
        console.error(
          "ImageUtils.parseDDS(): Unsupported format, must contain a FourCC code"
        ),
        d
      );
    var i = h[21];
    switch (i) {
      case e:
        e = 8;
        d.format = THREE.RGB_S3TC_DXT1_Format;
        break;
      case f:
        e = 16;
        d.format = THREE.RGBA_S3TC_DXT3_Format;
        break;
      case g:
        e = 16;
        d.format = THREE.RGBA_S3TC_DXT5_Format;
        break;
      default:
        return (
          console.error(
            "ImageUtils.parseDDS(): Unsupported FourCC code: ",
            String.fromCharCode(
              i & 255,
              (i >> 8) & 255,
              (i >> 16) & 255,
              (i >> 24) & 255
            )
          ),
          d
        );
    }
    d.mipmapCount = 1;
    h[2] & 131072 && !1 !== b && (d.mipmapCount = Math.max(1, h[7]));
    d.isCubemap = h[28] & 512 ? !0 : !1;
    d.width = h[4];
    d.height = h[3];
    for (
      var h = h[1] + 4,
        f = d.width,
        g = d.height,
        i = d.isCubemap ? 6 : 1,
        k = 0;
      k < i;
      k++
    ) {
      for (var n = 0; n < d.mipmapCount; n++) {
        var p = (((Math.max(4, f) / 4) * Math.max(4, g)) / 4) * e,
          m = { data: new Uint8Array(a, h, p), width: f, height: g };
        d.mipmaps.push(m);
        h += p;
        f = Math.max(0.5 * f, 1);
        g = Math.max(0.5 * g, 1);
      }
      f = d.width;
      g = d.height;
    }
    return d;
  },
  getNormalMap: function (a, b) {
    var c = function (a) {
        var b = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
        return [a[0] / b, a[1] / b, a[2] / b];
      },
      b = b | 1,
      d = a.width,
      e = a.height,
      f = document.createElement("canvas");
    f.width = d;
    f.height = e;
    var g = f.getContext("2d");
    g.drawImage(a, 0, 0);
    for (
      var h = g.getImageData(0, 0, d, e).data,
        i = g.createImageData(d, e),
        k = i.data,
        n = 0;
      n < d;
      n++
    )
      for (var p = 0; p < e; p++) {
        var m = 0 > p - 1 ? 0 : p - 1,
          r = p + 1 > e - 1 ? e - 1 : p + 1,
          s = 0 > n - 1 ? 0 : n - 1,
          l = n + 1 > d - 1 ? d - 1 : n + 1,
          q = [],
          u = [0, 0, (h[4 * (p * d + n)] / 255) * b];
        q.push([-1, 0, (h[4 * (p * d + s)] / 255) * b]);
        q.push([-1, -1, (h[4 * (m * d + s)] / 255) * b]);
        q.push([0, -1, (h[4 * (m * d + n)] / 255) * b]);
        q.push([1, -1, (h[4 * (m * d + l)] / 255) * b]);
        q.push([1, 0, (h[4 * (p * d + l)] / 255) * b]);
        q.push([1, 1, (h[4 * (r * d + l)] / 255) * b]);
        q.push([0, 1, (h[4 * (r * d + n)] / 255) * b]);
        q.push([-1, 1, (h[4 * (r * d + s)] / 255) * b]);
        m = [];
        s = q.length;
        for (r = 0; r < s; r++) {
          var l = q[r],
            B = q[(r + 1) % s],
            l = [l[0] - u[0], l[1] - u[1], l[2] - u[2]],
            B = [B[0] - u[0], B[1] - u[1], B[2] - u[2]];
          m.push(
            c([
              l[1] * B[2] - l[2] * B[1],
              l[2] * B[0] - l[0] * B[2],
              l[0] * B[1] - l[1] * B[0],
            ])
          );
        }
        q = [0, 0, 0];
        for (r = 0; r < m.length; r++)
          (q[0] += m[r][0]), (q[1] += m[r][1]), (q[2] += m[r][2]);
        q[0] /= m.length;
        q[1] /= m.length;
        q[2] /= m.length;
        u = 4 * (p * d + n);
        k[u] = (255 * ((q[0] + 1) / 2)) | 0;
        k[u + 1] = (255 * ((q[1] + 1) / 2)) | 0;
        k[u + 2] = (255 * q[2]) | 0;
        k[u + 3] = 255;
      }
    g.putImageData(i, 0, 0);
    return f;
  },
  generateDataTexture: function (a, b, c) {
    for (
      var d = a * b,
        e = new Uint8Array(3 * d),
        f = Math.floor(255 * c.r),
        g = Math.floor(255 * c.g),
        c = Math.floor(255 * c.b),
        h = 0;
      h < d;
      h++
    )
      (e[3 * h] = f), (e[3 * h + 1] = g), (e[3 * h + 2] = c);
    a = new THREE.DataTexture(e, a, b, THREE.RGBFormat);
    a.needsUpdate = !0;
    return a;
  },
};
THREE.SceneUtils = {
  createMultiMaterialObject: function (a, b) {
    for (var c = new THREE.Object3D(), d = 0, e = b.length; d < e; d++)
      c.add(new THREE.Mesh(a, b[d]));
    return c;
  },
  detach: function (a, b, c) {
    a.applyMatrix(b.matrixWorld);
    b.remove(a);
    c.add(a);
  },
  attach: function (a, b, c) {
    var d = new THREE.Matrix4();
    d.getInverse(c.matrixWorld);
    a.applyMatrix(d);
    b.remove(a);
    c.add(a);
  },
};
THREE.ShaderUtils = {
  lib: {
    fresnel: {
      uniforms: {
        mRefractionRatio: { type: "f", value: 1.02 },
        mFresnelBias: { type: "f", value: 0.1 },
        mFresnelPower: { type: "f", value: 2 },
        mFresnelScale: { type: "f", value: 1 },
        tCube: { type: "t", value: null },
      },
      fragmentShader:
        "uniform samplerCube tCube;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\nvec4 refractedColor = vec4( 1.0 );\nrefractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\nrefractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\nrefractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\ngl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\n}",
      vertexShader:
        "uniform float mRefractionRatio;\nuniform float mFresnelBias;\nuniform float mFresnelScale;\nuniform float mFresnelPower;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\nvec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );\nvec3 I = worldPosition.xyz - cameraPosition;\nvReflect = reflect( I, worldNormal );\nvRefract[0] = refract( normalize( I ), worldNormal, mRefractionRatio );\nvRefract[1] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.99 );\nvRefract[2] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.98 );\nvReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), mFresnelPower );\ngl_Position = projectionMatrix * mvPosition;\n}",
    },
    normal: {
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.fog,
        THREE.UniformsLib.lights,
        THREE.UniformsLib.shadowmap,
        {
          enableAO: { type: "i", value: 0 },
          enableDiffuse: { type: "i", value: 0 },
          enableSpecular: { type: "i", value: 0 },
          enableReflection: { type: "i", value: 0 },
          enableDisplacement: { type: "i", value: 0 },
          tDisplacement: { type: "t", value: null },
          tDiffuse: { type: "t", value: null },
          tCube: { type: "t", value: null },
          tNormal: { type: "t", value: null },
          tSpecular: { type: "t", value: null },
          tAO: { type: "t", value: null },
          uNormalScale: { type: "v2", value: new THREE.Vector2(1, 1) },
          uDisplacementBias: { type: "f", value: 0 },
          uDisplacementScale: { type: "f", value: 1 },
          uDiffuseColor: { type: "c", value: new THREE.Color(16777215) },
          uSpecularColor: { type: "c", value: new THREE.Color(1118481) },
          uAmbientColor: { type: "c", value: new THREE.Color(16777215) },
          uShininess: { type: "f", value: 30 },
          uOpacity: { type: "f", value: 1 },
          useRefract: { type: "i", value: 0 },
          uRefractionRatio: { type: "f", value: 0.98 },
          uReflectivity: { type: "f", value: 0.5 },
          uOffset: { type: "v2", value: new THREE.Vector2(0, 0) },
          uRepeat: { type: "v2", value: new THREE.Vector2(1, 1) },
          wrapRGB: { type: "v3", value: new THREE.Vector3(1, 1, 1) },
        },
      ]),
      fragmentShader: [
        "uniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform float uOpacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform bool enableReflection;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform samplerCube tCube;\nuniform vec2 uNormalScale;\nuniform bool useRefract;\nuniform float uRefractionRatio;\nuniform float uReflectivity;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;",
        THREE.ShaderChunk.shadowmap_pars_fragment,
        THREE.ShaderChunk.fog_pars_fragment,
        "void main() {\ngl_FragColor = vec4( vec3( 1.0 ), uOpacity );\nvec3 specularTex = vec3( 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse ) {\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( tDiffuse, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\n#endif\n}\nif( enableAO ) {\n#ifdef GAMMA_INPUT\nvec4 aoColor = texture2D( tAO, vUv );\naoColor.xyz *= aoColor.xyz;\ngl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\n#endif\n}\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );\nvec3 finalNormal = tsb * normalTex;\n#ifdef FLIP_SIDED\nfinalNormal = -finalNormal;\n#endif\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 pointVector = lPosition.xyz + vViewPosition.xyz;\nfloat pointDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\npointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );\npointVector = normalize( pointVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\n#endif\npointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;\nvec3 pointHalfVector = normalize( pointVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;\n#else\npointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 spotVector = lPosition.xyz + vViewPosition.xyz;\nfloat spotDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nspotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );\nspotVector = normalize( spotVector );\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );\n#endif\nspotDiffuse += spotDistance * spotLightColor[ i ] * uDiffuseColor * spotDiffuseWeight * spotEffect;\nvec3 spotHalfVector = normalize( spotVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( spotVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += spotDistance * spotLightColor[ i ] * uSpecularColor * spotSpecularWeight * spotDiffuseWeight * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\n#ifdef WRAP_AROUND\nfloat directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );\nfloat directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\n#endif\ndirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nvec3 hemiDiffuse  = vec3( 0.0 );\nvec3 hemiSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\nhemiDiffuse += uDiffuseColor * hemiColor;\nvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\nfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\nfloat hemiSpecularWeightSky = specularTex.r * max( pow( hemiDotNormalHalfSky, uShininess ), 0.0 );\nvec3 lVectorGround = -lVector;\nvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\nfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\nfloat hemiSpecularWeightGround = specularTex.r * max( pow( hemiDotNormalHalfGround, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat dotProductGround = dot( normal, lVectorGround );\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlickSky = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\nvec3 schlickGround = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\nhemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n#else\nhemiSpecular += uSpecularColor * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\ntotalDiffuse += hemiDiffuse;\ntotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor ) + totalSpecular;\n#endif\nif ( enableReflection ) {\nvec3 vReflect;\nvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\nif ( useRefract ) {\nvReflect = refract( cameraToVertex, normal, uRefractionRatio );\n} else {\nvReflect = reflect( cameraToVertex, normal );\n}\nvec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );\n}",
        THREE.ShaderChunk.shadowmap_fragment,
        THREE.ShaderChunk.linear_to_gamma_fragment,
        THREE.ShaderChunk.fog_fragment,
        "}",
      ].join("\n"),
      vertexShader: [
        "attribute vec4 tangent;\nuniform vec2 uOffset;\nuniform vec2 uRepeat;\nuniform bool enableDisplacement;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;",
        THREE.ShaderChunk.skinning_pars_vertex,
        THREE.ShaderChunk.shadowmap_pars_vertex,
        "void main() {",
        THREE.ShaderChunk.skinbase_vertex,
        THREE.ShaderChunk.skinnormal_vertex,
        "#ifdef USE_SKINNING\nvNormal = normalize( normalMatrix * skinnedNormal.xyz );\nvec4 skinnedTangent = skinMatrix * vec4( tangent.xyz, 0.0 );\nvTangent = normalize( normalMatrix * skinnedTangent.xyz );\n#else\nvNormal = normalize( normalMatrix * normal );\nvTangent = normalize( normalMatrix * tangent.xyz );\n#endif\nvBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );\nvUv = uv * uRepeat + uOffset;\nvec3 displacedPosition;\n#ifdef VERTEX_TEXTURES\nif ( enableDisplacement ) {\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\ndisplacedPosition = position + normalize( normal ) * df;\n} else {\n#ifdef USE_SKINNING\nvec4 skinVertex = vec4( position, 1.0 );\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\ndisplacedPosition  = skinned.xyz;\n#else\ndisplacedPosition = position;\n#endif\n}\n#else\n#ifdef USE_SKINNING\nvec4 skinVertex = vec4( position, 1.0 );\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\ndisplacedPosition  = skinned.xyz;\n#else\ndisplacedPosition = position;\n#endif\n#endif\nvec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );\nvec4 worldPosition = modelMatrix * vec4( displacedPosition, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\nvWorldPosition = worldPosition.xyz;\nvViewPosition = -mvPosition.xyz;\n#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n}\n#endif\n}",
      ].join("\n"),
    },
    cube: {
      uniforms: {
        tCube: { type: "t", value: null },
        tFlip: { type: "f", value: -1 },
      },
      vertexShader:
        "varying vec3 vWorldPosition;\nvoid main() {\nvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\nvWorldPosition = worldPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
      fragmentShader:
        "uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vWorldPosition;\nvoid main() {\ngl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n}",
    },
  },
};
THREE.FontUtils = {
  faces: {},
  face: "helvetiker",
  weight: "normal",
  style: "normal",
  size: 150,
  divisions: 10,
  getFace: function () {
    return this.faces[this.face][this.weight][this.style];
  },
  loadFace: function (a) {
    var b = a.familyName.toLowerCase();
    this.faces[b] = this.faces[b] || {};
    this.faces[b][a.cssFontWeight] = this.faces[b][a.cssFontWeight] || {};
    this.faces[b][a.cssFontWeight][a.cssFontStyle] = a;
    return (this.faces[b][a.cssFontWeight][a.cssFontStyle] = a);
  },
  drawText: function (a) {
    for (
      var b = this.getFace(),
        c = this.size / b.resolution,
        d = 0,
        e = String(a).split(""),
        f = e.length,
        g = [],
        a = 0;
      a < f;
      a++
    ) {
      var h = new THREE.Path(),
        h = this.extractGlyphPoints(e[a], b, c, d, h),
        d = d + h.offset;
      g.push(h.path);
    }
    return { paths: g, offset: d / 2 };
  },
  extractGlyphPoints: function (a, b, c, d, e) {
    var f = [],
      g,
      h,
      i,
      k,
      n,
      p,
      m,
      r,
      s,
      l,
      q,
      u = b.glyphs[a] || b.glyphs["?"];
    if (u) {
      if (u.o) {
        b = u._cachedOutline || (u._cachedOutline = u.o.split(" "));
        k = b.length;
        for (a = 0; a < k; )
          switch (((i = b[a++]), i)) {
            case "m":
              i = b[a++] * c + d;
              n = b[a++] * c;
              e.moveTo(i, n);
              break;
            case "l":
              i = b[a++] * c + d;
              n = b[a++] * c;
              e.lineTo(i, n);
              break;
            case "q":
              i = b[a++] * c + d;
              n = b[a++] * c;
              r = b[a++] * c + d;
              s = b[a++] * c;
              e.quadraticCurveTo(r, s, i, n);
              if ((g = f[f.length - 1])) {
                p = g.x;
                m = g.y;
                g = 1;
                for (h = this.divisions; g <= h; g++) {
                  var B = g / h;
                  THREE.Shape.Utils.b2(B, p, r, i);
                  THREE.Shape.Utils.b2(B, m, s, n);
                }
              }
              break;
            case "b":
              if (
                ((i = b[a++] * c + d),
                (n = b[a++] * c),
                (r = b[a++] * c + d),
                (s = b[a++] * -c),
                (l = b[a++] * c + d),
                (q = b[a++] * -c),
                e.bezierCurveTo(i, n, r, s, l, q),
                (g = f[f.length - 1]))
              ) {
                p = g.x;
                m = g.y;
                g = 1;
                for (h = this.divisions; g <= h; g++)
                  (B = g / h),
                    THREE.Shape.Utils.b3(B, p, r, l, i),
                    THREE.Shape.Utils.b3(B, m, s, q, n);
              }
          }
      }
      return { offset: u.ha * c, path: e };
    }
  },
};
THREE.FontUtils.generateShapes = function (a, b) {
  var b = b || {},
    c = void 0 !== b.curveSegments ? b.curveSegments : 4,
    d = void 0 !== b.font ? b.font : "helvetiker",
    e = void 0 !== b.weight ? b.weight : "normal",
    f = void 0 !== b.style ? b.style : "normal";
  THREE.FontUtils.size = void 0 !== b.size ? b.size : 100;
  THREE.FontUtils.divisions = c;
  THREE.FontUtils.face = d;
  THREE.FontUtils.weight = e;
  THREE.FontUtils.style = f;
  c = THREE.FontUtils.drawText(a).paths;
  d = [];
  e = 0;
  for (f = c.length; e < f; e++) Array.prototype.push.apply(d, c[e].toShapes());
  return d;
};
(function (a) {
  var b = function (a) {
    for (var b = a.length, e = 0, f = b - 1, g = 0; g < b; f = g++)
      e += a[f].x * a[g].y - a[g].x * a[f].y;
    return 0.5 * e;
  };
  a.Triangulate = function (a, d) {
    var e = a.length;
    if (3 > e) return null;
    var f = [],
      g = [],
      h = [],
      i,
      k,
      n;
    if (0 < b(a)) for (k = 0; k < e; k++) g[k] = k;
    else for (k = 0; k < e; k++) g[k] = e - 1 - k;
    var p = 2 * e;
    for (k = e - 1; 2 < e; ) {
      if (0 >= p--) {
        console.log("Warning, unable to triangulate polygon!");
        break;
      }
      i = k;
      e <= i && (i = 0);
      k = i + 1;
      e <= k && (k = 0);
      n = k + 1;
      e <= n && (n = 0);
      var m;
      a: {
        var r = (m = void 0),
          s = void 0,
          l = void 0,
          q = void 0,
          u = void 0,
          B = void 0,
          x = void 0,
          t = void 0,
          r = a[g[i]].x,
          s = a[g[i]].y,
          l = a[g[k]].x,
          q = a[g[k]].y,
          u = a[g[n]].x,
          B = a[g[n]].y;
        if (1e-10 > (l - r) * (B - s) - (q - s) * (u - r)) m = !1;
        else {
          var F = void 0,
            C = void 0,
            A = void 0,
            z = void 0,
            H = void 0,
            G = void 0,
            I = void 0,
            $ = void 0,
            D = void 0,
            L = void 0,
            D = ($ = I = t = x = void 0),
            F = u - l,
            C = B - q,
            A = r - u,
            z = s - B,
            H = l - r,
            G = q - s;
          for (m = 0; m < e; m++)
            if (!(m === i || m === k || m === n))
              if (
                ((x = a[g[m]].x),
                (t = a[g[m]].y),
                (I = x - r),
                ($ = t - s),
                (D = x - l),
                (L = t - q),
                (x -= u),
                (t -= B),
                (D = F * L - C * D),
                (I = H * $ - G * I),
                ($ = A * t - z * x),
                0 <= D && 0 <= $ && 0 <= I)
              ) {
                m = !1;
                break a;
              }
          m = !0;
        }
      }
      if (m) {
        f.push([a[g[i]], a[g[k]], a[g[n]]]);
        h.push([g[i], g[k], g[n]]);
        i = k;
        for (n = k + 1; n < e; i++, n++) g[i] = g[n];
        e--;
        p = 2 * e;
      }
    }
    return d ? h : f;
  };
  a.Triangulate.area = b;
  return a;
})(THREE.FontUtils);
self._typeface_js = {
  faces: THREE.FontUtils.faces,
  loadFace: THREE.FontUtils.loadFace,
};
THREE.Curve = function () {};
THREE.Curve.prototype.getPoint = function () {
  console.log("Warning, getPoint() not implemented!");
  return null;
};
THREE.Curve.prototype.getPointAt = function (a) {
  a = this.getUtoTmapping(a);
  return this.getPoint(a);
};
THREE.Curve.prototype.getPoints = function (a) {
  a || (a = 5);
  var b,
    c = [];
  for (b = 0; b <= a; b++) c.push(this.getPoint(b / a));
  return c;
};
THREE.Curve.prototype.getSpacedPoints = function (a) {
  a || (a = 5);
  var b,
    c = [];
  for (b = 0; b <= a; b++) c.push(this.getPointAt(b / a));
  return c;
};
THREE.Curve.prototype.getLength = function () {
  var a = this.getLengths();
  return a[a.length - 1];
};
THREE.Curve.prototype.getLengths = function (a) {
  a || (a = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200);
  if (
    this.cacheArcLengths &&
    this.cacheArcLengths.length == a + 1 &&
    !this.needsUpdate
  )
    return this.cacheArcLengths;
  this.needsUpdate = !1;
  var b = [],
    c,
    d = this.getPoint(0),
    e,
    f = 0;
  b.push(0);
  for (e = 1; e <= a; e++)
    (c = this.getPoint(e / a)), (f += c.distanceTo(d)), b.push(f), (d = c);
  return (this.cacheArcLengths = b);
};
THREE.Curve.prototype.updateArcLengths = function () {
  this.needsUpdate = !0;
  this.getLengths();
};
THREE.Curve.prototype.getUtoTmapping = function (a, b) {
  var c = this.getLengths(),
    d = 0,
    e = c.length,
    f;
  f = b ? b : a * c[e - 1];
  for (var g = 0, h = e - 1, i; g <= h; )
    if (((d = Math.floor(g + (h - g) / 2)), (i = c[d] - f), 0 > i)) g = d + 1;
    else if (0 < i) h = d - 1;
    else {
      h = d;
      break;
    }
  d = h;
  if (c[d] == f) return d / (e - 1);
  g = c[d];
  return (c = (d + (f - g) / (c[d + 1] - g)) / (e - 1));
};
THREE.Curve.prototype.getTangent = function (a) {
  var b = a - 1e-4,
    a = a + 1e-4;
  0 > b && (b = 0);
  1 < a && (a = 1);
  b = this.getPoint(b);
  return this.getPoint(a).clone().subSelf(b).normalize();
};
THREE.Curve.prototype.getTangentAt = function (a) {
  a = this.getUtoTmapping(a);
  return this.getTangent(a);
};
THREE.LineCurve = function (a, b) {
  this.v1 = a;
  this.v2 = b;
};
THREE.LineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.LineCurve.prototype.getPoint = function (a) {
  var b = this.v2.clone().subSelf(this.v1);
  b.multiplyScalar(a).addSelf(this.v1);
  return b;
};
THREE.LineCurve.prototype.getPointAt = function (a) {
  return this.getPoint(a);
};
THREE.LineCurve.prototype.getTangent = function () {
  return this.v2.clone().subSelf(this.v1).normalize();
};
THREE.QuadraticBezierCurve = function (a, b, c) {
  this.v0 = a;
  this.v1 = b;
  this.v2 = c;
};
THREE.QuadraticBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.QuadraticBezierCurve.prototype.getPoint = function (a) {
  var b;
  b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
  a = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
  return new THREE.Vector2(b, a);
};
THREE.QuadraticBezierCurve.prototype.getTangent = function (a) {
  var b;
  b = THREE.Curve.Utils.tangentQuadraticBezier(
    a,
    this.v0.x,
    this.v1.x,
    this.v2.x
  );
  a = THREE.Curve.Utils.tangentQuadraticBezier(
    a,
    this.v0.y,
    this.v1.y,
    this.v2.y
  );
  b = new THREE.Vector2(b, a);
  b.normalize();
  return b;
};
THREE.CubicBezierCurve = function (a, b, c, d) {
  this.v0 = a;
  this.v1 = b;
  this.v2 = c;
  this.v3 = d;
};
THREE.CubicBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.CubicBezierCurve.prototype.getPoint = function (a) {
  var b;
  b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
  a = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
  return new THREE.Vector2(b, a);
};
THREE.CubicBezierCurve.prototype.getTangent = function (a) {
  var b;
  b = THREE.Curve.Utils.tangentCubicBezier(
    a,
    this.v0.x,
    this.v1.x,
    this.v2.x,
    this.v3.x
  );
  a = THREE.Curve.Utils.tangentCubicBezier(
    a,
    this.v0.y,
    this.v1.y,
    this.v2.y,
    this.v3.y
  );
  b = new THREE.Vector2(b, a);
  b.normalize();
  return b;
};
THREE.SplineCurve = function (a) {
  this.points = void 0 == a ? [] : a;
};
THREE.SplineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.SplineCurve.prototype.getPoint = function (a) {
  var b = new THREE.Vector2(),
    c = [],
    d = this.points,
    e;
  e = (d.length - 1) * a;
  a = Math.floor(e);
  e -= a;
  c[0] = 0 == a ? a : a - 1;
  c[1] = a;
  c[2] = a > d.length - 2 ? d.length - 1 : a + 1;
  c[3] = a > d.length - 3 ? d.length - 1 : a + 2;
  b.x = THREE.Curve.Utils.interpolate(
    d[c[0]].x,
    d[c[1]].x,
    d[c[2]].x,
    d[c[3]].x,
    e
  );
  b.y = THREE.Curve.Utils.interpolate(
    d[c[0]].y,
    d[c[1]].y,
    d[c[2]].y,
    d[c[3]].y,
    e
  );
  return b;
};
THREE.EllipseCurve = function (a, b, c, d, e, f, g) {
  this.aX = a;
  this.aY = b;
  this.xRadius = c;
  this.yRadius = d;
  this.aStartAngle = e;
  this.aEndAngle = f;
  this.aClockwise = g;
};
THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.EllipseCurve.prototype.getPoint = function (a) {
  var b = this.aEndAngle - this.aStartAngle;
  this.aClockwise || (a = 1 - a);
  b = this.aStartAngle + a * b;
  a = this.aX + this.xRadius * Math.cos(b);
  b = this.aY + this.yRadius * Math.sin(b);
  return new THREE.Vector2(a, b);
};
THREE.ArcCurve = function (a, b, c, d, e, f) {
  THREE.EllipseCurve.call(this, a, b, c, c, d, e, f);
};
THREE.ArcCurve.prototype = Object.create(THREE.EllipseCurve.prototype);
THREE.Curve.Utils = {
  tangentQuadraticBezier: function (a, b, c, d) {
    return 2 * (1 - a) * (c - b) + 2 * a * (d - c);
  },
  tangentCubicBezier: function (a, b, c, d, e) {
    return (
      -3 * b * (1 - a) * (1 - a) +
      3 * c * (1 - a) * (1 - a) -
      6 * a * c * (1 - a) +
      6 * a * d * (1 - a) -
      3 * a * a * d +
      3 * a * a * e
    );
  },
  tangentSpline: function (a) {
    return (
      6 * a * a -
      6 * a +
      (3 * a * a - 4 * a + 1) +
      (-6 * a * a + 6 * a) +
      (3 * a * a - 2 * a)
    );
  },
  interpolate: function (a, b, c, d, e) {
    var a = 0.5 * (c - a),
      d = 0.5 * (d - b),
      f = e * e;
    return (
      (2 * b - 2 * c + a + d) * e * f +
      (-3 * b + 3 * c - 2 * a - d) * f +
      a * e +
      b
    );
  },
};
THREE.Curve.create = function (a, b) {
  a.prototype = Object.create(THREE.Curve.prototype);
  a.prototype.getPoint = b;
  return a;
};
THREE.LineCurve3 = THREE.Curve.create(
  function (a, b) {
    this.v1 = a;
    this.v2 = b;
  },
  function (a) {
    var b = new THREE.Vector3();
    b.sub(this.v2, this.v1);
    b.multiplyScalar(a);
    b.addSelf(this.v1);
    return b;
  }
);
THREE.QuadraticBezierCurve3 = THREE.Curve.create(
  function (a, b, c) {
    this.v0 = a;
    this.v1 = b;
    this.v2 = c;
  },
  function (a) {
    var b, c;
    b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
    c = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
    a = THREE.Shape.Utils.b2(a, this.v0.z, this.v1.z, this.v2.z);
    return new THREE.Vector3(b, c, a);
  }
);
THREE.CubicBezierCurve3 = THREE.Curve.create(
  function (a, b, c, d) {
    this.v0 = a;
    this.v1 = b;
    this.v2 = c;
    this.v3 = d;
  },
  function (a) {
    var b, c;
    b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
    c = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
    a = THREE.Shape.Utils.b3(a, this.v0.z, this.v1.z, this.v2.z, this.v3.z);
    return new THREE.Vector3(b, c, a);
  }
);
THREE.SplineCurve3 = THREE.Curve.create(
  function (a) {
    this.points = void 0 == a ? [] : a;
  },
  function (a) {
    var b = new THREE.Vector3(),
      c = [],
      d = this.points,
      e,
      a = (d.length - 1) * a;
    e = Math.floor(a);
    a -= e;
    c[0] = 0 == e ? e : e - 1;
    c[1] = e;
    c[2] = e > d.length - 2 ? d.length - 1 : e + 1;
    c[3] = e > d.length - 3 ? d.length - 1 : e + 2;
    e = d[c[0]];
    var f = d[c[1]],
      g = d[c[2]],
      c = d[c[3]];
    b.x = THREE.Curve.Utils.interpolate(e.x, f.x, g.x, c.x, a);
    b.y = THREE.Curve.Utils.interpolate(e.y, f.y, g.y, c.y, a);
    b.z = THREE.Curve.Utils.interpolate(e.z, f.z, g.z, c.z, a);
    return b;
  }
);
THREE.ClosedSplineCurve3 = THREE.Curve.create(
  function (a) {
    this.points = void 0 == a ? [] : a;
  },
  function (a) {
    var b = new THREE.Vector3(),
      c = [],
      d = this.points,
      e;
    e = (d.length - 0) * a;
    a = Math.floor(e);
    e -= a;
    a += 0 < a ? 0 : (Math.floor(Math.abs(a) / d.length) + 1) * d.length;
    c[0] = (a - 1) % d.length;
    c[1] = a % d.length;
    c[2] = (a + 1) % d.length;
    c[3] = (a + 2) % d.length;
    b.x = THREE.Curve.Utils.interpolate(
      d[c[0]].x,
      d[c[1]].x,
      d[c[2]].x,
      d[c[3]].x,
      e
    );
    b.y = THREE.Curve.Utils.interpolate(
      d[c[0]].y,
      d[c[1]].y,
      d[c[2]].y,
      d[c[3]].y,
      e
    );
    b.z = THREE.Curve.Utils.interpolate(
      d[c[0]].z,
      d[c[1]].z,
      d[c[2]].z,
      d[c[3]].z,
      e
    );
    return b;
  }
);
THREE.CurvePath = function () {
  this.curves = [];
  this.bends = [];
  this.autoClose = !1;
};
THREE.CurvePath.prototype = Object.create(THREE.Curve.prototype);
THREE.CurvePath.prototype.add = function (a) {
  this.curves.push(a);
};
THREE.CurvePath.prototype.checkConnection = function () {};
THREE.CurvePath.prototype.closePath = function () {
  var a = this.curves[0].getPoint(0),
    b = this.curves[this.curves.length - 1].getPoint(1);
  a.equals(b) || this.curves.push(new THREE.LineCurve(b, a));
};
THREE.CurvePath.prototype.getPoint = function (a) {
  for (
    var b = a * this.getLength(), c = this.getCurveLengths(), a = 0;
    a < c.length;

  ) {
    if (c[a] >= b)
      return (
        (b = c[a] - b),
        (a = this.curves[a]),
        (b = 1 - b / a.getLength()),
        a.getPointAt(b)
      );
    a++;
  }
  return null;
};
THREE.CurvePath.prototype.getLength = function () {
  var a = this.getCurveLengths();
  return a[a.length - 1];
};
THREE.CurvePath.prototype.getCurveLengths = function () {
  if (this.cacheLengths && this.cacheLengths.length == this.curves.length)
    return this.cacheLengths;
  var a = [],
    b = 0,
    c,
    d = this.curves.length;
  for (c = 0; c < d; c++) (b += this.curves[c].getLength()), a.push(b);
  return (this.cacheLengths = a);
};
THREE.CurvePath.prototype.getBoundingBox = function () {
  var a = this.getPoints(),
    b,
    c,
    d,
    e,
    f,
    g;
  b = c = Number.NEGATIVE_INFINITY;
  e = f = Number.POSITIVE_INFINITY;
  var h,
    i,
    k,
    n,
    p = a[0] instanceof THREE.Vector3;
  n = p ? new THREE.Vector3() : new THREE.Vector2();
  i = 0;
  for (k = a.length; i < k; i++)
    (h = a[i]),
      h.x > b ? (b = h.x) : h.x < e && (e = h.x),
      h.y > c ? (c = h.y) : h.y < f && (f = h.y),
      p && (h.z > d ? (d = h.z) : h.z < g && (g = h.z)),
      n.addSelf(h);
  a = { minX: e, minY: f, maxX: b, maxY: c, centroid: n.divideScalar(k) };
  p && ((a.maxZ = d), (a.minZ = g));
  return a;
};
THREE.CurvePath.prototype.createPointsGeometry = function (a) {
  a = this.getPoints(a, !0);
  return this.createGeometry(a);
};
THREE.CurvePath.prototype.createSpacedPointsGeometry = function (a) {
  a = this.getSpacedPoints(a, !0);
  return this.createGeometry(a);
};
THREE.CurvePath.prototype.createGeometry = function (a) {
  for (var b = new THREE.Geometry(), c = 0; c < a.length; c++)
    b.vertices.push(new THREE.Vector3(a[c].x, a[c].y, a[c].z || 0));
  return b;
};
THREE.CurvePath.prototype.addWrapPath = function (a) {
  this.bends.push(a);
};
THREE.CurvePath.prototype.getTransformedPoints = function (a, b) {
  var c = this.getPoints(a),
    d,
    e;
  b || (b = this.bends);
  d = 0;
  for (e = b.length; d < e; d++) c = this.getWrapPoints(c, b[d]);
  return c;
};
THREE.CurvePath.prototype.getTransformedSpacedPoints = function (a, b) {
  var c = this.getSpacedPoints(a),
    d,
    e;
  b || (b = this.bends);
  d = 0;
  for (e = b.length; d < e; d++) c = this.getWrapPoints(c, b[d]);
  return c;
};
THREE.CurvePath.prototype.getWrapPoints = function (a, b) {
  var c = this.getBoundingBox(),
    d,
    e,
    f,
    g,
    h,
    i;
  d = 0;
  for (e = a.length; d < e; d++)
    (f = a[d]),
      (g = f.x),
      (h = f.y),
      (i = g / c.maxX),
      (i = b.getUtoTmapping(i, g)),
      (g = b.getPoint(i)),
      (h = b.getNormalVector(i).multiplyScalar(h)),
      (f.x = g.x + h.x),
      (f.y = g.y + h.y);
  return a;
};
THREE.Gyroscope = function () {
  THREE.Object3D.call(this);
};
THREE.Gyroscope.prototype = Object.create(THREE.Object3D.prototype);
THREE.Gyroscope.prototype.updateMatrixWorld = function (a) {
  this.matrixAutoUpdate && this.updateMatrix();
  if (this.matrixWorldNeedsUpdate || a)
    this.parent
      ? (this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix),
        this.matrixWorld.decompose(
          this.translationWorld,
          this.rotationWorld,
          this.scaleWorld
        ),
        this.matrix.decompose(
          this.translationObject,
          this.rotationObject,
          this.scaleObject
        ),
        this.matrixWorld.compose(
          this.translationWorld,
          this.rotationObject,
          this.scaleWorld
        ))
      : this.matrixWorld.copy(this.matrix),
      (this.matrixWorldNeedsUpdate = !1),
      (a = !0);
  for (var b = 0, c = this.children.length; b < c; b++)
    this.children[b].updateMatrixWorld(a);
};
THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3();
THREE.Gyroscope.prototype.translationObject = new THREE.Vector3();
THREE.Gyroscope.prototype.rotationWorld = new THREE.Quaternion();
THREE.Gyroscope.prototype.rotationObject = new THREE.Quaternion();
THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3();
THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3();
THREE.Path = function (a) {
  THREE.CurvePath.call(this);
  this.actions = [];
  a && this.fromPoints(a);
};
THREE.Path.prototype = Object.create(THREE.CurvePath.prototype);
THREE.PathActions = {
  MOVE_TO: "moveTo",
  LINE_TO: "lineTo",
  QUADRATIC_CURVE_TO: "quadraticCurveTo",
  BEZIER_CURVE_TO: "bezierCurveTo",
  CSPLINE_THRU: "splineThru",
  ARC: "arc",
  ELLIPSE: "ellipse",
};
THREE.Path.prototype.fromPoints = function (a) {
  this.moveTo(a[0].x, a[0].y);
  for (var b = 1, c = a.length; b < c; b++) this.lineTo(a[b].x, a[b].y);
};
THREE.Path.prototype.moveTo = function (a, b) {
  var c = Array.prototype.slice.call(arguments);
  this.actions.push({ action: THREE.PathActions.MOVE_TO, args: c });
};
THREE.Path.prototype.lineTo = function (a, b) {
  var c = Array.prototype.slice.call(arguments),
    d = this.actions[this.actions.length - 1].args,
    d = new THREE.LineCurve(
      new THREE.Vector2(d[d.length - 2], d[d.length - 1]),
      new THREE.Vector2(a, b)
    );
  this.curves.push(d);
  this.actions.push({ action: THREE.PathActions.LINE_TO, args: c });
};
THREE.Path.prototype.quadraticCurveTo = function (a, b, c, d) {
  var e = Array.prototype.slice.call(arguments),
    f = this.actions[this.actions.length - 1].args,
    f = new THREE.QuadraticBezierCurve(
      new THREE.Vector2(f[f.length - 2], f[f.length - 1]),
      new THREE.Vector2(a, b),
      new THREE.Vector2(c, d)
    );
  this.curves.push(f);
  this.actions.push({ action: THREE.PathActions.QUADRATIC_CURVE_TO, args: e });
};
THREE.Path.prototype.bezierCurveTo = function (a, b, c, d, e, f) {
  var g = Array.prototype.slice.call(arguments),
    h = this.actions[this.actions.length - 1].args,
    h = new THREE.CubicBezierCurve(
      new THREE.Vector2(h[h.length - 2], h[h.length - 1]),
      new THREE.Vector2(a, b),
      new THREE.Vector2(c, d),
      new THREE.Vector2(e, f)
    );
  this.curves.push(h);
  this.actions.push({ action: THREE.PathActions.BEZIER_CURVE_TO, args: g });
};
THREE.Path.prototype.splineThru = function (a) {
  var b = Array.prototype.slice.call(arguments),
    c = this.actions[this.actions.length - 1].args,
    c = [new THREE.Vector2(c[c.length - 2], c[c.length - 1])];
  Array.prototype.push.apply(c, a);
  c = new THREE.SplineCurve(c);
  this.curves.push(c);
  this.actions.push({ action: THREE.PathActions.CSPLINE_THRU, args: b });
};
THREE.Path.prototype.arc = function (a, b, c, d, e, f) {
  var g = this.actions[this.actions.length - 1].args;
  this.absarc(a + g[g.length - 2], b + g[g.length - 1], c, d, e, f);
};
THREE.Path.prototype.absarc = function (a, b, c, d, e, f) {
  this.absellipse(a, b, c, c, d, e, f);
};
THREE.Path.prototype.ellipse = function (a, b, c, d, e, f, g) {
  var h = this.actions[this.actions.length - 1].args;
  this.absellipse(a + h[h.length - 2], b + h[h.length - 1], c, d, e, f, g);
};
THREE.Path.prototype.absellipse = function (a, b, c, d, e, f, g) {
  var h = Array.prototype.slice.call(arguments),
    i = new THREE.EllipseCurve(a, b, c, d, e, f, g);
  this.curves.push(i);
  i = i.getPoint(g ? 1 : 0);
  h.push(i.x);
  h.push(i.y);
  this.actions.push({ action: THREE.PathActions.ELLIPSE, args: h });
};
THREE.Path.prototype.getSpacedPoints = function (a) {
  a || (a = 40);
  for (var b = [], c = 0; c < a; c++) b.push(this.getPoint(c / a));
  return b;
};
THREE.Path.prototype.getPoints = function (a, b) {
  if (this.useSpacedPoints)
    return console.log("tata"), this.getSpacedPoints(a, b);
  var a = a || 12,
    c = [],
    d,
    e,
    f,
    g,
    h,
    i,
    k,
    n,
    p,
    m,
    r,
    s,
    l;
  d = 0;
  for (e = this.actions.length; d < e; d++)
    switch (((f = this.actions[d]), (g = f.action), (f = f.args), g)) {
      case THREE.PathActions.MOVE_TO:
        c.push(new THREE.Vector2(f[0], f[1]));
        break;
      case THREE.PathActions.LINE_TO:
        c.push(new THREE.Vector2(f[0], f[1]));
        break;
      case THREE.PathActions.QUADRATIC_CURVE_TO:
        h = f[2];
        i = f[3];
        p = f[0];
        m = f[1];
        0 < c.length
          ? ((g = c[c.length - 1]), (r = g.x), (s = g.y))
          : ((g = this.actions[d - 1].args),
            (r = g[g.length - 2]),
            (s = g[g.length - 1]));
        for (f = 1; f <= a; f++)
          (l = f / a),
            (g = THREE.Shape.Utils.b2(l, r, p, h)),
            (l = THREE.Shape.Utils.b2(l, s, m, i)),
            c.push(new THREE.Vector2(g, l));
        break;
      case THREE.PathActions.BEZIER_CURVE_TO:
        h = f[4];
        i = f[5];
        p = f[0];
        m = f[1];
        k = f[2];
        n = f[3];
        0 < c.length
          ? ((g = c[c.length - 1]), (r = g.x), (s = g.y))
          : ((g = this.actions[d - 1].args),
            (r = g[g.length - 2]),
            (s = g[g.length - 1]));
        for (f = 1; f <= a; f++)
          (l = f / a),
            (g = THREE.Shape.Utils.b3(l, r, p, k, h)),
            (l = THREE.Shape.Utils.b3(l, s, m, n, i)),
            c.push(new THREE.Vector2(g, l));
        break;
      case THREE.PathActions.CSPLINE_THRU:
        g = this.actions[d - 1].args;
        l = [new THREE.Vector2(g[g.length - 2], g[g.length - 1])];
        g = a * f[0].length;
        l = l.concat(f[0]);
        l = new THREE.SplineCurve(l);
        for (f = 1; f <= g; f++) c.push(l.getPointAt(f / g));
        break;
      case THREE.PathActions.ARC:
        h = f[0];
        i = f[1];
        m = f[2];
        k = f[3];
        g = f[4];
        p = !!f[5];
        r = g - k;
        s = 2 * a;
        for (f = 1; f <= s; f++)
          (l = f / s),
            p || (l = 1 - l),
            (l = k + l * r),
            (g = h + m * Math.cos(l)),
            (l = i + m * Math.sin(l)),
            c.push(new THREE.Vector2(g, l));
        break;
      case THREE.PathActions.ELLIPSE:
        h = f[0];
        i = f[1];
        m = f[2];
        n = f[3];
        k = f[4];
        g = f[5];
        p = !!f[6];
        r = g - k;
        s = 2 * a;
        for (f = 1; f <= s; f++)
          (l = f / s),
            p || (l = 1 - l),
            (l = k + l * r),
            (g = h + m * Math.cos(l)),
            (l = i + n * Math.sin(l)),
            c.push(new THREE.Vector2(g, l));
    }
  d = c[c.length - 1];
  1e-10 > Math.abs(d.x - c[0].x) &&
    1e-10 > Math.abs(d.y - c[0].y) &&
    c.splice(c.length - 1, 1);
  b && c.push(c[0]);
  return c;
};
THREE.Path.prototype.toShapes = function () {
  var a,
    b,
    c,
    d,
    e = [],
    f = new THREE.Path();
  a = 0;
  for (b = this.actions.length; a < b; a++)
    (c = this.actions[a]),
      (d = c.args),
      (c = c.action),
      c == THREE.PathActions.MOVE_TO &&
        0 != f.actions.length &&
        (e.push(f), (f = new THREE.Path())),
      f[c].apply(f, d);
  0 != f.actions.length && e.push(f);
  if (0 == e.length) return [];
  var g;
  d = [];
  a = !THREE.Shape.Utils.isClockWise(e[0].getPoints());
  if (1 == e.length)
    return (
      (f = e[0]),
      (g = new THREE.Shape()),
      (g.actions = f.actions),
      (g.curves = f.curves),
      d.push(g),
      d
    );
  if (a) {
    g = new THREE.Shape();
    a = 0;
    for (b = e.length; a < b; a++)
      (f = e[a]),
        THREE.Shape.Utils.isClockWise(f.getPoints())
          ? ((g.actions = f.actions),
            (g.curves = f.curves),
            d.push(g),
            (g = new THREE.Shape()))
          : g.holes.push(f);
  } else {
    a = 0;
    for (b = e.length; a < b; a++)
      (f = e[a]),
        THREE.Shape.Utils.isClockWise(f.getPoints())
          ? (g && d.push(g),
            (g = new THREE.Shape()),
            (g.actions = f.actions),
            (g.curves = f.curves))
          : g.holes.push(f);
    d.push(g);
  }
  return d;
};
THREE.Shape = function () {
  THREE.Path.apply(this, arguments);
  this.holes = [];
};
THREE.Shape.prototype = Object.create(THREE.Path.prototype);
THREE.Shape.prototype.extrude = function (a) {
  return new THREE.ExtrudeGeometry(this, a);
};
THREE.Shape.prototype.makeGeometry = function (a) {
  return new THREE.ShapeGeometry(this, a);
};
THREE.Shape.prototype.getPointsHoles = function (a) {
  var b,
    c = this.holes.length,
    d = [];
  for (b = 0; b < c; b++)
    d[b] = this.holes[b].getTransformedPoints(a, this.bends);
  return d;
};
THREE.Shape.prototype.getSpacedPointsHoles = function (a) {
  var b,
    c = this.holes.length,
    d = [];
  for (b = 0; b < c; b++)
    d[b] = this.holes[b].getTransformedSpacedPoints(a, this.bends);
  return d;
};
THREE.Shape.prototype.extractAllPoints = function (a) {
  return { shape: this.getTransformedPoints(a), holes: this.getPointsHoles(a) };
};
THREE.Shape.prototype.extractPoints = function (a) {
  return this.useSpacedPoints
    ? this.extractAllSpacedPoints(a)
    : this.extractAllPoints(a);
};
THREE.Shape.prototype.extractAllSpacedPoints = function (a) {
  return {
    shape: this.getTransformedSpacedPoints(a),
    holes: this.getSpacedPointsHoles(a),
  };
};
THREE.Shape.Utils = {
  removeHoles: function (a, b) {
    var c = a.concat(),
      d = c.concat(),
      e,
      f,
      g,
      h,
      i,
      k,
      n,
      p,
      m,
      r,
      s = [];
    for (i = 0; i < b.length; i++) {
      k = b[i];
      Array.prototype.push.apply(d, k);
      f = Number.POSITIVE_INFINITY;
      for (e = 0; e < k.length; e++) {
        m = k[e];
        r = [];
        for (p = 0; p < c.length; p++)
          (n = c[p]),
            (n = m.distanceToSquared(n)),
            r.push(n),
            n < f && ((f = n), (g = e), (h = p));
      }
      e = 0 <= h - 1 ? h - 1 : c.length - 1;
      f = 0 <= g - 1 ? g - 1 : k.length - 1;
      var l = [k[g], c[h], c[e]];
      p = THREE.FontUtils.Triangulate.area(l);
      var q = [k[g], k[f], c[h]];
      m = THREE.FontUtils.Triangulate.area(q);
      r = h;
      n = g;
      h += 1;
      g += -1;
      0 > h && (h += c.length);
      h %= c.length;
      0 > g && (g += k.length);
      g %= k.length;
      e = 0 <= h - 1 ? h - 1 : c.length - 1;
      f = 0 <= g - 1 ? g - 1 : k.length - 1;
      l = [k[g], c[h], c[e]];
      l = THREE.FontUtils.Triangulate.area(l);
      q = [k[g], k[f], c[h]];
      q = THREE.FontUtils.Triangulate.area(q);
      p + m > l + q &&
        ((h = r),
        (g = n),
        0 > h && (h += c.length),
        (h %= c.length),
        0 > g && (g += k.length),
        (g %= k.length),
        (e = 0 <= h - 1 ? h - 1 : c.length - 1),
        (f = 0 <= g - 1 ? g - 1 : k.length - 1));
      p = c.slice(0, h);
      m = c.slice(h);
      r = k.slice(g);
      n = k.slice(0, g);
      f = [k[g], k[f], c[h]];
      s.push([k[g], c[h], c[e]]);
      s.push(f);
      c = p.concat(r).concat(n).concat(m);
    }
    return { shape: c, isolatedPts: s, allpoints: d };
  },
  triangulateShape: function (a, b) {
    var c = THREE.Shape.Utils.removeHoles(a, b),
      d = c.allpoints,
      e = c.isolatedPts,
      c = THREE.FontUtils.Triangulate(c.shape, !1),
      f,
      g,
      h,
      i,
      k = {};
    f = 0;
    for (g = d.length; f < g; f++)
      (i = d[f].x + ":" + d[f].y),
        void 0 !== k[i] && console.log("Duplicate point", i),
        (k[i] = f);
    f = 0;
    for (g = c.length; f < g; f++) {
      h = c[f];
      for (d = 0; 3 > d; d++)
        (i = h[d].x + ":" + h[d].y), (i = k[i]), void 0 !== i && (h[d] = i);
    }
    f = 0;
    for (g = e.length; f < g; f++) {
      h = e[f];
      for (d = 0; 3 > d; d++)
        (i = h[d].x + ":" + h[d].y), (i = k[i]), void 0 !== i && (h[d] = i);
    }
    return c.concat(e);
  },
  isClockWise: function (a) {
    return 0 > THREE.FontUtils.Triangulate.area(a);
  },
  b2p0: function (a, b) {
    var c = 1 - a;
    return c * c * b;
  },
  b2p1: function (a, b) {
    return 2 * (1 - a) * a * b;
  },
  b2p2: function (a, b) {
    return a * a * b;
  },
  b2: function (a, b, c, d) {
    return this.b2p0(a, b) + this.b2p1(a, c) + this.b2p2(a, d);
  },
  b3p0: function (a, b) {
    var c = 1 - a;
    return c * c * c * b;
  },
  b3p1: function (a, b) {
    var c = 1 - a;
    return 3 * c * c * a * b;
  },
  b3p2: function (a, b) {
    return 3 * (1 - a) * a * a * b;
  },
  b3p3: function (a, b) {
    return a * a * a * b;
  },
  b3: function (a, b, c, d, e) {
    return (
      this.b3p0(a, b) + this.b3p1(a, c) + this.b3p2(a, d) + this.b3p3(a, e)
    );
  },
};
THREE.AnimationHandler = (function () {
  var a = [],
    b = {},
    c = {
      update: function (b) {
        for (var c = 0; c < a.length; c++) a[c].update(b);
      },
      addToUpdate: function (b) {
        -1 === a.indexOf(b) && a.push(b);
      },
      removeFromUpdate: function (b) {
        b = a.indexOf(b);
        -1 !== b && a.splice(b, 1);
      },
      add: function (a) {
        void 0 !== b[a.name] &&
          console.log(
            "THREE.AnimationHandler.add: Warning! " +
              a.name +
              " already exists in library. Overwriting."
          );
        b[a.name] = a;
        if (!0 !== a.initialized) {
          for (var c = 0; c < a.hierarchy.length; c++) {
            for (var d = 0; d < a.hierarchy[c].keys.length; d++)
              if (
                (0 > a.hierarchy[c].keys[d].time &&
                  (a.hierarchy[c].keys[d].time = 0),
                void 0 !== a.hierarchy[c].keys[d].rot &&
                  !(a.hierarchy[c].keys[d].rot instanceof THREE.Quaternion))
              ) {
                var h = a.hierarchy[c].keys[d].rot;
                a.hierarchy[c].keys[d].rot = new THREE.Quaternion(
                  h[0],
                  h[1],
                  h[2],
                  h[3]
                );
              }
            if (
              a.hierarchy[c].keys.length &&
              void 0 !== a.hierarchy[c].keys[0].morphTargets
            ) {
              h = {};
              for (d = 0; d < a.hierarchy[c].keys.length; d++)
                for (
                  var i = 0;
                  i < a.hierarchy[c].keys[d].morphTargets.length;
                  i++
                ) {
                  var k = a.hierarchy[c].keys[d].morphTargets[i];
                  h[k] = -1;
                }
              a.hierarchy[c].usedMorphTargets = h;
              for (d = 0; d < a.hierarchy[c].keys.length; d++) {
                var n = {};
                for (k in h) {
                  for (
                    i = 0;
                    i < a.hierarchy[c].keys[d].morphTargets.length;
                    i++
                  )
                    if (a.hierarchy[c].keys[d].morphTargets[i] === k) {
                      n[k] = a.hierarchy[c].keys[d].morphTargetsInfluences[i];
                      break;
                    }
                  i === a.hierarchy[c].keys[d].morphTargets.length &&
                    (n[k] = 0);
                }
                a.hierarchy[c].keys[d].morphTargetsInfluences = n;
              }
            }
            for (d = 1; d < a.hierarchy[c].keys.length; d++)
              a.hierarchy[c].keys[d].time === a.hierarchy[c].keys[d - 1].time &&
                (a.hierarchy[c].keys.splice(d, 1), d--);
            for (d = 0; d < a.hierarchy[c].keys.length; d++)
              a.hierarchy[c].keys[d].index = d;
          }
          d = parseInt(a.length * a.fps, 10);
          a.JIT = {};
          a.JIT.hierarchy = [];
          for (c = 0; c < a.hierarchy.length; c++)
            a.JIT.hierarchy.push(Array(d));
          a.initialized = !0;
        }
      },
      get: function (a) {
        if ("string" === typeof a) {
          if (b[a]) return b[a];
          console.log(
            "THREE.AnimationHandler.get: Couldn't find animation " + a
          );
          return null;
        }
      },
      parse: function (a) {
        var b = [];
        if (a instanceof THREE.SkinnedMesh)
          for (var c = 0; c < a.bones.length; c++) b.push(a.bones[c]);
        else d(a, b);
        return b;
      },
    },
    d = function (a, b) {
      b.push(a);
      for (var c = 0; c < a.children.length; c++) d(a.children[c], b);
    };
  c.LINEAR = 0;
  c.CATMULLROM = 1;
  c.CATMULLROM_FORWARD = 2;
  return c;
})();
THREE.Animation = function (a, b, c) {
  this.root = a;
  this.data = THREE.AnimationHandler.get(b);
  this.hierarchy = THREE.AnimationHandler.parse(a);
  this.currentTime = 0;
  this.timeScale = 1;
  this.isPlaying = !1;
  this.loop = this.isPaused = !0;
  this.interpolationType = void 0 !== c ? c : THREE.AnimationHandler.LINEAR;
  this.points = [];
  this.target = new THREE.Vector3();
};
THREE.Animation.prototype.play = function (a, b) {
  if (!1 === this.isPlaying) {
    this.isPlaying = !0;
    this.loop = void 0 !== a ? a : !0;
    this.currentTime = void 0 !== b ? b : 0;
    var c,
      d = this.hierarchy.length,
      e;
    for (c = 0; c < d; c++) {
      e = this.hierarchy[c];
      this.interpolationType !== THREE.AnimationHandler.CATMULLROM_FORWARD &&
        (e.useQuaternion = !0);
      e.matrixAutoUpdate = !0;
      void 0 === e.animationCache &&
        ((e.animationCache = {}),
        (e.animationCache.prevKey = { pos: 0, rot: 0, scl: 0 }),
        (e.animationCache.nextKey = { pos: 0, rot: 0, scl: 0 }),
        (e.animationCache.originalMatrix =
          e instanceof THREE.Bone ? e.skinMatrix : e.matrix));
      var f = e.animationCache.prevKey;
      e = e.animationCache.nextKey;
      f.pos = this.data.hierarchy[c].keys[0];
      f.rot = this.data.hierarchy[c].keys[0];
      f.scl = this.data.hierarchy[c].keys[0];
      e.pos = this.getNextKeyWith("pos", c, 1);
      e.rot = this.getNextKeyWith("rot", c, 1);
      e.scl = this.getNextKeyWith("scl", c, 1);
    }
    this.update(0);
  }
  this.isPaused = !1;
  THREE.AnimationHandler.addToUpdate(this);
};
THREE.Animation.prototype.pause = function () {
  !0 === this.isPaused
    ? THREE.AnimationHandler.addToUpdate(this)
    : THREE.AnimationHandler.removeFromUpdate(this);
  this.isPaused = !this.isPaused;
};
THREE.Animation.prototype.stop = function () {
  this.isPaused = this.isPlaying = !1;
  THREE.AnimationHandler.removeFromUpdate(this);
};
THREE.Animation.prototype.update = function (a) {
  if (!1 !== this.isPlaying) {
    var b = ["pos", "rot", "scl"],
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      k,
      n;
    n = this.currentTime += a * this.timeScale;
    k = this.currentTime %= this.data.length;
    parseInt(Math.min(k * this.data.fps, this.data.length * this.data.fps), 10);
    for (var p = 0, m = this.hierarchy.length; p < m; p++) {
      a = this.hierarchy[p];
      i = a.animationCache;
      for (var r = 0; 3 > r; r++) {
        c = b[r];
        g = i.prevKey[c];
        h = i.nextKey[c];
        if (h.time <= n) {
          if (k < n)
            if (this.loop) {
              g = this.data.hierarchy[p].keys[0];
              for (h = this.getNextKeyWith(c, p, 1); h.time < k; )
                (g = h), (h = this.getNextKeyWith(c, p, h.index + 1));
            } else {
              this.stop();
              return;
            }
          else {
            do (g = h), (h = this.getNextKeyWith(c, p, h.index + 1));
            while (h.time < k);
          }
          i.prevKey[c] = g;
          i.nextKey[c] = h;
        }
        a.matrixAutoUpdate = !0;
        a.matrixWorldNeedsUpdate = !0;
        d = (k - g.time) / (h.time - g.time);
        e = g[c];
        f = h[c];
        if (0 > d || 1 < d)
          console.log(
            "THREE.Animation.update: Warning! Scale out of bounds:" +
              d +
              " on bone " +
              p
          ),
            (d = 0 > d ? 0 : 1);
        if ("pos" === c)
          if (
            ((c = a.position),
            this.interpolationType === THREE.AnimationHandler.LINEAR)
          )
            (c.x = e[0] + (f[0] - e[0]) * d),
              (c.y = e[1] + (f[1] - e[1]) * d),
              (c.z = e[2] + (f[2] - e[2]) * d);
          else {
            if (
              this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
              this.interpolationType ===
                THREE.AnimationHandler.CATMULLROM_FORWARD
            )
              (this.points[0] = this.getPrevKeyWith("pos", p, g.index - 1).pos),
                (this.points[1] = e),
                (this.points[2] = f),
                (this.points[3] = this.getNextKeyWith(
                  "pos",
                  p,
                  h.index + 1
                ).pos),
                (d = 0.33 * d + 0.33),
                (e = this.interpolateCatmullRom(this.points, d)),
                (c.x = e[0]),
                (c.y = e[1]),
                (c.z = e[2]),
                this.interpolationType ===
                  THREE.AnimationHandler.CATMULLROM_FORWARD &&
                  ((d = this.interpolateCatmullRom(this.points, 1.01 * d)),
                  this.target.set(d[0], d[1], d[2]),
                  this.target.subSelf(c),
                  (this.target.y = 0),
                  this.target.normalize(),
                  (d = Math.atan2(this.target.x, this.target.z)),
                  a.rotation.set(0, d, 0));
          }
        else
          "rot" === c
            ? THREE.Quaternion.slerp(e, f, a.quaternion, d)
            : "scl" === c &&
              ((c = a.scale),
              (c.x = e[0] + (f[0] - e[0]) * d),
              (c.y = e[1] + (f[1] - e[1]) * d),
              (c.z = e[2] + (f[2] - e[2]) * d));
      }
    }
  }
};
THREE.Animation.prototype.interpolateCatmullRom = function (a, b) {
  var c = [],
    d = [],
    e,
    f,
    g,
    h,
    i,
    k;
  e = (a.length - 1) * b;
  f = Math.floor(e);
  e -= f;
  c[0] = 0 === f ? f : f - 1;
  c[1] = f;
  c[2] = f > a.length - 2 ? f : f + 1;
  c[3] = f > a.length - 3 ? f : f + 2;
  f = a[c[0]];
  h = a[c[1]];
  i = a[c[2]];
  k = a[c[3]];
  c = e * e;
  g = e * c;
  d[0] = this.interpolate(f[0], h[0], i[0], k[0], e, c, g);
  d[1] = this.interpolate(f[1], h[1], i[1], k[1], e, c, g);
  d[2] = this.interpolate(f[2], h[2], i[2], k[2], e, c, g);
  return d;
};
THREE.Animation.prototype.interpolate = function (a, b, c, d, e, f, g) {
  a = 0.5 * (c - a);
  d = 0.5 * (d - b);
  return (2 * (b - c) + a + d) * g + (-3 * (b - c) - 2 * a - d) * f + a * e + b;
};
THREE.Animation.prototype.getNextKeyWith = function (a, b, c) {
  for (
    var d = this.data.hierarchy[b].keys,
      c =
        this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
        this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD
          ? c < d.length - 1
            ? c
            : d.length - 1
          : c % d.length;
    c < d.length;
    c++
  )
    if (void 0 !== d[c][a]) return d[c];
  return this.data.hierarchy[b].keys[0];
};
THREE.Animation.prototype.getPrevKeyWith = function (a, b, c) {
  for (
    var d = this.data.hierarchy[b].keys,
      c =
        this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
        this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD
          ? 0 < c
            ? c
            : 0
          : 0 <= c
          ? c
          : c + d.length;
    0 <= c;
    c--
  )
    if (void 0 !== d[c][a]) return d[c];
  return this.data.hierarchy[b].keys[d.length - 1];
};
THREE.KeyFrameAnimation = function (a, b, c) {
  this.root = a;
  this.data = THREE.AnimationHandler.get(b);
  this.hierarchy = THREE.AnimationHandler.parse(a);
  this.currentTime = 0;
  this.timeScale = 0.001;
  this.isPlaying = !1;
  this.loop = this.isPaused = !0;
  this.JITCompile = void 0 !== c ? c : !0;
  a = 0;
  for (b = this.hierarchy.length; a < b; a++) {
    var c = this.data.hierarchy[a].sids,
      d = this.hierarchy[a];
    if (this.data.hierarchy[a].keys.length && c) {
      for (var e = 0; e < c.length; e++) {
        var f = c[e],
          g = this.getNextKeyWith(f, a, 0);
        g && g.apply(f);
      }
      d.matrixAutoUpdate = !1;
      this.data.hierarchy[a].node.updateMatrix();
      d.matrixWorldNeedsUpdate = !0;
    }
  }
};
THREE.KeyFrameAnimation.prototype.play = function (a, b) {
  if (!this.isPlaying) {
    this.isPlaying = !0;
    this.loop = void 0 !== a ? a : !0;
    this.currentTime = void 0 !== b ? b : 0;
    this.startTimeMs = b;
    this.startTime = 1e7;
    this.endTime = -this.startTime;
    var c,
      d = this.hierarchy.length,
      e,
      f;
    for (c = 0; c < d; c++)
      (e = this.hierarchy[c]),
        (f = this.data.hierarchy[c]),
        (e.useQuaternion = !0),
        void 0 === f.animationCache &&
          ((f.animationCache = {}),
          (f.animationCache.prevKey = null),
          (f.animationCache.nextKey = null),
          (f.animationCache.originalMatrix =
            e instanceof THREE.Bone ? e.skinMatrix : e.matrix)),
        (e = this.data.hierarchy[c].keys),
        e.length &&
          ((f.animationCache.prevKey = e[0]),
          (f.animationCache.nextKey = e[1]),
          (this.startTime = Math.min(e[0].time, this.startTime)),
          (this.endTime = Math.max(e[e.length - 1].time, this.endTime)));
    this.update(0);
  }
  this.isPaused = !1;
  THREE.AnimationHandler.addToUpdate(this);
};
THREE.KeyFrameAnimation.prototype.pause = function () {
  this.isPaused
    ? THREE.AnimationHandler.addToUpdate(this)
    : THREE.AnimationHandler.removeFromUpdate(this);
  this.isPaused = !this.isPaused;
};
THREE.KeyFrameAnimation.prototype.stop = function () {
  this.isPaused = this.isPlaying = !1;
  THREE.AnimationHandler.removeFromUpdate(this);
  for (var a = 0; a < this.data.hierarchy.length; a++) {
    var b = this.hierarchy[a],
      c = this.data.hierarchy[a];
    if (void 0 !== c.animationCache) {
      var d = c.animationCache.originalMatrix;
      b instanceof THREE.Bone
        ? (d.copy(b.skinMatrix), (b.skinMatrix = d))
        : (d.copy(b.matrix), (b.matrix = d));
      delete c.animationCache;
    }
  }
};
THREE.KeyFrameAnimation.prototype.update = function (a) {
  if (this.isPlaying) {
    var b,
      c,
      d,
      e,
      f = this.data.JIT.hierarchy,
      g,
      h,
      i;
    h = this.currentTime += a * this.timeScale;
    g = this.currentTime %= this.data.length;
    g < this.startTimeMs && (g = this.currentTime = this.startTimeMs + g);
    e = parseInt(
      Math.min(g * this.data.fps, this.data.length * this.data.fps),
      10
    );
    if ((i = g < h) && !this.loop) {
      for (var a = 0, k = this.hierarchy.length; a < k; a++) {
        var n = this.data.hierarchy[a].keys,
          f = this.data.hierarchy[a].sids;
        d = n.length - 1;
        e = this.hierarchy[a];
        if (n.length) {
          for (n = 0; n < f.length; n++)
            (g = f[n]), (h = this.getPrevKeyWith(g, a, d)) && h.apply(g);
          this.data.hierarchy[a].node.updateMatrix();
          e.matrixWorldNeedsUpdate = !0;
        }
      }
      this.stop();
    } else if (!(g < this.startTime)) {
      a = 0;
      for (k = this.hierarchy.length; a < k; a++) {
        d = this.hierarchy[a];
        b = this.data.hierarchy[a];
        var n = b.keys,
          p = b.animationCache;
        if (this.JITCompile && void 0 !== f[a][e])
          d instanceof THREE.Bone
            ? ((d.skinMatrix = f[a][e]), (d.matrixWorldNeedsUpdate = !1))
            : ((d.matrix = f[a][e]), (d.matrixWorldNeedsUpdate = !0));
        else if (n.length) {
          this.JITCompile &&
            p &&
            (d instanceof THREE.Bone
              ? (d.skinMatrix = p.originalMatrix)
              : (d.matrix = p.originalMatrix));
          b = p.prevKey;
          c = p.nextKey;
          if (b && c) {
            if (c.time <= h) {
              if (i && this.loop) {
                b = n[0];
                for (c = n[1]; c.time < g; ) (b = c), (c = n[b.index + 1]);
              } else if (!i)
                for (var m = n.length - 1; c.time < g && c.index !== m; )
                  (b = c), (c = n[b.index + 1]);
              p.prevKey = b;
              p.nextKey = c;
            }
            c.time >= g ? b.interpolate(c, g) : b.interpolate(c, c.time);
          }
          this.data.hierarchy[a].node.updateMatrix();
          d.matrixWorldNeedsUpdate = !0;
        }
      }
      if (this.JITCompile && void 0 === f[0][e]) {
        this.hierarchy[0].updateMatrixWorld(!0);
        for (a = 0; a < this.hierarchy.length; a++)
          f[a][e] =
            this.hierarchy[a] instanceof THREE.Bone
              ? this.hierarchy[a].skinMatrix.clone()
              : this.hierarchy[a].matrix.clone();
      }
    }
  }
};
THREE.KeyFrameAnimation.prototype.getNextKeyWith = function (a, b, c) {
  b = this.data.hierarchy[b].keys;
  for (c %= b.length; c < b.length; c++) if (b[c].hasTarget(a)) return b[c];
  return b[0];
};
THREE.KeyFrameAnimation.prototype.getPrevKeyWith = function (a, b, c) {
  b = this.data.hierarchy[b].keys;
  for (c = 0 <= c ? c : c + b.length; 0 <= c; c--)
    if (b[c].hasTarget(a)) return b[c];
  return b[b.length - 1];
};
THREE.CubeCamera = function (a, b, c) {
  THREE.Object3D.call(this);
  var d = new THREE.PerspectiveCamera(90, 1, a, b);
  d.up.set(0, -1, 0);
  d.lookAt(new THREE.Vector3(1, 0, 0));
  this.add(d);
  var e = new THREE.PerspectiveCamera(90, 1, a, b);
  e.up.set(0, -1, 0);
  e.lookAt(new THREE.Vector3(-1, 0, 0));
  this.add(e);
  var f = new THREE.PerspectiveCamera(90, 1, a, b);
  f.up.set(0, 0, 1);
  f.lookAt(new THREE.Vector3(0, 1, 0));
  this.add(f);
  var g = new THREE.PerspectiveCamera(90, 1, a, b);
  g.up.set(0, 0, -1);
  g.lookAt(new THREE.Vector3(0, -1, 0));
  this.add(g);
  var h = new THREE.PerspectiveCamera(90, 1, a, b);
  h.up.set(0, -1, 0);
  h.lookAt(new THREE.Vector3(0, 0, 1));
  this.add(h);
  var i = new THREE.PerspectiveCamera(90, 1, a, b);
  i.up.set(0, -1, 0);
  i.lookAt(new THREE.Vector3(0, 0, -1));
  this.add(i);
  this.renderTarget = new THREE.WebGLRenderTargetCube(c, c, {
    format: THREE.RGBFormat,
    magFilter: THREE.LinearFilter,
    minFilter: THREE.LinearFilter,
  });
  this.updateCubeMap = function (a, b) {
    var c = this.renderTarget,
      m = c.generateMipmaps;
    c.generateMipmaps = !1;
    c.activeCubeFace = 0;
    a.render(b, d, c);
    c.activeCubeFace = 1;
    a.render(b, e, c);
    c.activeCubeFace = 2;
    a.render(b, f, c);
    c.activeCubeFace = 3;
    a.render(b, g, c);
    c.activeCubeFace = 4;
    a.render(b, h, c);
    c.generateMipmaps = m;
    c.activeCubeFace = 5;
    a.render(b, i, c);
  };
};
THREE.CubeCamera.prototype = Object.create(THREE.Object3D.prototype);
THREE.CombinedCamera = function (a, b, c, d, e, f, g) {
  THREE.Camera.call(this);
  this.fov = c;
  this.left = -a / 2;
  this.right = a / 2;
  this.top = b / 2;
  this.bottom = -b / 2;
  this.cameraO = new THREE.OrthographicCamera(
    a / -2,
    a / 2,
    b / 2,
    b / -2,
    f,
    g
  );
  this.cameraP = new THREE.PerspectiveCamera(c, a / b, d, e);
  this.zoom = 1;
  this.toPerspective();
};
THREE.CombinedCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.CombinedCamera.prototype.toPerspective = function () {
  this.near = this.cameraP.near;
  this.far = this.cameraP.far;
  this.cameraP.fov = this.fov / this.zoom;
  this.cameraP.updateProjectionMatrix();
  this.projectionMatrix = this.cameraP.projectionMatrix;
  this.inPerspectiveMode = !0;
  this.inOrthographicMode = !1;
};
THREE.CombinedCamera.prototype.toOrthographic = function () {
  var a = this.cameraP.aspect,
    b = (this.cameraP.near + this.cameraP.far) / 2,
    b = Math.tan(this.fov / 2) * b,
    a = (2 * b * a) / 2,
    b = b / this.zoom,
    a = a / this.zoom;
  this.cameraO.left = -a;
  this.cameraO.right = a;
  this.cameraO.top = b;
  this.cameraO.bottom = -b;
  this.cameraO.updateProjectionMatrix();
  this.near = this.cameraO.near;
  this.far = this.cameraO.far;
  this.projectionMatrix = this.cameraO.projectionMatrix;
  this.inPerspectiveMode = !1;
  this.inOrthographicMode = !0;
};
THREE.CombinedCamera.prototype.setSize = function (a, b) {
  this.cameraP.aspect = a / b;
  this.left = -a / 2;
  this.right = a / 2;
  this.top = b / 2;
  this.bottom = -b / 2;
};
THREE.CombinedCamera.prototype.setFov = function (a) {
  this.fov = a;
  this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic();
};
THREE.CombinedCamera.prototype.updateProjectionMatrix = function () {
  this.inPerspectiveMode
    ? this.toPerspective()
    : (this.toPerspective(), this.toOrthographic());
};
THREE.CombinedCamera.prototype.setLens = function (a, b) {
  void 0 === b && (b = 24);
  var c = 2 * THREE.Math.radToDeg(Math.atan(b / (2 * a)));
  this.setFov(c);
  return c;
};
THREE.CombinedCamera.prototype.setZoom = function (a) {
  this.zoom = a;
  this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic();
};
THREE.CombinedCamera.prototype.toFrontView = function () {
  this.rotation.x = 0;
  this.rotation.y = 0;
  this.rotation.z = 0;
  this.rotationAutoUpdate = !1;
};
THREE.CombinedCamera.prototype.toBackView = function () {
  this.rotation.x = 0;
  this.rotation.y = Math.PI;
  this.rotation.z = 0;
  this.rotationAutoUpdate = !1;
};
THREE.CombinedCamera.prototype.toLeftView = function () {
  this.rotation.x = 0;
  this.rotation.y = -Math.PI / 2;
  this.rotation.z = 0;
  this.rotationAutoUpdate = !1;
};
THREE.CombinedCamera.prototype.toRightView = function () {
  this.rotation.x = 0;
  this.rotation.y = Math.PI / 2;
  this.rotation.z = 0;
  this.rotationAutoUpdate = !1;
};
THREE.CombinedCamera.prototype.toTopView = function () {
  this.rotation.x = -Math.PI / 2;
  this.rotation.y = 0;
  this.rotation.z = 0;
  this.rotationAutoUpdate = !1;
};
THREE.CombinedCamera.prototype.toBottomView = function () {
  this.rotation.x = Math.PI / 2;
  this.rotation.y = 0;
  this.rotation.z = 0;
  this.rotationAutoUpdate = !1;
};
THREE.AsteriskGeometry = function (a, b) {
  THREE.Geometry.call(this);
  for (
    var c = 0.707 * a,
      d = 0.707 * b,
      c = [
        [a, 0, 0],
        [b, 0, 0],
        [-a, 0, 0],
        [-b, 0, 0],
        [0, a, 0],
        [0, b, 0],
        [0, -a, 0],
        [0, -b, 0],
        [0, 0, a],
        [0, 0, b],
        [0, 0, -a],
        [0, 0, -b],
        [c, c, 0],
        [d, d, 0],
        [-c, -c, 0],
        [-d, -d, 0],
        [c, -c, 0],
        [d, -d, 0],
        [-c, c, 0],
        [-d, d, 0],
        [c, 0, c],
        [d, 0, d],
        [-c, 0, -c],
        [-d, 0, -d],
        [c, 0, -c],
        [d, 0, -d],
        [-c, 0, c],
        [-d, 0, d],
        [0, c, c],
        [0, d, d],
        [0, -c, -c],
        [0, -d, -d],
        [0, c, -c],
        [0, d, -d],
        [0, -c, c],
        [0, -d, d],
      ],
      d = 0,
      e = c.length;
    d < e;
    d++
  )
    this.vertices.push(new THREE.Vector3(c[d][0], c[d][1], c[d][2]));
};
THREE.AsteriskGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CircleGeometry = function (a, b, c, d) {
  THREE.Geometry.call(this);
  var a = a || 50,
    c = void 0 !== c ? c : 0,
    d = void 0 !== d ? d : 2 * Math.PI,
    b = void 0 !== b ? Math.max(3, b) : 8,
    e,
    f = [];
  e = new THREE.Vector3();
  var g = new THREE.Vector2(0.5, 0.5);
  this.vertices.push(e);
  f.push(g);
  for (e = 0; e <= b; e++) {
    var h = new THREE.Vector3();
    h.x = a * Math.cos(c + (e / b) * d);
    h.y = a * Math.sin(c + (e / b) * d);
    this.vertices.push(h);
    f.push(new THREE.Vector2((h.x / a + 1) / 2, -(h.y / a + 1) / 2 + 1));
  }
  c = new THREE.Vector3(0, 0, -1);
  for (e = 1; e <= b; e++)
    this.faces.push(new THREE.Face3(e, e + 1, 0, [c, c, c])),
      this.faceVertexUvs[0].push([f[e], f[e + 1], g]);
  this.computeCentroids();
  this.computeFaceNormals();
  this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), a);
};
THREE.CircleGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CubeGeometry = function (a, b, c, d, e, f) {
  function g(a, b, c, d, e, f, g, l) {
    var q,
      u = h.widthSegments,
      B = h.heightSegments,
      x = e / 2,
      t = f / 2,
      F = h.vertices.length;
    if (("x" === a && "y" === b) || ("y" === a && "x" === b)) q = "z";
    else if (("x" === a && "z" === b) || ("z" === a && "x" === b))
      (q = "y"), (B = h.depthSegments);
    else if (("z" === a && "y" === b) || ("y" === a && "z" === b))
      (q = "x"), (u = h.depthSegments);
    var C = u + 1,
      A = B + 1,
      z = e / u,
      H = f / B,
      G = new THREE.Vector3();
    G[q] = 0 < g ? 1 : -1;
    for (e = 0; e < A; e++)
      for (f = 0; f < C; f++) {
        var I = new THREE.Vector3();
        I[a] = (f * z - x) * c;
        I[b] = (e * H - t) * d;
        I[q] = g;
        h.vertices.push(I);
      }
    for (e = 0; e < B; e++)
      for (f = 0; f < u; f++)
        (a = new THREE.Face4(
          f + C * e + F,
          f + C * (e + 1) + F,
          f + 1 + C * (e + 1) + F,
          f + 1 + C * e + F
        )),
          a.normal.copy(G),
          a.vertexNormals.push(G.clone(), G.clone(), G.clone(), G.clone()),
          (a.materialIndex = l),
          h.faces.push(a),
          h.faceVertexUvs[0].push([
            new THREE.Vector2(f / u, 1 - e / B),
            new THREE.Vector2(f / u, 1 - (e + 1) / B),
            new THREE.Vector2((f + 1) / u, 1 - (e + 1) / B),
            new THREE.Vector2((f + 1) / u, 1 - e / B),
          ]);
  }
  THREE.Geometry.call(this);
  var h = this;
  this.width = a;
  this.height = b;
  this.depth = c;
  this.widthSegments = d || 1;
  this.heightSegments = e || 1;
  this.depthSegments = f || 1;
  a = this.width / 2;
  b = this.height / 2;
  c = this.depth / 2;
  g("z", "y", -1, -1, this.depth, this.height, a, 0);
  g("z", "y", 1, -1, this.depth, this.height, -a, 1);
  g("x", "z", 1, 1, this.width, this.depth, b, 2);
  g("x", "z", 1, -1, this.width, this.depth, -b, 3);
  g("x", "y", 1, -1, this.width, this.height, c, 4);
  g("x", "y", -1, -1, this.width, this.height, -c, 5);
  this.computeCentroids();
  this.mergeVertices();
};
THREE.CubeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CylinderGeometry = function (a, b, c, d, e, f) {
  THREE.Geometry.call(this);
  var a = void 0 !== a ? a : 20,
    b = void 0 !== b ? b : 20,
    c = void 0 !== c ? c : 100,
    g = c / 2,
    d = d || 8,
    e = e || 1,
    h,
    i,
    k = [],
    n = [];
  for (i = 0; i <= e; i++) {
    var p = [],
      m = [],
      r = i / e,
      s = r * (b - a) + a;
    for (h = 0; h <= d; h++) {
      var l = h / d,
        q = new THREE.Vector3();
      q.x = s * Math.sin(2 * l * Math.PI);
      q.y = -r * c + g;
      q.z = s * Math.cos(2 * l * Math.PI);
      this.vertices.push(q);
      p.push(this.vertices.length - 1);
      m.push(new THREE.Vector2(l, 1 - r));
    }
    k.push(p);
    n.push(m);
  }
  c = (b - a) / c;
  for (h = 0; h < d; h++) {
    0 !== a
      ? ((p = this.vertices[k[0][h]].clone()),
        (m = this.vertices[k[0][h + 1]].clone()))
      : ((p = this.vertices[k[1][h]].clone()),
        (m = this.vertices[k[1][h + 1]].clone()));
    p.setY(Math.sqrt(p.x * p.x + p.z * p.z) * c).normalize();
    m.setY(Math.sqrt(m.x * m.x + m.z * m.z) * c).normalize();
    for (i = 0; i < e; i++) {
      var r = k[i][h],
        s = k[i + 1][h],
        l = k[i + 1][h + 1],
        q = k[i][h + 1],
        u = p.clone(),
        B = p.clone(),
        x = m.clone(),
        t = m.clone(),
        F = n[i][h].clone(),
        C = n[i + 1][h].clone(),
        A = n[i + 1][h + 1].clone(),
        z = n[i][h + 1].clone();
      this.faces.push(new THREE.Face4(r, s, l, q, [u, B, x, t]));
      this.faceVertexUvs[0].push([F, C, A, z]);
    }
  }
  if (!f && 0 < a) {
    this.vertices.push(new THREE.Vector3(0, g, 0));
    for (h = 0; h < d; h++)
      (r = k[0][h]),
        (s = k[0][h + 1]),
        (l = this.vertices.length - 1),
        (u = new THREE.Vector3(0, 1, 0)),
        (B = new THREE.Vector3(0, 1, 0)),
        (x = new THREE.Vector3(0, 1, 0)),
        (F = n[0][h].clone()),
        (C = n[0][h + 1].clone()),
        (A = new THREE.Vector2(C.u, 0)),
        this.faces.push(new THREE.Face3(r, s, l, [u, B, x])),
        this.faceVertexUvs[0].push([F, C, A]);
  }
  if (!f && 0 < b) {
    this.vertices.push(new THREE.Vector3(0, -g, 0));
    for (h = 0; h < d; h++)
      (r = k[i][h + 1]),
        (s = k[i][h]),
        (l = this.vertices.length - 1),
        (u = new THREE.Vector3(0, -1, 0)),
        (B = new THREE.Vector3(0, -1, 0)),
        (x = new THREE.Vector3(0, -1, 0)),
        (F = n[i][h + 1].clone()),
        (C = n[i][h].clone()),
        (A = new THREE.Vector2(C.u, 1)),
        this.faces.push(new THREE.Face3(r, s, l, [u, B, x])),
        this.faceVertexUvs[0].push([F, C, A]);
  }
  this.computeCentroids();
  this.computeFaceNormals();
};
THREE.CylinderGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ExtrudeGeometry = function (a, b) {
  "undefined" !== typeof a &&
    (THREE.Geometry.call(this),
    (a = a instanceof Array ? a : [a]),
    (this.shapebb = a[a.length - 1].getBoundingBox()),
    this.addShapeList(a, b),
    this.computeCentroids(),
    this.computeFaceNormals());
};
THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ExtrudeGeometry.prototype.addShapeList = function (a, b) {
  for (var c = a.length, d = 0; d < c; d++) this.addShape(a[d], b);
};
THREE.ExtrudeGeometry.prototype.addShape = function (a, b) {
  function c(a, b, c) {
    b || console.log("die");
    return b.clone().multiplyScalar(c).addSelf(a);
  }
  function d(a, b, c) {
    var d = THREE.ExtrudeGeometry.__v1,
      e = THREE.ExtrudeGeometry.__v2,
      f = THREE.ExtrudeGeometry.__v3,
      g = THREE.ExtrudeGeometry.__v4,
      h = THREE.ExtrudeGeometry.__v5,
      i = THREE.ExtrudeGeometry.__v6;
    d.set(a.x - b.x, a.y - b.y);
    e.set(a.x - c.x, a.y - c.y);
    d = d.normalize();
    e = e.normalize();
    f.set(-d.y, d.x);
    g.set(e.y, -e.x);
    h.copy(a).addSelf(f);
    i.copy(a).addSelf(g);
    if (h.equals(i)) return g.clone();
    h.copy(b).addSelf(f);
    i.copy(c).addSelf(g);
    f = d.dot(g);
    g = i.subSelf(h).dot(g);
    0 === f &&
      (console.log("Either infinite or no solutions!"),
      0 === g
        ? console.log("Its finite solutions.")
        : console.log("Too bad, no solutions."));
    g /= f;
    return 0 > g
      ? ((b = Math.atan2(b.y - a.y, b.x - a.x)),
        (a = Math.atan2(c.y - a.y, c.x - a.x)),
        b > a && (a += 2 * Math.PI),
        (c = (b + a) / 2),
        (a = -Math.cos(c)),
        (c = -Math.sin(c)),
        new THREE.Vector2(a, c))
      : d.multiplyScalar(g).addSelf(h).subSelf(a).clone();
  }
  function e(c, d) {
    var e, f;
    for (M = c.length; 0 <= --M; ) {
      e = M;
      f = M - 1;
      0 > f && (f = c.length - 1);
      for (var g = 0, h = r + 2 * n, g = 0; g < h; g++) {
        var i = P * g,
          k = P * (g + 1),
          m = d + e + i,
          i = d + f + i,
          l = d + f + k,
          k = d + e + k,
          p = c,
          s = g,
          q = h,
          t = e,
          u = f,
          m = m + $,
          i = i + $,
          l = l + $,
          k = k + $;
        I.faces.push(new THREE.Face4(m, i, l, k, null, null, B));
        m = x.generateSideWallUV(I, a, p, b, m, i, l, k, s, q, t, u);
        I.faceVertexUvs[0].push(m);
      }
    }
  }
  function f(a, b, c) {
    I.vertices.push(new THREE.Vector3(a, b, c));
  }
  function g(c, d, e, f) {
    c += $;
    d += $;
    e += $;
    I.faces.push(new THREE.Face3(c, d, e, null, null, u));
    c = f
      ? x.generateBottomUV(I, a, b, c, d, e)
      : x.generateTopUV(I, a, b, c, d, e);
    I.faceVertexUvs[0].push(c);
  }
  var h = void 0 !== b.amount ? b.amount : 100,
    i = void 0 !== b.bevelThickness ? b.bevelThickness : 6,
    k = void 0 !== b.bevelSize ? b.bevelSize : i - 2,
    n = void 0 !== b.bevelSegments ? b.bevelSegments : 3,
    p = void 0 !== b.bevelEnabled ? b.bevelEnabled : !0,
    m = void 0 !== b.curveSegments ? b.curveSegments : 12,
    r = void 0 !== b.steps ? b.steps : 1,
    s = b.extrudePath,
    l,
    q = !1,
    u = b.material,
    B = b.extrudeMaterial,
    x =
      void 0 !== b.UVGenerator
        ? b.UVGenerator
        : THREE.ExtrudeGeometry.WorldUVGenerator,
    t,
    F,
    C,
    A;
  s &&
    ((l = s.getSpacedPoints(r)),
    (q = !0),
    (p = !1),
    (t =
      void 0 !== b.frames
        ? b.frames
        : new THREE.TubeGeometry.FrenetFrames(s, r, !1)),
    (F = new THREE.Vector3()),
    (C = new THREE.Vector3()),
    (A = new THREE.Vector3()));
  p || (k = i = n = 0);
  var z,
    H,
    G,
    I = this,
    $ = this.vertices.length,
    m = a.extractPoints(m),
    D = m.shape,
    m = m.holes;
  if ((s = !THREE.Shape.Utils.isClockWise(D))) {
    D = D.reverse();
    H = 0;
    for (G = m.length; H < G; H++)
      (z = m[H]), THREE.Shape.Utils.isClockWise(z) && (m[H] = z.reverse());
    s = !1;
  }
  var L = THREE.Shape.Utils.triangulateShape(D, m),
    s = D;
  H = 0;
  for (G = m.length; H < G; H++) (z = m[H]), (D = D.concat(z));
  var y,
    J,
    K,
    R,
    P = D.length,
    ca = L.length,
    xa = [],
    M = 0,
    pa = s.length;
  y = pa - 1;
  for (J = M + 1; M < pa; M++, y++, J++)
    y === pa && (y = 0), J === pa && (J = 0), (xa[M] = d(s[M], s[y], s[J]));
  var ya = [],
    ua,
    N = xa.concat();
  H = 0;
  for (G = m.length; H < G; H++) {
    z = m[H];
    ua = [];
    M = 0;
    pa = z.length;
    y = pa - 1;
    for (J = M + 1; M < pa; M++, y++, J++)
      y === pa && (y = 0), J === pa && (J = 0), (ua[M] = d(z[M], z[y], z[J]));
    ya.push(ua);
    N = N.concat(ua);
  }
  for (y = 0; y < n; y++) {
    z = y / n;
    K = i * (1 - z);
    J = k * Math.sin((z * Math.PI) / 2);
    M = 0;
    for (pa = s.length; M < pa; M++) (R = c(s[M], xa[M], J)), f(R.x, R.y, -K);
    H = 0;
    for (G = m.length; H < G; H++) {
      z = m[H];
      ua = ya[H];
      M = 0;
      for (pa = z.length; M < pa; M++) (R = c(z[M], ua[M], J)), f(R.x, R.y, -K);
    }
  }
  J = k;
  for (M = 0; M < P; M++)
    (R = p ? c(D[M], N[M], J) : D[M]),
      q
        ? (C.copy(t.normals[0]).multiplyScalar(R.x),
          F.copy(t.binormals[0]).multiplyScalar(R.y),
          A.copy(l[0]).addSelf(C).addSelf(F),
          f(A.x, A.y, A.z))
        : f(R.x, R.y, 0);
  for (z = 1; z <= r; z++)
    for (M = 0; M < P; M++)
      (R = p ? c(D[M], N[M], J) : D[M]),
        q
          ? (C.copy(t.normals[z]).multiplyScalar(R.x),
            F.copy(t.binormals[z]).multiplyScalar(R.y),
            A.copy(l[z]).addSelf(C).addSelf(F),
            f(A.x, A.y, A.z))
          : f(R.x, R.y, (h / r) * z);
  for (y = n - 1; 0 <= y; y--) {
    z = y / n;
    K = i * (1 - z);
    J = k * Math.sin((z * Math.PI) / 2);
    M = 0;
    for (pa = s.length; M < pa; M++)
      (R = c(s[M], xa[M], J)), f(R.x, R.y, h + K);
    H = 0;
    for (G = m.length; H < G; H++) {
      z = m[H];
      ua = ya[H];
      M = 0;
      for (pa = z.length; M < pa; M++)
        (R = c(z[M], ua[M], J)),
          q ? f(R.x, R.y + l[r - 1].y, l[r - 1].x + K) : f(R.x, R.y, h + K);
    }
  }
  if (p) {
    i = 0 * P;
    for (M = 0; M < ca; M++) (h = L[M]), g(h[2] + i, h[1] + i, h[0] + i, !0);
    i = P * (r + 2 * n);
    for (M = 0; M < ca; M++) (h = L[M]), g(h[0] + i, h[1] + i, h[2] + i, !1);
  } else {
    for (M = 0; M < ca; M++) (h = L[M]), g(h[2], h[1], h[0], !0);
    for (M = 0; M < ca; M++)
      (h = L[M]), g(h[0] + P * r, h[1] + P * r, h[2] + P * r, !1);
  }
  h = 0;
  e(s, h);
  h += s.length;
  H = 0;
  for (G = m.length; H < G; H++) (z = m[H]), e(z, h), (h += z.length);
};
THREE.ExtrudeGeometry.WorldUVGenerator = {
  generateTopUV: function (a, b, c, d, e, f) {
    b = a.vertices[e].x;
    e = a.vertices[e].y;
    c = a.vertices[f].x;
    f = a.vertices[f].y;
    return [
      new THREE.Vector2(a.vertices[d].x, a.vertices[d].y),
      new THREE.Vector2(b, e),
      new THREE.Vector2(c, f),
    ];
  },
  generateBottomUV: function (a, b, c, d, e, f) {
    return this.generateTopUV(a, b, c, d, e, f);
  },
  generateSideWallUV: function (a, b, c, d, e, f, g, h) {
    var b = a.vertices[e].x,
      c = a.vertices[e].y,
      e = a.vertices[e].z,
      d = a.vertices[f].x,
      i = a.vertices[f].y,
      f = a.vertices[f].z,
      k = a.vertices[g].x,
      n = a.vertices[g].y,
      g = a.vertices[g].z,
      p = a.vertices[h].x,
      m = a.vertices[h].y,
      a = a.vertices[h].z;
    return 0.01 > Math.abs(c - i)
      ? [
          new THREE.Vector2(b, 1 - e),
          new THREE.Vector2(d, 1 - f),
          new THREE.Vector2(k, 1 - g),
          new THREE.Vector2(p, 1 - a),
        ]
      : [
          new THREE.Vector2(c, 1 - e),
          new THREE.Vector2(i, 1 - f),
          new THREE.Vector2(n, 1 - g),
          new THREE.Vector2(m, 1 - a),
        ];
  },
};
THREE.ExtrudeGeometry.__v1 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v2 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v3 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v4 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v5 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v6 = new THREE.Vector2();
THREE.ShapeGeometry = function (a, b) {
  THREE.Geometry.call(this);
  !1 === a instanceof Array && (a = [a]);
  this.shapebb = a[a.length - 1].getBoundingBox();
  this.addShapeList(a, b);
  this.computeCentroids();
  this.computeFaceNormals();
};
THREE.ShapeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ShapeGeometry.prototype.addShapeList = function (a, b) {
  for (var c = 0, d = a.length; c < d; c++) this.addShape(a[c], b);
  return this;
};
THREE.ShapeGeometry.prototype.addShape = function (a, b) {
  void 0 === b && (b = {});
  var c = b.material,
    d =
      void 0 === b.UVGenerator
        ? THREE.ExtrudeGeometry.WorldUVGenerator
        : b.UVGenerator,
    e,
    f,
    g,
    h = this.vertices.length;
  e = a.extractPoints(void 0 !== b.curveSegments ? b.curveSegments : 12);
  var i = e.shape,
    k = e.holes;
  if (!THREE.Shape.Utils.isClockWise(i)) {
    i = i.reverse();
    e = 0;
    for (f = k.length; e < f; e++)
      (g = k[e]), THREE.Shape.Utils.isClockWise(g) && (k[e] = g.reverse());
  }
  var n = THREE.Shape.Utils.triangulateShape(i, k);
  e = 0;
  for (f = k.length; e < f; e++) (g = k[e]), (i = i.concat(g));
  k = i.length;
  f = n.length;
  for (e = 0; e < k; e++)
    (g = i[e]), this.vertices.push(new THREE.Vector3(g.x, g.y, 0));
  for (e = 0; e < f; e++)
    (k = n[e]),
      (i = k[0] + h),
      (g = k[1] + h),
      (k = k[2] + h),
      this.faces.push(new THREE.Face3(i, g, k, null, null, c)),
      this.faceVertexUvs[0].push(d.generateBottomUV(this, a, b, i, g, k));
};
THREE.LatheGeometry = function (a, b, c) {
  THREE.Geometry.call(this);
  for (
    var b = b || 12,
      c = c || 2 * Math.PI,
      d = [],
      e = new THREE.Matrix4().makeRotationZ(c / b),
      f = 0;
    f < a.length;
    f++
  )
    (d[f] = a[f].clone()), this.vertices.push(d[f]);
  for (var g = b + 1, c = 0; c < g; c++)
    for (f = 0; f < d.length; f++)
      (d[f] = e.multiplyVector3(d[f].clone())), this.vertices.push(d[f]);
  for (c = 0; c < b; c++) {
    d = 0;
    for (e = a.length; d < e - 1; d++)
      this.faces.push(
        new THREE.Face4(
          c * e + d,
          ((c + 1) % g) * e + d,
          ((c + 1) % g) * e + ((d + 1) % e),
          c * e + ((d + 1) % e)
        )
      ),
        this.faceVertexUvs[0].push([
          new THREE.Vector2(1 - c / b, d / e),
          new THREE.Vector2(1 - (c + 1) / b, d / e),
          new THREE.Vector2(1 - (c + 1) / b, (d + 1) / e),
          new THREE.Vector2(1 - c / b, (d + 1) / e),
        ]);
  }
  this.computeCentroids();
  this.computeFaceNormals();
  this.computeVertexNormals();
};
THREE.LatheGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.PlaneGeometry = function (a, b, c, d) {
  THREE.Geometry.call(this);
  this.width = a;
  this.height = b;
  this.widthSegments = c || 1;
  this.heightSegments = d || 1;
  for (
    var c = a / 2,
      e = b / 2,
      d = this.widthSegments,
      f = this.heightSegments,
      g = d + 1,
      h = f + 1,
      i = this.width / d,
      k = this.height / f,
      n = new THREE.Vector3(0, 0, 1),
      a = 0;
    a < h;
    a++
  )
    for (b = 0; b < g; b++)
      this.vertices.push(new THREE.Vector3(b * i - c, -(a * k - e), 0));
  for (a = 0; a < f; a++)
    for (b = 0; b < d; b++)
      (c = new THREE.Face4(
        b + g * a,
        b + g * (a + 1),
        b + 1 + g * (a + 1),
        b + 1 + g * a
      )),
        c.normal.copy(n),
        c.vertexNormals.push(n.clone(), n.clone(), n.clone(), n.clone()),
        this.faces.push(c),
        this.faceVertexUvs[0].push([
          new THREE.Vector2(b / d, 1 - a / f),
          new THREE.Vector2(b / d, 1 - (a + 1) / f),
          new THREE.Vector2((b + 1) / d, 1 - (a + 1) / f),
          new THREE.Vector2((b + 1) / d, 1 - a / f),
        ]);
  this.computeCentroids();
};
THREE.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.SphereGeometry = function (a, b, c, d, e, f, g) {
  THREE.Geometry.call(this);
  this.radius = a || 50;
  this.widthSegments = Math.max(3, Math.floor(b) || 8);
  this.heightSegments = Math.max(2, Math.floor(c) || 6);
  for (
    var d = void 0 !== d ? d : 0,
      e = void 0 !== e ? e : 2 * Math.PI,
      f = void 0 !== f ? f : 0,
      g = void 0 !== g ? g : Math.PI,
      h = [],
      i = [],
      c = 0;
    c <= this.heightSegments;
    c++
  ) {
    for (var k = [], n = [], b = 0; b <= this.widthSegments; b++) {
      var p = b / this.widthSegments,
        m = c / this.heightSegments,
        r = new THREE.Vector3();
      r.x = -this.radius * Math.cos(d + p * e) * Math.sin(f + m * g);
      r.y = this.radius * Math.cos(f + m * g);
      r.z = this.radius * Math.sin(d + p * e) * Math.sin(f + m * g);
      this.vertices.push(r);
      k.push(this.vertices.length - 1);
      n.push(new THREE.Vector2(p, 1 - m));
    }
    h.push(k);
    i.push(n);
  }
  for (c = 0; c < this.heightSegments; c++)
    for (b = 0; b < this.widthSegments; b++) {
      var d = h[c][b + 1],
        e = h[c][b],
        f = h[c + 1][b],
        g = h[c + 1][b + 1],
        k = this.vertices[d].clone().normalize(),
        n = this.vertices[e].clone().normalize(),
        p = this.vertices[f].clone().normalize(),
        m = this.vertices[g].clone().normalize(),
        r = i[c][b + 1].clone(),
        s = i[c][b].clone(),
        l = i[c + 1][b].clone(),
        q = i[c + 1][b + 1].clone();
      Math.abs(this.vertices[d].y) === this.radius
        ? (this.faces.push(new THREE.Face3(d, f, g, [k, p, m])),
          this.faceVertexUvs[0].push([r, l, q]))
        : Math.abs(this.vertices[f].y) === this.radius
        ? (this.faces.push(new THREE.Face3(d, e, f, [k, n, p])),
          this.faceVertexUvs[0].push([r, s, l]))
        : (this.faces.push(new THREE.Face4(d, e, f, g, [k, n, p, m])),
          this.faceVertexUvs[0].push([r, s, l, q]));
    }
  this.computeCentroids();
  this.computeFaceNormals();
  this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), a);
};
THREE.SphereGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TextGeometry = function (a, b) {
  var c = THREE.FontUtils.generateShapes(a, b);
  b.amount = void 0 !== b.height ? b.height : 50;
  void 0 === b.bevelThickness && (b.bevelThickness = 10);
  void 0 === b.bevelSize && (b.bevelSize = 8);
  void 0 === b.bevelEnabled && (b.bevelEnabled = !1);
  THREE.ExtrudeGeometry.call(this, c, b);
};
THREE.TextGeometry.prototype = Object.create(THREE.ExtrudeGeometry.prototype);
THREE.TorusGeometry = function (a, b, c, d, e) {
  THREE.Geometry.call(this);
  this.radius = a || 100;
  this.tube = b || 40;
  this.radialSegments = c || 8;
  this.tubularSegments = d || 6;
  this.arc = e || 2 * Math.PI;
  e = new THREE.Vector3();
  a = [];
  b = [];
  for (c = 0; c <= this.radialSegments; c++)
    for (d = 0; d <= this.tubularSegments; d++) {
      var f = (d / this.tubularSegments) * this.arc,
        g = ((2 * c) / this.radialSegments) * Math.PI;
      e.x = this.radius * Math.cos(f);
      e.y = this.radius * Math.sin(f);
      var h = new THREE.Vector3();
      h.x = (this.radius + this.tube * Math.cos(g)) * Math.cos(f);
      h.y = (this.radius + this.tube * Math.cos(g)) * Math.sin(f);
      h.z = this.tube * Math.sin(g);
      this.vertices.push(h);
      a.push(
        new THREE.Vector2(d / this.tubularSegments, c / this.radialSegments)
      );
      b.push(h.clone().subSelf(e).normalize());
    }
  for (c = 1; c <= this.radialSegments; c++)
    for (d = 1; d <= this.tubularSegments; d++) {
      var e = (this.tubularSegments + 1) * c + d - 1,
        f = (this.tubularSegments + 1) * (c - 1) + d - 1,
        g = (this.tubularSegments + 1) * (c - 1) + d,
        h = (this.tubularSegments + 1) * c + d,
        i = new THREE.Face4(e, f, g, h, [b[e], b[f], b[g], b[h]]);
      i.normal.addSelf(b[e]);
      i.normal.addSelf(b[f]);
      i.normal.addSelf(b[g]);
      i.normal.addSelf(b[h]);
      i.normal.normalize();
      this.faces.push(i);
      this.faceVertexUvs[0].push([
        a[e].clone(),
        a[f].clone(),
        a[g].clone(),
        a[h].clone(),
      ]);
    }
  this.computeCentroids();
};
THREE.TorusGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TorusKnotGeometry = function (a, b, c, d, e, f, g) {
  function h(a, b, c, d, e, f) {
    var g = Math.cos(a);
    Math.cos(b);
    b = Math.sin(a);
    a *= c / d;
    c = Math.cos(a);
    g *= 0.5 * e * (2 + c);
    b = 0.5 * e * (2 + c) * b;
    e = 0.5 * f * e * Math.sin(a);
    return new THREE.Vector3(g, b, e);
  }
  THREE.Geometry.call(this);
  this.radius = a || 100;
  this.tube = b || 40;
  this.radialSegments = c || 64;
  this.tubularSegments = d || 8;
  this.p = e || 2;
  this.q = f || 3;
  this.heightScale = g || 1;
  this.grid = Array(this.radialSegments);
  c = new THREE.Vector3();
  d = new THREE.Vector3();
  e = new THREE.Vector3();
  for (a = 0; a < this.radialSegments; ++a) {
    this.grid[a] = Array(this.tubularSegments);
    for (b = 0; b < this.tubularSegments; ++b) {
      var i = 2 * (a / this.radialSegments) * this.p * Math.PI,
        g = 2 * (b / this.tubularSegments) * Math.PI,
        f = h(i, g, this.q, this.p, this.radius, this.heightScale),
        i = h(i + 0.01, g, this.q, this.p, this.radius, this.heightScale);
      c.sub(i, f);
      d.add(i, f);
      e.cross(c, d);
      d.cross(e, c);
      e.normalize();
      d.normalize();
      i = -this.tube * Math.cos(g);
      g = this.tube * Math.sin(g);
      f.x += i * d.x + g * e.x;
      f.y += i * d.y + g * e.y;
      f.z += i * d.z + g * e.z;
      this.grid[a][b] =
        this.vertices.push(new THREE.Vector3(f.x, f.y, f.z)) - 1;
    }
  }
  for (a = 0; a < this.radialSegments; ++a)
    for (b = 0; b < this.tubularSegments; ++b) {
      var e = (a + 1) % this.radialSegments,
        f = (b + 1) % this.tubularSegments,
        c = this.grid[a][b],
        d = this.grid[e][b],
        e = this.grid[e][f],
        f = this.grid[a][f],
        g = new THREE.Vector2(
          a / this.radialSegments,
          b / this.tubularSegments
        ),
        i = new THREE.Vector2(
          (a + 1) / this.radialSegments,
          b / this.tubularSegments
        ),
        k = new THREE.Vector2(
          (a + 1) / this.radialSegments,
          (b + 1) / this.tubularSegments
        ),
        n = new THREE.Vector2(
          a / this.radialSegments,
          (b + 1) / this.tubularSegments
        );
      this.faces.push(new THREE.Face4(c, d, e, f));
      this.faceVertexUvs[0].push([g, i, k, n]);
    }
  this.computeCentroids();
  this.computeFaceNormals();
  this.computeVertexNormals();
};
THREE.TorusKnotGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry = function (a, b, c, d, e, f) {
  THREE.Geometry.call(this);
  this.path = a;
  this.segments = b || 64;
  this.radius = c || 1;
  this.radiusSegments = d || 8;
  this.closed = e || !1;
  f && (this.debug = new THREE.Object3D());
  this.grid = [];
  var g,
    h,
    e = this.segments + 1,
    i,
    k,
    n,
    f = new THREE.Vector3(),
    p,
    m,
    r,
    b = new THREE.TubeGeometry.FrenetFrames(
      this.path,
      this.segments,
      this.closed
    );
  p = b.tangents;
  m = b.normals;
  r = b.binormals;
  this.tangents = p;
  this.normals = m;
  this.binormals = r;
  for (b = 0; b < e; b++) {
    this.grid[b] = [];
    d = b / (e - 1);
    n = a.getPointAt(d);
    d = p[b];
    g = m[b];
    h = r[b];
    this.debug &&
      (this.debug.add(new THREE.ArrowHelper(d, n, c, 255)),
      this.debug.add(new THREE.ArrowHelper(g, n, c, 16711680)),
      this.debug.add(new THREE.ArrowHelper(h, n, c, 65280)));
    for (d = 0; d < this.radiusSegments; d++)
      (i = 2 * (d / this.radiusSegments) * Math.PI),
        (k = -this.radius * Math.cos(i)),
        (i = this.radius * Math.sin(i)),
        f.copy(n),
        (f.x += k * g.x + i * h.x),
        (f.y += k * g.y + i * h.y),
        (f.z += k * g.z + i * h.z),
        (this.grid[b][d] =
          this.vertices.push(new THREE.Vector3(f.x, f.y, f.z)) - 1);
  }
  for (b = 0; b < this.segments; b++)
    for (d = 0; d < this.radiusSegments; d++)
      (e = this.closed ? (b + 1) % this.segments : b + 1),
        (f = (d + 1) % this.radiusSegments),
        (a = this.grid[b][d]),
        (c = this.grid[e][d]),
        (e = this.grid[e][f]),
        (f = this.grid[b][f]),
        (p = new THREE.Vector2(b / this.segments, d / this.radiusSegments)),
        (m = new THREE.Vector2(
          (b + 1) / this.segments,
          d / this.radiusSegments
        )),
        (r = new THREE.Vector2(
          (b + 1) / this.segments,
          (d + 1) / this.radiusSegments
        )),
        (g = new THREE.Vector2(
          b / this.segments,
          (d + 1) / this.radiusSegments
        )),
        this.faces.push(new THREE.Face4(a, c, e, f)),
        this.faceVertexUvs[0].push([p, m, r, g]);
  this.computeCentroids();
  this.computeFaceNormals();
  this.computeVertexNormals();
};
THREE.TubeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry.FrenetFrames = function (a, b, c) {
  new THREE.Vector3();
  var d = new THREE.Vector3();
  new THREE.Vector3();
  var e = [],
    f = [],
    g = [],
    h = new THREE.Vector3(),
    i = new THREE.Matrix4(),
    b = b + 1,
    k,
    n,
    p;
  this.tangents = e;
  this.normals = f;
  this.binormals = g;
  for (k = 0; k < b; k++)
    (n = k / (b - 1)), (e[k] = a.getTangentAt(n)), e[k].normalize();
  f[0] = new THREE.Vector3();
  g[0] = new THREE.Vector3();
  a = Number.MAX_VALUE;
  k = Math.abs(e[0].x);
  n = Math.abs(e[0].y);
  p = Math.abs(e[0].z);
  k <= a && ((a = k), d.set(1, 0, 0));
  n <= a && ((a = n), d.set(0, 1, 0));
  p <= a && d.set(0, 0, 1);
  h.cross(e[0], d).normalize();
  f[0].cross(e[0], h);
  g[0].cross(e[0], f[0]);
  for (k = 1; k < b; k++)
    (f[k] = f[k - 1].clone()),
      (g[k] = g[k - 1].clone()),
      h.cross(e[k - 1], e[k]),
      1e-4 < h.length() &&
        (h.normalize(),
        (d = Math.acos(e[k - 1].dot(e[k]))),
        i.makeRotationAxis(h, d).multiplyVector3(f[k])),
      g[k].cross(e[k], f[k]);
  if (c) {
    d = Math.acos(f[0].dot(f[b - 1]));
    d /= b - 1;
    0 < e[0].dot(h.cross(f[0], f[b - 1])) && (d = -d);
    for (k = 1; k < b; k++)
      i.makeRotationAxis(e[k], d * k).multiplyVector3(f[k]),
        g[k].cross(e[k], f[k]);
  }
};
THREE.PolyhedronGeometry = function (a, b, c, d) {
  function e(a) {
    var b = a.normalize().clone();
    b.index = i.vertices.push(b) - 1;
    var c = Math.atan2(a.z, -a.x) / 2 / Math.PI + 0.5,
      a = Math.atan2(-a.y, Math.sqrt(a.x * a.x + a.z * a.z)) / Math.PI + 0.5;
    b.uv = new THREE.Vector2(c, 1 - a);
    return b;
  }
  function f(a, b, c, d) {
    1 > d
      ? ((d = new THREE.Face3(a.index, b.index, c.index, [
          a.clone(),
          b.clone(),
          c.clone(),
        ])),
        d.centroid.addSelf(a).addSelf(b).addSelf(c).divideScalar(3),
        (d.normal = d.centroid.clone().normalize()),
        i.faces.push(d),
        (d = Math.atan2(d.centroid.z, -d.centroid.x)),
        i.faceVertexUvs[0].push([h(a.uv, a, d), h(b.uv, b, d), h(c.uv, c, d)]))
      : ((d -= 1),
        f(a, g(a, b), g(a, c), d),
        f(g(a, b), b, g(b, c), d),
        f(g(a, c), g(b, c), c, d),
        f(g(a, b), g(b, c), g(a, c), d));
  }
  function g(a, b) {
    p[a.index] || (p[a.index] = []);
    p[b.index] || (p[b.index] = []);
    var c = p[a.index][b.index];
    void 0 === c &&
      (p[a.index][b.index] =
        p[b.index][a.index] =
        c =
          e(new THREE.Vector3().add(a, b).divideScalar(2)));
    return c;
  }
  function h(a, b, c) {
    0 > c && 1 === a.x && (a = new THREE.Vector2(a.x - 1, a.y));
    0 === b.x &&
      0 === b.z &&
      (a = new THREE.Vector2(c / 2 / Math.PI + 0.5, a.y));
    return a;
  }
  THREE.Geometry.call(this);
  for (var c = c || 1, d = d || 0, i = this, k = 0, n = a.length; k < n; k++)
    e(new THREE.Vector3(a[k][0], a[k][1], a[k][2]));
  for (var p = [], a = this.vertices, k = 0, n = b.length; k < n; k++)
    f(a[b[k][0]], a[b[k][1]], a[b[k][2]], d);
  this.mergeVertices();
  k = 0;
  for (n = this.vertices.length; k < n; k++) this.vertices[k].multiplyScalar(c);
  this.computeCentroids();
  this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), c);
};
THREE.PolyhedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.IcosahedronGeometry = function (a, b) {
  var c = (1 + Math.sqrt(5)) / 2;
  THREE.PolyhedronGeometry.call(
    this,
    [
      [-1, c, 0],
      [1, c, 0],
      [-1, -c, 0],
      [1, -c, 0],
      [0, -1, c],
      [0, 1, c],
      [0, -1, -c],
      [0, 1, -c],
      [c, 0, -1],
      [c, 0, 1],
      [-c, 0, -1],
      [-c, 0, 1],
    ],
    [
      [0, 11, 5],
      [0, 5, 1],
      [0, 1, 7],
      [0, 7, 10],
      [0, 10, 11],
      [1, 5, 9],
      [5, 11, 4],
      [11, 10, 2],
      [10, 7, 6],
      [7, 1, 8],
      [3, 9, 4],
      [3, 4, 2],
      [3, 2, 6],
      [3, 6, 8],
      [3, 8, 9],
      [4, 9, 5],
      [2, 4, 11],
      [6, 2, 10],
      [8, 6, 7],
      [9, 8, 1],
    ],
    a,
    b
  );
};
THREE.IcosahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.OctahedronGeometry = function (a, b) {
  THREE.PolyhedronGeometry.call(
    this,
    [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ],
    [
      [0, 2, 4],
      [0, 4, 3],
      [0, 3, 5],
      [0, 5, 2],
      [1, 2, 5],
      [1, 5, 3],
      [1, 3, 4],
      [1, 4, 2],
    ],
    a,
    b
  );
};
THREE.OctahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TetrahedronGeometry = function (a, b) {
  THREE.PolyhedronGeometry.call(
    this,
    [
      [1, 1, 1],
      [-1, -1, 1],
      [-1, 1, -1],
      [1, -1, -1],
    ],
    [
      [2, 1, 0],
      [0, 3, 2],
      [1, 3, 0],
      [2, 3, 1],
    ],
    a,
    b
  );
};
THREE.TetrahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ParametricGeometry = function (a, b, c, d) {
  THREE.Geometry.call(this);
  var e = this.vertices,
    f = this.faces,
    g = this.faceVertexUvs[0],
    d = void 0 === d ? !1 : d,
    h,
    i,
    k,
    n,
    p = b + 1;
  for (h = 0; h <= c; h++) {
    n = h / c;
    for (i = 0; i <= b; i++) (k = i / b), (k = a(k, n)), e.push(k);
  }
  var m, r, s, l;
  for (h = 0; h < c; h++)
    for (i = 0; i < b; i++)
      (a = h * p + i),
        (e = h * p + i + 1),
        (n = (h + 1) * p + i),
        (k = (h + 1) * p + i + 1),
        (m = new THREE.Vector2(i / b, h / c)),
        (r = new THREE.Vector2((i + 1) / b, h / c)),
        (s = new THREE.Vector2(i / b, (h + 1) / c)),
        (l = new THREE.Vector2((i + 1) / b, (h + 1) / c)),
        d
          ? (f.push(new THREE.Face3(a, e, n)),
            f.push(new THREE.Face3(e, k, n)),
            g.push([m, r, s]),
            g.push([r, l, s]))
          : (f.push(new THREE.Face4(a, e, k, n)), g.push([m, r, l, s]));
  this.computeCentroids();
  this.computeFaceNormals();
  this.computeVertexNormals();
};
THREE.ParametricGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ConvexGeometry = function (a) {
  function b(a) {
    var b = a.length();
    return new THREE.Vector2(a.x / b, a.y / b);
  }
  THREE.Geometry.call(this);
  for (
    var c = [
        [0, 1, 2],
        [0, 2, 1],
      ],
      d = 3;
    d < a.length;
    d++
  ) {
    var e = d,
      f = a[e].clone(),
      g = f.length();
    f.x += g * 2e-6 * (Math.random() - 0.5);
    f.y += g * 2e-6 * (Math.random() - 0.5);
    f.z += g * 2e-6 * (Math.random() - 0.5);
    for (var g = [], h = 0; h < c.length; ) {
      var i = c[h],
        k = f,
        n = a[i[0]],
        p;
      p = n;
      var m = a[i[1]],
        r = a[i[2]],
        s = new THREE.Vector3(),
        l = new THREE.Vector3();
      s.sub(r, m);
      l.sub(p, m);
      s.crossSelf(l);
      s.normalize();
      p = s;
      n = p.dot(n);
      if (p.dot(k) >= n) {
        for (k = 0; 3 > k; k++) {
          n = [i[k], i[(k + 1) % 3]];
          p = !0;
          for (m = 0; m < g.length; m++)
            if (g[m][0] === n[1] && g[m][1] === n[0]) {
              g[m] = g[g.length - 1];
              g.pop();
              p = !1;
              break;
            }
          p && g.push(n);
        }
        c[h] = c[c.length - 1];
        c.pop();
      } else h++;
    }
    for (m = 0; m < g.length; m++) c.push([g[m][0], g[m][1], e]);
  }
  e = 0;
  f = Array(a.length);
  for (d = 0; d < c.length; d++) {
    g = c[d];
    for (h = 0; 3 > h; h++)
      void 0 === f[g[h]] && ((f[g[h]] = e++), this.vertices.push(a[g[h]])),
        (g[h] = f[g[h]]);
  }
  for (d = 0; d < c.length; d++)
    this.faces.push(new THREE.Face3(c[d][0], c[d][1], c[d][2]));
  for (d = 0; d < this.faces.length; d++)
    (g = this.faces[d]),
      this.faceVertexUvs[0].push([
        b(this.vertices[g.a]),
        b(this.vertices[g.b]),
        b(this.vertices[g.c]),
      ]);
  this.computeCentroids();
  this.computeFaceNormals();
  this.computeVertexNormals();
};
THREE.ConvexGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.AxisHelper = function (a) {
  var b = new THREE.Geometry();
  b.vertices.push(
    new THREE.Vector3(),
    new THREE.Vector3(a || 1, 0, 0),
    new THREE.Vector3(),
    new THREE.Vector3(0, a || 1, 0),
    new THREE.Vector3(),
    new THREE.Vector3(0, 0, a || 1)
  );
  b.colors.push(
    new THREE.Color(16711680),
    new THREE.Color(16755200),
    new THREE.Color(65280),
    new THREE.Color(11206400),
    new THREE.Color(255),
    new THREE.Color(43775)
  );
  a = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });
  THREE.Line.call(this, b, a, THREE.LinePieces);
};
THREE.AxisHelper.prototype = Object.create(THREE.Line.prototype);
THREE.ArrowHelper = function (a, b, c, d) {
  THREE.Object3D.call(this);
  void 0 === d && (d = 16776960);
  void 0 === c && (c = 20);
  var e = new THREE.Geometry();
  e.vertices.push(new THREE.Vector3(0, 0, 0));
  e.vertices.push(new THREE.Vector3(0, 1, 0));
  this.line = new THREE.Line(e, new THREE.LineBasicMaterial({ color: d }));
  this.add(this.line);
  e = new THREE.CylinderGeometry(0, 0.05, 0.25, 5, 1);
  this.cone = new THREE.Mesh(e, new THREE.MeshBasicMaterial({ color: d }));
  this.cone.position.set(0, 1, 0);
  this.add(this.cone);
  b instanceof THREE.Vector3 && (this.position = b);
  this.setDirection(a);
  this.setLength(c);
};
THREE.ArrowHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.ArrowHelper.prototype.setDirection = function (a) {
  var b = new THREE.Vector3(0, 1, 0).crossSelf(a),
    a = Math.acos(new THREE.Vector3(0, 1, 0).dot(a.clone().normalize()));
  this.matrix = new THREE.Matrix4().makeRotationAxis(b.normalize(), a);
  this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder);
};
THREE.ArrowHelper.prototype.setLength = function (a) {
  this.scale.set(a, a, a);
};
THREE.ArrowHelper.prototype.setColor = function (a) {
  this.line.material.color.setHex(a);
  this.cone.material.color.setHex(a);
};
THREE.CameraHelper = function (a) {
  function b(a, b, d) {
    c(a, d);
    c(b, d);
  }
  function c(a, b) {
    d.geometry.vertices.push(new THREE.Vector3());
    d.geometry.colors.push(new THREE.Color(b));
    void 0 === d.pointMap[a] && (d.pointMap[a] = []);
    d.pointMap[a].push(d.geometry.vertices.length - 1);
  }
  THREE.Line.call(this);
  var d = this;
  this.geometry = new THREE.Geometry();
  this.material = new THREE.LineBasicMaterial({
    color: 16777215,
    vertexColors: THREE.FaceColors,
  });
  this.type = THREE.LinePieces;
  this.matrixWorld = a.matrixWorld;
  this.matrixAutoUpdate = !1;
  this.pointMap = {};
  b("n1", "n2", 16755200);
  b("n2", "n4", 16755200);
  b("n4", "n3", 16755200);
  b("n3", "n1", 16755200);
  b("f1", "f2", 16755200);
  b("f2", "f4", 16755200);
  b("f4", "f3", 16755200);
  b("f3", "f1", 16755200);
  b("n1", "f1", 16755200);
  b("n2", "f2", 16755200);
  b("n3", "f3", 16755200);
  b("n4", "f4", 16755200);
  b("p", "n1", 16711680);
  b("p", "n2", 16711680);
  b("p", "n3", 16711680);
  b("p", "n4", 16711680);
  b("u1", "u2", 43775);
  b("u2", "u3", 43775);
  b("u3", "u1", 43775);
  b("c", "t", 16777215);
  b("p", "c", 3355443);
  b("cn1", "cn2", 3355443);
  b("cn3", "cn4", 3355443);
  b("cf1", "cf2", 3355443);
  b("cf3", "cf4", 3355443);
  this.camera = a;
  this.update(a);
};
THREE.CameraHelper.prototype = Object.create(THREE.Line.prototype);
THREE.CameraHelper.prototype.update = function () {
  function a(a, d, e, f) {
    THREE.CameraHelper.__v.set(d, e, f);
    THREE.CameraHelper.__projector.unprojectVector(
      THREE.CameraHelper.__v,
      THREE.CameraHelper.__c
    );
    a = b.pointMap[a];
    if (void 0 !== a) {
      d = 0;
      for (e = a.length; d < e; d++)
        b.geometry.vertices[a[d]].copy(THREE.CameraHelper.__v);
    }
  }
  var b = this;
  THREE.CameraHelper.__c.projectionMatrix.copy(this.camera.projectionMatrix);
  a("c", 0, 0, -1);
  a("t", 0, 0, 1);
  a("n1", -1, -1, -1);
  a("n2", 1, -1, -1);
  a("n3", -1, 1, -1);
  a("n4", 1, 1, -1);
  a("f1", -1, -1, 1);
  a("f2", 1, -1, 1);
  a("f3", -1, 1, 1);
  a("f4", 1, 1, 1);
  a("u1", 0.7, 1.1, -1);
  a("u2", -0.7, 1.1, -1);
  a("u3", 0, 2, -1);
  a("cf1", -1, 0, 1);
  a("cf2", 1, 0, 1);
  a("cf3", 0, -1, 1);
  a("cf4", 0, 1, 1);
  a("cn1", -1, 0, -1);
  a("cn2", 1, 0, -1);
  a("cn3", 0, -1, -1);
  a("cn4", 0, 1, -1);
  this.geometry.verticesNeedUpdate = !0;
};
THREE.CameraHelper.__projector = new THREE.Projector();
THREE.CameraHelper.__v = new THREE.Vector3();
THREE.CameraHelper.__c = new THREE.Camera();
THREE.DirectionalLightHelper = function (a, b, c) {
  THREE.Object3D.call(this);
  this.light = a;
  this.position = a.position;
  this.direction = new THREE.Vector3();
  this.direction.sub(a.target.position, a.position);
  this.color = a.color.clone();
  var d = THREE.Math.clamp(a.intensity, 0, 1);
  this.color.r *= d;
  this.color.g *= d;
  this.color.b *= d;
  var d = this.color.getHex(),
    e = new THREE.SphereGeometry(b, 16, 8),
    f = new THREE.AsteriskGeometry(1.25 * b, 2.25 * b),
    g = new THREE.MeshBasicMaterial({ color: d, fog: !1 }),
    h = new THREE.LineBasicMaterial({ color: d, fog: !1 });
  this.lightArrow = new THREE.ArrowHelper(this.direction, null, c, d);
  this.lightSphere = new THREE.Mesh(e, g);
  this.lightArrow.cone.material.fog = !1;
  this.lightArrow.line.material.fog = !1;
  this.lightRays = new THREE.Line(f, h, THREE.LinePieces);
  this.add(this.lightArrow);
  this.add(this.lightSphere);
  this.add(this.lightRays);
  this.lightSphere.properties.isGizmo = !0;
  this.lightSphere.properties.gizmoSubject = a;
  this.lightSphere.properties.gizmoRoot = this;
  this.targetSphere = null;
  a.target.properties.targetInverse &&
    ((b = new THREE.SphereGeometry(b, 8, 4)),
    (c = new THREE.MeshBasicMaterial({ color: d, wireframe: !0, fog: !1 })),
    (this.targetSphere = new THREE.Mesh(b, c)),
    (this.targetSphere.position = a.target.position),
    (this.targetSphere.properties.isGizmo = !0),
    (this.targetSphere.properties.gizmoSubject = a.target),
    (this.targetSphere.properties.gizmoRoot = this.targetSphere),
    (a = new THREE.LineDashedMaterial({
      color: d,
      dashSize: 4,
      gapSize: 4,
      opacity: 0.75,
      transparent: !0,
      fog: !1,
    })),
    (d = new THREE.Geometry()),
    d.vertices.push(this.position.clone()),
    d.vertices.push(this.targetSphere.position.clone()),
    d.computeLineDistances(),
    (this.targetLine = new THREE.Line(d, a)),
    (this.targetLine.properties.isGizmo = !0));
  this.properties.isGizmo = !0;
};
THREE.DirectionalLightHelper.prototype = Object.create(
  THREE.Object3D.prototype
);
THREE.DirectionalLightHelper.prototype.update = function () {
  this.direction.sub(this.light.target.position, this.light.position);
  this.lightArrow.setDirection(this.direction);
  this.color.copy(this.light.color);
  var a = THREE.Math.clamp(this.light.intensity, 0, 1);
  this.color.r *= a;
  this.color.g *= a;
  this.color.b *= a;
  this.lightArrow.setColor(this.color.getHex());
  this.lightSphere.material.color.copy(this.color);
  this.lightRays.material.color.copy(this.color);
  this.targetSphere.material.color.copy(this.color);
  this.targetLine.material.color.copy(this.color);
  this.targetLine.geometry.vertices[0].copy(this.light.position);
  this.targetLine.geometry.vertices[1].copy(this.light.target.position);
  this.targetLine.geometry.computeLineDistances();
  this.targetLine.geometry.verticesNeedUpdate = !0;
};
THREE.HemisphereLightHelper = function (a, b, c) {
  THREE.Object3D.call(this);
  this.light = a;
  this.position = a.position;
  var d = THREE.Math.clamp(a.intensity, 0, 1);
  this.color = a.color.clone();
  this.color.r *= d;
  this.color.g *= d;
  this.color.b *= d;
  var e = this.color.getHex();
  this.groundColor = a.groundColor.clone();
  this.groundColor.r *= d;
  this.groundColor.g *= d;
  this.groundColor.b *= d;
  for (
    var d = this.groundColor.getHex(),
      f = new THREE.SphereGeometry(b, 16, 8, 0, 2 * Math.PI, 0, 0.5 * Math.PI),
      g = new THREE.SphereGeometry(
        b,
        16,
        8,
        0,
        2 * Math.PI,
        0.5 * Math.PI,
        Math.PI
      ),
      h = new THREE.MeshBasicMaterial({ color: e, fog: !1 }),
      i = new THREE.MeshBasicMaterial({ color: d, fog: !1 }),
      k = 0,
      n = f.faces.length;
    k < n;
    k++
  )
    f.faces[k].materialIndex = 0;
  k = 0;
  for (n = g.faces.length; k < n; k++) g.faces[k].materialIndex = 1;
  THREE.GeometryUtils.merge(f, g);
  this.lightSphere = new THREE.Mesh(f, new THREE.MeshFaceMaterial([h, i]));
  this.lightArrow = new THREE.ArrowHelper(
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, 1.1 * (b + c), 0),
    c,
    e
  );
  this.lightArrow.rotation.x = Math.PI;
  this.lightArrowGround = new THREE.ArrowHelper(
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, -1.1 * (b + c), 0),
    c,
    d
  );
  b = new THREE.Object3D();
  b.rotation.x = 0.5 * -Math.PI;
  b.add(this.lightSphere);
  b.add(this.lightArrow);
  b.add(this.lightArrowGround);
  this.add(b);
  this.lightSphere.properties.isGizmo = !0;
  this.lightSphere.properties.gizmoSubject = a;
  this.lightSphere.properties.gizmoRoot = this;
  this.properties.isGizmo = !0;
  this.target = new THREE.Vector3();
  this.lookAt(this.target);
};
THREE.HemisphereLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.HemisphereLightHelper.prototype.update = function () {
  var a = THREE.Math.clamp(this.light.intensity, 0, 1);
  this.color.copy(this.light.color);
  this.groundColor.copy(this.light.groundColor);
  this.color.r *= a;
  this.color.g *= a;
  this.color.b *= a;
  this.groundColor.r *= a;
  this.groundColor.g *= a;
  this.groundColor.b *= a;
  this.lightSphere.material.materials[0].color.copy(this.color);
  this.lightSphere.material.materials[1].color.copy(this.groundColor);
  this.lightArrow.setColor(this.color.getHex());
  this.lightArrowGround.setColor(this.groundColor.getHex());
  this.lookAt(this.target);
};
THREE.PointLightHelper = function (a, b) {
  THREE.Object3D.call(this);
  this.light = a;
  this.position = a.position;
  this.color = a.color.clone();
  var c = THREE.Math.clamp(a.intensity, 0, 1);
  this.color.r *= c;
  this.color.g *= c;
  this.color.b *= c;
  var d = this.color.getHex(),
    c = new THREE.SphereGeometry(b, 16, 8),
    e = new THREE.AsteriskGeometry(1.25 * b, 2.25 * b),
    f = new THREE.IcosahedronGeometry(1, 2),
    g = new THREE.MeshBasicMaterial({ color: d, fog: !1 }),
    h = new THREE.LineBasicMaterial({ color: d, fog: !1 }),
    d = new THREE.MeshBasicMaterial({
      color: d,
      fog: !1,
      wireframe: !0,
      opacity: 0.1,
      transparent: !0,
    });
  this.lightSphere = new THREE.Mesh(c, g);
  this.lightRays = new THREE.Line(e, h, THREE.LinePieces);
  this.lightDistance = new THREE.Mesh(f, d);
  c = a.distance;
  0 === c
    ? (this.lightDistance.visible = !1)
    : this.lightDistance.scale.set(c, c, c);
  this.add(this.lightSphere);
  this.add(this.lightRays);
  this.add(this.lightDistance);
  this.lightSphere.properties.isGizmo = !0;
  this.lightSphere.properties.gizmoSubject = a;
  this.lightSphere.properties.gizmoRoot = this;
  this.properties.isGizmo = !0;
};
THREE.PointLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.PointLightHelper.prototype.update = function () {
  this.color.copy(this.light.color);
  var a = THREE.Math.clamp(this.light.intensity, 0, 1);
  this.color.r *= a;
  this.color.g *= a;
  this.color.b *= a;
  this.lightSphere.material.color.copy(this.color);
  this.lightRays.material.color.copy(this.color);
  this.lightDistance.material.color.copy(this.color);
  a = this.light.distance;
  0 === a
    ? (this.lightDistance.visible = !1)
    : ((this.lightDistance.visible = !0),
      this.lightDistance.scale.set(a, a, a));
};
THREE.SpotLightHelper = function (a, b, c) {
  THREE.Object3D.call(this);
  this.light = a;
  this.position = a.position;
  this.direction = new THREE.Vector3();
  this.direction.sub(a.target.position, a.position);
  this.color = a.color.clone();
  var d = THREE.Math.clamp(a.intensity, 0, 1);
  this.color.r *= d;
  this.color.g *= d;
  this.color.b *= d;
  var d = this.color.getHex(),
    e = new THREE.SphereGeometry(b, 16, 8),
    f = new THREE.AsteriskGeometry(1.25 * b, 2.25 * b),
    g = new THREE.CylinderGeometry(1e-4, 1, 1, 8, 1, !0),
    h = new THREE.Matrix4();
  h.rotateX(-Math.PI / 2);
  h.translate(new THREE.Vector3(0, -0.5, 0));
  g.applyMatrix(h);
  var i = new THREE.MeshBasicMaterial({ color: d, fog: !1 }),
    h = new THREE.LineBasicMaterial({ color: d, fog: !1 }),
    k = new THREE.MeshBasicMaterial({
      color: d,
      fog: !1,
      wireframe: !0,
      opacity: 0.3,
      transparent: !0,
    });
  this.lightArrow = new THREE.ArrowHelper(this.direction, null, c, d);
  this.lightSphere = new THREE.Mesh(e, i);
  this.lightCone = new THREE.Mesh(g, k);
  c = a.distance ? a.distance : 1e4;
  e = 2 * c * Math.tan(0.5 * a.angle);
  this.lightCone.scale.set(e, e, c);
  this.lightArrow.cone.material.fog = !1;
  this.lightArrow.line.material.fog = !1;
  this.lightRays = new THREE.Line(f, h, THREE.LinePieces);
  this.gyroscope = new THREE.Gyroscope();
  this.gyroscope.add(this.lightArrow);
  this.gyroscope.add(this.lightSphere);
  this.gyroscope.add(this.lightRays);
  this.add(this.gyroscope);
  this.add(this.lightCone);
  this.lookAt(a.target.position);
  this.lightSphere.properties.isGizmo = !0;
  this.lightSphere.properties.gizmoSubject = a;
  this.lightSphere.properties.gizmoRoot = this;
  this.targetSphere = null;
  a.target.properties.targetInverse &&
    ((b = new THREE.SphereGeometry(b, 8, 4)),
    (f = new THREE.MeshBasicMaterial({ color: d, wireframe: !0, fog: !1 })),
    (this.targetSphere = new THREE.Mesh(b, f)),
    (this.targetSphere.position = a.target.position),
    (this.targetSphere.properties.isGizmo = !0),
    (this.targetSphere.properties.gizmoSubject = a.target),
    (this.targetSphere.properties.gizmoRoot = this.targetSphere),
    (a = new THREE.LineDashedMaterial({
      color: d,
      dashSize: 4,
      gapSize: 4,
      opacity: 0.75,
      transparent: !0,
      fog: !1,
    })),
    (d = new THREE.Geometry()),
    d.vertices.push(this.position.clone()),
    d.vertices.push(this.targetSphere.position.clone()),
    d.computeLineDistances(),
    (this.targetLine = new THREE.Line(d, a)),
    (this.targetLine.properties.isGizmo = !0));
  this.properties.isGizmo = !0;
};
THREE.SpotLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.SpotLightHelper.prototype.update = function () {
  this.direction.sub(this.light.target.position, this.light.position);
  this.lightArrow.setDirection(this.direction);
  this.lookAt(this.light.target.position);
  var a = this.light.distance ? this.light.distance : 1e4,
    b = 2 * a * Math.tan(0.5 * this.light.angle);
  this.lightCone.scale.set(b, b, a);
  this.color.copy(this.light.color);
  a = THREE.Math.clamp(this.light.intensity, 0, 1);
  this.color.r *= a;
  this.color.g *= a;
  this.color.b *= a;
  this.lightArrow.setColor(this.color.getHex());
  this.lightSphere.material.color.copy(this.color);
  this.lightRays.material.color.copy(this.color);
  this.lightCone.material.color.copy(this.color);
  this.targetSphere.material.color.copy(this.color);
  this.targetLine.material.color.copy(this.color);
  this.targetLine.geometry.vertices[0].copy(this.light.position);
  this.targetLine.geometry.vertices[1].copy(this.light.target.position);
  this.targetLine.geometry.computeLineDistances();
  this.targetLine.geometry.verticesNeedUpdate = !0;
};
THREE.ImmediateRenderObject = function () {
  THREE.Object3D.call(this);
  this.render = function () {};
};
THREE.ImmediateRenderObject.prototype = Object.create(THREE.Object3D.prototype);
THREE.LensFlare = function (a, b, c, d, e) {
  THREE.Object3D.call(this);
  this.lensFlares = [];
  this.positionScreen = new THREE.Vector3();
  this.customUpdateCallback = void 0;
  void 0 !== a && this.add(a, b, c, d, e);
};
THREE.LensFlare.prototype = Object.create(THREE.Object3D.prototype);
THREE.LensFlare.prototype.add = function (a, b, c, d, e, f) {
  void 0 === b && (b = -1);
  void 0 === c && (c = 0);
  void 0 === f && (f = 1);
  void 0 === e && (e = new THREE.Color(16777215));
  void 0 === d && (d = THREE.NormalBlending);
  c = Math.min(c, Math.max(0, c));
  this.lensFlares.push({
    texture: a,
    size: b,
    distance: c,
    x: 0,
    y: 0,
    z: 0,
    scale: 1,
    rotation: 1,
    opacity: f,
    color: e,
    blending: d,
  });
};
THREE.LensFlare.prototype.updateLensFlares = function () {
  var a,
    b = this.lensFlares.length,
    c,
    d = 2 * -this.positionScreen.x,
    e = 2 * -this.positionScreen.y;
  for (a = 0; a < b; a++)
    (c = this.lensFlares[a]),
      (c.x = this.positionScreen.x + d * c.distance),
      (c.y = this.positionScreen.y + e * c.distance),
      (c.wantedRotation = 0.25 * c.x * Math.PI),
      (c.rotation += 0.25 * (c.wantedRotation - c.rotation));
};
THREE.MorphBlendMesh = function (a, b) {
  THREE.Mesh.call(this, a, b);
  this.animationsMap = {};
  this.animationsList = [];
  var c = this.geometry.morphTargets.length;
  this.createAnimation("__default", 0, c - 1, c / 1);
  this.setAnimationWeight("__default", 1);
};
THREE.MorphBlendMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphBlendMesh.prototype.createAnimation = function (a, b, c, d) {
  b = {
    startFrame: b,
    endFrame: c,
    length: c - b + 1,
    fps: d,
    duration: (c - b) / d,
    lastFrame: 0,
    currentFrame: 0,
    active: !1,
    time: 0,
    direction: 1,
    weight: 1,
    directionBackwards: !1,
    mirroredLoop: !1,
  };
  this.animationsMap[a] = b;
  this.animationsList.push(b);
};
THREE.MorphBlendMesh.prototype.autoCreateAnimations = function (a) {
  for (
    var b = /([a-z]+)(\d+)/,
      c,
      d = {},
      e = this.geometry,
      f = 0,
      g = e.morphTargets.length;
    f < g;
    f++
  ) {
    var h = e.morphTargets[f].name.match(b);
    if (h && 1 < h.length) {
      var i = h[1];
      d[i] || (d[i] = { start: Infinity, end: -Infinity });
      h = d[i];
      f < h.start && (h.start = f);
      f > h.end && (h.end = f);
      c || (c = i);
    }
  }
  for (i in d) (h = d[i]), this.createAnimation(i, h.start, h.end, a);
  this.firstAnimation = c;
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function (a) {
  if ((a = this.animationsMap[a]))
    (a.direction = 1), (a.directionBackwards = !1);
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function (a) {
  if ((a = this.animationsMap[a]))
    (a.direction = -1), (a.directionBackwards = !0);
};
THREE.MorphBlendMesh.prototype.setAnimationFPS = function (a, b) {
  var c = this.animationsMap[a];
  c && ((c.fps = b), (c.duration = (c.end - c.start) / c.fps));
};
THREE.MorphBlendMesh.prototype.setAnimationDuration = function (a, b) {
  var c = this.animationsMap[a];
  c && ((c.duration = b), (c.fps = (c.end - c.start) / c.duration));
};
THREE.MorphBlendMesh.prototype.setAnimationWeight = function (a, b) {
  var c = this.animationsMap[a];
  c && (c.weight = b);
};
THREE.MorphBlendMesh.prototype.setAnimationTime = function (a, b) {
  var c = this.animationsMap[a];
  c && (c.time = b);
};
THREE.MorphBlendMesh.prototype.getAnimationTime = function (a) {
  var b = 0;
  if ((a = this.animationsMap[a])) b = a.time;
  return b;
};
THREE.MorphBlendMesh.prototype.getAnimationDuration = function (a) {
  var b = -1;
  if ((a = this.animationsMap[a])) b = a.duration;
  return b;
};
THREE.MorphBlendMesh.prototype.playAnimation = function (a) {
  var b = this.animationsMap[a];
  b
    ? ((b.time = 0), (b.active = !0))
    : console.warn("animation[" + a + "] undefined");
};
THREE.MorphBlendMesh.prototype.stopAnimation = function (a) {
  if ((a = this.animationsMap[a])) a.active = !1;
};
THREE.MorphBlendMesh.prototype.update = function (a) {
  for (var b = 0, c = this.animationsList.length; b < c; b++) {
    var d = this.animationsList[b];
    if (d.active) {
      var e = d.duration / d.length;
      d.time += d.direction * a;
      if (d.mirroredLoop) {
        if (d.time > d.duration || 0 > d.time)
          (d.direction *= -1),
            d.time > d.duration &&
              ((d.time = d.duration), (d.directionBackwards = !0)),
            0 > d.time && ((d.time = 0), (d.directionBackwards = !1));
      } else (d.time %= d.duration), 0 > d.time && (d.time += d.duration);
      var f =
          d.startFrame +
          THREE.Math.clamp(Math.floor(d.time / e), 0, d.length - 1),
        g = d.weight;
      f !== d.currentFrame &&
        ((this.morphTargetInfluences[d.lastFrame] = 0),
        (this.morphTargetInfluences[d.currentFrame] = 1 * g),
        (this.morphTargetInfluences[f] = 0),
        (d.lastFrame = d.currentFrame),
        (d.currentFrame = f));
      e = (d.time % e) / e;
      d.directionBackwards && (e = 1 - e);
      this.morphTargetInfluences[d.currentFrame] = e * g;
      this.morphTargetInfluences[d.lastFrame] = (1 - e) * g;
    }
  }
};
THREE.LensFlarePlugin = function () {
  function a(a) {
    var c = b.createProgram(),
      d = b.createShader(b.FRAGMENT_SHADER),
      e = b.createShader(b.VERTEX_SHADER);
    b.shaderSource(d, a.fragmentShader);
    b.shaderSource(e, a.vertexShader);
    b.compileShader(d);
    b.compileShader(e);
    b.attachShader(c, d);
    b.attachShader(c, e);
    b.linkProgram(c);
    return c;
  }
  var b, c, d, e, f, g, h, i, k, n, p, m;
  this.init = function (r) {
    b = r.context;
    c = r;
    d = new Float32Array(16);
    e = new Uint16Array(6);
    r = 0;
    d[r++] = -1;
    d[r++] = -1;
    d[r++] = 0;
    d[r++] = 0;
    d[r++] = 1;
    d[r++] = -1;
    d[r++] = 1;
    d[r++] = 0;
    d[r++] = 1;
    d[r++] = 1;
    d[r++] = 1;
    d[r++] = 1;
    d[r++] = -1;
    d[r++] = 1;
    d[r++] = 0;
    d[r++] = 1;
    r = 0;
    e[r++] = 0;
    e[r++] = 1;
    e[r++] = 2;
    e[r++] = 0;
    e[r++] = 2;
    e[r++] = 3;
    f = b.createBuffer();
    g = b.createBuffer();
    b.bindBuffer(b.ARRAY_BUFFER, f);
    b.bufferData(b.ARRAY_BUFFER, d, b.STATIC_DRAW);
    b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
    b.bufferData(b.ELEMENT_ARRAY_BUFFER, e, b.STATIC_DRAW);
    h = b.createTexture();
    i = b.createTexture();
    b.bindTexture(b.TEXTURE_2D, h);
    b.texImage2D(
      b.TEXTURE_2D,
      0,
      b.RGB,
      16,
      16,
      0,
      b.RGB,
      b.UNSIGNED_BYTE,
      null
    );
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
    b.bindTexture(b.TEXTURE_2D, i);
    b.texImage2D(
      b.TEXTURE_2D,
      0,
      b.RGBA,
      16,
      16,
      0,
      b.RGBA,
      b.UNSIGNED_BYTE,
      null
    );
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
    0 >= b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS)
      ? ((k = !1), (n = a(THREE.ShaderFlares.lensFlare)))
      : ((k = !0), (n = a(THREE.ShaderFlares.lensFlareVertexTexture)));
    p = {};
    m = {};
    p.vertex = b.getAttribLocation(n, "position");
    p.uv = b.getAttribLocation(n, "uv");
    m.renderType = b.getUniformLocation(n, "renderType");
    m.map = b.getUniformLocation(n, "map");
    m.occlusionMap = b.getUniformLocation(n, "occlusionMap");
    m.opacity = b.getUniformLocation(n, "opacity");
    m.color = b.getUniformLocation(n, "color");
    m.scale = b.getUniformLocation(n, "scale");
    m.rotation = b.getUniformLocation(n, "rotation");
    m.screenPosition = b.getUniformLocation(n, "screenPosition");
  };
  this.render = function (a, d, e, q) {
    var a = a.__webglFlares,
      u = a.length;
    if (u) {
      var B = new THREE.Vector3(),
        x = q / e,
        t = 0.5 * e,
        F = 0.5 * q,
        C = 16 / q,
        A = new THREE.Vector2(C * x, C),
        z = new THREE.Vector3(1, 1, 0),
        H = new THREE.Vector2(1, 1),
        G = m,
        C = p;
      b.useProgram(n);
      b.enableVertexAttribArray(p.vertex);
      b.enableVertexAttribArray(p.uv);
      b.uniform1i(G.occlusionMap, 0);
      b.uniform1i(G.map, 1);
      b.bindBuffer(b.ARRAY_BUFFER, f);
      b.vertexAttribPointer(C.vertex, 2, b.FLOAT, !1, 16, 0);
      b.vertexAttribPointer(C.uv, 2, b.FLOAT, !1, 16, 8);
      b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
      b.disable(b.CULL_FACE);
      b.depthMask(!1);
      var I, $, D, L, y;
      for (I = 0; I < u; I++)
        if (
          ((C = 16 / q),
          A.set(C * x, C),
          (L = a[I]),
          B.set(
            L.matrixWorld.elements[12],
            L.matrixWorld.elements[13],
            L.matrixWorld.elements[14]
          ),
          d.matrixWorldInverse.multiplyVector3(B),
          d.projectionMatrix.multiplyVector3(B),
          z.copy(B),
          (H.x = z.x * t + t),
          (H.y = z.y * F + F),
          k || (0 < H.x && H.x < e && 0 < H.y && H.y < q))
        ) {
          b.activeTexture(b.TEXTURE1);
          b.bindTexture(b.TEXTURE_2D, h);
          b.copyTexImage2D(b.TEXTURE_2D, 0, b.RGB, H.x - 8, H.y - 8, 16, 16, 0);
          b.uniform1i(G.renderType, 0);
          b.uniform2f(G.scale, A.x, A.y);
          b.uniform3f(G.screenPosition, z.x, z.y, z.z);
          b.disable(b.BLEND);
          b.enable(b.DEPTH_TEST);
          b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
          b.activeTexture(b.TEXTURE0);
          b.bindTexture(b.TEXTURE_2D, i);
          b.copyTexImage2D(
            b.TEXTURE_2D,
            0,
            b.RGBA,
            H.x - 8,
            H.y - 8,
            16,
            16,
            0
          );
          b.uniform1i(G.renderType, 1);
          b.disable(b.DEPTH_TEST);
          b.activeTexture(b.TEXTURE1);
          b.bindTexture(b.TEXTURE_2D, h);
          b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
          L.positionScreen.copy(z);
          L.customUpdateCallback
            ? L.customUpdateCallback(L)
            : L.updateLensFlares();
          b.uniform1i(G.renderType, 2);
          b.enable(b.BLEND);
          $ = 0;
          for (D = L.lensFlares.length; $ < D; $++)
            (y = L.lensFlares[$]),
              0.001 < y.opacity &&
                0.001 < y.scale &&
                ((z.x = y.x),
                (z.y = y.y),
                (z.z = y.z),
                (C = (y.size * y.scale) / q),
                (A.x = C * x),
                (A.y = C),
                b.uniform3f(G.screenPosition, z.x, z.y, z.z),
                b.uniform2f(G.scale, A.x, A.y),
                b.uniform1f(G.rotation, y.rotation),
                b.uniform1f(G.opacity, y.opacity),
                b.uniform3f(G.color, y.color.r, y.color.g, y.color.b),
                c.setBlending(
                  y.blending,
                  y.blendEquation,
                  y.blendSrc,
                  y.blendDst
                ),
                c.setTexture(y.texture, 1),
                b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0));
        }
      b.enable(b.CULL_FACE);
      b.enable(b.DEPTH_TEST);
      b.depthMask(!0);
    }
  };
};
THREE.ShadowMapPlugin = function () {
  var a,
    b,
    c,
    d,
    e,
    f,
    g = new THREE.Frustum(),
    h = new THREE.Matrix4(),
    i = new THREE.Vector3(),
    k = new THREE.Vector3();
  this.init = function (g) {
    a = g.context;
    b = g;
    var g = THREE.ShaderLib.depthRGBA,
      h = THREE.UniformsUtils.clone(g.uniforms);
    c = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
    });
    d = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
      morphTargets: !0,
    });
    e = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
      skinning: !0,
    });
    f = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
      morphTargets: !0,
      skinning: !0,
    });
    c._shadowPass = !0;
    d._shadowPass = !0;
    e._shadowPass = !0;
    f._shadowPass = !0;
  };
  this.render = function (a, c) {
    b.shadowMapEnabled && b.shadowMapAutoUpdate && this.update(a, c);
  };
  this.update = function (n, p) {
    var m,
      r,
      s,
      l,
      q,
      u,
      B,
      x,
      t,
      F = [];
    l = 0;
    a.clearColor(1, 1, 1, 1);
    a.disable(a.BLEND);
    a.enable(a.CULL_FACE);
    a.frontFace(a.CCW);
    b.shadowMapCullFace === THREE.CullFaceFront
      ? a.cullFace(a.FRONT)
      : a.cullFace(a.BACK);
    b.setDepthTest(!0);
    m = 0;
    for (r = n.__lights.length; m < r; m++)
      if (((s = n.__lights[m]), s.castShadow))
        if (s instanceof THREE.DirectionalLight && s.shadowCascade)
          for (q = 0; q < s.shadowCascadeCount; q++) {
            var C;
            if (s.shadowCascadeArray[q]) C = s.shadowCascadeArray[q];
            else {
              t = s;
              B = q;
              C = new THREE.DirectionalLight();
              C.isVirtual = !0;
              C.onlyShadow = !0;
              C.castShadow = !0;
              C.shadowCameraNear = t.shadowCameraNear;
              C.shadowCameraFar = t.shadowCameraFar;
              C.shadowCameraLeft = t.shadowCameraLeft;
              C.shadowCameraRight = t.shadowCameraRight;
              C.shadowCameraBottom = t.shadowCameraBottom;
              C.shadowCameraTop = t.shadowCameraTop;
              C.shadowCameraVisible = t.shadowCameraVisible;
              C.shadowDarkness = t.shadowDarkness;
              C.shadowBias = t.shadowCascadeBias[B];
              C.shadowMapWidth = t.shadowCascadeWidth[B];
              C.shadowMapHeight = t.shadowCascadeHeight[B];
              C.pointsWorld = [];
              C.pointsFrustum = [];
              x = C.pointsWorld;
              u = C.pointsFrustum;
              for (var A = 0; 8 > A; A++)
                (x[A] = new THREE.Vector3()), (u[A] = new THREE.Vector3());
              x = t.shadowCascadeNearZ[B];
              t = t.shadowCascadeFarZ[B];
              u[0].set(-1, -1, x);
              u[1].set(1, -1, x);
              u[2].set(-1, 1, x);
              u[3].set(1, 1, x);
              u[4].set(-1, -1, t);
              u[5].set(1, -1, t);
              u[6].set(-1, 1, t);
              u[7].set(1, 1, t);
              C.originalCamera = p;
              u = new THREE.Gyroscope();
              u.position = s.shadowCascadeOffset;
              u.add(C);
              u.add(C.target);
              p.add(u);
              s.shadowCascadeArray[q] = C;
              console.log("Created virtualLight", C);
            }
            B = s;
            x = q;
            t = B.shadowCascadeArray[x];
            t.position.copy(B.position);
            t.target.position.copy(B.target.position);
            t.lookAt(t.target);
            t.shadowCameraVisible = B.shadowCameraVisible;
            t.shadowDarkness = B.shadowDarkness;
            t.shadowBias = B.shadowCascadeBias[x];
            u = B.shadowCascadeNearZ[x];
            B = B.shadowCascadeFarZ[x];
            t = t.pointsFrustum;
            t[0].z = u;
            t[1].z = u;
            t[2].z = u;
            t[3].z = u;
            t[4].z = B;
            t[5].z = B;
            t[6].z = B;
            t[7].z = B;
            F[l] = C;
            l++;
          }
        else (F[l] = s), l++;
    m = 0;
    for (r = F.length; m < r; m++) {
      s = F[m];
      s.shadowMap ||
        ((q = THREE.LinearFilter),
        b.shadowMapType === THREE.PCFSoftShadowMap && (q = THREE.NearestFilter),
        (s.shadowMap = new THREE.WebGLRenderTarget(
          s.shadowMapWidth,
          s.shadowMapHeight,
          { minFilter: q, magFilter: q, format: THREE.RGBAFormat }
        )),
        (s.shadowMapSize = new THREE.Vector2(
          s.shadowMapWidth,
          s.shadowMapHeight
        )),
        (s.shadowMatrix = new THREE.Matrix4()));
      if (!s.shadowCamera) {
        if (s instanceof THREE.SpotLight)
          s.shadowCamera = new THREE.PerspectiveCamera(
            s.shadowCameraFov,
            s.shadowMapWidth / s.shadowMapHeight,
            s.shadowCameraNear,
            s.shadowCameraFar
          );
        else if (s instanceof THREE.DirectionalLight)
          s.shadowCamera = new THREE.OrthographicCamera(
            s.shadowCameraLeft,
            s.shadowCameraRight,
            s.shadowCameraTop,
            s.shadowCameraBottom,
            s.shadowCameraNear,
            s.shadowCameraFar
          );
        else {
          console.error("Unsupported light type for shadow");
          continue;
        }
        n.add(s.shadowCamera);
        b.autoUpdateScene && n.updateMatrixWorld();
      }
      s.shadowCameraVisible &&
        !s.cameraHelper &&
        ((s.cameraHelper = new THREE.CameraHelper(s.shadowCamera)),
        s.shadowCamera.add(s.cameraHelper));
      if (s.isVirtual && C.originalCamera == p) {
        q = p;
        l = s.shadowCamera;
        u = s.pointsFrustum;
        t = s.pointsWorld;
        i.set(Infinity, Infinity, Infinity);
        k.set(-Infinity, -Infinity, -Infinity);
        for (B = 0; 8 > B; B++)
          (x = t[B]),
            x.copy(u[B]),
            THREE.ShadowMapPlugin.__projector.unprojectVector(x, q),
            l.matrixWorldInverse.multiplyVector3(x),
            x.x < i.x && (i.x = x.x),
            x.x > k.x && (k.x = x.x),
            x.y < i.y && (i.y = x.y),
            x.y > k.y && (k.y = x.y),
            x.z < i.z && (i.z = x.z),
            x.z > k.z && (k.z = x.z);
        l.left = i.x;
        l.right = k.x;
        l.top = k.y;
        l.bottom = i.y;
        l.updateProjectionMatrix();
      }
      l = s.shadowMap;
      u = s.shadowMatrix;
      q = s.shadowCamera;
      q.position.copy(s.matrixWorld.getPosition());
      q.lookAt(s.target.matrixWorld.getPosition());
      q.updateMatrixWorld();
      q.matrixWorldInverse.getInverse(q.matrixWorld);
      s.cameraHelper && (s.cameraHelper.visible = s.shadowCameraVisible);
      s.shadowCameraVisible && s.cameraHelper.update();
      u.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
      u.multiplySelf(q.projectionMatrix);
      u.multiplySelf(q.matrixWorldInverse);
      h.multiply(q.projectionMatrix, q.matrixWorldInverse);
      g.setFromMatrix(h);
      b.setRenderTarget(l);
      b.clear();
      t = n.__webglObjects;
      s = 0;
      for (l = t.length; s < l; s++)
        if (
          ((B = t[s]),
          (u = B.object),
          (B.render = !1),
          u.visible &&
            u.castShadow &&
            (!(u instanceof THREE.Mesh || u instanceof THREE.ParticleSystem) ||
              !u.frustumCulled ||
              g.contains(u)))
        )
          u._modelViewMatrix.multiply(q.matrixWorldInverse, u.matrixWorld),
            (B.render = !0);
      s = 0;
      for (l = t.length; s < l; s++)
        (B = t[s]),
          B.render &&
            ((u = B.object),
            (B = B.buffer),
            (A =
              u.material instanceof THREE.MeshFaceMaterial
                ? u.material.materials[0]
                : u.material),
            (x = 0 < u.geometry.morphTargets.length && A.morphTargets),
            (A = u instanceof THREE.SkinnedMesh && A.skinning),
            (x = u.customDepthMaterial
              ? u.customDepthMaterial
              : A
              ? x
                ? f
                : e
              : x
              ? d
              : c),
            B instanceof THREE.BufferGeometry
              ? b.renderBufferDirect(q, n.__lights, null, x, B, u)
              : b.renderBuffer(q, n.__lights, null, x, B, u));
      t = n.__webglObjectsImmediate;
      s = 0;
      for (l = t.length; s < l; s++)
        (B = t[s]),
          (u = B.object),
          u.visible &&
            u.castShadow &&
            (u._modelViewMatrix.multiply(q.matrixWorldInverse, u.matrixWorld),
            b.renderImmediateObject(q, n.__lights, null, c, u));
    }
    m = b.getClearColor();
    r = b.getClearAlpha();
    a.clearColor(m.r, m.g, m.b, r);
    a.enable(a.BLEND);
    b.shadowMapCullFace === THREE.CullFaceFront && a.cullFace(a.BACK);
  };
};
THREE.ShadowMapPlugin.__projector = new THREE.Projector();
THREE.SpritePlugin = function () {
  function a(a, b) {
    return a.z !== b.z ? b.z - a.z : b.id - a.id;
  }
  var b, c, d, e, f, g, h, i, k;
  this.init = function (a) {
    b = a.context;
    c = a;
    d = new Float32Array(16);
    e = new Uint16Array(6);
    a = 0;
    d[a++] = -1;
    d[a++] = -1;
    d[a++] = 0;
    d[a++] = 0;
    d[a++] = 1;
    d[a++] = -1;
    d[a++] = 1;
    d[a++] = 0;
    d[a++] = 1;
    d[a++] = 1;
    d[a++] = 1;
    d[a++] = 1;
    d[a++] = -1;
    d[a++] = 1;
    d[a++] = 0;
    d[a++] = 1;
    a = 0;
    e[a++] = 0;
    e[a++] = 1;
    e[a++] = 2;
    e[a++] = 0;
    e[a++] = 2;
    e[a++] = 3;
    f = b.createBuffer();
    g = b.createBuffer();
    b.bindBuffer(b.ARRAY_BUFFER, f);
    b.bufferData(b.ARRAY_BUFFER, d, b.STATIC_DRAW);
    b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
    b.bufferData(b.ELEMENT_ARRAY_BUFFER, e, b.STATIC_DRAW);
    var a = THREE.ShaderSprite.sprite,
      p = b.createProgram(),
      m = b.createShader(b.FRAGMENT_SHADER),
      r = b.createShader(b.VERTEX_SHADER);
    b.shaderSource(m, a.fragmentShader);
    b.shaderSource(r, a.vertexShader);
    b.compileShader(m);
    b.compileShader(r);
    b.attachShader(p, m);
    b.attachShader(p, r);
    b.linkProgram(p);
    h = p;
    i = {};
    k = {};
    i.position = b.getAttribLocation(h, "position");
    i.uv = b.getAttribLocation(h, "uv");
    k.uvOffset = b.getUniformLocation(h, "uvOffset");
    k.uvScale = b.getUniformLocation(h, "uvScale");
    k.rotation = b.getUniformLocation(h, "rotation");
    k.scale = b.getUniformLocation(h, "scale");
    k.alignment = b.getUniformLocation(h, "alignment");
    k.color = b.getUniformLocation(h, "color");
    k.map = b.getUniformLocation(h, "map");
    k.opacity = b.getUniformLocation(h, "opacity");
    k.useScreenCoordinates = b.getUniformLocation(h, "useScreenCoordinates");
    k.sizeAttenuation = b.getUniformLocation(h, "sizeAttenuation");
    k.screenPosition = b.getUniformLocation(h, "screenPosition");
    k.modelViewMatrix = b.getUniformLocation(h, "modelViewMatrix");
    k.projectionMatrix = b.getUniformLocation(h, "projectionMatrix");
    k.fogType = b.getUniformLocation(h, "fogType");
    k.fogDensity = b.getUniformLocation(h, "fogDensity");
    k.fogNear = b.getUniformLocation(h, "fogNear");
    k.fogFar = b.getUniformLocation(h, "fogFar");
    k.fogColor = b.getUniformLocation(h, "fogColor");
    k.alphaTest = b.getUniformLocation(h, "alphaTest");
  };
  this.render = function (d, e, m, r) {
    var s = d.__webglSprites,
      l = s.length;
    if (l) {
      var q = i,
        u = k,
        B = r / m,
        m = 0.5 * m,
        x = 0.5 * r;
      b.useProgram(h);
      b.enableVertexAttribArray(q.position);
      b.enableVertexAttribArray(q.uv);
      b.disable(b.CULL_FACE);
      b.enable(b.BLEND);
      b.bindBuffer(b.ARRAY_BUFFER, f);
      b.vertexAttribPointer(q.position, 2, b.FLOAT, !1, 16, 0);
      b.vertexAttribPointer(q.uv, 2, b.FLOAT, !1, 16, 8);
      b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
      b.uniformMatrix4fv(u.projectionMatrix, !1, e.projectionMatrix.elements);
      b.activeTexture(b.TEXTURE0);
      b.uniform1i(u.map, 0);
      var t = (q = 0),
        F = d.fog;
      F
        ? (b.uniform3f(u.fogColor, F.color.r, F.color.g, F.color.b),
          F instanceof THREE.Fog
            ? (b.uniform1f(u.fogNear, F.near),
              b.uniform1f(u.fogFar, F.far),
              b.uniform1i(u.fogType, 1),
              (t = q = 1))
            : F instanceof THREE.FogExp2 &&
              (b.uniform1f(u.fogDensity, F.density),
              b.uniform1i(u.fogType, 2),
              (t = q = 2)))
        : (b.uniform1i(u.fogType, 0), (t = q = 0));
      for (var C, A, z = [], F = 0; F < l; F++)
        (C = s[F]),
          (A = C.material),
          C.visible &&
            0 !== A.opacity &&
            (A.useScreenCoordinates
              ? (C.z = -C.position.z)
              : (C._modelViewMatrix.multiply(
                  e.matrixWorldInverse,
                  C.matrixWorld
                ),
                (C.z = -C._modelViewMatrix.elements[14])));
      s.sort(a);
      for (F = 0; F < l; F++)
        (C = s[F]),
          (A = C.material),
          C.visible &&
            0 !== A.opacity &&
            A.map &&
            A.map.image &&
            A.map.image.width &&
            (b.uniform1f(u.alphaTest, A.alphaTest),
            !0 === A.useScreenCoordinates
              ? (b.uniform1i(u.useScreenCoordinates, 1),
                b.uniform3f(
                  u.screenPosition,
                  (C.position.x * c.devicePixelRatio - m) / m,
                  (x - C.position.y * c.devicePixelRatio) / x,
                  Math.max(0, Math.min(1, C.position.z))
                ),
                (z[0] = c.devicePixelRatio),
                (z[1] = c.devicePixelRatio))
              : (b.uniform1i(u.useScreenCoordinates, 0),
                b.uniform1i(u.sizeAttenuation, A.sizeAttenuation ? 1 : 0),
                b.uniformMatrix4fv(
                  u.modelViewMatrix,
                  !1,
                  C._modelViewMatrix.elements
                ),
                (z[0] = 1),
                (z[1] = 1)),
            (e = d.fog && A.fog ? t : 0),
            q !== e && (b.uniform1i(u.fogType, e), (q = e)),
            (e = 1 / (A.scaleByViewport ? r : 1)),
            (z[0] *= e * B * C.scale.x),
            (z[1] *= e * C.scale.y),
            b.uniform2f(u.uvScale, A.uvScale.x, A.uvScale.y),
            b.uniform2f(u.uvOffset, A.uvOffset.x, A.uvOffset.y),
            b.uniform2f(u.alignment, A.alignment.x, A.alignment.y),
            b.uniform1f(u.opacity, A.opacity),
            b.uniform3f(u.color, A.color.r, A.color.g, A.color.b),
            b.uniform1f(u.rotation, C.rotation),
            b.uniform2fv(u.scale, z),
            c.setBlending(A.blending, A.blendEquation, A.blendSrc, A.blendDst),
            c.setDepthTest(A.depthTest),
            c.setDepthWrite(A.depthWrite),
            c.setTexture(A.map, 0),
            b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0));
      b.enable(b.CULL_FACE);
    }
  };
};
THREE.DepthPassPlugin = function () {
  this.enabled = !1;
  this.renderTarget = null;
  var a,
    b,
    c,
    d,
    e,
    f,
    g = new THREE.Frustum(),
    h = new THREE.Matrix4();
  this.init = function (g) {
    a = g.context;
    b = g;
    var g = THREE.ShaderLib.depthRGBA,
      h = THREE.UniformsUtils.clone(g.uniforms);
    c = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
    });
    d = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
      morphTargets: !0,
    });
    e = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
      skinning: !0,
    });
    f = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
      morphTargets: !0,
      skinning: !0,
    });
    c._shadowPass = !0;
    d._shadowPass = !0;
    e._shadowPass = !0;
    f._shadowPass = !0;
  };
  this.render = function (a, b) {
    this.enabled && this.update(a, b);
  };
  this.update = function (i, k) {
    var n, p, m, r, s, l;
    a.clearColor(1, 1, 1, 1);
    a.disable(a.BLEND);
    b.setDepthTest(!0);
    b.autoUpdateScene && i.updateMatrixWorld();
    k.matrixWorldInverse.getInverse(k.matrixWorld);
    h.multiply(k.projectionMatrix, k.matrixWorldInverse);
    g.setFromMatrix(h);
    b.setRenderTarget(this.renderTarget);
    b.clear();
    l = i.__webglObjects;
    n = 0;
    for (p = l.length; n < p; n++)
      if (
        ((m = l[n]),
        (s = m.object),
        (m.render = !1),
        s.visible &&
          (!(s instanceof THREE.Mesh || s instanceof THREE.ParticleSystem) ||
            !s.frustumCulled ||
            g.contains(s)))
      )
        s._modelViewMatrix.multiply(k.matrixWorldInverse, s.matrixWorld),
          (m.render = !0);
    var q;
    n = 0;
    for (p = l.length; n < p; n++)
      if (
        ((m = l[n]),
        m.render &&
          ((s = m.object),
          (m = m.buffer),
          !(s instanceof THREE.ParticleSystem) || s.customDepthMaterial))
      )
        (q =
          s.material instanceof THREE.MeshFaceMaterial
            ? s.material.materials[0]
            : s.material) && b.setMaterialFaces(s.material),
          (r = 0 < s.geometry.morphTargets.length && q.morphTargets),
          (q = s instanceof THREE.SkinnedMesh && q.skinning),
          (r = s.customDepthMaterial
            ? s.customDepthMaterial
            : q
            ? r
              ? f
              : e
            : r
            ? d
            : c),
          m instanceof THREE.BufferGeometry
            ? b.renderBufferDirect(k, i.__lights, null, r, m, s)
            : b.renderBuffer(k, i.__lights, null, r, m, s);
    l = i.__webglObjectsImmediate;
    n = 0;
    for (p = l.length; n < p; n++)
      (m = l[n]),
        (s = m.object),
        s.visible &&
          (s._modelViewMatrix.multiply(k.matrixWorldInverse, s.matrixWorld),
          b.renderImmediateObject(k, i.__lights, null, c, s));
    n = b.getClearColor();
    p = b.getClearAlpha();
    a.clearColor(n.r, n.g, n.b, p);
    a.enable(a.BLEND);
  };
};
THREE.ShaderFlares = {
  lensFlareVertexTexture: {
    vertexShader:
      "uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
    fragmentShader:
      "precision mediump float;\nuniform sampler2D map;\nuniform float opacity;\nuniform int renderType;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}",
  },
  lensFlare: {
    vertexShader:
      "uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
    fragmentShader:
      "precision mediump float;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform int renderType;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}",
  },
};
THREE.ShaderSprite = {
  sprite: {
    vertexShader:
      "uniform int useScreenCoordinates;\nuniform int sizeAttenuation;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( sizeAttenuation == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
    fragmentShader:
      "precision mediump float;\nuniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform float alphaTest;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\nif ( texture.a < alphaTest ) discard;\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\nif ( fogType > 0 ) {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat fogFactor = 0.0;\nif ( fogType == 1 ) {\nfogFactor = smoothstep( fogNear, fogFar, depth );\n} else {\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n}\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}\n}",
  },
};
