'use strict';
var sass = require('node-sass');

module.exports = function(code) {
  var cssCode = sass.renderSync({
    data: code,
    outputStyle: 'nested'
  })
  return String(cssCode.css);
};
