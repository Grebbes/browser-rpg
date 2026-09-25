import { tileSize } from "./constants";
import { ChestObject } from "./objects/ChestObject";
import { DoorObject } from "./objects/DoorObject";
import { KeyObject } from "./objects/KeyObject";
import type { SuperObject } from "./objects/SuperObject";

export class AssetSetter {
  private obj: (SuperObject | null)[];

  constructor(obj: (SuperObject | null)[]) {
    this.obj = obj;
  }

  private place(slot: number, object: SuperObject, col: number, row: number) {
    object.worldX = col * tileSize;
    object.worldY = row * tileSize;
    this.obj[slot] = object;
  }

  setObject() {
    this.place(0, new KeyObject(), 23, 7);
    this.place(1, new KeyObject(), 23, 40);
    this.place(2, new KeyObject(), 38, 8);
    this.place(3, new DoorObject(), 10, 11);
    this.place(4, new DoorObject(), 8, 28);
    this.place(5, new DoorObject(), 12, 22);
    this.place(6, new ChestObject(), 10, 7);
  }
}
