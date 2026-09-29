import PixelImage from "./PixelImage";

type Props = {
  src: string;
};

// Pixelbakgrund som fyller hela sidan. Förankrad nertill så att marken alltid syns.
// Förälderns "isolate" gör att -z-10 hamnar bakom sidans innehåll men inte bakom sidan.
export default function ScreenBackground({ src }: Props) {
  return (
    <PixelImage
      src={src}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-bottom"
    />
  );
}
