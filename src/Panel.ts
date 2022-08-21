import { Container } from "pixi.js";
import { createText } from "./helpers";

export class Panel {
  panelContainer: Container;
  scoreValue: any;
  HPValue: any;
  levelValue: any;

  constructor() {
    this.panelContainer = new Container();
    const scoreTitle = createText("Score:", 30, window.innerWidth - 200, 20);
    this.panelContainer.addChild(scoreTitle);
    this.scoreValue = createText("-", 30, window.innerWidth - 100, 20);
    this.panelContainer.addChild(this.scoreValue);
    const HPTitle = createText("HP:", 30, window.innerWidth - 200, 60);
    this.panelContainer.addChild(HPTitle);
    this.HPValue = createText("-", 30, window.innerWidth - 100, 60);
    this.panelContainer.addChild(this.HPValue);
    const levelTitle = createText("level:", 30, window.innerWidth - 200, 100);
    this.panelContainer.addChild(levelTitle);
    this.levelValue = createText("-", 30, window.innerWidth - 100, 100);
    this.panelContainer.addChild(this.levelValue);
  }

  updateValues(score: number, HP: number, level: number) {
    this.HPValue.text = HP;
    this.scoreValue.text = score;
    this.levelValue.text = level;
  }
}
