import { Sprite, Texture } from "pixi.js";
import { getRandomNumber, getRandomXPosition } from "./helpers";
import { Position } from "./models/Position";
import * as PIXI from "pixi.js";

export class Food extends Sprite {
  constructor(foodTextures: Texture<PIXI.Resource>[], level: number) {
    const textureId = getRandomNumber(64);
    const foodStartPosition = { x: getRandomXPosition(level * 100), y: 100 };
    super(foodTextures[textureId]);
    this.anchor.set(0.5);
    this.position.x = foodStartPosition.x;
    this.position.y = foodStartPosition.y;
    this.scale.set(2, 2);
  }

  move(velocity: number = 1) {
    this.position.y += velocity;
  }
}
