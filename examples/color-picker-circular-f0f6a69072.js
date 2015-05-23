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