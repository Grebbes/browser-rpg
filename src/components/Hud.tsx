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
      <div className="absolute top-6 left-6 flex items-center gap-2.5 bg-background/70 py-1.5 pr-3.5 pl-2">
        <PixelImage src="/sprites/objects/key.png" width={48} height={48} />
        <span className="text-xl">x {keys}</span>
      </div>

      {message && (
        <p
          role="status"
          className="absolute top-60 left-6 bg-background/80 px-4 py-3 text-sm pixel-border [--pixel-color:var(--color-primary)]"
        >
          {message}
        </p>
      )}
    </div>
  );
}
