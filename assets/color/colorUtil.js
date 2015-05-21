"use strict";

var ColorUtil = {

  // 根据 XY 坐标获取  HUE 色相值 (角度)
  hueFromPosition: function hueFromPosition(x, y) {
    var deg = undefined;
    deg = Math.atan2(y - radius, x - radius) - rotation;
    deg *= 180 / Math.PI;
    return (deg + 360) % 360;
  },

  // 转换 HSV 为 RGB
  rgbFromHsv: function rgbFromHsv(h, s, v) {
    var c = undefined,
        i = undefined,
        f = undefined,
        p = undefined,
        q = undefined,
        t = undefined;
    var R = undefined,
        G = undefined,
        B = undefined;
    if (s === 0) {
      R = G = B = v;
    } else {
      h = (h + 360) % 360;
      c = v * s;
      h /= 60;
      i = Math.floor(h);
      f = h - i;
      p = v * (1 - s);
      q = v * (1 - s * f);
      t = v * (1 - s * (1 - f));

      R = [v, q, p, p, t, v][i];
      G = [t, v, v, q, p, p][i];
      B = [p, p, t, v, v, q][i];
    }
    R = ~ ~(R * 255);
    G = ~ ~(G * 255);
    B = ~ ~(B * 255);
    return {
      R: R, G: G, B: B
    };
  }
};