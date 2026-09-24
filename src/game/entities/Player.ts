import { screenHeight, screenWidth, tileSize } from "../constants";
import { Input } from "../Input";
import { Entity } from "./Entity";

export class Player extends Entity {
  private input: Input;
  readonly screenX = screenWidth / 2 - tileSize / 2;
  readonly screenY = screenHeight / 2 - tileSize / 2;

  constructor(input: Input) {
    super();
    this.input = input;
    this.setDefaultValues();
    this.getPlayerImage();
  }

  setDefaultValues() {
    this.worldX = tileSize * 23;
    this.worldY = tileSize * 21;
    this.speed = 4;

    this.direction = "down";
  }

  getPlayerImage() {
    this.up1.src = "/sprites/player/boy_up_1.png";
    this.up2.src = "/sprites/player/boy_up_2.png";
    this.down1.src = "/sprites/player/boy_down_1.png";
    this.down2.src = "/sprites/player/boy_down_2.png";
    this.left1.src = "/sprites/player/boy_left_1.png";
    this.left2.src = "/sprites/player/boy_left_2.png";
    this.right1.src = "/sprites/player/boy_right_1.png";
    this.right2.src = "/sprites/player/boy_right_2.png";
  }

  update() {
    if (
      this.input.upPressed ||
      this.input.downPressed ||
      this.input.leftPressed ||
      this.input.rightPressed
    ) {
      if (this.input.upPressed) {
        this.direction = "up";
        this.worldY -= this.speed;
      } else if (this.input.downPressed) {
        this.direction = "down";
        this.worldY += this.speed;
      } else if (this.input.leftPressed) {
        this.direction = "left";
        this.worldX -= this.speed;
      } else if (this.input.rightPressed) {
        this.direction = "right";
        this.worldX += this.speed;
      }

      this.spriteCounter++;
      if (this.spriteCounter > 12) {
        if (this.spriteNum === 1) {
          this.spriteNum = 2;
        } else if (this.spriteNum === 2) {
          this.spriteNum = 1;
        }
        this.spriteCounter = 0;
      }
    } else {
      this.spriteNum = 1;
      this.spriteCounter = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    let image = this.down1;

    switch (this.direction) {
      case "up":
        image = this.spriteNum === 1 ? this.up1 : this.up2;
        break;
      case "down":
        image = this.spriteNum === 1 ? this.down1 : this.down2;
        break;
      case "left":
        image = this.spriteNum === 1 ? this.left1 : this.left2;
        break;
      case "right":
        image = this.spriteNum === 1 ? this.right1 : this.right2;
    }

    if (image.complete) {
      ctx.drawImage(image, this.screenX, this.screenY, tileSize, tileSize);
    }
  }
}
