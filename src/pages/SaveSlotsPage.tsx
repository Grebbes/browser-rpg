import BackButton from "@/components/pixel/BackButton";
import PixelButton from "@/components/pixel/PixelButton";
import PixelImage from "@/components/pixel/PixelImage";
import PixelPanel from "@/components/pixel/PixelPanel";
import ScreenBackground from "@/components/pixel/ScreenBackground";
import { useMenuKeys } from "@/hooks/useMenuKeys";
import { deleteSave, listSaves } from "@/services/saveService";
import { useState } from "react";
import { useNavigate } from "react-router";

type Slot =
  | { id: number; empty: true }
  | { id: number; empty: false; keys: number; doors: string; savedAt: string };

export default function SaveSlotsPage() {
  const navigate = useNavigate();
  const [saves, setSaves] = useState(() => listSaves());

  const slots: Slot[] = saves.map((save, i) =>
    save
      ? {
          id: i + 1,
          empty: false,
          keys: save.player.hasKeys,
          doors: `${save.removedObjects.filter((o) => o >= 3 && o <= 5).length}/3`,
          savedAt: new Date(save.savedAt).toLocaleString("sv-SE", {
            dateStyle: "short",
            timeStyle: "short",
          }),
        }
      : { id: i + 1, empty: true },
  );

  const selected = useMenuKeys(
    slots.length,
    (i) => navigate(`/play?slot=${slots[i].id}`),
    () => navigate("/"),
  );

  function handleDelete(id: number) {
    deleteSave(id);
    setSaves(listSaves());
  }

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
                tone={i === selected ? "gold" : "muted"}
                className="flex flex-wrap items-center gap-7 bg-background px-7 py-6"
              >
                <span
                  className={`w-24 text-base ${i === selected ? "text-primary" : "text-muted-foreground"}`}
                >
                  SLOT {slot.id}
                </span>
                <span className="grow font-body text-3xl text-muted-foreground">
                  Empty
                </span>
                <PixelButton
                  variant="success"
                  onClick={() => navigate(`/play?slot=${slots[i].id}`)}
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
                <PixelButton
                  variant="primary"
                  onClick={() => navigate(`/play?slot=${slots[i].id}`)}
                >
                  Load
                </PixelButton>
                <PixelButton
                  variant="danger"
                  onClick={() => handleDelete(slot.id)}
                >
                  Delete
                </PixelButton>
              </PixelPanel>
            ),
          )}
        </div>
        <BackButton onClick={() => navigate("/")} />
        <p className="text-center font-body text-2xl text-muted-foreground">
          W / S to choose · ENTER to select · BACKSPACE to go back
        </p>
      </div>
    </div>
  );
}
