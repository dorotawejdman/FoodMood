import { calculateDistance } from "./helpers.js";
import * as PIXI from "../node_modules/pixi.js";

class Game {
  points: number;
  constructor(points = 100) {
    this.points = points;
  }
}
const app = new PIXI.Application();
const game = new Game();
console.log(calculateDistance(10, 2), app, "kefrrsccc");
