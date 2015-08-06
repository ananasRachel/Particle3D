/// <reference path='../lib/requirejs/require.js' />
define(function( require, exports, module ) {


var Particle3D = function Particle3D( x, y, z, color, alpha ) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;

    this.vx = 0;
    this.vy = 0;
    this.vz = 0;

    this.dx = 0;
    this.dy = 0;
    this.dz = 0;

    this.color = color || 0;
    this.alpha = alpha || 255;
    this.angle = 0;
    this.delta = 0;
    this.life  = 1;
}


return Particle3D;
});