export class Input {
  upPressed = false;
  downPressed = false;
  leftPressed = false;
  rightPressed = false;

  constructor() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  destroy() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "KeyW") this.upPressed = true;
    if (e.code === "KeyS") this.downPressed = true;
    if (e.code === "KeyA") this.leftPressed = true;
    if (e.code === "KeyD") this.rightPressed = true;
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === "KeyW") this.upPressed = false;
    if (e.code === "KeyS") this.downPressed = false;
    if (e.code === "KeyA") this.leftPressed = false;
    if (e.code === "KeyD") this.rightPressed = false;
  };
}
