/// <reference path='../lib/requirejs/require.js' />
define(function( require, exports, module ) { "use strict";


var ColorTransform = function ColorTransform( rm, gm, bm, am, ro, go, bo, ao ) {
    this.rm = ((rm === null || typeof rm == "undefined") ? 1 : rm);
    this.gm = ((gm === null || typeof gm == "undefined") ? 1 : gm);
    this.bm = ((bm === null || typeof bm == "undefined") ? 1 : bm);
    this.am = ((am === null || typeof am == "undefined") ? 1 : am);
    this.ro = ro || 0;
    this.go = go || 0;
    this.bo = bo || 0;
    this.ao = ao || 0;
}


ColorTransform.prototype.apply = function apply( data ) {
    for ( var i = 0; i < data.length; i += 4 ) {
        data[i + 0] = (this.rm * data[i + 0] + this.ro) & 0xFF;
        data[i + 1] = (this.gm * data[i + 1] + this.go) & 0xFF;
        data[i + 2] = (this.bm * data[i + 2] + this.bo) & 0xFF;
        data[i + 3] = (this.am * data[i + 3] + this.ao) & 0xFF;
    }
}


return ColorTransform;
});