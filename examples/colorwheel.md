# canvas color picker 四色相 (蓝 红 青 黄)

```html
<canvas id="panel"></canvas>
<div id="hex" class="colorPicker"></div>
<div id="rgb" class="colorPicker"></div>
```

```css
canvas {
  cursor: crosshair;
}

.colorPicker {
  color: #fff;
  width: 100px;
  height: 24px;
  line-height: 24px;
  border: 1px solid #333;
  text-align: center;
}
```

```js
'use strict';
const el = document.querySelector('#panel');
const context = el.getContext('2d');
const width = 256;
const height = 256;

let imageData;
let pixels
let i = 0
let rx, ry
let rgbR, rgbG, rgbB;

el.width = width;
el.height = height;

imageData = context.createImageData(width, height);
pixels = imageData.data;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++, i += 4) {
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

const hexPicker = document.querySelector('#hex');
const rgbPicker = document.querySelector('#rgb');

let getCanvasPixel = require('../assets/color/getCanvasPixel')

// 绑定获取面板颜色事件
getCanvasPixel('#panel', data => {
  hexPicker.style.backgroundColor = data.hex;
  hexPicker.innerHTML = data.hex.toUpperCase();
  rgbPicker.style.backgroundColor = data.hex;
  rgbPicker.innerHTML = [data.rgb.R,data.rgb.G, data.rgb.B].join(',');
})
```