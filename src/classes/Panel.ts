import { Container, Text } from "pixi.js";
import { createText } from "../composables/text-helpers";

export class Panel {
  private _panelContainer: Container;
  private _scoreValue: Text;
  private _HPValue: Text;
  private _levelValue: Text;

  public constructor() {
    this._panelContainer = new Container();
    const scoreTitle = createText("Score:", 30, window.innerWidth - 200, 20);
    this._panelContainer.addChild(scoreTitle);
    this._scoreValue = createText("-", 30, window.innerWidth - 100, 20);
    this._panelContainer.addChild(this._scoreValue);
    const HPTitle = createText("HP:", 30, window.innerWidth - 200, 60);
    this._panelContainer.addChild(HPTitle);
    this._HPValue = createText("-", 30, window.innerWidth - 100, 60);
    this._panelContainer.addChild(this._HPValue);
    const levelTitle = createText("level:", 30, window.innerWidth - 200, 100);
    this._panelContainer.addChild(levelTitle);
    this._levelValue = createText("-", 30, window.innerWidth - 100, 100);
    this._panelContainer.addChild(this._levelValue);
  }

  public get panelContainer() {
    return this._panelContainer;
  }

  public updateValues(score: number, HP: number, level: number) {
    this._HPValue.text = HP;
    this._scoreValue.text = score;
    this._levelValue.text = level;
  }
}
