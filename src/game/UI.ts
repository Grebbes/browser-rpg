import { screenHeight, screenWidth, tileSize } from "./constants";

const FONT = "'Press Start 2P'";

export class UI {
  private font = `20px ${FONT}`;

  private messageOn = false;
  private message = "";
  private messageCounter = 0;
  gameFinished = false;

  showMessage(text: string) {
    this.message = text;
    this.messageOn = true;
    this.messageCounter = 0;
  }

  get currentMessage(): string | null {
    return this.messageOn ? this.message : null;
  }

  update() {
    if (!this.messageOn) return;

    this.messageCounter++;
    if (this.messageCounter > 120) {
      this.messageCounter = 0;
      this.messageOn = false;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.font = this.font;
    ctx.fillStyle = "white";
    ctx.textBaseline = "top";

    if (this.gameFinished) {
      ctx.textAlign = "center";

      ctx.font = `20px ${FONT}`;
      ctx.fillText(
        "You finished the Game",
        screenWidth / 2,
        screenHeight / 2 - tileSize * 3,
      );
      ctx.fillText(
        "and found the treasure!",
        screenWidth / 2,
        screenHeight / 2 - tileSize * 2.5,
      );

      ctx.font = `40px ${FONT}`;
      ctx.fillStyle = "yellow";
      ctx.fillText(
        "Congratulations!",
        screenWidth / 2,
        screenHeight / 2 + tileSize * 2,
      );

      ctx.textAlign = "left";
      return;
    }
  }
}
