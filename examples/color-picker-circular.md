# canvas color picker circular 圆环

```html
<div>
  <canvas id="panel"></canvas>
</div>
<div class="clearfix"></div>
<br/>
<div id="hex" class="colorPicker"></div>
<div id="rgb" class="colorPicker"></div>
<script type="text/javascript" src="../assets/color/colorUtil.js"></script>
<script type="text/javascript" src="../assets/color/getCanvasPixel.js"></script>
```

```css
canvas {cursor: crosshair;}
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
const radius = 128;
// 旋转角度
const rotation = -Math.PI;

const width = radius * 2;
const height = radius * 2;

let imageData;
let pixels;
let i = 0;
let R, G, B;


el.width = width;
el.height = height;

imageData = context.createImageData(width, height);
pixels = imageData.data;

for(let xy = 0, area = width * height; xy < area; xy++){
  let x = Math.floor(xy % width);
  let y = Math.floor(xy / height);
  let hue = ColorUtil.hueFromPosition(x, y);
  let rgb = ColorUtil.rgbFromHsv(hue, 1, 1);

  pixels[xy * 4 + 0] = rgb.R;
  pixels[xy * 4 + 1] = rgb.G;
  pixels[xy * 4 + 2] = rgb.B;
  pixels[xy * 4 + 3] = 0xFF;
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

const hexPicker = document.querySelector('#hex');
const rgbPicker = document.querySelector('#rgb');

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