import BackButton from "@/components/pixel/BackButton";
import KeyCap from "@/components/pixel/KeyCap";
import PixelButton from "@/components/pixel/PixelButton";
import PixelPanel from "@/components/pixel/PixelPanel";
import { cn } from "@/lib/utils";

const controls = [
  { action: "MOVE UP", key: "W" },
  { action: "MOVE DOWN", key: "S" },
  { action: "MOVE LEFT", key: "A" },
  { action: "MOVE RIGHT", key: "D" },
  { action: "PAUSE", key: "ESC" },
];

type Props = {
  onBack: () => void;
  // compact = mindre version som får plats ovanpå spelfönstret (pausmenyn)
  compact?: boolean;
};

// Innehållet i inställningarna. Används både av SettingsPage (egen sida)
// och SettingsOverlay (ovanpå spelet från pausmenyn).
// TODO (M8): koppla reglage, mute och tangenter till riktiga inställningar.
export default function SettingsContent({ onBack, compact = false }: Props) {
  const panel = compact ? "p-5" : "p-8";
  const text = compact ? "text-xs" : "text-sm";

  return (
    <>
      <div className={cn("grid", compact ? "grid-cols-2 gap-4" : "gap-12 lg:grid-cols-2")}>
        <PixelPanel as="section" className={cn("flex flex-col", compact ? "gap-5" : "gap-8", panel)}>
          <h2 className={compact ? "text-sm" : "text-lg"}>AUDIO</h2>

          <div className="flex flex-col gap-3">
            <div className={cn("flex justify-between", text)}>
              <label htmlFor="music-volume">MUSIC</label>
              <span>70</span>
            </div>
            <input
              id="music-volume"
              type="range"
              min={0}
              max={100}
              defaultValue={70}
              className="h-7 w-full cursor-pointer accent-primary"
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className={cn("flex justify-between", text)}>
              <label htmlFor="sfx-volume">SOUND EFFECTS</label>
              <span>80</span>
            </div>
            <input
              id="sfx-volume"
              type="range"
              min={0}
              max={100}
              defaultValue={80}
              className="h-7 w-full cursor-pointer accent-primary"
            />
          </div>

          <div className={cn("flex items-center gap-3.5", text)}>
            <input
              id="mute-all"
              type="checkbox"
              className="size-6 cursor-pointer accent-primary"
            />
            <label htmlFor="mute-all">MUTE ALL</label>
          </div>
        </PixelPanel>

        <PixelPanel as="section" className={cn("flex flex-col", compact ? "gap-2.5" : "gap-3.5", panel)}>
          <h2 className={cn("mb-2.5", compact ? "text-sm" : "text-lg")}>CONTROLS</h2>
          {controls.map((row) => (
            <div key={row.action} className={cn("flex items-center gap-3", text)}>
              <span className="grow">{row.action}</span>
              <KeyCap className={compact ? "h-9 min-w-12 text-xs" : "h-11 min-w-16 text-sm"}>
                {row.key}
              </KeyCap>
              <PixelButton
                variant="secondary"
                className={compact ? "min-h-9 px-2.5 text-[9px]" : "text-[11px]"}
              >
                Change
              </PixelButton>
            </div>
          ))}
        </PixelPanel>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6">
        <BackButton onClick={onBack} />
        <PixelButton variant="primary" className={compact ? "text-[10px]" : undefined}>
          Reset defaults
        </PixelButton>
      </div>
    </>
  );
}
