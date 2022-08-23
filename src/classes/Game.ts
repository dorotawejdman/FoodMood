import { Container, Texture } from "pixi.js";
import { Food } from "./Food";
import { calculateDistance } from "../composables/game-helpers";
import { Player } from "./Player";
import { GameSettings } from "./GameSettings";
import { DEFAULT_FOOD_DROP_PERIOD, DEFAULT_HERO_POSITION, FOOD_DROP_PERIOD_STEP, MINIMUM_FOOD_DROP_PERIOD } from "../composables/Constants";
import { PlayerTextures } from "../models/PlayerTextures";

export class Game {
  settings: GameSettings;
  score: number;
  level: number;
  player: Player;
  foodTextures: Texture[];
  stage: Container;
  foodContainer: Container;
  hp: number;

  constructor(stage: Container, foodTextures: Texture[], playerTextures: PlayerTextures, settings = new GameSettings()) {
    this.settings = settings;
    this.hp = settings.startHP;
    this.level = 1;
    this.score = 0;
    this.stage = stage;
    this.foodTextures = foodTextures;
    this.createFoodContainer();
    this.createPlayer(playerTextures);
  }

  createFood() {
    const food = new Food(this.foodTextures, this.level);
    this.foodContainer.addChild(food);
  }

  createFoodContainer() {
    this.foodContainer = new Container();
    this.stage.addChild(this.foodContainer);
  }

  createPlayer(playerTextures: PlayerTextures) {
    this.player = new Player(playerTextures, "Player1");
    this.stage.addChild(this.player);
  }

  decreaseFoodPeriod() {
    if (this.settings.foodDropPeriod > MINIMUM_FOOD_DROP_PERIOD) {
      this.settings.foodDropPeriod -= FOOD_DROP_PERIOD_STEP;
    }
  }

  levelUp() {
    this.level += 1;
    this.decreaseFoodPeriod();
  }

  removeHP() {
    this.hp -= 1;
    if (this.hp == 0) {
      this.gameOver();
    }
  }

  moveFoods() {
    this.foodContainer.children.forEach((food: Food) => food.move());
  }

  handleFoods(loopStepId: number) {
    const isTimeForFoodDrop = loopStepId % this.settings.foodDropPeriod == 0;
    if (this.foodContainer) {
      if (isTimeForFoodDrop) {
        this.createFood();
      }
      this.moveFoods();
    }
  }

  checkFoodsPositions() {
    const foods = this.foodContainer.children;
    if (foods.length) {
      foods.every((food) => {
        const distanceToPlayer = calculateDistance(this.player.position, food.position);
        const distanceToBottom = calculateDistance({ x: food.position.x, y: window.innerHeight }, food.position);
        if (distanceToPlayer < this.player.catchRange) {
          foods.shift();
          this.score += 1;
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
    if (isTimeForLevelUp) {
      this.levelUp();
    }
  }

  resetGameStatus() {
    this.hp = this.settings.startHP;
    this.score = 0;
    this.level = 1;
    this.settings.foodDropPeriod = DEFAULT_FOOD_DROP_PERIOD;
    this.player.position = DEFAULT_HERO_POSITION;
  }

  gameOver() {
    this.resetGameStatus();
    console.log("Game over");
  }
}
