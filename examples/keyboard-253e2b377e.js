/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5);


/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

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

/***/ }

/******/ });