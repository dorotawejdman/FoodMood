export class KeysController {
  private speed: number;
  private _vel: number;
  private _leftKeyDown: boolean;
  private _rightKeyDown: boolean;
  private leftKeyName: string;
  private rightKeyName: string;

  public constructor(speed: number = 5, leftKeyName: string = "ArrowLeft", rightKeyName: string = "ArrowRight") {
    this.speed = speed;
    this._vel = 0;
    this.leftKeyName = leftKeyName;
    this.rightKeyName = rightKeyName;
    this.addListeners();
  }

  public get vel() {
    return this._vel;
  }

  public get leftKeyDown() {
    return this._leftKeyDown;
  }

  public get rightKeyDown() {
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
}
