import type { CollisionChecker } from "../CollisionChecker";
import { scale, screenHeight, screenWidth, tileSize } from "../constants";
import { Input } from "../Input";
import { SuperObject } from "../objects/SuperObject";
import { scaleImage } from "../scaleImage";
import { UI } from "../UI";
import { Entity } from "./Entity";

const CELL = 32;
const ANIM_ROW = { idle: 0, walk: 4, attack: 8, hurt: 12, die: 16 };
const DIR_ROW = { down: 0, up: 1, left: 2, right: 3 };
const RUN_TICKS = [7, 5, 7, 5];

export class Player extends Entity {
  private input: Input;
  private obj: (SuperObject | null)[];
  private npc: (Entity | null)[];
  private playSe: (i: number) => void;
  private ui: UI;
  private startDialogue: (npc: Entity, text: string) => void;
  hasKeys = 0;
  readonly screenX = screenWidth / 2 - tileSize / 2;
  readonly screenY = screenHeight / 2 - tileSize / 2;
  private sheet: HTMLCanvasElement | null = null;
  private frame = 0;
  private moving = false;

  constructor(
    input: Input,
    cChecker: CollisionChecker,
    obj: (SuperObject | null)[],
    npc: (Entity | null)[],
    playSe: (i: number) => void,
    ui: UI,
    startDialogue: (npc: Entity, text: string) => void,
  ) {
    super(cChecker);
    this.input = input;
    this.solidArea = { x: 8, y: 16, width: 32, height: 32 };
    this.setDefaultValues();
    this.getPlayerImage();
    this.obj = obj;
    this.npc = npc;
    this.playSe = playSe;
    this.ui = ui;
    this.startDialogue = startDialogue;
  }

  setDefaultValues() {
    this.worldX = tileSize * 24;
    this.worldY = tileSize * 36;
    this.speed = 4;

    this.maxLife = 6;
    this.life = this.maxLife;

    this.direction = "down";
  }

  getPlayerImage() {
    const img = new Image();
    img.onload = () => {
      this.sheet = scaleImage(img, img.width * scale, img.height * scale);
    };
    img.src = "/sprites/hero/hero-frames-32x32.png";
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
      const npcIndex = this.cChecker.checkEntity(this, this.npc);
      this.interactNpc(npcIndex);

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
      if (this.spriteCounter >= RUN_TICKS[this.frame]) {
        this.frame = (this.frame + 1) % 4;
        this.spriteCounter = 0;
      }
    } else {
      if (this.input.enterPressed) {
        const npcIndex = this.cChecker.checkEntity(this, this.npc);
        this.interactNpc(npcIndex);
      }
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
    this.input.enterPressed = false;
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

  interactNpc(i: number | null) {
    if (i === null) return;

    if (this.input.enterPressed) {
      const npc = this.npc[i];
      if (!npc) return;
      const dialogue = npc.speak(this);
      if (dialogue) {
        this.startDialogue(npc, dialogue);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.sheet) return;

    const anim = this.moving ? "walk" : "idle";
    const row = ANIM_ROW[anim] + DIR_ROW[this.direction];
    const frame = this.frame;
    const size = CELL * scale;

    ctx.drawImage(
      this.sheet,
      frame * size,
      row * size,
      size,
      size,
      this.screenX - 8 * scale,
      this.screenY + tileSize - 28 * scale,
      size,
      size,
    );
  }
}
