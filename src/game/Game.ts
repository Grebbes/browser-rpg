import { screenHeight, screenWidth, tileSize } from "./constants";

export class Game {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, screenWidth, screenHeight);

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(100, 100, tileSize, tileSize);
  }
}
