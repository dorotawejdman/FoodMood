import { Container, ParticleContainer, Sprite, Texture } from "pixi.js";
import { Food } from "./Food";
import { getRandomNumber, getRandomXPosition } from "./helpers";
import { Hero } from "./Hero";
import { KeysController } from "./KeysController";
import { GameSettings } from "./models/GameSettings";
import { Position } from "./models/Position";

export class Game {
  settings: GameSettings;
  points: number;
  level: number;
  keysController: KeysController;
  player: Hero;

  foodTextures: Texture[];
  stage: Container;
  foodContainer: Container;

  constructor(stage: Container, foodTextures: Texture[], settings = new GameSettings()) {
    //TBD - update constructor remove fixed values
    this.settings = settings;
    this.level = 1;
    this.points = 0;
    this.stage = stage;
    this.foodTextures = foodTextures;
    this.keysController = new KeysController();
    this.createFoodContainer();
    this.createPlayer();
    this.createFood();
  }

  createFood() {
    const food = new Food(this.foodTextures, this.level);
    this.addToContainer(food, this.foodContainer);
  }

  createFoodContainer() {
    this.foodContainer = new Container();
    this.stage.addChild(this.foodContainer);
  }

  createPlayer() {
    this.player = new Hero({ x: window.innerWidth / 2, y: window.innerHeight - 50 }, Texture.from("assets/Hero/knight iso char_idle_0.png"), "Player1");
    this.addToContainer(this.player, this.stage);
  }

  addToContainer(sprite: Sprite | Hero, container: Container) {
    container.addChild(sprite);
  }

  moveFoods() {
    this.foodContainer.children.forEach((food) => (food.position.y += 1));
  }

  handlePlayerMove() {
    if ((this.keysController.leftKeyDown || this.keysController.rightKeyDown) && this.keysController.vel) {
      this.player.move(this.keysController.vel);
    }
    //addBoundaries
  }

  levelUp() {
    this.level += 1;
    this.settings.foodDropFreq += 10;
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
  }
}
