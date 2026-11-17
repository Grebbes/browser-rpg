import PixelPanel from "./pixel/PixelPanel";

type Props = {
  text: string | null;
};

export default function DialogBox({ text }: Props) {
  if (text === null) return null;
  return (
    <PixelPanel
      role="status"
      aria-live="polite"
      className="pointer-events-none absolute inset-x-2 top-2 min-h-20 bg-black/80 p-3 font-body text-xl leading-snug whitespace-normal md:whitespace-pre-line md:inset-x-24 md:top-6 md:h-48 md:p-10 md:text-3xl"
    >
      {text}
    </PixelPanel>
  );
}
