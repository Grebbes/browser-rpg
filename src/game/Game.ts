import { screenHeight, screenWidth } from "./constants";
import { Player } from "./entities/Player";
import { Input } from "./Input";
import { TileManager } from "./tiles/TileManager";

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
  private player = new Player(this.input);
  private tileM = new TileManager();

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = false;
  }

  start() {
    this.lastTime = performance.now();
    this.animationId = requestAnimationFrame(this.loop);
  }

  stop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.input.destroy();
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

    this.animationId = requestAnimationFrame(this.loop);
  };

  private update() {
    this.player.update();
  }

  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, screenWidth, screenHeight);

    this.tileM.draw(this.ctx, this.player);
    this.player.draw(this.ctx);
  }
}
