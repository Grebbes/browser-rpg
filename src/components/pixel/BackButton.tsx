import PixelArrow from "./PixelArrow";

type Props = {
  onClick?: () => void;
};

export default function BackButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-12 cursor-pointer items-center gap-3 self-start text-base hover:text-primary focus-visible:outline-4 focus-visible:outline-ring"
    >
      <PixelArrow direction="left" />
      <span>BACK</span>
    </button>
  );
}
