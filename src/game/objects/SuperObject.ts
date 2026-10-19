import { tileSize } from "../constants";
import type { Player } from "../entities/Player";
import { scaleImage } from "../scaleImage";

export class SuperObject {
  image: HTMLCanvasElement | null = null;
  name = "";
  collision = false;
  worldX = 0;
  worldY = 0;

  solidArea = { x: 0, y: 0, height: tileSize, width: tileSize };

  loadImage(name: string) {
    const img = new Image();
    img.onload = () => {
      this.image = scaleImage(img, tileSize, tileSize);
    };
    img.src = `/sprites/objects/${name}.png`;
  }

  draw(ctx: CanvasRenderingContext2D, player: Player) {
    const screenX = this.worldX - player.worldX + player.screenX;
    const screenY = this.worldY - player.worldY + player.screenY;

    if (
      this.worldX + tileSize > player.worldX - player.screenX &&
      this.worldX - tileSize < player.worldX + player.screenX &&
      this.worldY + tileSize > player.worldY - player.screenY &&
      this.worldY - tileSize < player.worldY + player.screenY
    ) {
      if (this.image) {
        ctx.drawImage(this.image, screenX, screenY);
      }
    }
  }
}
