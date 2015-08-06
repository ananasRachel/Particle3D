/// <reference path='../lib/requirejs/require.js' />
define(function( require, exports, module ) { "use strict";
var Color = require("./Color");
var Utils = require("./Utils");
var Bresenham = require("./Bresenham");
var getTimer = require("./getTimer");


/// 舞台对象;
var stage = document.createElement("canvas");
var stageContext = stage.getContext("2d");


/// 舞台大小;
stage.width  = document.body.clientWidth;
stage.height = document.body.clientHeight;

var mouseX = 0;
var mouseY = 0;
var canvas = Utils.createCanvas(stage.width, stage.height);
var canvasContext = canvas.getContext("2d");


stage.addEventListener("mousedown", function( evt ) {
    if ( mouseX <= 0 && mouseY <= 0 ) {
        mouseX = evt.clientX;
        mouseY = evt.clientY;
    }
    else {
        var dataImg = stageContext.getImageData(0, 0, stage.width, stage.height); 
        var color = (Math.random() * 0xFFFFFF) & 0xFFFFFF;
        var alpha = 0xFF;

        Bresenham.draw(dataImg, mouseX, mouseY, mouseX = evt.clientX, mouseY = evt.clientY, color, alpha);
        stageContext.putImageData(dataImg, 0, 0);
    }
});

console.log( getTimer() );













/// 将舞台对象加入 `DOM` 显示对象列表;
document.body.appendChild(stage);
});