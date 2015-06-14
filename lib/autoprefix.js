'use strict';

var autoprefixer = require('autoprefixer-core');
var postcss = require('postcss');
var processor = postcss([autoprefixer]);

module.exports = function(code) {
  return processor.process(code).css
}
