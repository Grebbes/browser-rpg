import PixelImage from "./PixelImage";

type Props = {
  src: string;
};

export default function ScreenBackground({ src }: Props) {
  return (
    <PixelImage
      src={src}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-bottom"
    />
  );
}
