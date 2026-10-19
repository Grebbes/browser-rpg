import { SuperObject } from "./SuperObject";

export class ChestObject extends SuperObject {
  constructor() {
    super();
    this.name = "Chest";
    this.loadImage("chest");
  }
}
