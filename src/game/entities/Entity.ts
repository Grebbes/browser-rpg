export type Direction = "up" | "down" | "left" | "right";
export class Entity {
  x = 0;
  y = 0;
  speed = 0;
  direction: Direction = "down";

  spriteCounter = 0;
  spriteNum = 1;

  up1 = new Image();
  up2 = new Image();
  down1 = new Image();
  down2 = new Image();
  left1 = new Image();
  left2 = new Image();
  right1 = new Image();
  right2 = new Image();
}
