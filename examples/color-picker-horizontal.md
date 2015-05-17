# canvas color picker 色条 (6色相)

```html
<div>
  <div class="canvas-warp"><canvas id="panel"></canvas></div>
</div>
<div class="clearfix"></div>
<br/>
<div id="hex" class="colorPicker"></div>
<div id="rgb" class="colorPicker"></div>
<script type="text/javascript" src="../assets/colorwheel/getCanvasPickerColor.js"></script>
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
var el = document.querySelector('#panel');
var context = el.getContext('2d');
var width = el.width;
var height = el.height;
var imageData;
var pixels;
var i = 0;
var x, y;
var R, G, B;
var width = 360;
var height = 100;

var sat, lightness, pos, w, v, l, increase, reduce;
var satRange = width / 6;
el.width = width;
el.height = height;

imageData = context.createImageData(width, height);
pixels = imageData.data;

for (y = 0; y < height; y++) {
  for (x = 0; x < width; x++, i += 4) {
    lightness =  y / height          // 亮度
    sat = (x % satRange) / satRange  // 饱和度 0~1
    pos = Math.floor(x / satRange)   // 色相区域

    w = 255 * sat               // 颜色加深
    v = 255 * (1 - sat)         // 颜色变浅
    l = 255 * lightness

    increase = v * lightness // 加色
    reduce   = w * lightness   // 减色

    w = w + increase
    v = v + reduce

    R = [255, v,   l,   l,   w,   255][pos]
    G = [l,   l,   w,   255, 255, v  ][pos]
    B = [w,   255, 255, v,   l,   l  ][pos]

    pixels[i] = R
    pixels[i + 1] = G
    pixels[i + 2] = B
    pixels[i + 3] = 255

  }
}

context.putImageData(imageData, 0, 0);

var hexPicker = document.querySelector('#hex');
var rgbPicker = document.querySelector('#rgb');

// 绑定获取面板颜色事件
getCanvasPickerColor('#panel', function(data) {
  hexPicker.style.backgroundColor = data.hex;
  hexPicker.style.color = data.chex;
  hexPicker.innerHTML = data.hex.toUpperCase();
  rgbPicker.style.backgroundColor = data.hex;
  rgbPicker.style.color = data.chex;
  rgbPicker.innerHTML = [data.rgb.R,data.rgb.G, data.rgb.B].join(',');
})
```