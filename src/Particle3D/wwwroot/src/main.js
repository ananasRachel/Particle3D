/// <reference path='../lib/requirejs/require.js' />
define(function( require, exports, module ) { "use strict";
var Color = require("./Color");



/// TestColor;
var color = new Color();

    color.hsv(0, 1, 1); 
    console.log( color.toString() );

    //color.hsv(120, 0.5, 1); 
    console.log( color.toString() );

    //color.hsv(240, 1, 0.5); 
    console.log( color.toString() );

    //color.hsv(300, 1, 0.5); 
    console.log( color.toString() );
    console.log( "xxxxxxx:", color.toHexString() );
    console.log( "xxxxxxx:", color.toRGBString() );

document.body.style.background = color.toHexString();














});