import { Sprite } from "pixi.js";
import { DEFAULT_PLAYER_CATCH_RANGE } from "../composables/Constants";
import { Position } from "../models/Position";

export class Hero extends Sprite {
  name: string;
  catchRange: number;
  constructor(position: Position, texture: any, name: string, catchRange: number = DEFAULT_PLAYER_CATCH_RANGE) {
    super(texture);
    this.anchor.set(0.5);
    this.position.x = position.x;
    this.position.y = position.y;

    this.name = name;
    this.catchRange = catchRange;
  }

  move(velocity: number) {
    const newXPosition = this.position.x + velocity;
    if (newXPosition < window.innerWidth - 20 && newXPosition > 20) {
      this.position.x = newXPosition;
    }
    this.changeTexture(velocity);
  }

  changeTexture(velocitySign: number) {
    switch (velocitySign) {
      case 1:
        console.log("1");
        break;
      case -1:
        console.log("-1");
        break;
      case 0:
        console.log("0");
        break;
    }
  }
}
