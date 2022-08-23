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
    this.anchor.set(0.5);
    this.position.set(position.x, position.y);

    this.keysController = new KeysController();

    this.name = name;
    this._catchRange = _catchRange;
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
    if ((this.keysController.leftKeyDown || this.keysController.rightKeyDown) && this.keysController.vel) {
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
