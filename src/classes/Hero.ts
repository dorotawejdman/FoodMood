import { Sprite } from "pixi.js";
import { DEFAULT_HERO_POSITION, DEFAULT_PLAYER_CATCH_RANGE } from "../composables/Constants";
import { Position } from "../models/Position";
import { KeysController } from "./KeysController";

export class Hero extends Sprite {
  name: string;
  catchRange: number;
  keysController: KeysController;

  constructor(texture: any, name: string, catchRange: number = DEFAULT_PLAYER_CATCH_RANGE, position: Position = DEFAULT_HERO_POSITION) {
    super(texture);
    this.anchor.set(0.5);
    this.position.set(position.x, position.y);

    this.keysController = new KeysController();

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

  handleMove() {
    if ((this.keysController.leftKeyDown || this.keysController.rightKeyDown) && this.keysController.vel) {
      this.move(this.keysController.vel);
    }
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
