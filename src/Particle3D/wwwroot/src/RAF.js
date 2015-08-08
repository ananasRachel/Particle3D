/// <reference path='../lib/requirejs/require.js' />
define(function( require, exports, module ) { "use strict";


var renden = 
    window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.msRequestAnimationFrame     ||
    window.oRequestAnimationFrame      || (function ( callback ) {
    /// requestAnimationFrame polyfill by Erik Möller
    /// fixes from Paul Irish and Tino Zijdel
    /// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    /// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
        var currTime = +(new Date);
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var handle = setTimeout(function() { callback(currTime + timeToCall); },
            timeToCall);
        lastTime = currTime + timeToCall;
        return handle;
    });


var cancel =
    window.cancelAnimationFrame              ||
    window.webkitCancelAnimationFrame        ||
    window.mozCancelAnimationFrame           ||
    window.msCancelAnimationFrame            ||
    window.oCancelAnimationFrame             ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame    ||
    window.msCancelRequestAnimationFrame     ||
    window.oCancelRequestAnimationFrame      || 
    window.clearTimeout;


var lastTime = 0;
return { "renden": renden, "cancel": cancel };
});