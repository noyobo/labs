'use strict';

var colorUtil = require('./colorUtil.js');

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