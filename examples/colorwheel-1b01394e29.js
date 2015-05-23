'use strict';
var el = document.querySelector('#panel');
var context = el.getContext('2d');
var width = 256;
var height = 256;

var imageData = undefined;
var pixels = undefined;
var i = 0;
var rx = undefined,
    ry = undefined;
var rgbR = undefined,
    rgbG = undefined,
    rgbB = undefined;

el.width = width;
el.height = height;

imageData = context.createImageData(width, height);
pixels = imageData.data;

for (var y = 0; y < height; y++) {
  for (var x = 0; x < width; x++, i += 4) {
    rx = x / (width - 1); // 横坐标比例
    ry = y / (height - 1); // 纵坐标比例
    // 左上角为蓝色
    rgbR = 255 * rx; // 红色随 x 而加深
    rgbG = 255 * ry; // 绿色随 y 而加深
    rgbB = 255 * (1 - rx); // 蓝色随 x 而变浅

    pixels[i] = rgbR;
    pixels[i + 1] = rgbG;
    pixels[i + 2] = rgbB;
    pixels[i + 3] = 255;
  }
}

context.putImageData(imageData, 0, 0);

var hexPicker = document.querySelector('#hex');
var rgbPicker = document.querySelector('#rgb');

// 绑定获取面板颜色事件
getCanvasPixel('#panel', function (data) {
  hexPicker.style.backgroundColor = data.hex;
  hexPicker.innerHTML = data.hex.toUpperCase();
  rgbPicker.style.backgroundColor = data.hex;
  rgbPicker.innerHTML = [data.rgb.R, data.rgb.G, data.rgb.B].join(',');
});