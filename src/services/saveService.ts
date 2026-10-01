import type { SaveData } from "@/game/types";

const SLOTS = [1, 2, 3];
const key = (slot: number) => `browser-rpg:save:${slot}`;

export function saveGame(data: SaveData) {
  localStorage.setItem(key(data.slot), JSON.stringify(data));
}

export function loadGame(slot: number): SaveData | null {
  const text = localStorage.getItem(key(slot));
  if (!text) return null;

  try {
    const data = JSON.parse(text) as SaveData;
    return data.version === 1 ? data : null;
  } catch {
    return null;
  }
}

export function deleteSave(slot: number) {
  localStorage.removeItem(key(slot));
}

export function listSaves(): (SaveData | null)[] {
  return SLOTS.map((slot) => loadGame(slot));
}
