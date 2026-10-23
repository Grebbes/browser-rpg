import { maxWorldCol, maxWorldRow, tileSize } from "../constants";
import { Player } from "../entities/Player";
import world02 from "../maps/world02.txt?raw";
import { scaleImage } from "../scaleImage";
import { Tile } from "./Tile";

export class TileManager {
  tile: Tile[] = [];
  mapTileNum: number[][] = Array.from({ length: maxWorldCol }, () =>
    Array(maxWorldRow).fill(0),
  );
  animOrder = [0, 1, 0, 2];
  animStep = 0;
  animCounter = 0;

  constructor() {
    this.getTileImage();
    this.loadMap(world02);
  }

  update() {
    this.animCounter++;
    if (this.animCounter >= 15) {
      this.animCounter = 0;
      this.animStep = (this.animStep + 1) % this.animOrder.length;
    }
  }

  getTileImage() {
    this.setup(0, "grass", false);
    this.setup(1, "wall", true);
    this.setupAnimation(2, ["water", "water_2", "water_3"], true);
    this.setup(3, "earth", false);
    this.setup(4, "tree", true);
    this.setup(5, "sand", false);
    this.setupAnimation(6, ["tallgrass", "tallgrass_2", "tallgrass_3"], false);
    this.setupAnimation(7, ["flowers", "flowers_2", "flowers_3"], false);
    this.setup(8, "bush", true);
    this.setup(9, "rock", true);
    this.setupAnimation(10, ["shore_n", "shore_n_2", "shore_n_3"], true);
    this.setupAnimation(11, ["shore_s", "shore_s_2", "shore_s_3"], true);
    this.setupAnimation(12, ["shore_w", "shore_w_2", "shore_w_3"], true);
    this.setupAnimation(13, ["shore_e", "shore_e_2", "shore_e_3"], true);
    this.setupAnimation(14, ["shore_nw", "shore_nw_2", "shore_nw_3"], true);
    this.setupAnimation(15, ["shore_ne", "shore_ne_2", "shore_ne_3"], true);
    this.setupAnimation(16, ["shore_sw", "shore_sw_2", "shore_sw_3"], true);
    this.setupAnimation(17, ["shore_se", "shore_se_2", "shore_se_3"], true);
    this.setupAnimation(
      18,
      ["shore_out_nw", "shore_out_nw_2", "shore_out_nw_3"],
      true,
    );
    this.setupAnimation(
      19,
      ["shore_out_ne", "shore_out_ne_2", "shore_out_ne_3"],
      true,
    );
    this.setupAnimation(
      20,
      ["shore_out_sw", "shore_out_sw_2", "shore_out_sw_3"],
      true,
    );
    this.setupAnimation(
      21,
      ["shore_out_se", "shore_out_se_2", "shore_out_se_3"],
      true,
    );
    this.setup(22, "cave", false);
    this.setup(23, "pit_hidden", false);
    this.setup(24, "pit", true);
    this.setupAnimation(25, ["fountain", "fountain_2", "fountain_3"], true);
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

  setupAnimation(index: number, imageNames: string[], collision: boolean) {
    this.tile[index] = new Tile();
    imageNames.forEach((name, i) => {
      const img = new Image();
      img.onload = () => {
        this.tile[index].frames[i] = scaleImage(img, tileSize, tileSize);
      };
      img.src = `/sprites/tiles/${name}.png`;
    });
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
        const tile = this.tile[tileNum];
        const image =
          tile.frames.length > 0
            ? tile.frames[this.animOrder[this.animStep]]
            : tile.image;
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
