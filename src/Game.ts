import { Container, Sprite, Texture } from "pixi.js";
import { getRandomNumber, getRandomXPosition } from "./helpers";
import { KeysController } from "./KeysController";
import { Position } from "./models/Position";

export class Game {
  foodDropFreq: number;
  dropsPerLevel: number;
  stage: Container;
  points: number;
  level: number;
  lifePoints: number;
  keysController: KeysController;
  player: Sprite;
  foodTextures: Texture[];
  foodContainer: Container;

  constructor(stage: Container, foodTextures: Texture[], lifePoints: number = 10) {
    //TBD - update constructor remove fixed values
    this.foodDropFreq = 100;
    this.dropsPerLevel = 10;
    this.level = 1;
    this.points = 0;
    this.lifePoints = lifePoints;
    this.stage = stage;
    this.foodTextures = foodTextures;
    this.keysController = new KeysController();
    this.createFoodContainer();
    this.createPlayer();
    this.createFood();
  }

  createFood() {
    const textureId = getRandomNumber(4);
    const sprite = new Sprite(this.foodTextures[textureId]);
    const foodStartPosition = { x: getRandomXPosition(this.level * 100), y: 100 };
    sprite.scale.set(2, 2);
    this.addToContainer(sprite, foodStartPosition, this.foodContainer);
  }

  createFoodContainer() {
    this.foodContainer = new Container();
    this.stage.addChild(this.foodContainer);
  }

  createPlayer() {
    this.player = new Sprite(Texture.from("assets/Hero/knight iso char_idle_0.png"));
    this.addToContainer(this.player, { x: window.innerWidth / 2, y: window.innerHeight - 50 }, this.stage);
  }

  addToContainer(sprite: Sprite, position: Position, container: Container) {
    sprite.x = position.x;
    sprite.y = position.y;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    container.addChild(sprite);
  }

  moveFoods() {
    this.foodContainer.children.forEach((food) => (food.position.y += 1));
  }

  handlePlayerMove() {
    if ((this.keysController.leftKeyDown || this.keysController.rightKeyDown) && this.keysController.vel) {
      this.player.x += this.keysController.vel;
    }
  }

  levelUp() {
    this.level += 1;
    this.foodDropFreq += 10;
  }
}
