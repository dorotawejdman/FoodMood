import { Sprite, Texture } from "pixi.js";
import { getRandomNumber, getRandomXPosition } from "../composables/game-helpers";
import * as PIXI from "pixi.js";
import { INV_ACCELERATION_COEF, WIDTH_RANGE_PER_LVL, FOOD_STARTING_Y_POS } from "../composables/Constants";

export class Food extends Sprite {
  public constructor(foodTextures: Texture<PIXI.Resource>[], level: number) {
    const textureId = getRandomNumber(foodTextures.length);
    const foodStartPosition = { x: getRandomXPosition(level * WIDTH_RANGE_PER_LVL), y: FOOD_STARTING_Y_POS };
    super(foodTextures[textureId]);
    this.anchor.set(0.5);
    this.position.set(foodStartPosition.x, foodStartPosition.y);
    this.scale.set(2, 2);
  }

  public move(velocity: number = 1) {
    this.position.y += velocity + this.position.y / INV_ACCELERATION_COEF;
  }
}
