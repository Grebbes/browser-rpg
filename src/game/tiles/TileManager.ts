import { maxScreenCol, maxScreenRow, tileSize } from "../constants";
import map01 from "../maps/map01.txt?raw";
import { Tile } from "./Tile";

export class TileManager {
  tile: Tile[] = [];
  mapTileNum: number[][] = Array.from({ length: maxScreenCol }, () =>
    Array(maxScreenRow).fill(0),
  );

  constructor() {
    this.getTileImage();
    this.loadMap(map01);
  }

  getTileImage() {
    this.tile[0] = new Tile();
    this.tile[0].image.src = "/sprites/tiles/grass.png";

    this.tile[1] = new Tile();
    this.tile[1].image.src = "/sprites/tiles/wall.png";

    this.tile[2] = new Tile();
    this.tile[2].image.src = "/sprites/tiles/water.png";
  }

  loadMap(mapText: string) {
    const lines = mapText.trim().split("\n");
    for (let row = 0; row < maxScreenRow; row++) {
      const numbers = lines[row].trim().split(" ");

      for (let col = 0; col < maxScreenCol; col++) {
        this.mapTileNum[col][row] = Number(numbers[col]);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    let col = 0;
    let row = 0;
    let x = 0;
    let y = 0;

    while (col < maxScreenCol && row < maxScreenRow) {
      const tileNum = this.mapTileNum[col][row];
      const image = this.tile[tileNum].image;
      if (image.complete) {
        ctx.drawImage(image, x, y, tileSize, tileSize);
      }
      col++;
      x += tileSize;
      if (col === maxScreenCol) {
        col = 0;
        x = 0;
        row++;
        y += tileSize;
      }
    }
  }
}
