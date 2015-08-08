/// <reference path='../lib/requirejs/require.js' />
define(function( require, exports, module ) { "use strict";


var Utils = function Utils() {
    throw new Error("工具类无法创建实例对象。");
}


Utils.randomNoise = function randomNoise( canvas, x, y, w, h, a ) {
    var x = x || 0,
        y = y || 0,
        w = w || canvas.width,
        h = h || canvas.height,
        a = a || 0xFF,
        context = canvas.getContext("2d"),
        dataImg = context.getImageData(x, y, w, h),
        dataPix = dataImg.data;

    for ( var i = 0, n = dataPix.length; i < n; ) {
        dataPix[i++] = dataPix[i++] = dataPix[i++] = (Math.random() * 0xFF) >> 0;
        dataPix[i++] = a;
    }

    context.putImageData( dataImg, x, y );
    return canvas;
}


Utils.colorNoise = function colorNoise( canvas, x, y, w, h, a ) {
    var x = x || 0,
        y = y || 0,
        w = w || canvas.width,
        h = h || canvas.height,
        a = a || 0xFF,
        context = canvas.getContext("2d"),
        dataImg = context.getImageData(x, y, w, h),
        dataPix = dataImg.data;

    for ( var i = 0, n = dataPix.length; i < n; ) {
        dataPix[i++] = (Math.random() * 0xFF) >> 0;
        dataPix[i++] = (Math.random() * 0xFF) >> 0;
        dataPix[i++] = (Math.random() * 0xFF) >> 0;
        dataPix[i++] = a;
    }

    context.putImageData( dataImg, x, y );
    return canvas;
}


Utils.perlinNoise = function perlinNoise( canvas, noise ) {
    var noise = noise || Utils.randomNoise(Utils.createCanvas(canvas.width, canvas.height));
    var context = canvas.getContext("2d");
        context.save();

    var x = 0,
        y = 0;

    for ( var size = 4; size <= noise.width; size *= 2 ) {
        x = (Math.random() * (noise.width  - size)) >> 0;
        y = (Math.random() * (noise.height - size)) >> 0;

        context.globalAlpha = 4 / size;
        context.drawImage(noise, x, y, size, size, 0, 0, canvas.width, canvas.height);
    }

    context.restore();
    return canvas;
}


Utils.createCanvas = function createCanvas( width, height ) {
    var canvas = document.createElement("canvas");
        canvas.width  = width  || 0;
        canvas.height = height || 0;

    return canvas;
}


return Utils;
});