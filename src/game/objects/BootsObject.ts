import { SuperObject } from "./SuperObject";

export class BootsObject extends SuperObject {
  constructor() {
    super();
    this.name = "Boots";
    this.image.src = "/sprites/objects/boots.png";
  }
}
