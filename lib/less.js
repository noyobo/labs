'use strict';
var Less = require('less');

// var cssCode = 


module.exports = function(code) {
  return Less.render(code);
};
