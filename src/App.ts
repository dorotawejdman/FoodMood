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
    this.createPanel();
    this.loadAssets();
    this.createPanel();
    //Create on new game - button click
  }

  loadAssets() {
    this.foodTextures = [];
    const loader = new Loader();
    loader.add("tileset", "assets/Food/spritesheet.json");
    loader
      .add("heroFront", "assets/Hero/knight iso char_idle_0.png")
      .add("heroRunLeft", "assets/Hero/knight iso char_run left_0.png")
      .add("heroRunRight", "assets/Hero/knight iso char_run right_0.png");
    loader.load((loader: any, resources: any) => {
      Object.keys(resources.tileset.data.frames).forEach((key: string) => {
        this.foodTextures.push(Texture.from(key));
      });
      console.log(resources);
    });
    loader.onComplete.add(() => {
      this.game = new Game(this.app.stage, this.foodTextures);
      this.app.ticker.add((step) => this.loop(step));
    });
  }

  createPanel() {
    this.app.stage.addChild(this.panel.panelContainer);
    document.body.appendChild(this.app.view);
  }

  startGame() {}

  loop(step: any) {
    this.loopStepId += 1;
    this.game.tick(this.loopStepId);
    this.panel.updateValues(this.game.score, this.game.hp, this.game.level);
    //TBD - remove sprite and life point when position.y>window.innerHeight
    //TBD - add point when position is near the hero
  }
}
