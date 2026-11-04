import { SuperObject } from "./SuperObject";

export class SwordObject extends SuperObject {
  constructor() {
    super();
    this.name = "Ancient Blade";
    this.loadImage("sword");
    this.collision = true;
  }
}
