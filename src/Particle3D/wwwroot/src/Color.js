/// <reference path='../lib/requirejs/require.js' />
define(function( require, exports, module ) { "use strict";


var Color = function Color( value ) {
    /// https://zh.wikipedia.org/wiki/HSL%E5%92%8CHSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4
    this.value = value || 0;
}


Color.prototype.rgb = function ( r, g, b ) {
    this.value = ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | (b & 0xFF);
}


Color.prototype.hsv = function hsv( h, s, v ) {
    var h = Math.max(0, Math.min(h, 360)),
        s = Math.max(0, Math.min(s, 1)),
        v = Math.max(0, Math.min(v, 1));

    var hi = (h / 60 >> 0) % 6,
        fi = (h / 60) - hi;

    var p = v * (1 - s),
        q = v * (1 - fi * s),
        t = v * (1 - (1 - fi) * s);

    switch (hi) {
        case 0 :
            this.rgb(v * 0xFF, t * 0xFF, p * 0xFF);
            break;
        case 1 : 
            this.rgb(q * 0xFF, v * 0xFF, p * 0xFF);
            break;
        case 2 :
            this.rgb(p * 0xFF, v * 0xFF, t * 0xFF);
            break;
        case 3 :
            this.rgb(p * 0xFF, q * 0xFF, v * 0xFF);
            break;
        case 4 :
            this.rgb(t * 0xFF, p * 0xFF, v * 0xFF);
            break;
        case 5 :
            this.rgb(v * 0xFF, p * 0xFF, q * 0xFF);
            break;
        default:
            break;
    }
}


Color.prototype.toString = function toString () {
    return "0x" + this.value.toString(16);
}


Color.prototype.toHexString = function toHexString () {
    var r = this.r;
        r = ( r > 0x0F ? (r & 0xFF).toString(16) : "0" + (r & 0xFF).toString(16) );
    var g = this.g;
        g = ( g > 0x0F ? (g & 0xFF).toString(16) : "0" + (g & 0xFF).toString(16) );
    var b = this.b;
        b = ( b > 0x0F ? (b & 0xFF).toString(16) : "0" + (b & 0xFF).toString(16) );

    return "#" + (r + g + b);
}


Color.prototype.toRGBString = function toRGBString () {
    return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
}


Object.defineProperties(Color.prototype, {
    r: {
        enumerable: true,
        get: function () {
            return (this.value >> 16) & 0xFF;
        },

        set: function ( r ) {
            console.log(this);
            this.rgb(r, this.g, this.b);
        }
    },

    g: {
        get: function () {
            return (this.value >> 8) & 0xFF;
        },

        set: function ( g ) {
            this.rgb(this.r, g, this.b);
        }
    },

    b: {
        get: function () {
            return this.value & 0xFF;
        },

        set: function ( b ) {
            this.value = (this.r << 16) | (this.g << 8) | (b & 0xFF);
        }
    },

    h: {
        get: function () {
            var r = this.r / 255, 
                g = this.g / 255, 
                b = this.b / 255;

            var max = Math.max(r, g, b), 
                min = Math.min(r, g, b);

            if ( max == min )
                return 0;

            if ( max == r )
                if ( g >= b ) return 60 * (g - b) / (max - min); 
                else          return 60 * (g - b) / (max - min) + 360;

            if ( max == g )
                return 60 * (b - r) / (max - min) + 120;

            if ( max == b )
                return 60 * (r - g) / (max - min) + 240;

            return 0;
        },

        set: function ( h ) {
            this.hsv(h, this.s, this.v);
        }
    },

    s: {
        get: function () {
            var r = this.r / 255, 
                g = this.g / 255, 
                b = this.b / 255;

            var max = Math.max(r, g, b), 
                min = Math.min(r, g, b);

            if ( max == 0 ) 
                return 0;

            return 1 - (min / max);
        },

        set: function ( s ) {
            this.hsv(this.h, s, this.v);
        }
    },

    v: {
        get: function () {
            var r = this.r / 255, 
                g = this.g / 255, 
                b = this.b / 255;

            return Math.max(r, g, b);
        },

        set: function ( v ) {
            this.hsv(this.h, this.s, v);
        }
    }
});


return Color;
});