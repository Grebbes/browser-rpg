import GameCanvas from "@/components/GameCanvas";
import ScreenBackground from "@/components/pixel/ScreenBackground";

export default function GamePage() {
  return (
    <div className="relative isolate flex min-h-screen w-full flex-col items-center justify-center gap-7 px-4 py-8">
      <ScreenBackground src="/ui/game-bg.png" />

      {/* "relative" så att HUD och pausmeny kan läggas ovanpå canvasen */}
      <div className="relative pixel-border">
        <GameCanvas />
        {/* TODO (tillsammans): <Hud keys={...} message={...} /> när HUD:en flyttas från canvas */}
        {/* TODO (tillsammans): <PauseMenu open={...} /> som öppnas med ESC */}
      </div>

      <p className="flex gap-10 font-body text-2xl text-muted-foreground">
        <span>WASD move</span>
        <span>ESC pause</span>
      </p>
    </div>
  );
}
