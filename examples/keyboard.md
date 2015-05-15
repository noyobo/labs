# 键盘按键

```html
<div>你按下了: <span class="out"></span></div>
```

```js
var body = document.querySelector('body')
var out = document.querySelector('.out')
body.addEventListener('keydown', function(event){
  event.preventDefault()

  var keyArr = ['metaKey', 'altKey', 'ctrlKey', 'shiftKey']
  var keyCombo = []
  keyArr.forEach(function(key){
    if(event[key] === true){
      keyCombo.push('<code>' + key.substr(0, key.length - 3) + '</code>')
    }
  })

  var keyCode = event.which || event.keyCode

  keyCombo.push('<code>' + String.fromCharCode(keyCode) + '('+ keyCode + ')' + '</code>')

  out.innerHTML = keyCombo.join(' + ')

})
```