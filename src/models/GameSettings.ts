export class GameSettings {
  foodDropFreq: number;
  dropsPerLevel: number;
  constructor(foodDropFreq: number = 100, dropsPerLevel: number = 10) {
    this.foodDropFreq = foodDropFreq;
    this.dropsPerLevel = dropsPerLevel;
  }
}
