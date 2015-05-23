'use strict';

function getCanvasPixel(elem, callback) {
  var canvasElem = document.querySelector(elem);
  var ctx = canvasElem.getContext('2d');
  canvasElem.addEventListener('mousemove', function (event) {
    var canvasX = event.layerX;
    var canvasY = event.layerY;
    // get current pixel
    var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
    var pixel = imageData.data;
    var rgb = toRGB(pixel);
    var hex = rgbToHex(rgb);
    var crgb = complimentaryColor(rgb);
    callback && callback({
      rgb: rgb,
      hex: hex,
      crgb: crgb,
      chex: rgbToHex(crgb)
    });
  });
}

function toRGB(pixel) {
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
}

// http://www.javascripter.net/faq/rgbtohex.htm
function rgbToHex(rgb) {
  return '#' + toHex(rgb.R) + toHex(rgb.G) + toHex(rgb.B);
}

function toHex(n) {
  n = parseInt(n, 10);
  if (isNaN(n)) return '00';
  n = Math.max(0, Math.min(n, 255));
  return '0123456789ABCDEF'.charAt((n - n % 16) / 16) + '0123456789ABCDEF'.charAt(n % 16);
}

function complimentaryColor(rgb) {
  return {
    R: 255 - rgb.R,
    G: 255 - rgb.G,
    B: 255 - rgb.B
  };
}