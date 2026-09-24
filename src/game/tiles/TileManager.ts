import { maxWorldCol, maxWorldRow, tileSize } from "../constants";
import { Player } from "../entities/Player";
import world01 from "../maps/world01.txt?raw";
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
    this.tile[0] = new Tile();
    this.tile[0].image.src = "/sprites/tiles/grass.png";

    this.tile[1] = new Tile();
    this.tile[1].image.src = "/sprites/tiles/wall.png";
    this.tile[1].collision = true;

    this.tile[2] = new Tile();
    this.tile[2].image.src = "/sprites/tiles/water.png";
    this.tile[2].collision = true;

    this.tile[3] = new Tile();
    this.tile[3].image.src = "/sprites/tiles/earth.png";

    this.tile[4] = new Tile();
    this.tile[4].image.src = "/sprites/tiles/tree.png";
    this.tile[4].collision = true;

    this.tile[5] = new Tile();
    this.tile[5].image.src = "/sprites/tiles/sand.png";
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
        if (image.complete) {
          ctx.drawImage(image, screenX, screenY, tileSize, tileSize);
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
