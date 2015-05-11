# 色板(正方形)

```css
canvas {
  cursor: crosshair;
}

.colorPicker {
  width: 100px;
  height: 24px;
  line-height: 24px;
  border: 1px solid #333;
  text-align: center;
}
```

```html
<canvas id="panel"></canvas>
<div id="hex" class="colorPicker"></div>
<script type="text/javascript" src="../assets/colorwheel/getCanvasPickerColor.js"></script>
```

```js
'use strict';
var el = document.querySelector('#panel');
var context = el.getContext('2d');
var width = el.width;
var height = el.height;
var imageData;
var pixels
var i = 0
var x, y, rx, ry
var rgbR, rgbG, rgbB;
var width = 256;
var height = 256;

el.width = width;
el.height = height;

imageData = context.createImageData(width, height);
pixels = imageData.data;

for (y = 0; y < height; y++) {
  for (x = 0; x < width; x++, i += 4) {
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
document.body.style.backgroundColor = 'white';
document.body.style.margin = '0px';

var hexPicker = document.querySelector('#hex');

// 绑定获取面板颜色事件
getCanvasPickerColor('#panel', function(data) {
  hexPicker.style.backgroundColor = data.hex;
  hexPicker.innerHTML = data.hex.toUpperCase();
})
```