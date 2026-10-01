import type { Direction } from "./entities/Entity";

export type HudState = {
  keys: number;
  message: string | null;
};

export type SaveData = {
  version: 1;
  slot: number;
  savedAt: string;
  player: {
    worldX: number;
    worldY: number;
    direction: Direction;
    speed: number;
    hasKeys: number;
  };

  removedObjects: number[];
};
