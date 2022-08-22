import { Container, Texture } from "pixi.js";
import { Food } from "./Food";
import { calculateDistance } from "../composables/game-helpers";
import { Player } from "./Player";
import { GameSettings } from "./GameSettings";
import { DEFAULT_FOOD_DROP_PERIOD, DEFAULT_HERO_POSITION } from "../composables/Constants";
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

  constructor(stage: Container, foodTextures: Texture[], playerTextures: PlayerTextures, settings = new GameSettings()) {
    this.settings = settings;
    this._hp = settings.startHP;
    this._level = 1;
    this._score = 0;
    this.stage = stage;
    this.foodTextures = foodTextures;
    this.createFoodContainer();
    this.createPlayer(playerTextures);
    this.createFood();
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

  private moveFoods() {
    this.foodContainer.children.forEach((food: Food) => food.move());
  }

  private levelUp() {
    this._level += 1;
    this.decreaseFoodPeriod();
  }

  private decreaseFoodPeriod() {
    if (this.settings.foodDropPeriod > 60) {
      this.settings.foodDropPeriod -= 10;
    }
  }

  private removeHP() {
    this._hp -= 1;
    if (this._hp == 0) {
      this.gameOver();
    }
  }

  private checkFoodsPositions() {
    const firstFood = this.foodContainer.children[0];
    if (firstFood) {
      const distanceToPlayer = calculateDistance(this.player.position, firstFood.position);
      const distanceToBottom = calculateDistance({ x: firstFood.position.x, y: window.innerHeight }, firstFood.position);
      if (distanceToPlayer < this.player.catchRange) {
        this.foodContainer.children.shift();
        this._score += 1;
      } else if (distanceToBottom < this.player.catchRange) {
        this.foodContainer.children.shift();
        this.removeHP();
      }
    }
  }

  public tick(loopStepId: number) {
    this.player.handleMove();

    if (this.foodContainer) {
      if (loopStepId % this.settings.foodDropPeriod == 0) {
        this.createFood();
      }
      this.moveFoods();
    }
    //co 10 obiektow zwieksz _level
    if (loopStepId % (DEFAULT_FOOD_DROP_PERIOD * this.settings.dropsPerLevel) == 0) {
      this.levelUp();
    }
    this.checkFoodsPositions();
  }

  private gameOver() {
    this._hp = this.settings.startHP;
    this._score = 0;
    this._level = 1;
    this.settings.foodDropPeriod = DEFAULT_FOOD_DROP_PERIOD;
    this.player.position.set(DEFAULT_HERO_POSITION.x, DEFAULT_HERO_POSITION.y);
    console.log("Game over");
  }
}
