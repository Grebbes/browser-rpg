import { tileSize } from "./constants";
import { Entity, type Direction } from "./entities/Entity";
import type { Input } from "./Input";
import { intersects, type Rect } from "./Rect";
import type { TileManager } from "./tiles/TileManager";

export class EventHandler {
  private input: Input;
  private tileM: TileManager;
  private startDialogue: (npc: Entity | null, text: string) => void;
  private eventRect: Rect = { x: 23, y: 23, width: 2, height: 2 };

  constructor(
    input: Input,
    tileM: TileManager,
    startDialogue: (npc: Entity | null, text: string) => void,
  ) {
    this.input = input;
    this.tileM = tileM;
    this.startDialogue = startDialogue;
  }

  checkEvent(player: Entity) {
    if (this.hit(player, 29, 28, null)) {
      this.pitTrap(player, 29, 28);
    }
    if (
      this.hit(player, 19, 31, "up") ||
      this.hit(player, 19, 29, "down") ||
      this.hit(player, 18, 30, "right") ||
      this.hit(player, 20, 30, "left")
    ) {
      this.healingFountain(player);
    }
  }

  hit(
    player: Entity,
    col: number,
    row: number,
    reqDirection: Direction | null,
  ): boolean {
    const playerRect: Rect = {
      x: player.worldX + player.solidArea.x,
      y: player.worldY + player.solidArea.y,
      width: player.solidArea.width,
      height: player.solidArea.height,
    };
    const eventWorldRect: Rect = {
      x: col * tileSize + this.eventRect.x,
      y: row * tileSize + this.eventRect.y,
      width: this.eventRect.width,
      height: this.eventRect.height,
    };

    if (intersects(playerRect, eventWorldRect)) {
      if (player.direction === reqDirection || reqDirection === null) {
        return true;
      }
    }
    return false;
  }

  pitTrap(player: Entity, col: number, row: number) {
    this.startDialogue(null, "The leaves give way...\nYou fall into a pit!");
    player.life--;
    this.tileM.mapTileNum[col][row] = 24;

    let backCol = col;
    let backRow = row;

    switch (player.direction) {
      case "up":
        backRow++;
        break;
      case "down":
        backRow--;
        break;
      case "left":
        backCol++;
        break;
      case "right":
        backCol--;
        break;
    }

    player.worldX = backCol * tileSize;
    player.worldY = backRow * tileSize;
  }

  healingFountain(player: Entity) {
    if (this.input.enterPressed) {
      this.startDialogue(
        null,
        "You drink from the ancient fountain.\nYour life has been restored.",
      );
      player.life = player.maxLife;
    }
  }
}
