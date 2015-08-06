/// <reference path='../lib/requirejs/require.js' />
define(function( require, exports, module ) { "use strict";


var timeInit = 0;
var TimerRef = 
    /* 1: 使用 `window.performance` 获取双精度时间戳; */
    window.performance && (typeof window.performance.now == "function") ? window.performance
    /* 2: 使用 `Date.now()` 获取时间戳; */
    : Date;

function getTimer() {
    /// TODU: 确保第一次调用该函数时, 返回值: 0;
    return timeInit <= 0 ? 0 : TimerRef.now() - timeInt;
}


return getTimer;
});