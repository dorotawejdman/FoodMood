import { Container, Text } from "pixi.js";
import { createText } from "../composables/text-helpers";

export class Panel {
  private _panelContainer: Container;
  private scoreValue: Text;
  private HPValue: Text;
  private levelValue: Text;

  public constructor() {
    this._panelContainer = new Container();
    const scoreTitle = createText("Score:", 30, window.innerWidth - 200, 20);
    this._panelContainer.addChild(scoreTitle);
    this.scoreValue = createText("-", 30, window.innerWidth - 100, 20);
    this._panelContainer.addChild(this.scoreValue);
    const HPTitle = createText("HP:", 30, window.innerWidth - 200, 60);
    this._panelContainer.addChild(HPTitle);
    this.HPValue = createText("-", 30, window.innerWidth - 100, 60);
    this._panelContainer.addChild(this.HPValue);
    const levelTitle = createText("level:", 30, window.innerWidth - 200, 100);
    this._panelContainer.addChild(levelTitle);
    this.levelValue = createText("-", 30, window.innerWidth - 100, 100);
    this._panelContainer.addChild(this.levelValue);
  }

  public get panelContainer() {
    return this._panelContainer;
  }

  public updateValues(score: number, HP: number, level: number) {
    this.HPValue.text = HP;
    this.scoreValue.text = score;
    this.levelValue.text = level;
  }
}
