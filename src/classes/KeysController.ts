export class KeysController {
  speed: number;
  vel: number;
  leftKeyDown: boolean;
  rightKeyDown: boolean;
  leftKeyName: string;
  rightKeyName: string;

  constructor(speed: number = 5, leftKeyName: string = "ArrowLeft", rightKeyName: string = "ArrowRight") {
    this.speed = speed;
    this.vel = 0;
    this.leftKeyName = leftKeyName;
    this.rightKeyName = rightKeyName;
    this.addListeners();
  }

  addListeners() {
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
            this.rightKeyDown = false;
            break;
          case this.leftKeyName:
            this.leftKeyDown = false;
            break;
        }
        e.preventDefault();
      }.bind(this)
    );
  }

  goLeft() {
    this.vel = -this.speed;
    this.leftKeyDown = true;
  }

  goRight() {
    this.vel = this.speed;
    this.rightKeyDown = true;
  }
}
