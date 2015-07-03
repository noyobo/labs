```html
<div class="wrap">
  <div></div>
  <div></div>
</div>
```

```css
.wrap{
  padding: 20px;
  div {
    height: 150px;
    width: 150px;
    border-radius: 8px;
    border: 1px dashed #999;
    background-color: #fff;
    margin-top: 20px;
    &:nth-child(2n){
      background-color: #eee;
    }
  }
}
```
