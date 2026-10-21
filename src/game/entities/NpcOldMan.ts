import type { CollisionChecker } from "../CollisionChecker";
import { Entity } from "./Entity";

export class NpcOldMan extends Entity {
  constructor(cChecker: CollisionChecker) {
    super(cChecker);
    this.direction = "down";
    this.speed = 1;
    this.getImage();
    this.setDialogue();
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

  setDialogue() {
    this.dialogues[0] =
      "You came looking for the old man, didn't you?\nI saw them drag him off the boat in chains.";
    this.dialogues[1] =
      "Hooded figures, carrying him toward the caves.\nThis island looks peaceful up here,\nbut something rules below ground.";
    this.dialogues[2] =
      "If you want him back, you'll have to go down there.\nThough I wouldn't go into those caves\nlooking like that.";
    this.dialogues[3] =
      "Take a look around the island first.\nYou'd be surprised what people\nleave lying about.";
  }

  setAction() {
    this.actionLockCounter++;
    if (this.actionLockCounter === 120) {
      const i = Math.floor(Math.random() * 100) + 1;
      if (i <= 25) {
        this.direction = "up";
      } else if (i <= 50) {
        this.direction = "down";
      } else if (i <= 75) {
        this.direction = "left";
      } else {
        this.direction = "right";
      }
      this.actionLockCounter = 0;
    }
  }
}
