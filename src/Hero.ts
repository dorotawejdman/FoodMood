import { Sprite } from "pixi.js";
import { Position } from "./models/Position";

export class Hero extends Sprite {
  name: string;
  hp: number;
  constructor(position: Position, texture: any, name: string, hp: number = 100) {
    super(texture);
    this.anchor.set(0.5);
    this.name = name;
    this.hp = hp;
    this.position.x = position.x;
    this.position.y = position.y;
  }

  move(velocity: number) {
    const newXPosition = (this.position.x += velocity);
    if (newXPosition < window.innerWidth && newXPosition > 0) {
      this.position.x = newXPosition;
    }
  }

  removeHP() {
    this.hp -= 1;
  }
}
