'use strict';

var body = document.querySelector('body');
var out = document.querySelector('.out');

var keyArr = ['metaKey', 'altKey', 'ctrlKey', 'shiftKey'];

body.addEventListener('keydown', function (event) {
  event.preventDefault();

  var keyCombo = [];

  keyArr.forEach(function (key) {
    if (event[key] === true) {
      keyCombo.push('<code>' + key.substr(0, key.length - 3) + '</code>');
    }
  });

  var keyCode = event.which || event.keyCode;

  keyCombo.push('<code>' + String.fromCharCode(keyCode) + '(' + keyCode + ')' + '</code>');

  out.innerHTML = keyCombo.join(' + ');
});