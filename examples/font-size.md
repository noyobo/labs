```html
<p class="f12">我是12PX</p>
<p class="f14">我是14PX</p>
<p class="f16">我是16PX</p>
<p class="f24">我是24PX</p>
<p class="f30">我是30PX</p>
<p class="f36">我是36PX</p>

<p><button>我是按钮</button></p>

<span class="btn"></span>
<br />
<span class="btn2x"></span>

```

```style
p{border: 1px solid #eee; padding: 10px;}
.f12{font-size: 12px;}
.f14{font-size: 14px;}
.f16{font-size: 16px;}
.f24{font-size: 24px;}
.f30{font-size: 30px;}
.f36{font-size: 36px;}

button{
  height: 36px;
  width: 120px;
  background-color: #f40;
  color: #fff;
  border: 1px solid #099;
  border-radius: 5px;
}

.btn, .btn2x{
  display: block;
  height: 40px;
  width: 40px;
}
.btn{
  background-image: url('../image/btn.png');
  background-repeat: no-repeat;
}
.btn2x{
  background-image: url('../image/btn@2x.png');
  background-repeat: no-repeat;
  background-size: 40px 40px;
}
```
