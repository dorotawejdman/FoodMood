import { Sprite, Texture } from "pixi.js";
import { getRandomNumber, getRandomXPosition } from "../composables/game-helpers";
import * as PIXI from "pixi.js";
import { INV_ACCELERATION_COEF, WIDTH_RANGE_PER_LVL, FOOD_STARTING_Y_POS } from "../composables/Constants";

export class Food extends Sprite {
  constructor(foodTextures: Texture<PIXI.Resource>[], level: number) {
    const textureId = getRandomNumber(64);
    const foodStartPosition = { x: getRandomXPosition(level * WIDTH_RANGE_PER_LVL), y: FOOD_STARTING_Y_POS };
    super(foodTextures[textureId]);
    this.anchor.set(0.5);
    this.position.x = foodStartPosition.x;
    this.position.y = foodStartPosition.y;
    this.scale.set(2, 2);
  }

  move(velocity: number = 1) {
    this.position.y += velocity + this.position.y / INV_ACCELERATION_COEF;
  }
}
