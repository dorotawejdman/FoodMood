import { DEFAULT_DROPS_PER_LVL, DEFAULT_START_HP, DEFAULT_FOOD_DROP_PERIOD } from "../composables/Constants";

export class GameSettings {
  public foodDropPeriod: number;
  private _dropsPerLevel: number;
  private _startHP: number;

  constructor(dropsPerLevel: number = DEFAULT_DROPS_PER_LVL, startHP = DEFAULT_START_HP) {
    this.foodDropPeriod = DEFAULT_FOOD_DROP_PERIOD;
    this._dropsPerLevel = dropsPerLevel;
    this._startHP = startHP;
  }

  public get dropsPerLevel() {
    return this._dropsPerLevel;
  }

  public get startHP() {
    return this._startHP;
  }
}
