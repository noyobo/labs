/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var el = document.querySelector('#panel');
	var context = el.getContext('2d');
	var radius = 128;
	// 旋转角度
	var rotation = -Math.PI;

	var width = radius * 2;
	var height = radius * 2;

	var imageData = undefined;
	var pixels = undefined;
	var i = 0;
	var R = undefined,
	    G = undefined,
	    B = undefined;

	var ColorUtil = __webpack_require__(5);
	var getCanvasPixel = __webpack_require__(6);

	el.width = width;
	el.height = height;

	imageData = context.createImageData(width, height);
	pixels = imageData.data;
	for (var xy = 0, area = width * height; xy < area; xy++) {
	  var x = Math.floor(xy % width);
	  var y = Math.floor(xy / height);
	  var hue = ColorUtil.hueFromPosition(x, y);
	  var rgb = ColorUtil.rgbFromHsv(hue, 1, 1);

	  pixels[xy * 4 + 0] = rgb.R;
	  pixels[xy * 4 + 1] = rgb.G;
	  pixels[xy * 4 + 2] = rgb.B;
	  pixels[xy * 4 + 3] = 255;
	}

	context.putImageData(imageData, 0, 0);

	context.save();
	context.globalCompositeOperation = 'destination-in';
	context.fillStyle = 'white';
	context.beginPath();
	context.arc(radius, radius, radius * 1, 0, Math.PI * 2);
	context.fill();
	context.globalCompositeOperation = 'destination-out';
	context.beginPath();
	context.arc(radius, radius, radius * 0.7, 0, Math.PI * 2);
	context.fill();
	context.restore();

	var hexPicker = document.querySelector('#hex');
	var rgbPicker = document.querySelector('#rgb');

	// 绑定获取面板颜色事件
	getCanvasPixel('#panel', function (data) {
	  hexPicker.style.backgroundColor = data.hex;
	  hexPicker.style.color = data.chex;
	  hexPicker.innerHTML = data.hex.toUpperCase();
	  rgbPicker.style.backgroundColor = data.hex;
	  rgbPicker.style.color = data.chex;
	  rgbPicker.innerHTML = [data.rgb.R, data.rgb.G, data.rgb.B].join(',');
	});

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {

	  // 根据 XY 坐标获取  HUE 色相值 (角度)
	  hueFromPosition: function hueFromPosition(x, y) {
	    var radius = arguments[2] === undefined ? 150 : arguments[2];
	    var rotation = arguments[3] === undefined ? 0 : arguments[3];

	    var deg = undefined;
	    deg = Math.atan2(y - radius, x - radius) - rotation;
	    deg *= 180 / Math.PI;
	    return (deg + 360) % 360;
	  },

	  // 转换 HSV 为 RGB
	  rgbFromHsv: function rgbFromHsv(h, s, v) {
	    var c = undefined,
	        i = undefined,
	        f = undefined,
	        p = undefined,
	        q = undefined,
	        t = undefined;
	    var R = undefined,
	        G = undefined,
	        B = undefined;
	    if (s === 0) {
	      R = G = B = v;
	    } else {
	      h = (h + 360) % 360;
	      c = v * s;
	      h /= 60;
	      i = Math.floor(h);
	      f = h - i;
	      p = v * (1 - s);
	      q = v * (1 - s * f);
	      t = v * (1 - s * (1 - f));

	      R = [v, q, p, p, t, v][i];
	      G = [t, v, v, q, p, p][i];
	      B = [p, p, t, v, v, q][i];
	    }
	    R = Math.floor(R * 255);
	    G = Math.floor(G * 255);
	    B = Math.floor(B * 255);
	    return {
	      R: R, G: G, B: B
	    };
	  },
	  rgbFromPixel: function rgbFromPixel(pixel) {
	    var r = pixel[0];
	    var g = pixel[1];
	    var b = pixel[2];
	    var alpha = pixel[3];

	    return {
	      R: r,
	      G: g,
	      B: b,
	      A: alpha
	    };
	  },

	  // http://www.javascripter.net/faq/rgbtohex.htm
	  hexFromRgb: function hexFromRgb(rgb) {
	    return '#' + this.hexFromDec(rgb.R) + this.hexFromDec(rgb.G) + this.hexFromDec(rgb.B);
	  },

	  hexFromDec: function hexFromDec(n) {
	    n = parseInt(n, 10);
	    if (isNaN(n)) {
	      return '00';
	    }
	    n = Math.max(0, Math.min(n, 255));
	    return '0123456789ABCDEF'.charAt((n - n % 16) / 16) + '0123456789ABCDEF'.charAt(n % 16);
	  },

	  complimentaryColor: function complimentaryColor(rgb) {
	    return {
	      R: 255 - rgb.R,
	      G: 255 - rgb.G,
	      B: 255 - rgb.B
	    };
	  }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var colorUtil = __webpack_require__(5);

	module.exports = function getCanvasPixel(elem, callback) {
	  var canvasElem = document.querySelector(elem);
	  var ctx = canvasElem.getContext('2d');
	  canvasElem.addEventListener('mousemove', function (event) {
	    var canvasX = event.layerX;
	    var canvasY = event.layerY;
	    // get current pixel
	    var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
	    var pixel = imageData.data;
	    var rgb = colorUtil.rgbFromPixel(pixel);
	    var hex = colorUtil.hexFromRgb(rgb);
	    var crgb = colorUtil.complimentaryColor(rgb);
	    callback && callback({
	      rgb: rgb,
	      hex: hex,
	      crgb: crgb,
	      chex: colorUtil.hexFromRgb(crgb)
	    });
	  });
	};

/***/ }
/******/ ]);