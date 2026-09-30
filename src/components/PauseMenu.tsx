import MenuItem from "@/components/pixel/MenuItem";
import PixelPanel from "@/components/pixel/PixelPanel";
import { useMenuKeys } from "@/hooks/useMenuKeys";

type Props = {
  open: boolean;
  onResume: () => void;
  onMainMenu: () => void;
  onSettings: () => void;
};

export default function PauseMenu({
  open,
  onResume,
  onMainMenu,
  onSettings,
}: Props) {
  const items = [
    { label: "RESUME", onSelect: onResume },
    { label: "SAVE GAME", onSelect: undefined },
    { label: "SETTINGS", onSelect: onSettings },
    { label: "MAIN MENU", onSelect: onMainMenu },
  ];

  const selected = useMenuKeys(
    items.length,
    (i) => items[i].onSelect?.(),
    onResume,
    open,
  );

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
