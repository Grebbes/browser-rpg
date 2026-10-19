import { SuperObject } from "./SuperObject";

export class BootsObject extends SuperObject {
  constructor() {
    super();
    this.name = "Boots";
    this.loadImage("boots");
  }
}
