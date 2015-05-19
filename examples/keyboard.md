# 键盘按键

```html
<div>你按下了: <span class="out"></span></div>
```

```js
const body = document.querySelector('body')
const out = document.querySelector('.out')

const keyArr = ['metaKey', 'altKey', 'ctrlKey', 'shiftKey'];

body.addEventListener('keydown', (event) => {
  event.preventDefault()

  let keyCombo = []

  keyArr.forEach(key => {
    if(event[key] === true){
      keyCombo.push('<code>' + key.substr(0, key.length - 3) + '</code>')
    }
  })

  let keyCode = event.which || event.keyCode

  keyCombo.push('<code>' + String.fromCharCode(keyCode) + '('+ keyCode + ')' + '</code>')

  out.innerHTML = keyCombo.join(' + ')
})
```