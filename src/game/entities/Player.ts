import { tileSize } from "../constants";
import { Input } from "../Input";
import { Entity } from "./Entity";

export class Player extends Entity {
  private input: Input;

  constructor(input: Input) {
    super();
    this.input = input;
    this.setDefaultValues();
  }

  setDefaultValues() {
    this.x = 100;
    this.y = 100;
    this.speed = 4;
  }

  update() {
    if (this.input.upPressed) {
      this.y -= this.speed;
    } else if (this.input.downPressed) {
      this.y += this.speed;
    } else if (this.input.leftPressed) {
      this.x -= this.speed;
    } else if (this.input.rightPressed) {
      this.x += this.speed;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, tileSize, tileSize);
  }
}
