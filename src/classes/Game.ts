import { Container, Texture } from "pixi.js";
import { Food } from "./Food";
import { calculateDistance } from "../composables/game-helpers";
import { Hero } from "./Hero";
import { GameSettings } from "./GameSettings";
import { DEFAULT_FOOD_DROP_PERIOD } from "../composables/Constants";

export class Game {
  settings: GameSettings;
  score: number;
  level: number;
  player: Hero;
  foodTextures: Texture[];
  stage: Container;
  foodContainer: Container;
  hp: number;

  constructor(stage: Container, foodTextures: Texture[], settings = new GameSettings()) {
    //TBD - update constructor remove fixed values
    this.settings = settings;
    this.hp = settings.startHP;
    this.level = 1;
    this.score = 0;
    this.stage = stage;
    this.foodTextures = foodTextures;
    this.createFoodContainer();
    this.createPlayer();
    this.createFood();
  }

  createFood() {
    const food = new Food(this.foodTextures, this.level);
    this.foodContainer.addChild(food);
  }

  createFoodContainer() {
    this.foodContainer = new Container();
    this.stage.addChild(this.foodContainer);
  }

  createPlayer() {
    this.player = new Hero({ x: window.innerWidth / 2, y: window.innerHeight - 50 }, Texture.from("assets/Hero/knight iso char_idle_0.png"), "Player1");
    this.stage.addChild(this.player);
  }

  moveFoods() {
    this.foodContainer.children.forEach((food: Food) => food.move());
  }

  levelUp() {
    this.level += 1;
    this.decreaseFoodPeriod();
  }

  decreaseFoodPeriod() {
    if (this.settings.foodDropPeriod > 60) {
      this.settings.foodDropPeriod -= 10;
    }
  }

  removeHP() {
    this.hp -= 1;
    if (this.hp == 0) {
      this.gameOver();
    }
  }

  checkFoodsPositions() {
    const firstFood = this.foodContainer.children[0];
    if (firstFood) {
      const distanceToPlayer = calculateDistance(this.player.position, firstFood.position);
      const distanceToBottom = calculateDistance({ x: firstFood.position.x, y: window.innerHeight }, firstFood.position);
      if (distanceToPlayer < this.player.catchRange) {
        this.foodContainer.children.shift();
        this.score += 1;
      } else if (distanceToBottom < this.player.catchRange) {
        this.foodContainer.children.shift();
        this.removeHP();
      }
    }
  }

  tick(loopStepId: number) {
    this.player.handleMove();

    if (this.foodContainer) {
      if (loopStepId % this.settings.foodDropPeriod == 0) {
        this.createFood();
      }
      this.moveFoods();
    }
    //co 10 obiektow zwieksz level
    if (loopStepId % (DEFAULT_FOOD_DROP_PERIOD * this.settings.dropsPerLevel) == 0) {
      this.levelUp();
    }
    this.checkFoodsPositions();
  }

  gameOver() {
    this.hp = this.settings.startHP;
    this.score = 0;
    this.level = 1;
    this.settings.foodDropPeriod = DEFAULT_FOOD_DROP_PERIOD;
    console.log("Game over");
  }
}
