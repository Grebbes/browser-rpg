import type { CollisionChecker } from "../CollisionChecker";
import { screenHeight, screenWidth, tileSize } from "../constants";
import { Input } from "../Input";
import { SuperObject } from "../objects/SuperObject";
import { UI } from "../UI";
import { Entity } from "./Entity";

export class Player extends Entity {
  private input: Input;
  private cChecker: CollisionChecker;
  private obj: (SuperObject | null)[];
  private playSe: (i: number) => void;
  private ui: UI;
  hasKeys = 0;
  readonly screenX = screenWidth / 2 - tileSize / 2;
  readonly screenY = screenHeight / 2 - tileSize / 2;

  constructor(
    input: Input,
    cChecker: CollisionChecker,
    obj: (SuperObject | null)[],
    playSe: (i: number) => void,
    ui: UI,
  ) {
    super();
    this.input = input;
    this.cChecker = cChecker;
    this.solidArea = { x: 8, y: 16, width: 32, height: 32 };
    this.setDefaultValues();
    this.getPlayerImage();
    this.obj = obj;
    this.playSe = playSe;
    this.ui = ui;
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
      } else if (this.input.downPressed) {
        this.direction = "down";
      } else if (this.input.leftPressed) {
        this.direction = "left";
      } else if (this.input.rightPressed) {
        this.direction = "right";
      }

      this.collisionOn = false;
      this.cChecker.checkTile(this);

      const objectIndex = this.cChecker.checkObject(this, true);
      this.pickUpObject(objectIndex);

      if (!this.collisionOn) {
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

  pickUpObject(i: number | null) {
    if (i === null) return;
    const o = this.obj[i];
    if (!o) return;

    switch (o.name) {
      case "Key":
        this.playSe(1);
        this.hasKeys++;
        this.obj[i] = null;
        this.ui.showMessage("You got a key!");
        break;

      case "Door":
        if (this.hasKeys > 0) {
          this.playSe(3);
          this.obj[i] = null;
          this.ui.showMessage("You oppened the door!");
          this.hasKeys--;
        } else {
          this.ui.showMessage("The door is locked");
        }
        console.log("you now have", this.hasKeys);
        break;

      case "Boots":
        this.playSe(2);
        this.speed += 1;
        this.obj[i] = null;
        this.ui.showMessage("You feel faster!");
        break;

      case "Chest":
        this.ui.gameFinished = true;
        break;
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
