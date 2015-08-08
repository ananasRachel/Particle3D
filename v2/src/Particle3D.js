/// <reference path='../lib/requirejs/require.js' />
define(function( require, exports, module ) { "use strict";


var Particle3D = function Particle3D( x, y, z, color, alpha ) {
    this.x = x || 0; // 位置
    this.y = y || 0;
    this.z = z || 0;

    this.vx = 0; // 速度;
    this.vy = 0;
    this.vz = 0;

    this.ax = 0; // 加速度;
    this.ay = 0;
    this.az = 0;

    this.fx = 0;
    this.fy = 0;
    this.fz = 0;


    this.color = color || 0; // 颜色&不透明度;
    this.alpha = alpha || 255;

    this.life   = 1; // 生命周期;
    this.energy = 0.1;
}


Particle3D.prototype.clearForce = function clearForce() {
    this.fx = 0;
    this.fy = 0;
    this.fz = 0;
}


Particle3D.prototype.force = function force( fx, fy, fz ) {
    this.fx += fx;
    this.fy += fy;
    this.fz += fz;
}


Particle3D.prototype.update = function update( time ) {
    /// TODU: 将加速度应用至速度；
    this.vx += (this.ax + this.fx) * time;
    this.vy += (this.ay + this.fy) * time;
    this.vz += (this.az + this.fz) * time;

    /// TODU: 将速度应用至位置；
    this.x += this.vx * time;
    this.y += this.vy * time;
    this.z += this.vz * time;

    /// TODU: 更新生命周期；
    this.life = Math.max(0, this.life - this.energy * time);
    this.alpha = this.life * 0xFF;
}


return Particle3D;
});