/// <reference path='../lib/requirejs/require.js' />
define(function( require, exports, module ) { "use strict";
var Particle3D = require("./Particle3D");
var Bresenham = require("./Bresenham");
var Color = require("./Color");


var World = function World( canvas, context ) {
    this.canvas = canvas;
    this.context = context;
    this.bitmapdata = null;
    this.length = 0;
    this.particles = [];
    this.scaleOfVector = 1;
    this.focusLength = 8000;
    this.zNear = 0;
    this.zFar  = 0;
    this.xOrigin = this.canvas.width  * 0.5;
    this.yOrigin = this.canvas.height * 0.5;
    this.vertices = [];
    this.index = 0;
    this.radius = 200;
    this.color = new Color();
    this.create3DModel();
}


World.prototype.clear = function clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}


World.prototype.renden = function renden( time ) {
    this.bitmapdata = this.context.createImageData(this.canvas.width, this.canvas.height);
    this.update(time);
    this.context.putImageData(this.bitmapdata, 0, 0);
}


World.prototype.create3DModel = function create3DModel() {
    var a = 0, b = 0, n = 120;
    var PI2 = 2 * Math.PI;
    var dot = null;

    for ( var i = 0; i < n; ++i )
    for ( var j = 0; j < n; ++j ) {
        a = i * PI2 / n;
        b = j * PI2 / n;
        this.vertices.push( Math.cos(a) * 0.1, Math.sin(a) * Math.cos(b), Math.sin(a) * Math.sin(b) );
    }
}


World.prototype.factor = function factor( size, time ) {
    var x  = 0,
        y  = 0,
        z  = 0,
        dot  = null,
        len  = this.vertices.length / 3;
    var tx = 0,
        ty = 0,
        tz = 0;
    
    for ( var i = 0; i < size; ++i, ++this.index ) {
        this.color.hsv( (this.index * 0.05) % 360, 0.5, 1);
        this.index = (len + (this.index % len)) % len;

        x = this.vertices[this.index * 3 + 0];
        y = this.vertices[this.index * 3 + 1];
        z = this.vertices[this.index * 3 + 2];

        this.particles[this.length++] = new Particle3D(this.radius * y, this.radius * x, this.radius * z, this.color.value, 0xFF);;
    }
}


World.prototype.update = function update( time ) {
    var dot = null,
        tmp = null;

    var sa = 0, // 透视缩放比例；

        dx = 0, // 原始 3D 位置；
        dy = 0, 
        dz = 0,

        sx = 0, // 原始 3D 位置投影；
        sy = 0,

        ex = 0, // 新 3D 位置投影；
        ey = 0;

    var sin = Math.sin(time * 0.5),
        cos = Math.cos(time * 0.5);
        
    for ( var i = 0; i < this.length; ++i ) {
        dot = this.particles[i];
        /// 1，记录粒子的原始坐标；
        dx = dot.x;
        dy = dot.y;
        dz = dot.z;

        /// 2，叠加作用力，并更新粒子位置；
        dot.clearForce();
        dot.force(dot.x * -0.5, dot.z * -0.25, dot.z * -0.5);
        dot.update(time);

        /// 旋转;
        dot.x = (dot.x * cos - dot.z * sin);
        dot.z = (dot.x * sin + dot.z * cos)


        /// 3，原始 3D 位置投影；
        sa = this.focusLength / (this.focusLength + dz + this.zNear);
        sx = (dot.x - (dot.x - dx) * this.scaleOfVector) * sa;
        sy = (dot.y - (dot.y - dy) * this.scaleOfVector) * sa;

        /// 4，更新后 3D 位置投影；
        sa = this.focusLength / (this.focusLength + dot.z + this.zNear);
        ex = dot.x * sa;
        ey = dot.y * sa;
        

        /// 5，在原始位置投影以及新位置投影之间连线，用于显示速度向量的方向和大小；
        Bresenham.draw(this.bitmapdata, 
            Math.round(this.xOrigin + sx), Math.round(this.yOrigin + sy), 
            Math.round(this.xOrigin + ex), Math.round(this.yOrigin + ey), dot.color, dot.alpha);

        
        /// 6，粒子生命为 0 时，从渲染队列中删除该粒子；
        if ( dot.life <= 0 ) {
            /// TODU: 因为数组的顺序不影响粒子渲染，所以使用交换要删除的粒子和数组中最后一个粒子的索引
            /// 的方法效率远远优于 `Array.splice()` 方法；
            this.length -= 1;

            if ( i != this.length ) {
                /// TODU: 如果被删除的索引是数组中的最后一个有效索引，则只需要重定 `length` 指针；
                this.particles[i] = this.particles[this.length];
                this.particles[this.length] = null;
            }
        }
    }
}


return World;
});