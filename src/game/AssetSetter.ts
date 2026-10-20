import { tileSize } from "./constants";
import type { Entity } from "./entities/Entity";
import { NpcOldMan } from "./entities/NpcOldMan";
import { BootsObject } from "./objects/BootsObject";
import { ChestObject } from "./objects/ChestObject";
import { DoorObject } from "./objects/DoorObject";
import { KeyObject } from "./objects/KeyObject";
import type { SuperObject } from "./objects/SuperObject";

export class AssetSetter {
  private obj: (SuperObject | null)[];
  private npc: (Entity | null)[];

  constructor(obj: (SuperObject | null)[], npc: (Entity | null)[]) {
    this.obj = obj;
    this.npc = npc;
  }

  private place(slot: number, object: SuperObject, col: number, row: number) {
    object.worldX = col * tileSize;
    object.worldY = row * tileSize;
    this.obj[slot] = object;
  }

  setObject() {
    this.place(0, new KeyObject(), 10, 15);
    this.place(1, new KeyObject(), 30, 9);
    this.place(2, new KeyObject(), 39, 12);
    this.place(3, new KeyObject(), 40, 9);
    this.place(4, new DoorObject(), 24, 26);
    this.place(5, new DoorObject(), 35, 18);
    this.place(6, new DoorObject(), 23, 14);
    this.place(7, new DoorObject(), 38, 21);
    this.place(8, new ChestObject(), 22, 10);
    this.place(9, new BootsObject(), 39, 23);
  }

  setNpc() {
    const oldMan = new NpcOldMan();
    oldMan.worldX = tileSize * 21;
    oldMan.worldY = tileSize * 34;
    this.npc[0] = oldMan;
  }
}
