import { Application, Loader, Texture } from "pixi.js";
import { PlayerTextures } from "../models/PlayerTextures";
import { Game } from "./Game";
import { Panel } from "./Panel";

export class AppManager {
  app: Application;
  foodTextures: Texture[];
  playerTextures: PlayerTextures;
  game: Game;
  loopStepId: number;
  panel: Panel;
  loader: Loader;

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
    this.loader = new Loader();
    this.loadAssets();
    this.loader.onComplete.add(() => {
      this.game = new Game(this.app.stage, this.foodTextures, this.playerTextures);
      this.app.ticker.add((step) => this.loop(step));
    });
    document.body.appendChild(this.app.view);
  }

  loadAssets() {
    this.foodTextures = [];
    this.playerTextures = {} as PlayerTextures;
    this.loader.add("tileset", "assets/Food/spritesheet.json");
    this.loader
      .add("heroFront", "assets/Hero/knight iso char_idle_0.png")
      .add("heroRunLeft", "assets/Hero/knight iso char_run left_0.png")
      .add("heroRunRight", "assets/Hero/knight iso char_run right_0.png");
    this.loader.load((loader: any, resources: any) => {
      Object.keys(resources.tileset.data.frames).forEach((key: string) => {
        this.foodTextures.push(Texture.from(key));
      });
      this.playerTextures.front = Texture.from("heroFront");
      this.playerTextures.left = Texture.from("heroRunLeft");
      this.playerTextures.right = Texture.from("heroRunRight");
    });
  }

  startGame() {}

  loop(step: any) {
    this.loopStepId += 1;
    this.game.tick(this.loopStepId);
    this.panel.updateValues(this.game.score, this.game.hp, this.game.level);
  }
}
