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
    this.scaleOfVector = 2;
    this.focusLength = 800;
    this.zNear = 0;
    this.zFar  = 0;
    this.xOrigin = this.canvas.width  * 0.5;
    this.yOrigin = this.canvas.height * 0.5;
}


World.prototype.clear = function clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}


World.prototype.renden = function renden( time ) {
    this.bitmapdata = this.context.createImageData(this.canvas.width, this.canvas.height);
    this.update(time);
    this.context.putImageData(this.bitmapdata, 0, 0);
}


World.prototype.factor = function factor( size, seed ) {
    var color = null;
    var radius = 100;
    var dot = null;
    var x = 0,
        y = -20,  
        z = 0;

    for ( var i = 0; i < size; ++i ) {
        seed = (seed * 60 + i);
        color = new Color();
        color.hsv(0, 1, 1);

        x = Math.sin((seed % 360) * Math.PI / 180) * radius;
        z = Math.cos((seed % 360) * Math.PI / 180) * radius;

        dot = new Particle3D(0, 0, 0, color);
        dot.vx = 300 - Math.random() * 600;
        dot.vy = 300 - Math.random() * 600;
        dot.vz = 300 - Math.random() * 600;


        this.particles[this.length++] = dot;
    }
}


World.prototype.update = function update( time ) {
    var dot = null,
        tmp = null,
        len = 0;

    var sa = 0, // 透视缩放比例；

        dx = 0, // 原始 3D 位置；
        dy = 0, 
        dz = 0,

        sx = 0, // 原始 3D 位置投影；
        sy = 0,

        ex = 0, // 新 3D 位置投影；
        ey = 0;

    for ( var i = 0; i < this.length; ++i ) {
        dot = this.particles[i];
        /// 1，记录粒子的原始坐标；
        dx = dot.x;
        dy = dot.y;
        dz = dot.z;

        /// 2，叠加作用力，并更新粒子位置；
        //dot.clearForce();

        //dot.force(0, this.gravity, 0); // 重力加速度；

        dot.update(time);

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
            Math.round(this.xOrigin + ex), Math.round(this.yOrigin + ey), dot.color.value, dot.alpha);


        /// 6，粒子生命为 0 时，从渲染队列中删除该粒子；
        if ( dot.life <= 0 ) {
            /// TODU: 因为数组的顺序不影响粒子渲染，所以使用交换要删除的粒子和数组中最后一个粒子的索引
            /// 的方法效率远远优于 `Array.splice()` 方法；
            this.length = len = this.length - 1;

            if ( i != len ) {
                /// TODU: 如果被删除的索引是数组中的最后一个有效索引，则只需要重定 `length` 指针；
                tmp = this.particles[len];

                this.particles[len] = this.particles[i];
                this.particles[i  ] = tmp;
            }
        }
    }
}


return World;
});