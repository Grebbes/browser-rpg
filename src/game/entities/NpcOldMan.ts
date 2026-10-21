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
    this.dialogues[0] = "Oh! A visitor... It has been\nquite some time.";
    this.dialogues[1] =
      "I have lived on this island longer\nthan I can remember. I've seen all sorts\ncome and go... people, and creatures.";
    this.dialogues[2] = "Most leave. Some never do...";
    this.dialogues[3] =
      "You're looking for the old man, yes?\nI saw them take him. Hooded ones,\nwith chains... into the caves.";
    this.dialogues[4] =
      "This island seems calm, doesn't it?\nBut deep below, something stirs...";
    this.dialogues[5] =
      "If you mean to save him, you must\ngo down there. But dressed like that?\nHa! You wouldn't last a moment.";
    this.dialogues[6] =
      "Search the island first.\nWho knows what you might find...";
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
