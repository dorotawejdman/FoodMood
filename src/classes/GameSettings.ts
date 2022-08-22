import { DEFAULT_DROPS_PER_LVL, DEFAULT_START_HP, DEFAULT_FOOD_DROOP_PERIOD } from "../composables/Constants";

export class GameSettings {
  foodDropPeriod: number;
  dropsPerLevel: number;
  startHP: number;

  constructor(dropsPerLevel: number = DEFAULT_DROPS_PER_LVL, startHP = DEFAULT_START_HP) {
    this.foodDropPeriod = DEFAULT_FOOD_DROOP_PERIOD;
    this.dropsPerLevel = dropsPerLevel;
    this.startHP = startHP;
  }
}
