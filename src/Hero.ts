import { Sprite } from "pixi.js";
import { Position } from "./models/Position";

export class Hero extends Sprite {
  name: string;
  constructor(position: Position, texture: any, name: string) {
    super(texture);
    this.anchor.set(0.5);
    this.name = name;
    this.position.x = position.x;
    this.position.y = position.y;
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
