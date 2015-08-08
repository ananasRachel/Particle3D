/// <reference path='../lib/requirejs/require.js' />
/// <reference path='../lib/stackblur/StackBlur.js' />
define(function( require, exports, module ) { "use strict";
var Color = require("./Color");
var Utils = require("./Utils");
var Bresenham = require("./Bresenham");
var World = require("./World");
var Matrix = require("./Matrix");
var ColorTransform = require("./ColorTransform");
var getTimer = require("./getTimer");
var renden = require("./RAF").renden;
var cancel = require("./RAF").cancel;


/// 舞台对象;
var scale = 4;
var composite  = "lighter"; 
var stage = Utils.createCanvas(400, 400);
//var stage = Utils.createCanvas(300, 300);
var stageContext = stage.getContext("2d");

var canvas = Utils.createCanvas(stage.width, stage.height);
var canvasContext = canvas.getContext("2d");

var spark = Utils.createCanvas(stage.width / scale, stage.height / scale);
var sparkContext = spark.getContext("2d");
var sparkMatrix  = new Matrix(1 / scale, 0, 0, 1 / scale, 0, 0);
var sparkMatrix2 = sparkMatrix.scale(4 * scale, 4 * scale);

var after = Utils.createCanvas(stage.width * 2 / scale, stage.height * 2 / scale);
var afterContext = after.getContext("2d");
var afterMatrix  = new Matrix(2 / scale, 0, 0, 2 / scale, 0, 0);
var afterMatrix2 = afterMatrix.scale(1 * scale, 1 * scale);
var afterFactor = 1 - 0.025;
var afterTransform = new ColorTransform(afterFactor, afterFactor, afterFactor, 1, 0, 0, 0, 0);


/// 渲染；
var total  = 0;
var update = 0;
var world  = new World(canvas, canvasContext);


function stageRendener( time ) {
    var time = getTimer();
    var lost = time - update; update = time; total += lost;
    var afterImg = null;
    
    /// TODU: 渲染粒子；
    world.clear();
    world.factor(15, total * 0.001);
    world.renden(lost * 0.001);

    /// TODU: 闪烁光效；
    sparkContext.clearRect(0, 0, spark.width, spark.height);
    sparkContext.save();
    sparkContext.setTransform(sparkMatrix.a, sparkMatrix.b, sparkMatrix.c, sparkMatrix.d, sparkMatrix.tx, sparkMatrix.ty);
    sparkContext.drawImage(canvas, 0, 0);
    sparkContext.restore();

    /// TODU: 背景光效；
    afterContext.save();
    afterContext.globalCompositeOperation = composite;
    afterContext.setTransform(afterMatrix.a, afterMatrix.b, afterMatrix.c, afterMatrix.d, afterMatrix.tx, afterMatrix.ty);
    afterContext.drawImage(canvas, 0, 0);
    afterContext.restore();
    

    


    /// TODU: 背景颜色加暗；
    afterImg = afterContext.getImageData(0, 0, after.width, after.height);
    afterTransform.apply(afterImg.data);
    afterContext.putImageData(afterImg, 0, 0);

    /// TODU: 背景应用模糊滤镜
    stackBlurCanvasRGB(after, 0, 0, after.width, after.height, 1);

    
    /// TODU: 图层混合；
    stageContext.clearRect(0, 0, stage.width, stage.height);
    stageContext.save();
    stageContext.globalCompositeOperation = composite;
    stageContext.setTransform(afterMatrix2.a, afterMatrix2.b, afterMatrix2.c, afterMatrix2.d, afterMatrix2.tx, afterMatrix2.ty);
    stageContext.drawImage(after, 0, 0);
    stageContext.setTransform(1, 0, 0, 1, 0, 0);
    stageContext.drawImage(canvas, 0, 0);
    stageContext.setTransform(sparkMatrix2.a, sparkMatrix2.b, sparkMatrix2.c, sparkMatrix2.d, sparkMatrix2.tx, sparkMatrix2.ty);
    stageContext.drawImage(spark, 0, 0);
    stageContext.restore();

    /// 测试标签；
    //canvasContext.fillStyle = "#fff";
    //canvasContext.fillText("canvas", 10, 20);
    //stageContext.fillStyle = "#fff";
    //stageContext.fillText("stage", 10, 20);

    /// TODU: 执行下次渲染；
    handle = renden(stageRendener);
}














/// 将舞台对象加入 `DOM` 显示对象列表;
spark.style.width  = stage.width  + "px";
spark.style.height = stage.height + "px";
canvas.style.width  = stage.width  + "px";
canvas.style.height = stage.height + "px";
after.style.width  = stage.width  + "px";
after.style.height = stage.height + "px";
document.body.appendChild(stage);
document.body.appendChild(canvas);
document.body.appendChild(spark);
document.body.appendChild(after);
//document.body.style.background = "#f5f5f5";




/// 开启/关闭渲染；
var isRendening = true;
var handle = renden(stageRendener);

stage.addEventListener("click", function( evt ) {
    isRendening = !isRendening;

    if ( isRendening ) {
        update = getTimer();
        handle = renden(stageRendener);

    } 
    else {
        cancel(handle);
    }
});
});