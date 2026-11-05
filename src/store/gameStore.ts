import type { HudState } from "@/game/types";
import { create } from "zustand";

type GameStore = HudState & {
  setHud: (hud: HudState) => void;
};

export const useGameStore = create<GameStore>()((set) => ({
  keys: 0,
  life: 0,
  maxLife: 0,
  message: null,
  dialogue: null,
  setHud: (hud) => set(hud),
}));
