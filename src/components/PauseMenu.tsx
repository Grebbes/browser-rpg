import MenuItem from "@/components/pixel/MenuItem";
import PixelPanel from "@/components/pixel/PixelPanel";

type Props = {
  open: boolean;
  selected?: number;
};

const items = ["RESUME", "SAVE GAME", "SETTINGS", "MAIN MENU"] as const;

// Pausmenyn: mörkar ner spelet och visar en ruta i mitten.
// Läggs i samma "relative"-element som canvasen (se GamePage).
// TODO (tillsammans): open styrs av ESC, selected av W/S, onSelect gör något.
export default function PauseMenu({ open, selected = 0 }: Props) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/70">
      <PixelPanel
        role="dialog"
        aria-modal="true"
        aria-labelledby="pause-title"
        className="flex w-95 flex-col gap-2 px-7 py-8"
      >
        <h2
          id="pause-title"
          className="mb-4 text-center text-3xl text-primary [text-shadow:4px_4px_0_#a83800]"
        >
          PAUSED
        </h2>
        {items.map((label, i) => (
          <MenuItem key={label} label={label} selected={i === selected} />
        ))}
      </PixelPanel>
    </div>
  );
}
