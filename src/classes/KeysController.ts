import { DEFAULT_PLAYER_SPEED } from "../composables/Constants";

export class KeysController {
  private speed: number;
  private _vel: number;
  private _leftKeyDown: boolean;
  private _rightKeyDown: boolean;
  private leftKeyName: string;
  private rightKeyName: string;

  constructor(speed: number = DEFAULT_PLAYER_SPEED, leftKeyName: string = "ArrowLeft", rightKeyName: string = "ArrowRight") {
    this.speed = speed;
    this._vel = 0;
    this.leftKeyName = leftKeyName;
    this.rightKeyName = rightKeyName;
    this.addListeners();
  }

  get vel() {
    return this._vel;
  }

  get leftKeyDown() {
    return this._leftKeyDown;
  }

  get rightKeyDown() {
    return this._rightKeyDown;
  }

  private addListeners() {
    document.addEventListener(
      "keydown",
      function (e: KeyboardEvent) {
        switch (e.key) {
          case this.rightKeyName:
            this.goRight();
            break;
          case this.leftKeyName:
            this.goLeft();
            break;
        }
        e.preventDefault();
      }.bind(this)
    );

    document.addEventListener(
      "keyup",
      function (e: KeyboardEvent) {
        switch (e.key) {
          case this.rightKeyName:
            this._rightKeyDown = false;
            break;
          case this.leftKeyName:
            this._leftKeyDown = false;
            break;
        }
        e.preventDefault();
      }.bind(this)
    );
  }

  private goLeft() {
    this._vel = -this.speed;
    this._leftKeyDown = true;
  }

  private goRight() {
    this._vel = this.speed;
    this._rightKeyDown = true;
  }

  resetPressedKeys() {
    this._leftKeyDown = false;
    this._rightKeyDown = false;
  }
}
