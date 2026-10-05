import type { Settings } from "@/services/settingService";
import { DEFAULT_SETTINGS } from "@/services/settingService";

export class Input {
  upPressed = false;
  downPressed = false;
  leftPressed = false;
  rightPressed = false;

  private keys: Settings["keys"] = DEFAULT_SETTINGS.keys;

  setKeys(newKeys: Settings["keys"]) {
    this.keys = newKeys;
  }

  constructor() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  destroy() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === this.keys.up) this.upPressed = true;
    if (e.code === this.keys.down) this.downPressed = true;
    if (e.code === this.keys.left) this.leftPressed = true;
    if (e.code === this.keys.right) this.rightPressed = true;
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === this.keys.up) this.upPressed = false;
    if (e.code === this.keys.down) this.downPressed = false;
    if (e.code === this.keys.left) this.leftPressed = false;
    if (e.code === this.keys.right) this.rightPressed = false;
  };
}
