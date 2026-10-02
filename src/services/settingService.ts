export type Settings = {
  version: 1;
  musicVolume: number;
  sfxVolume: number;
  muted: boolean;
  keys: {
    up: string;
    down: string;
    left: string;
    right: string;
  };
};

export const DEFAULT_SETTINGS: Settings = {
  version: 1,
  musicVolume: 70,
  sfxVolume: 80,
  muted: false,
  keys: { up: "KeyW", down: "KeyS", left: "KeyA", right: "KeyD" },
};

export function saveSettings(settings: Settings) {
  localStorage.setItem(KEY, JSON.stringify(settings));
}

export function loadSettings(): Settings {
  const text = localStorage.getItem(KEY);

  if (!text) return DEFAULT_SETTINGS;

  try {
    const data = JSON.parse(text);
    return data.version === 1
      ? { ...DEFAULT_SETTINGS, ...data }
      : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}
const KEY = "browser-rpg:settings";
