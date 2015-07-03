# Input Color Object

```html
<div style="padding:20px;">
  <input id="color" type="color" value="#FF0000" />
  <input id="outer" type="text" value="#FF0000">
</div>
```

```js
var color = document.getElementById('color');
var outer = document.getElementById('outer');

color.addEventListener('change', function(event){
  outer.value = color.value.toUpperCase();
})
```