import { SuperObject } from "./SuperObject";

export class DoorObject extends SuperObject {
  constructor() {
    super();
    this.name = "Door";
    this.image.src = "/sprites/objects/door.png";
  }
}
