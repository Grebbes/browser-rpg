import { maxWorldCol, maxWorldRow, tileSize } from "./constants";
import { Entity, type Direction } from "./entities/Entity";
import type { Input } from "./Input";
import type { SuperObject } from "./objects/SuperObject";
import { intersects, type Rect } from "./Rect";
import type { TileManager } from "./tiles/TileManager";

export class EventHandler {
  private input: Input;
  private tileM: TileManager;
  private obj: (SuperObject | null)[];
  private startDialogue: (npc: Entity | null, text: string) => void;
  private startTransition: (onBlack: () => void) => void;
  private playSe: (i: number) => void;
  private eventRect: Rect = { x: 23, y: 23, width: 2, height: 2 };
  private eventDone: boolean[][] = Array.from({ length: maxWorldCol }, () =>
    Array(maxWorldRow).fill(false),
  );
  private previousEventX = 0;
  private previousEventY = 0;
  private canTouchEvent = true;

  constructor(
    input: Input,
    tileM: TileManager,
    obj: (SuperObject | null)[],
    startDialogue: (npc: Entity | null, text: string) => void,
    startTransition: (onBlack: () => void) => void,
    playSe: (i: number) => void,
  ) {
    this.input = input;
    this.tileM = tileM;
    this.obj = obj;
    this.startDialogue = startDialogue;
    this.startTransition = startTransition;
    this.playSe = playSe;
  }

  checkEvent(player: Entity) {
    const xDistance = Math.abs(player.worldX - this.previousEventX);
    const yDistance = Math.abs(player.worldY - this.previousEventY);
    const distance = Math.max(xDistance, yDistance);
    if (distance > tileSize) {
      this.canTouchEvent = true;
    }
    if (this.canTouchEvent) {
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
      if (this.hit(player, 20, 15, "left")) {
        this.swordFalls(20, 15);
      }
    }
  }

  hit(
    player: Entity,
    col: number,
    row: number,
    reqDirection: Direction | null,
  ): boolean {
    if (this.eventDone[col][row] === true) return false;
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
    this.playSe(5);
    this.startTransition(() => {
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
    });
  }

  healingFountain(player: Entity) {
    if (this.input.enterPressed) {
      this.playSe(6);
      this.startDialogue(
        null,
        "You drink from the ancient fountain.\nYour life has been restored.",
      );
      player.life = player.maxLife;
    }
  }

  swordFalls(col: number, row: number) {
    this.playSe(5);
    this.tileM.mapTileNum[19][16] = 26;
    this.obj[10] = null;
    this.startDialogue(
      null,
      "The ground gives way!\nThe sword tumbles into the darkness below...",
    );
    this.eventDone[col][row] = true;
  }
}
