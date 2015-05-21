let ColorUtil = {

  // 根据 XY 坐标获取  HUE 色相值 (角度)
  hueFromPosition(x, y) {
    let deg;
    deg = Math.atan2(y - radius, x - radius) - rotation;
    deg *= 180 / Math.PI;
    return (deg + 360) % 360;
  },

  // 转换 HSV 为 RGB
  rgbFromHsv(h, s, v) {
    let c, i, f, p, q, t;
    let R, G, B;
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
    R = ~~(R * 0xFF);
    G = ~~(G * 0xFF);
    B = ~~(B * 0xFF);
    return {
      R, G, B
    };
  }
}
