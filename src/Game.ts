import { Container, ParticleContainer, Sprite, Texture } from "pixi.js";
import { Food } from "./Food";
import { calculateDistance, getRandomNumber, getRandomXPosition } from "./helpers";
import { Hero } from "./Hero";
import { KeysController } from "./KeysController";
import { GameSettings } from "./models/GameSettings";

export class Game {
  settings: GameSettings;
  score: number;
  level: number;
  keysController: KeysController;
  player: Hero;
  foodTextures: Texture[];
  stage: Container;
  foodContainer: Container;
  hp: number;

  constructor(stage: Container, foodTextures: Texture[], settings = new GameSettings(), hp: number = 10) {
    //TBD - update constructor remove fixed values
    this.settings = settings;
    this.hp = settings.startHP;
    this.level = 1;
    this.score = 0;
    this.stage = stage;
    this.foodTextures = foodTextures;
    this.keysController = new KeysController();
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

  handlePlayerMove() {
    if ((this.keysController.leftKeyDown || this.keysController.rightKeyDown) && this.keysController.vel) {
      this.player.move(this.keysController.vel);
    }
  }

  levelUp() {
    this.level += 1;
    this.settings.foodDropFreq += 10;
  }

  removeHP() {
    this.hp -= 1;
    if (this.hp == 0) {
      this.gameOver();
    }
  }

  checkFoodsPositions() {
    const firstFood = this.foodContainer.children[0];
    const distanceToPlayer = calculateDistance(this.player.position, firstFood.position);
    const distanceToBottom = calculateDistance({ x: firstFood.position.x, y: window.innerHeight }, firstFood.position);
    if (distanceToPlayer < 40) {
      this.foodContainer.children.shift();
      this.score += 1;
    } else if (distanceToBottom < 40) {
      this.foodContainer.children.shift();
      this.removeHP();
    }
  }

  tick(loopStepId: number) {
    this.handlePlayerMove();
    if (this.foodContainer) {
      if (loopStepId % this.settings.foodDropFreq == 0) {
        this.createFood();
      }
      this.moveFoods();
    }
    //co 10 obiektow zwieksz level
    if (loopStepId % (this.settings.foodDropFreq * this.settings.dropsPerLevel) == 0) {
      this.levelUp();
    }
    this.checkFoodsPositions();
  }

  gameOver() {
    this.hp = this.settings.startHP;
    this.score = 0;
    this.level = 1;
    //nie dziala resetowanie levellu
    console.log("Game over");
  }
}
