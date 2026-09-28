import { tileSize } from "../constants";
import type { Player } from "../entities/Player";

export class SuperObject {
  image = new Image();
  name = "";
  collision = false;
  worldX = 0;
  worldY = 0;

  solidArea = { x: 0, y: 0, height: tileSize, width: tileSize };

  draw(ctx: CanvasRenderingContext2D, player: Player) {
    const screenX = this.worldX - player.worldX + player.screenX;
    const screenY = this.worldY - player.worldY + player.screenY;

    if (
      this.worldX + tileSize > player.worldX - player.screenX &&
      this.worldX - tileSize < player.worldX + player.screenX &&
      this.worldY + tileSize > player.worldY - player.screenY &&
      this.worldY - tileSize < player.worldY + player.screenY
    ) {
      if (this.image.complete) {
        ctx.drawImage(this.image, screenX, screenY, tileSize, tileSize);
      }
    }
  }
}
