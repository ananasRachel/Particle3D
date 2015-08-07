/// <reference path='../lib/requirejs/require.js' />
define(function( require, exports, module ) { "use strict";


var Matrix = function Matrix( a, b, c, d, tx, ty ) {
    this.a = a || 1;
    this.b = b || 0;
    this.c = c || 0;
    this.d = d || 1;
    this.tx = tx || 0;
    this.ty = ty || 0;
}


Matrix.prototype.normal = function normal() {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.tx = 0;
    this.ty = 0;
}


Matrix.prototype.scale = function scale( xfactor, yfactor ) {
    return new Matrix(this.a * xfactor, this.b, this.c, this.d * yfactor, this.tx, this.ty);
}


return Matrix;
});