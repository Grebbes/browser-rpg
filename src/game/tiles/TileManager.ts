import { maxWorldCol, maxWorldRow, tileSize } from "../constants";
import { Player } from "../entities/Player";
import world01 from "../maps/world01.txt?raw";
import { scaleImage } from "../scaleImage";
import { Tile } from "./Tile";

export class TileManager {
  tile: Tile[] = [];
  mapTileNum: number[][] = Array.from({ length: maxWorldCol }, () =>
    Array(maxWorldRow).fill(0),
  );

  constructor() {
    this.getTileImage();
    this.loadMap(world01);
  }

  getTileImage() {
    this.setup(0, "grass", false);
    this.setup(1, "wall", true);
    this.setup(2, "water", true);
    this.setup(3, "earth", false);
    this.setup(4, "tree", true);
    this.setup(5, "sand", false);
  }

  setup(index: number, imageName: string, collision: boolean) {
    this.tile[index] = new Tile();
    const img = new Image();
    img.onload = () => {
      this.tile[index].image = scaleImage(img, tileSize, tileSize);
    };
    img.src = `/sprites/tiles/${imageName}.png`;
    this.tile[index].collision = collision;
  }

  loadMap(mapText: string) {
    const lines = mapText.trim().split("\n");
    for (let row = 0; row < maxWorldRow; row++) {
      const numbers = lines[row].trim().split(" ");

      for (let col = 0; col < maxWorldCol; col++) {
        this.mapTileNum[col][row] = Number(numbers[col]);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, player: Player) {
    let worldCol = 0;
    let worldRow = 0;

    while (worldCol < maxWorldCol && worldRow < maxWorldRow) {
      const tileNum = this.mapTileNum[worldCol][worldRow];

      const worldX = worldCol * tileSize;
      const worldY = worldRow * tileSize;
      const screenX = worldX - player.worldX + player.screenX;
      const screenY = worldY - player.worldY + player.screenY;

      if (
        worldX + tileSize > player.worldX - player.screenX &&
        worldX - tileSize < player.worldX + player.screenX &&
        worldY + tileSize > player.worldY - player.screenY &&
        worldY - tileSize < player.worldY + player.screenY
      ) {
        const image = this.tile[tileNum].image;
        if (image) {
          ctx.drawImage(image, screenX, screenY);
        }
      }

      worldCol++;
      if (worldCol === maxWorldCol) {
        worldCol = 0;
        worldRow++;
      }
    }
  }
}
