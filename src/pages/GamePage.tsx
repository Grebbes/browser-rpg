import GameCanvas from "@/components/GameCanvas";
import PauseMenu from "@/components/PauseMenu";
import ScreenBackground from "@/components/pixel/ScreenBackground";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function GamePage() {
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setPaused((p) => !p);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative isolate flex min-h-screen w-full flex-col items-center justify-center gap-7 px-4 py-8">
      <ScreenBackground src="/ui/game-bg.png" />

      <div className="relative pixel-border">
        <GameCanvas paused={paused} />

        <PauseMenu
          open={paused}
          onResume={() => setPaused(false)}
          onMainMenu={() => navigate("/")}
        />
      </div>

      <p className="flex gap-10 font-body text-2xl text-muted-foreground">
        <span>WASD move</span>
        <span>ESC pause</span>
      </p>
    </div>
  );
}
