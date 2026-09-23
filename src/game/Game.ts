import { screenHeight, screenWidth, tileSize } from "./constants";
import { Input } from "./Input";

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

  private playerX = 100;
  private playerY = 100;
  private playerSpeed = 4;

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
    if (this.input.upPressed) {
      this.playerY -= this.playerSpeed;
    } else if (this.input.downPressed) {
      this.playerY += this.playerSpeed;
    } else if (this.input.leftPressed) {
      this.playerX -= this.playerSpeed;
    } else if (this.input.rightPressed) {
      this.playerX += this.playerSpeed;
    }
  }

  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, screenWidth, screenHeight);

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.playerX, this.playerY, tileSize, tileSize);
  }
}
