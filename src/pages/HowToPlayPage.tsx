import BackButton from "@/components/pixel/BackButton";
import KeyCap from "@/components/pixel/KeyCap";
import PixelImage from "@/components/pixel/PixelImage";
import PixelPanel from "@/components/pixel/PixelPanel";
import ScreenBackground from "@/components/pixel/ScreenBackground";
import { useNavigate } from "react-router";

const quest = [
  "Explore the map and find the 3 hidden keys.",
  "Each key opens one locked door.",
  "Behind the last door waits the treasure chest.",
  "Find it to win the game!",
];

const items = [
  { name: "KEY", sprite: "key", text: "Opens one door" },
  { name: "DOOR", sprite: "door", text: "Locked. Needs a key" },
  { name: "BOOTS", sprite: "boots", text: "Makes you move faster" },
  { name: "CHEST", sprite: "chest", text: "The treasure. You win!" },
];

export default function HowToPlayPage() {
  const navigate = useNavigate();
  return (
    <div className="relative isolate flex min-h-screen w-full flex-col gap-10 px-6 py-12 md:px-20 md:py-16">
      <ScreenBackground src="/ui/menu-bg.png" />

      <h1 className="text-3xl text-primary [text-shadow:4px_4px_0_#a83800] md:text-4xl">
        HOW TO PLAY
      </h1>

      <div className="grid gap-10 lg:grid-cols-3">
        <PixelPanel as="section" className="flex flex-col gap-6 p-7">
          <h2 className="text-lg">CONTROLS</h2>
          <div className="flex flex-col items-center gap-2">
            <KeyCap>W</KeyCap>
            <div className="flex gap-2">
              <KeyCap>A</KeyCap>
              <KeyCap>S</KeyCap>
              <KeyCap>D</KeyCap>
            </div>
          </div>
          <p className="text-center font-body text-2xl text-muted-foreground">
            Move up, left, down, right
          </p>
          <div className="flex items-center justify-center gap-4">
            <KeyCap className="min-w-20">ESC</KeyCap>
            <span className="font-body text-2xl text-muted-foreground">
              Pause the game
            </span>
          </div>
        </PixelPanel>

        <PixelPanel as="section" className="flex flex-col gap-6 p-7">
          <h2 className="text-lg">YOUR QUEST</h2>
          <ol className="flex list-decimal flex-col gap-4 pl-7 font-body text-3xl leading-tight">
            {quest.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </PixelPanel>

        <PixelPanel as="section" className="flex flex-col gap-5 p-7">
          <h2 className="text-lg">ITEMS</h2>
          {items.map((item) => (
            <div key={item.name} className="flex items-center gap-4">
              <PixelImage
                src={`/sprites/objects/${item.sprite}.png`}
                width={48}
                height={48}
              />
              <div className="flex flex-col gap-1">
                <span className="text-sm">{item.name}</span>
                <span className="font-body text-2xl text-muted-foreground">
                  {item.text}
                </span>
              </div>
            </div>
          ))}
        </PixelPanel>
      </div>
      <BackButton onClick={() => navigate("/")} />
    </div>
  );
}
