import GameCanvas from "@/components/GameCanvas";
import Hud from "@/components/Hud";
import PauseMenu from "@/components/PauseMenu";
import ScreenBackground from "@/components/pixel/ScreenBackground";
import SettingsOverlay from "@/components/SettingsOverlay";
import type { HudState } from "@/game/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function GamePage() {
  const [overlay, setOverlay] = useState<"none" | "pause" | "settings">("none");
  const paused = overlay !== "none";
  const [hud, setHud] = useState<HudState>({ keys: 0, message: null });
  const navigate = useNavigate();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOverlay((o) =>
          o === "none" ? "pause" : o === "pause" ? "none" : "pause",
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative isolate flex min-h-screen w-full flex-col items-center justify-center gap-7 px-4 py-8">
      <ScreenBackground src="/ui/game-bg.png" />

      <div className="relative pixel-border">
        <GameCanvas paused={paused} onHudChange={setHud} />
        <Hud keys={hud.keys} message={hud.message} />
        <PauseMenu
          open={overlay === "pause"}
          onResume={() => setOverlay("none")}
          onSettings={() => setOverlay("settings")}
          onMainMenu={() => navigate("/")}
        />
        <SettingsOverlay
          open={overlay === "settings"}
          onBack={() => setOverlay("pause")}
        />
      </div>

      <p className="flex gap-10 font-body text-2xl text-muted-foreground">
        <span>WASD move</span>
        <span>ESC pause</span>
      </p>
    </div>
  );
}
