import { SuperObject } from "./SuperObject";

export class KeyObject extends SuperObject {
  constructor() {
    super();
    this.name = "Key";
    this.image.src = "/sprites/objects/key.png";
  }
}
