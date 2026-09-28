import { screenHeight, screenWidth, tileSize } from "./constants";
import type { Player } from "./entities/Player";
import { KeyObject } from "./objects/KeyObject";

const FONT = "'Press Start 2P'";

export class UI {
  private font = `20px ${FONT}`;
  private keyImage = new KeyObject().image;
  private messageOn = false;
  private message = "";
  private messageCounter = 0;
  gameFinished = false;

  showMessage(text: string) {
    this.message = text;
    this.messageOn = true;
    this.messageCounter = 0;
  }

  draw(ctx: CanvasRenderingContext2D, player: Player) {
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

    if (this.keyImage.complete) {
      ctx.drawImage(
        this.keyImage,
        tileSize / 2,
        tileSize / 2,
        tileSize,
        tileSize,
      );
    }
    ctx.fillText("x " + player.hasKeys, 74, 38);

    if (this.messageOn) {
      ctx.font = `14px ${FONT}`;
      ctx.fillText(this.message, tileSize / 2, tileSize * 5);

      this.messageCounter++;
      if (this.messageCounter > 120) {
        this.messageCounter = 0;
        this.messageOn = false;
      }
    }
  }
}
