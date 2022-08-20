"use strict";
exports.__esModule = true;
var helpers_js_1 = require("./helpers.js");
var PIXI = require("../node_modules/pixi.js");
// import { Application } from '@pixi/app';
var Game = /** @class */ (function () {
    function Game(points) {
        if (points === void 0) { points = 100; }
        this.points = points;
    }
    return Game;
}());
var app = new PIXI.Application();
var game = new Game();
console.log((0, helpers_js_1.calculateDistance)(10, 2));
