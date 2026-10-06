import BackButton from "@/components/pixel/BackButton";
import KeyCap from "@/components/pixel/KeyCap";
import PixelButton from "@/components/pixel/PixelButton";
import PixelPanel from "@/components/pixel/PixelPanel";
import { cn } from "@/lib/utils";
import {
  loadSettings,
  saveSettings,
  type Settings,
} from "@/services/settingService";
import { useState } from "react";

const ARROWS: Record<string, string> = {
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
};

function keyLabel(code: string): string {
  if (code.startsWith("Key")) return code.slice(3);
  if (code.startsWith("Digit")) return code.slice(5);
  if (code in ARROWS) return ARROWS[code];
  if (code === "Space") return "Space";
  return code;
}

const controls: { action: string; id: keyof Settings["keys"] }[] = [
  { action: "MOVE UP", id: "up" },
  { action: "MOVE DOWN", id: "down" },
  { action: "MOVE LEFT", id: "left" },
  { action: "MOVE RIGHT", id: "right" },
];

type Props = {
  onBack: () => void;
  compact?: boolean;
  onChange?: (settings: Settings) => void;
};

export default function SettingsContent({
  onBack,
  compact = false,
  onChange,
}: Props) {
  const [settings, setSettings] = useState(() => loadSettings());
  const panel = compact ? "p-5" : "p-8";
  const text = compact ? "text-xs" : "text-sm";

  return (
    <>
      <div
        className={cn(
          "grid",
          compact ? "grid-cols-2 gap-4" : "gap-12 lg:grid-cols-2",
        )}
      >
        <PixelPanel
          as="section"
          className={cn("flex flex-col", compact ? "gap-5" : "gap-8", panel)}
        >
          <h2 className={compact ? "text-sm" : "text-lg"}>AUDIO</h2>

          <div className="flex flex-col gap-3">
            <div className={cn("flex justify-between", text)}>
              <label htmlFor="music-volume">MUSIC</label>
              <span>{settings.musicVolume}</span>
            </div>
            <input
              id="music-volume"
              type="range"
              min={0}
              max={100}
              value={settings.musicVolume}
              onChange={(e) => {
                const next = {
                  ...settings,
                  musicVolume: Number(e.target.value),
                };
                setSettings(next);
                saveSettings(next);
                onChange?.(next);
              }}
              className="h-7 w-full cursor-pointer accent-primary"
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className={cn("flex justify-between", text)}>
              <label htmlFor="sfx-volume">SOUND EFFECTS</label>
              <span>{settings.sfxVolume}</span>
            </div>
            <input
              id="sfx-volume"
              type="range"
              min={0}
              max={100}
              value={settings.sfxVolume}
              onChange={(e) => {
                const next = { ...settings, sfxVolume: Number(e.target.value) };
                setSettings(next);
                saveSettings(next);
                onChange?.(next);
              }}
              className="h-7 w-full cursor-pointer accent-primary"
            />
          </div>

          <div className={cn("flex items-center gap-3.5", text)}>
            <input
              id="mute-all"
              type="checkbox"
              checked={settings.muted}
              onChange={(e) => {
                const next = { ...settings, muted: e.target.checked };
                setSettings(next);
                saveSettings(next);
                onChange?.(next);
              }}
              className="size-6 cursor-pointer accent-primary"
            />
            <label htmlFor="mute-all">MUTE ALL</label>
          </div>
        </PixelPanel>

        <PixelPanel
          as="section"
          className={cn(
            "flex flex-col",
            compact ? "gap-2.5" : "gap-3.5",
            panel,
          )}
        >
          <h2 className={cn("mb-2.5", compact ? "text-sm" : "text-lg")}>
            CONTROLS
          </h2>
          {controls.map((row) => (
            <div
              key={row.action}
              className={cn("flex items-center gap-3", text)}
            >
              <span className="grow">{row.action}</span>
              <KeyCap
                className={
                  compact ? "h-9 min-w-12 text-xs" : "h-11 min-w-16 text-sm"
                }
              >
                {keyLabel(settings.keys[row.id])}
              </KeyCap>
              <PixelButton
                variant="secondary"
                className={
                  compact ? "min-h-9 px-2.5 text-[9px]" : "text-[11px]"
                }
              >
                Change
              </PixelButton>
            </div>
          ))}

          <div className={cn("flex items-center gap-3", text)}>
            <span className="grow">PAUSE</span>
            <KeyCap
              className={
                compact ? "h-9 min-w-12 text-xs" : "h-11 min-w-16 text-sm"
              }
            >
              ESC
            </KeyCap>
          </div>
        </PixelPanel>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6">
        <BackButton onClick={onBack} />
        <PixelButton
          variant="primary"
          className={compact ? "text-[10px]" : undefined}
        >
          Reset defaults
        </PixelButton>
      </div>
    </>
  );
}
