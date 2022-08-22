export class GameSettings {
  foodDropFreq: number;
  dropsPerLevel: number;
  startHP: number;
  constructor(foodDropFreq: number = 100, dropsPerLevel: number = 20, startHP = 10) {
    this.foodDropFreq = foodDropFreq;
    this.dropsPerLevel = dropsPerLevel;
    this.startHP = startHP;
  }
}
