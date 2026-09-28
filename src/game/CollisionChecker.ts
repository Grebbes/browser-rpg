import { intersects, type Rect } from "./Rect";
import { tileSize } from "./constants";
import { Entity } from "./entities/Entity";
import { SuperObject } from "./objects/SuperObject";
import { TileManager } from "./tiles/TileManager";

export class CollisionChecker {
  private tileM: TileManager;
  private obj: (SuperObject | null)[];

  constructor(tileM: TileManager, obj: (SuperObject | null)[]) {
    this.tileM = tileM;
    this.obj = obj;
  }

  checkTile(entity: Entity) {
    const entityLeftWorldX = entity.worldX + entity.solidArea.x;
    const entityRightWorldX =
      entity.worldX + entity.solidArea.x + entity.solidArea.width;
    const entityTopWorldY = entity.worldY + entity.solidArea.y;
    const entityBottomWorldY =
      entity.worldY + entity.solidArea.y + entity.solidArea.height;

    let entityLeftCol = Math.floor(entityLeftWorldX / tileSize);
    let entityRightCol = Math.floor(entityRightWorldX / tileSize);
    let entityTopRow = Math.floor(entityTopWorldY / tileSize);
    let entityBottomRow = Math.floor(entityBottomWorldY / tileSize);

    let tileNum1: number;
    let tileNum2: number;

    switch (entity.direction) {
      case "up":
        entityTopRow = Math.floor((entityTopWorldY - entity.speed) / tileSize);
        tileNum1 = this.tileM.mapTileNum[entityLeftCol][entityTopRow];
        tileNum2 = this.tileM.mapTileNum[entityRightCol][entityTopRow];
        if (
          this.tileM.tile[tileNum1].collision ||
          this.tileM.tile[tileNum2].collision
        ) {
          entity.collisionOn = true;
        }
        break;
      case "down":
        entityBottomRow = Math.floor(
          (entityTopWorldY + entity.speed) / tileSize,
        );
        tileNum1 = this.tileM.mapTileNum[entityLeftCol][entityBottomRow];
        tileNum2 = this.tileM.mapTileNum[entityRightCol][entityBottomRow];
        if (
          this.tileM.tile[tileNum1].collision ||
          this.tileM.tile[tileNum2].collision
        ) {
          entity.collisionOn = true;
        }
        break;
      case "left":
        entityLeftCol = Math.floor(
          (entityLeftWorldX - entity.speed) / tileSize,
        );
        tileNum1 = this.tileM.mapTileNum[entityLeftCol][entityTopRow];
        tileNum2 = this.tileM.mapTileNum[entityLeftCol][entityBottomRow];
        if (
          this.tileM.tile[tileNum1].collision ||
          this.tileM.tile[tileNum2].collision
        ) {
          entity.collisionOn = true;
        }
        break;
      case "right":
        entityRightCol = Math.floor(
          (entityRightWorldX + entity.speed) / tileSize,
        );
        tileNum1 = this.tileM.mapTileNum[entityRightCol][entityTopRow];
        tileNum2 = this.tileM.mapTileNum[entityRightCol][entityBottomRow];
        if (
          this.tileM.tile[tileNum1].collision ||
          this.tileM.tile[tileNum2].collision
        ) {
          entity.collisionOn = true;
        }
        break;
    }
  }

  checkObject(entity: Entity, player: boolean): number | null {
    let index: number | null = null;

    const entityRect: Rect = {
      x: entity.worldX + entity.solidArea.x,
      y: entity.worldY + entity.solidArea.y,
      width: entity.solidArea.width,
      height: entity.solidArea.height,
    };
    switch (entity.direction) {
      case "up":
        entityRect.y -= entity.speed;
        break;
      case "down":
        entityRect.y += entity.speed;
        break;
      case "left":
        entityRect.x -= entity.speed;
        break;
      case "right":
        entityRect.x += entity.speed;
        break;
    }

    for (let i = 0; i < this.obj.length; i++) {
      const o = this.obj[i];
      if (!o) continue;

      const objRect: Rect = {
        x: o.worldX + o.solidArea.x,
        y: o.worldY + o.solidArea.y,
        width: o.solidArea.width,
        height: o.solidArea.height,
      };

      if (intersects(entityRect, objRect)) {
        if (o.collision) entity.collisionOn = true;
        if (player) index = i;
      }
    }

    return index;
  }
}
