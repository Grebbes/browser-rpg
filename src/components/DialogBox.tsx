import PixelPanel from "./pixel/PixelPanel";

type Props = {
  text: string | null;
};

export default function DialogBox({ text }: Props) {
  if (!text) return null;
  return (
    <PixelPanel
      role="status"
      aria-live="polite"
      className="pointer-events-none absolute top-6 right-24 left-24 h-48 bg-black/80 p-10 font-body text-3xl leading-snug whitespace-pre-line"
    >
      {text}
    </PixelPanel>
  );
}
