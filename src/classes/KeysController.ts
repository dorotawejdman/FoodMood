export class KeysController {
  speed: number;
  vel: number;
  leftKeyDown: boolean;
  rightKeyDown: boolean;

  constructor(speed: number = 5) {
    this.speed = speed;
    this.vel = 0;
    this.addListeners();
  }

  addListeners() {
    document.addEventListener(
      "keydown",
      function (e: KeyboardEvent) {
        switch (e.key) {
          case "ArrowRight":
            this.goRight();
            break;
          case "ArrowLeft":
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
          case "ArrowRight":
            this.rightKeyDown = false;
            break;
          case "ArrowLeft":
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
