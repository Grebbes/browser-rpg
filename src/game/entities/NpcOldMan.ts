import { Entity } from "./Entity";

export class NpcOldMan extends Entity {
  constructor() {
    super();
    this.direction = "down";
    this.speed = 1;
    this.getImage();
  }

  getImage() {
    this.up1 = this.setup("npc/oldman_up_1");
    this.up2 = this.setup("npc/oldman_up_2");
    this.down1 = this.setup("npc/oldman_down_1");
    this.down2 = this.setup("npc/oldman_down_2");
    this.left1 = this.setup("npc/oldman_left_1");
    this.left2 = this.setup("npc/oldman_left_2");
    this.right1 = this.setup("npc/oldman_right_1");
    this.right2 = this.setup("npc/oldman_right_2");
  }
}
