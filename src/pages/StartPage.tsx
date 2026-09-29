import MenuItem from "@/components/pixel/MenuItem";
import PixelPanel from "@/components/pixel/PixelPanel";
import ScreenBackground from "@/components/pixel/ScreenBackground";

const menuItems = ["NEW GAME", "CONTINUE", "HOW TO PLAY", "SETTINGS"] as const;

export default function StartPage() {
  // TODO (tillsammans): useState för vald rad + W/S/Enter med useEffect
  const selected = 0;

  return (
    <div className="relative isolate flex min-h-screen w-full flex-col items-center gap-12 px-4 pt-20 pb-24">
      <ScreenBackground src="/ui/start-scene.png" />

      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl tracking-wide text-primary [text-shadow:6px_6px_0_#a83800,10px_10px_0_#0b0b14] md:text-6xl">
          BROWSER RPG
        </h1>
        <p className="bg-background px-3.5 py-1 font-body text-3xl text-[#f8d8b0]">
          A treasure hunt adventure
        </p>
      </header>

      <PixelPanel
        as="nav"
        tone="gold"
        aria-label="Main menu"
        className="flex w-full max-w-md flex-col gap-2 px-6 py-7"
      >
        {menuItems.map((label, i) => (
          // TODO (tillsammans): onSelect navigerar till rätt sida
          <MenuItem key={label} label={label} selected={i === selected} />
        ))}
      </PixelPanel>

      <p className="absolute bottom-4 font-body text-2xl text-muted-foreground">
        W / S to choose · ENTER to select
      </p>
    </div>
  );
}
