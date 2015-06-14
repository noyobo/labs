# A collections of backdrop filters

> https://developer.apple.com/library/safari/releasenotes/General/WhatsNewInSafari/Articles/Safari_9.html#//apple_ref/doc/uid/TP40014305-CH9-SW5

```html
<div class="row">
  <div class="col-md-4">
    <div class="drop"><span></span></div>
  </div>
  <div class="col-md-4">
    <div class="drop"><span></span></div>
  </div>
  <div class="col-md-4">
    <div class="drop"><span></span></div>
  </div>
</div>
```

```css
.drop{
  width: 100%;
  height: 200px;
  padding: 10px 0;
  background: url('https://cloud.githubusercontent.com/assets/1292082/8146794/60982988-127f-11e5-8bfe-65b1d857ce64.jpg') no-repeat 0 0;
  background-size: cover;
  position: relative;
  list-style: none;
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgba(0,0,0,.5);
}

.drop span{
  position: absolute;
  width: 80%;
  height: 38px;
  top: 80px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border: 1px solid #fff;
  backdrop-filter: blur(10px);
}
```