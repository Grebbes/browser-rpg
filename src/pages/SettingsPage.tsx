import BackButton from "@/components/pixel/BackButton";
import KeyCap from "@/components/pixel/KeyCap";
import PixelButton from "@/components/pixel/PixelButton";
import PixelPanel from "@/components/pixel/PixelPanel";
import ScreenBackground from "@/components/pixel/ScreenBackground";
import { useBackKey } from "@/hooks/useBackKey";
import { useNavigate } from "react-router";

const controls = [
  { action: "MOVE UP", key: "W" },
  { action: "MOVE DOWN", key: "S" },
  { action: "MOVE LEFT", key: "A" },
  { action: "MOVE RIGHT", key: "D" },
  { action: "PAUSE", key: "ESC" },
];

export default function SettingsPage() {
  const navigate = useNavigate();

  useBackKey(() => navigate("/"));
  return (
    <div className="relative isolate flex min-h-screen w-full flex-col gap-11 px-6 py-12 md:px-20 md:py-16">
      <ScreenBackground src="/ui/menu-bg.png" />

      <h1 className="text-3xl text-primary [text-shadow:4px_4px_0_#a83800] md:text-4xl">
        SETTINGS
      </h1>

      <div className="grid gap-12 lg:grid-cols-2">
        <PixelPanel as="section" className="flex flex-col gap-8 p-8">
          <h2 className="text-lg">AUDIO</h2>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-sm">
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
            <div className="flex justify-between text-sm">
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

          <div className="flex items-center gap-3.5 text-sm">
            <input
              id="mute-all"
              type="checkbox"
              className="size-6 cursor-pointer accent-primary"
            />
            <label htmlFor="mute-all">MUTE ALL</label>
          </div>
        </PixelPanel>

        <PixelPanel as="section" className="flex flex-col gap-3.5 p-8">
          <h2 className="mb-2.5 text-lg">CONTROLS</h2>
          {controls.map((row) => (
            <div key={row.action} className="flex items-center gap-4 text-sm">
              <span className="grow">{row.action}</span>
              <KeyCap className="h-11 min-w-16 text-sm">{row.key}</KeyCap>
              <PixelButton variant="secondary" className="text-[11px]">
                Change
              </PixelButton>
            </div>
          ))}
        </PixelPanel>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6">
        <BackButton onClick={() => navigate("/")} />
        <PixelButton variant="primary">Reset defaults</PixelButton>
      </div>
    </div>
  );
}
