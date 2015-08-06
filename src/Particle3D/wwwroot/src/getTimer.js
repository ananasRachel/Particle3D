/// <reference path='../lib/requirejs/require.js' />
define(function( require, exports, module ) { "use strict";
var TimerRef = 
    /* 1: 使用 `window.performance` 获取双精度时间戳; */
    window.performance && (typeof window.performance.now == "function") ? window.performance
    /* 2: 使用 `Date.now()` 获取时间戳; */
    : Date;

var timeInt = TimerRef.now();


function getTimer() {
    return TimerRef.now() - timeInt;
}


return getTimer;
});