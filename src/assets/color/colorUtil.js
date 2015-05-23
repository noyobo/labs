module.exports = {

  // 根据 XY 坐标获取  HUE 色相值 (角度)
  hueFromPosition(x, y, radius = 150, rotation = 0) {
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
      R = Math.floor(R * 0xFF);
      G = Math.floor(G * 0xFF);
      B = Math.floor(B * 0xFF);
      return {
        R, G, B
      };
    },
    rgbFromPixel(pixel) {
      var r = pixel[0];
      var g = pixel[1];
      var b = pixel[2];
      var alpha = pixel[3];

      return {
        R: r,
        G: g,
        B: b,
        A: alpha
      }
    },

    // http://www.javascripter.net/faq/rgbtohex.htm
    hexFromRgb(rgb) {
      return '#' + this.hexFromDec(rgb.R) + this.hexFromDec(rgb.G) + this.hexFromDec(rgb.B)
    },

    hexFromDec(n) {
      n = parseInt(n, 10);
      if (isNaN(n)) {
        return '00'
      }
      n = Math.max(0, Math.min(n, 255));
      return '0123456789ABCDEF'.charAt((n - n % 16) / 16) + '0123456789ABCDEF'.charAt(n % 16);
    },

    complimentaryColor(rgb) {
      return {
        R: 255 - rgb.R,
        G: 255 - rgb.G,
        B: 255 - rgb.B
      }
    }
}
