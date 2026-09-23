import { screenHeight, screenWidth, tileSize } from "./constants";

export class Game {
  private ctx: CanvasRenderingContext2D;
  private animationId: number | null = null;
  private timer = 0;
  private drawCount = 0;
  private lastTime = 0;
  private fps = 60;
  private drawInterval = 1000 / this.fps;
  private delta = 0;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
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
  }

  private loop = (currentTime: number) => {
    this.delta += (currentTime - this.lastTime) / this.drawInterval;
    this.timer += currentTime - this.lastTime;
    this.lastTime = currentTime;

    if (this.delta >= 1) {
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

  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, screenWidth, screenHeight);

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(100, 100, tileSize, tileSize);
  }
}
