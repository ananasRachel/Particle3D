/// <reference path='../lib/requirejs/require.js' />
define(function( require, exports, module ) { "use strict";


var Bresenham = function Bresenham() {
    throw new Error("工具类无法创建实例。");
}


Bresenham.draw = function draw( dataImg, x0, y0, x1, y1, color, alpha ) {
    var sp = Math.abs(y1 - y0) > Math.abs(x1 - x0);

    if ( sp ) {
        /// 交换 `x0|y0`
        x0 ^= y0;
        y0 ^= x0;
        x0 ^= y0;
        /// 交换 `x1|y1`
        x1 ^= y1;
        y1 ^= x1;
        x1 ^= y1;
    }

    if ( x0 > x1 ) {
        /// 交换 `x0|x1`
        x0 ^= x1;
        x1 ^= x0;
        x0 ^= x1;
        /// 交换 `y0|y1`
        y0 ^= y1;
        y1 ^= y0;
        y0 ^= y1;
    }

    var dx = x1 - x0,
        dy = Math.abs(y1 - y0);

    var e = dx * 0.5,
        s = y0 < y1 ? 1 : -1;

    for ( var x = x0, y = y0; x < x1; ++x ) {
        sp ? Bresenham.plot(dataImg, y, x, color, alpha) : Bresenham.plot(dataImg, x, y, color, alpha);
        e -= dy;
        e < 0 && (y += s, e += dx);
    }
}


Bresenham.plot = function plot( dataImg, x, y, color, alpha ) {
    var i = (x + (dataImg.width * y)) << 2;
    var data = dataImg.data;

    data[i + 0] = (color >> 16) & 0xFF;
    data[i + 1] = (color >> 8 ) & 0xFF;
    data[i + 2] = (color >> 0 ) & 0xFF;
    data[i + 3] = (alpha      ) & 0xFF;
}


return Bresenham;
});