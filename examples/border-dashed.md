```html
<div class="wrap">
  <div></div>
  <div></div>
</div>
```

```css
.wrap{
  padding: 20px;
}
.wrap div {
  height: 200px;
  width: 200px;
  border-radius: 8px;
  border: 2px dashed #999;
  background-color: #fff;
  margin-top: 20px;
}
.wrap div:nth-child(2n){
  background-color: #eee;
}
```