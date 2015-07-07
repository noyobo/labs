# mobile response 响应式布局笔记

```html
<p class="f12">我是12PX</p>
<p class="f14">我是14PX</p>
<p class="f16">我是16PX</p>
<p class="f24">我是24PX</p>
<p class="f30">我是30PX</p>
<p class="f36">我是36PX</p>

```

## CSS media query

换算公式: `deviceWidth / 320 * 100px`

> tools: https://offroadcode.com/prototypes/rem-calculator/

```style
/* 320px布局 */
html{font-size: 100px;}
body{font-size: 0.14rem /*实际相当于14px*/}

/* iphone 6 */
@media (min-device-width : 375px) and (max-device-width : 667px) and (-webkit-min-device-pixel-ratio : 2){
    html{font-size: 117.1875px;}
}
/* iphone6 plus */
@media (min-device-width : 414px) and (max-device-width : 736px) and (-webkit-min-device-pixel-ratio : 3){
    html{font-size: 129.375px;}
}

p{border: 1px solid #eee; padding: 0.1rem;}
.f12{font-size: 0.12rem;}
.f14{font-size: 0.14rem;}
.f16{font-size: 0.16rem;}
.f24{font-size: 0.24rem;}
.f30{font-size: 0.30rem;}
.f36{font-size: 0.36rem;}

```

## JavaScript response gist

```javascript
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
        };

    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
```

## background-image response 

> http://bjango.com/articles/min-device-pixel-ratio/

```css
.css {
  background-image: url(img@1x.png);
}

@media only screen and(-webkit-min-device-pixel-ratio: 2) {
  .css {
    background-image: url(img@2x.png);
  }
}
@media only screen and(-webkit-min-device-pixel-ratio: 3) {
  .css {
    background-image: url(img@3x.png);
  }
}

```

## reference

* http://www.zhangxinxu.com/wordpress/2012/08/window-devicepixelratio/
