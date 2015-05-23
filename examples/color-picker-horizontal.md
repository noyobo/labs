# canvas color picker 色条 (6色相)

```html
<div>
  <div class="canvas-warp"><canvas id="panel"></canvas></div>
</div>
<div class="clearfix"></div>
<br/>
<div id="hex" class="colorPicker"></div>
<div id="rgb" class="colorPicker"></div>
```

```css
canvas {cursor: crosshair;}
.canvas-warp {border: 2px solid #000; float:left; font-size:0; border-radius:2px;}
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
const width = 360;
const height = 100;

let imageData;
let pixels;
let i = 0;
let R, G, B;

let Hue, Saturation, Value;

el.width = width;
el.height = height;

var colorUtil = require('../assets/color/colorUtil')

imageData = context.createImageData(width, height);
pixels = imageData.data;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++, i += 4) {
    Value = 1               // 亮度
    Hue = x                 // 色调
    Saturation = 1 - y / height // 饱和度

    var RGB = colorUtil.rgbFromHsv(Hue, Saturation, Value);
    
    pixels[i + 0] = RGB.R
    pixels[i + 1] = RGB.G
    pixels[i + 2] = RGB.B
    pixels[i + 3] = 0xFF
  }
}

context.putImageData(imageData, 0, 0);

const hexPicker = document.querySelector('#hex');
const rgbPicker = document.querySelector('#rgb');

let getCanvasPixel = require('../assets/color/getCanvasPixel')
// 绑定获取面板颜色事件
getCanvasPixel('#panel', data => {
  hexPicker.style.backgroundColor = data.hex;
  hexPicker.style.color = data.chex;
  hexPicker.innerHTML = data.hex.toUpperCase();
  rgbPicker.style.backgroundColor = data.hex;
  rgbPicker.style.color = data.chex;
  rgbPicker.innerHTML = [data.rgb.R,data.rgb.G, data.rgb.B].join(',');
})
```