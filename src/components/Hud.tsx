import PixelImage from "@/components/pixel/PixelImage";

type Props = {
  keys: number;
  message?: string | null;
};

// HUD ovanpå spelfönstret: nyckelräknare uppe till vänster + meddelanderuta.
// Läggs i ett element med "relative" runt canvasen (se GamePage).
// TODO (tillsammans): få keys och message från spelet i stället för canvas-UI:t.
export default function Hud({ keys, message }: Props) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-background/50 py-0.5 pr-2.5 pl-1">
        <PixelImage src="/sprites/objects/key.png" width={32} height={32} />
        <span className="text-sm">x {keys}</span>
      </div>

      {message && (
        <p
          role="status"
          className="absolute bottom-4 left-4 max-w-[60%] bg-background/80 px-4 py-3 text-left text-xs leading-relaxed pixel-border [--pixel-color:var(--color-primary)]"
        >
          {message}
        </p>
      )}
    </div>
  );
}
