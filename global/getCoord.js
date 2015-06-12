"use strict";

var _getCoord = function getCoord(event) {
  if ("ontouchstart" in window) {
    // Mobile browsers.
    var pX = 0;
    var pY = 0;
    _getCoord = function (event) {
      var touches = event.changedTouches;
      if (touches && touches.length) {
        // ontouchstart + ontouchmove
        return {
          x: pX = touches[0].pageX,
          y: pY = touches[0].pageY
        };
      } else {
        // ontouchend
        return {
          x: pX,
          y: pY
        };
      }
    };
  } else if (typeof event.pageX !== "undefined" && typeof event.pageY !== "undefined") {
    // Desktop browsers.
    _getCoord = function (event) {
      return {
        x: event.pageX,
        y: event.pageY
      };
    };
  } else {
    // Internet Explorer <=8.0
    _getCoord = function (event) {
      event = event || window.event;
      return {
        x: event.clientX + document.documentElement.scrollLeft,
        y: event.clientY + document.documentElement.scrollTop
      };
    };
  }
  return _getCoord(event);
};

module.exports = _getCoord;