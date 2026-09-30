import { AssetSetter } from "./AssetSetter";
import { CollisionChecker } from "./CollisionChecker";
import { screenHeight, screenWidth } from "./constants";
import { Player } from "./entities/Player";
import { Input } from "./Input";
import type { SuperObject } from "./objects/SuperObject";
import { Sound } from "./Sound";
import { TileManager } from "./tiles/TileManager";
import type { HudState } from "./types";
import { UI } from "./UI";

export class Game {
  private ctx: CanvasRenderingContext2D;
  private animationId: number | null = null;
  private timer = 0;
  private drawCount = 0;
  private lastTime = 0;
  private fps = 60;
  private drawInterval = 1000 / this.fps;
  private delta = 0;
  private input = new Input();
  private obj: (SuperObject | null)[] = Array(10).fill(null);
  private tileM = new TileManager();
  private cChecker = new CollisionChecker(this.tileM, this.obj);
  private aSetter = new AssetSetter(this.obj);
  private ui = new UI();
  private player = new Player(
    this.input,
    this.cChecker,
    this.obj,
    (i) => this.playSe(i),
    this.ui,
  );
  private music = new Sound();
  private se = new Sound();
  private musicStarted = false;
  private paused = false;
  private onHudChange: (hud: HudState) => void;
  private lastHud: HudState = { keys: 0, message: null };

  constructor(
    ctx: CanvasRenderingContext2D,
    onHudChange: (hud: HudState) => void,
  ) {
    this.ctx = ctx;
    this.onHudChange = onHudChange;
    this.ctx.imageSmoothingEnabled = false;
  }

  setupGame() {
    this.aSetter.setObject();
  }

  start() {
    this.setupGame();
    this.lastTime = performance.now();
    this.animationId = requestAnimationFrame(this.loop);
    this.onHudChange({ keys: this.player.hasKeys, message: null });
  }

  stop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.stopMusic();
    this.input.destroy();
  }

  pause() {
    if (this.paused) return;
    this.paused = true;

    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.music.pause();
  }

  resume() {
    if (!this.paused) return;
    this.paused = false;

    this.lastTime = performance.now();
    this.animationId = requestAnimationFrame(this.loop);
    if (this.musicStarted) this.music.play();
  }

  private loop = (currentTime: number) => {
    this.delta += (currentTime - this.lastTime) / this.drawInterval;
    this.timer += currentTime - this.lastTime;
    this.lastTime = currentTime;

    if (this.delta >= 1) {
      this.update();
      this.draw();
      this.drawCount++;
      this.delta--;
    }

    if (this.timer >= 1000) {
      console.log("fps:", this.drawCount);
      this.drawCount = 0;
      this.timer = 0;
    }

    if (this.ui.gameFinished) {
      this.stopMusic();
      this.playSe(4);
      return;
    }

    this.animationId = requestAnimationFrame(this.loop);
  };

  private update() {
    if (!this.musicStarted) {
      const i = this.input;
      if (i.upPressed || i.downPressed || i.leftPressed || i.rightPressed) {
        this.playMusic(0);
        this.musicStarted = true;
      }
    }
    this.player.update();
    this.ui.update();
    this.syncHud();
  }

  private syncHud() {
    const hud: HudState = {
      keys: this.player.hasKeys,
      message: this.ui.currentMessage,
    };

    if (
      hud.keys !== this.lastHud.keys ||
      hud.message !== this.lastHud.message
    ) {
      this.lastHud = hud;
      this.onHudChange(hud);
    }
  }

  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, screenWidth, screenHeight);

    this.tileM.draw(this.ctx, this.player);
    for (const o of this.obj) {
      if (o) o.draw(this.ctx, this.player);
    }
    this.player.draw(this.ctx);
    this.ui.draw(this.ctx);
  }

  playMusic(i: number) {
    this.music.setFile(i);
    this.music.play();
    this.music.loop();
  }

  stopMusic() {
    this.music.stop();
  }
  playSe(i: number) {
    this.se.setFile(i);
    this.se.play();
  }
}
