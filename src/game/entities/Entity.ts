import type { CollisionChecker } from "../CollisionChecker";
import { scale, tileSize } from "../constants";
import type { Player } from "./Player";

export type Direction = "up" | "down" | "left" | "right";
export abstract class Entity {
  protected cChecker: CollisionChecker;
  constructor(cChecker: CollisionChecker) {
    this.cChecker = cChecker;
  }

  worldX = 0;
  worldY = 0;
  speed = 0;
  direction: Direction = "down";

  spriteCounter = 0;
  spriteNum = 1;
  actionLockCounter = 0;
  dialogues: string[] = [];
  dialogueIndex = 0;

  solidArea = { x: 0, y: 0, width: tileSize, height: tileSize };
  collisionOn = false;

  up1: HTMLCanvasElement | null = null;
  up2: HTMLCanvasElement | null = null;
  down1: HTMLCanvasElement | null = null;
  down2: HTMLCanvasElement | null = null;
  left1: HTMLCanvasElement | null = null;
  left2: HTMLCanvasElement | null = null;
  right1: HTMLCanvasElement | null = null;
  right2: HTMLCanvasElement | null = null;

  setAction() {}

  speak(player: Player): string | null {
    if (this.dialogueIndex >= this.dialogues.length) {
      this.dialogueIndex = 0;
      return null;
    }
    const line = this.dialogues[this.dialogueIndex];
    this.dialogueIndex++;

    if (player.direction === "up") {
      this.direction = "down";
    } else if (player.direction === "down") {
      this.direction = "up";
    } else if (player.direction === "left") {
      this.direction = "right";
    } else if (player.direction === "right") {
      this.direction = "left";
    }
    return line;
  }

  update(player: Player) {
    this.setAction();
    this.collisionOn = false;
    this.cChecker.checkTile(this);
    this.cChecker.checkObject(this, false);
    this.cChecker.checkPlayer(this, player);

    if (this.collisionOn === false) {
      switch (this.direction) {
        case "up":
          this.worldY -= this.speed;
          break;
        case "down":
          this.worldY += this.speed;
          break;
        case "left":
          this.worldX -= this.speed;
          break;
        case "right":
          this.worldX += this.speed;
          break;
      }

      this.spriteCounter++;

      if (this.spriteCounter >= 12) {
        this.spriteNum = this.spriteNum === 1 ? 2 : 1;
        this.spriteCounter = 0;
      }
    }
  }

  setup(imagePath: string) {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = `/sprites/${imagePath}.png`;
    return canvas;
  }

  draw(ctx: CanvasRenderingContext2D, player: Player) {
    const screenX = this.worldX - player.worldX + player.screenX;
    const screenY = this.worldY - player.worldY + player.screenY;

    if (
      this.worldX + tileSize > player.worldX - player.screenX &&
      this.worldX - tileSize < player.worldX + player.screenX &&
      this.worldY + tileSize > player.worldY - player.screenY &&
      this.worldY - tileSize < player.worldY + player.screenY
    ) {
      let image: HTMLCanvasElement | null = null;

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
          break;
      }
      if (image) {
        ctx.drawImage(
          image,
          screenX - 8 * scale,
          screenY + tileSize - 28 * scale,
        );
      }
    }
  }
}
