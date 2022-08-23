import { Container, Texture } from "pixi.js";
import { Food } from "./Food";
import { calculateDistance } from "../composables/game-helpers";
import { Player } from "./Player";
import { GameSettings } from "./GameSettings";
import { DEFAULT_FOOD_DROP_PERIOD, FOOD_DROP_PERIOD_STEP, MINIMUM_FOOD_DROP_PERIOD } from "../composables/Constants";
import { PlayerTextures } from "../models/PlayerTextures";

export class Game {
  private settings: GameSettings;
  private _score: number;
  private _level: number;
  private _hp: number;
  private player: Player;
  private foodTextures: Texture[];
  private stage: Container;
  private foodContainer: Container;
  private _record: number;

  constructor(stage: Container, foodTextures: Texture[], playerTextures: PlayerTextures, settings = new GameSettings()) {
    this.settings = settings;
    this._hp = settings.startHP;
    this._level = 1;
    this._score = 0;
    this._record = 0;
    this.stage = stage;
    this.foodTextures = foodTextures;
    this.createFoodContainer();
    this.createPlayer(playerTextures);
  }

  get score() {
    return this._score;
  }

  get level() {
    return this._level;
  }

  get hp() {
    return this._hp;
  }

  get record() {
    return this._record;
  }

  private createFood() {
    const food = new Food(this.foodTextures, this._level);
    this.foodContainer.addChild(food);
  }

  private createFoodContainer() {
    this.foodContainer = new Container();
    this.stage.addChild(this.foodContainer);
  }

  private createPlayer(playerTextures: PlayerTextures) {
    this.player = new Player(playerTextures, "Player1");
    this.stage.addChild(this.player);
  }

  private decreaseFoodPeriod() {
    if (this.settings.foodDropPeriod > MINIMUM_FOOD_DROP_PERIOD) {
      this.settings.foodDropPeriod -= FOOD_DROP_PERIOD_STEP;
    }
  }

  private levelUp() {
    this._level += 1;
    this.decreaseFoodPeriod();
  }

  private removeHP() {
    this._hp -= 1;
    this.hp == 0 && this.gameOver();
  }

  private moveFoods() {
    this.foodContainer.children.forEach((food: Food) => food.move());
  }

  private handleFoods(loopStepId: number) {
    const isTimeForFoodDrop = loopStepId % this.settings.foodDropPeriod == 0;
    if (this.foodContainer) {
      isTimeForFoodDrop && this.createFood();
      this.moveFoods();
    }
  }

  private checkFoodsPositions() {
    const foods = this.foodContainer.children;
    for (let i = 0; i < foods.length; i++) {
      const distanceToPlayer = calculateDistance(this.player.position, foods[i].position);
      const distanceToBottom = calculateDistance({ x: foods[i].position.x, y: window.innerHeight }, foods[i].position);
      if (distanceToPlayer < this.player.catchRange) {
        foods.shift();
        this._score += 1;
      } else if (distanceToBottom < 10) {
        foods.shift();
        this.removeHP();
      } else {
        break;
      }
    }

    if (foods.length) {
      foods.every((food) => {
        const distanceToPlayer = calculateDistance(this.player.position, food.position);
        const distanceToBottom = calculateDistance({ x: food.position.x, y: window.innerHeight }, food.position);
        if (distanceToPlayer < this.player.catchRange) {
          foods.shift();
          this._score += 1;
          return true;
        } else if (distanceToBottom < 10) {
          foods.shift();
          this.removeHP();
          return true;
        } else {
          return false;
        }
      });
    }
  }

  tick(loopStepId: number) {
    this.player.handleMove();
    this.handleFoods(loopStepId);
    this.checkFoodsPositions();
    const isTimeForLevelUp = loopStepId % (DEFAULT_FOOD_DROP_PERIOD * this.settings.dropsPerLevel) == 0;
    isTimeForLevelUp && this.levelUp();
  }

  private resetGameStatus() {
    this._hp = this.settings.startHP;
    this._score = 0;
    this._level = 1;
    this.foodContainer.children.length = 0;
    this.settings.foodDropPeriod = DEFAULT_FOOD_DROP_PERIOD;
    this.player.resetPlayer();
  }

  updateRecord(score: number) {
    if (score > this.record) {
      this._record = score;
    }
  }

  gameOver() {
    if (confirm("Game over! Press ok to play again!")) {
      this.updateRecord(this.score);
      this.resetGameStatus();
    }
  }
}
