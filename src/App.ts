import { Application, Loader, Texture } from "pixi.js";
import { Game } from "./Game";
import { Panel } from "./Panel";

export class AppManager {
  app: Application;
  foodTextures: Texture[];
  game: Game;
  loopStepId: number;
  panel: Panel;

  public constructor() {
    this.loopStepId = 0;
    this.app = new Application({
      width: 500,
      height: 500,
      antialias: true,
    });
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
    this.app.renderer.view.style.position = "absolute";
    this.app.renderer.backgroundColor = 0x2e2532;
    this.panel = new Panel();
    this.app.stage.addChild(this.panel.panelContainer);
    document.body.appendChild(this.app.view);
    this.loadAssets();
    this.createPanel();
    //Create on new game - button click
  }

  loadAssets() {
    this.foodTextures = [];
    const loader = new Loader();
    loader.add("apple", "assets/Food/Apple.png").add("avocado", "assets/Food/Avocado.png").add("tomato", "assets/Food/Tomato.png").add("pineapple", "assets/Food/Pineapple.png");
    loader.load((loader: any, resources: any) => {
      this.foodTextures.push(resources.apple.texture);
      this.foodTextures.push(resources.tomato.texture);
      this.foodTextures.push(resources.avocado.texture);
      this.foodTextures.push(resources.pineapple.texture);

      this.game = new Game(this.app.stage, this.foodTextures);
      this.app.ticker.add((step) => this.loop(step));
    });
  }

  createPanel() {}

  updatePanel(scoreValue: number, HPvalue: number) {
    this.panel.HPValue.text = this.game.hp;
    this.panel.scoreValue.text = this.game.score;
  }

  startGame() {}

  loop(step: any) {
    this.loopStepId += 1;
    this.game.tick(this.loopStepId);
    this.updatePanel(this.game.score, this.game.hp);
    //TBD - remove sprite and life point when position.y>window.innerHeight
    //TBD - add point when position is near the hero
  }
}
