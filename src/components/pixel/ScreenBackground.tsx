import PixelImage from "./PixelImage";

type Props = {
  src: string;
};

export default function ScreenBackground({ src }: Props) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#0b0b14]"
    >
      <PixelImage
        src={src}
        className="absolute inset-0 h-full w-full object-cover object-bottom portrait:inset-auto portrait:bottom-0 portrait:left-1/2 portrait:h-auto portrait:w-[640px] portrait:max-w-none portrait:-translate-x-1/2"
      />
    </div>
  );
}
