import BackButton from "@/components/pixel/BackButton";
import PixelButton from "@/components/pixel/PixelButton";
import PixelImage from "@/components/pixel/PixelImage";
import PixelPanel from "@/components/pixel/PixelPanel";
import ScreenBackground from "@/components/pixel/ScreenBackground";
import { useNavigate } from "react-router";

type Slot =
  | { id: number; empty: true }
  | { id: number; empty: false; keys: number; doors: string; savedAt: string };

// TODO (M7): riktig data från saveService i stället för exempeldata
const slots: Slot[] = [
  { id: 1, empty: false, keys: 2, doors: "1/3", savedAt: "2026-09-28 18:20" },
  { id: 2, empty: false, keys: 0, doors: "3/3", savedAt: "2026-09-27 21:05" },
  { id: 3, empty: true },
];

export default function SaveSlotsPage() {
  const navigate = useNavigate();
  const selected = 0;

  return (
    <div className="relative isolate flex min-h-screen w-full flex-col items-center gap-9 px-6 py-12 md:py-16">
      <ScreenBackground src="/ui/menu-bg.png" />

      <div className="flex w-full max-w-3xl flex-col gap-9">
        <h1 className="text-2xl text-primary [text-shadow:4px_4px_0_#a83800] md:text-3xl">
          CHOOSE A SAVE SLOT
        </h1>

        <div className="flex flex-col gap-7">
          {slots.map((slot, i) =>
            slot.empty ? (
              <PixelPanel
                key={slot.id}
                tone="muted"
                className="flex flex-wrap items-center gap-7 bg-background px-7 py-6"
              >
                <span className="w-24 text-base text-muted-foreground">
                  SLOT {slot.id}
                </span>
                <span className="grow font-body text-3xl text-muted-foreground">
                  Empty
                </span>
                <PixelButton
                  variant="success"
                  onClick={() => navigate("/play")}
                >
                  New game
                </PixelButton>
              </PixelPanel>
            ) : (
              <PixelPanel
                key={slot.id}
                tone={i === selected ? "gold" : "white"}
                className="flex flex-wrap items-center gap-7 px-7 py-6"
              >
                <span
                  className={`w-24 text-base ${i === selected ? "text-primary" : ""}`}
                >
                  SLOT {slot.id}
                </span>
                <div className="flex grow flex-col gap-2.5">
                  <div className="flex items-center gap-5 text-sm">
                    <span className="flex items-center gap-2">
                      <PixelImage
                        src="/sprites/objects/key.png"
                        width={32}
                        height={32}
                      />
                      x {slot.keys}
                    </span>
                    <span>DOORS {slot.doors}</span>
                  </div>
                  <span className="font-body text-2xl text-muted-foreground">
                    Saved {slot.savedAt}
                  </span>
                </div>
                {/* TODO (M7): ladda / ta bort sparningen */}
                <PixelButton
                  variant="primary"
                  onClick={() => navigate("/play")}
                >
                  Load
                </PixelButton>
                <PixelButton variant="danger">Delete</PixelButton>
              </PixelPanel>
            ),
          )}
        </div>
        <BackButton onClick={() => navigate("/")} />
      </div>
    </div>
  );
}
