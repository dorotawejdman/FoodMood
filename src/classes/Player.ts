import { PlayerTextures } from "./../models/PlayerTextures";
import { Sprite } from "pixi.js";
import { DEFAULT_HERO_POSITION, DEFAULT_PLAYER_CATCH_RANGE } from "../composables/Constants";
import { Position } from "../models/Position";
import { KeysController } from "./KeysController";

export class Player extends Sprite {
  private name: string;
  private _catchRange: number;
  private keysController: KeysController;
  private playerTextures: PlayerTextures;

  public constructor(playerTextures: PlayerTextures, name: string, _catchRange: number = DEFAULT_PLAYER_CATCH_RANGE, position: Position = DEFAULT_HERO_POSITION) {
    super(playerTextures.front);
    this.playerTextures = playerTextures;
    this.name = name;
    this._catchRange = _catchRange;
    this.position.set(position.x, position.y);
    this.anchor.set(0.5);
    this.keysController = new KeysController();
  }

  get catchRange() {
    return this._catchRange;
  }

  private move(velocity: number) {
    const newXPosition = this.position.x + velocity;
    if (newXPosition < window.innerWidth - 20 && newXPosition > 20) {
      this.position.x = newXPosition;
    }
    this.changeTexture(Math.sign(velocity));
  }

  public handleMove() {
    const isMoveKeyPressed = this.keysController.leftKeyDown || this.keysController.rightKeyDown;
    if (isMoveKeyPressed && this.keysController.vel) {
      this.move(this.keysController.vel);
    }
  }

  private changeTexture(velocitySign: number) {
    switch (velocitySign) {
      case 1:
        this.texture = this.playerTextures.right;
        break;
      case -1:
        this.texture = this.playerTextures.left;
        break;
    }
  }
}
