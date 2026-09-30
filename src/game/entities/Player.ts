import type { CollisionChecker } from "../CollisionChecker";
import { scale, screenHeight, screenWidth, tileSize } from "../constants";
import { Input } from "../Input";
import { SuperObject } from "../objects/SuperObject";
import { UI } from "../UI";
import { Entity } from "./Entity";

const CELL = 32;
const ANIM_ROW = { idle: 0, walk: 4, attack: 8, hurt: 12, die: 16 };
const DIR_ROW = { down: 0, up: 1, left: 2, right: 3 };

export class Player extends Entity {
  private input: Input;
  private cChecker: CollisionChecker;
  private obj: (SuperObject | null)[];
  private playSe: (i: number) => void;
  private ui: UI;
  hasKeys = 0;
  readonly screenX = screenWidth / 2 - tileSize / 2;
  readonly screenY = screenHeight / 2 - tileSize / 2;
  private sheet = new Image();
  private frame = 0;
  private moving = false;

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
    this.sheet.src = "/sprites/hero/hero-frames-32x32.png";
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

      this.moving = true;
      this.spriteCounter++;
      if (this.spriteCounter > 8) {
        this.frame = (this.frame + 1) % 4;
        this.spriteCounter = 0;
      }
    } else {
      if (this.moving) {
        this.moving = false;
        this.frame = 0;
        this.spriteCounter = 0;
      }
      this.spriteCounter++;
      if (this.spriteCounter > 30) {
        this.frame = (this.frame + 1) % 4;
        this.spriteCounter = 0;
      }
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
    if (!this.sheet.complete) return;

    const anim = this.moving ? "walk" : "idle";
    const row = ANIM_ROW[anim] + DIR_ROW[this.direction];
    const frame = this.frame;

    ctx.drawImage(
      this.sheet,
      frame * CELL,
      row * CELL,
      CELL,
      CELL,
      this.screenX - 8 * scale,
      this.screenY + tileSize - 28 * scale,
      CELL * scale,
      CELL * scale,
    );
  }
}

