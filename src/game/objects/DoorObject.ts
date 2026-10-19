import { SuperObject } from "./SuperObject";

export class DoorObject extends SuperObject {
  constructor() {
    super();
    this.name = "Door";
    this.loadImage("door");
    this.collision = true;
  }
}
