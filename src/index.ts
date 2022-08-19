import { calculateDistance } from "./helpers.js";
class Game {
  points: number;
  constructor(points = 100) {
    this.points = points;
  }
}

const game = new Game();
console.log(calculateDistance(10, 2));
