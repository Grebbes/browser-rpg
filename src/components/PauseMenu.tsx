import MenuItem from "@/components/pixel/MenuItem";
import PixelPanel from "@/components/pixel/PixelPanel";

type Props = {
  open: boolean;
  selected?: number;
  onResume: () => void;
  onMainMenu: () => void;
};

export default function PauseMenu({
  open,
  selected = 0,
  onResume,
  onMainMenu,
}: Props) {
  if (!open) return null;

  const items = [
    { label: "RESUME", onSelect: onResume },
    { label: "SAVE GAME", onSelect: undefined },
    { label: "SETTINGS", onSelect: undefined },
    { label: "MAIN MENU", onSelect: onMainMenu },
  ];

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
        {items.map((item, i) => (
          <MenuItem
            key={item.label}
            label={item.label}
            selected={i === selected}
            onSelect={item.onSelect}
          />
        ))}
      </PixelPanel>
    </div>
  );
}
