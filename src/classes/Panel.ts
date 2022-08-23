import { Container, Text } from "pixi.js";
import { createText } from "../composables/text-helpers";

export class Panel {
  private _panelContainer: Container;
  private scoreValue: Text;
  private HPValue: Text;
  private levelValue: Text;
  private recordValue: Text;

  constructor() {
    this._panelContainer = new Container();
    this.addSimpleText("Score:", window.innerWidth - 200, 20);
    this.addSimpleText("HP:", window.innerWidth - 200, 60);
    this.addSimpleText("Level:", window.innerWidth - 200, 100);
    this.addSimpleText("Record:", window.innerWidth - 200, 140);

    this.scoreValue = createText("-", 30, window.innerWidth - 100, 20);
    this._panelContainer.addChild(this.scoreValue);

    this.HPValue = createText("-", 30, window.innerWidth - 100, 60);
    this._panelContainer.addChild(this.HPValue);

    this.levelValue = createText("-", 30, window.innerWidth - 100, 100);
    this._panelContainer.addChild(this.levelValue);

    this.recordValue = createText("-", 30, window.innerWidth - 100, 140);
    this._panelContainer.addChild(this.recordValue);
  }

  private addSimpleText(text: string, x: number, y: number) {
    const scoreTitle = createText(text, 30, x, y);
    this._panelContainer.addChild(scoreTitle);
  }

  public get panelContainer() {
    return this._panelContainer;
  }

  updateValues(score: number, HP: number, level: number, record: number) {
    this.HPValue.text = HP;
    this.scoreValue.text = score;
    this.levelValue.text = level;
    this.recordValue.text = record;
  }
}
