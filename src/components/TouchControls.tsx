import type { TouchButton } from "@/game/types";
import PixelArrow from "./pixel/PixelArrow";

type Props = {
  onButton: (button: TouchButton, pressed: boolean) => void;
  onPause: () => void;
};

const padButton =
  "flex size-14 items-center justify-center bg-secondary text-foreground active:bg-primary";

export default function TouchControls({ onButton, onPause }: Props) {
  function handlers(button: TouchButton) {
    return {
      onPointerDown: () => onButton(button, true),
      onPointerUp: () => onButton(button, false),
      onPointerLeave: () => onButton(button, false),
      onPointerCancel: () => onButton(button, false),
    };
  }
  return (
    <div className="hidden w-full max-w-3xl touch-none items-center justify-between select-none pointer-coarse:flex">
      <div className="grid grid-cols-3 grid-rows-3">
        <button
          type="button"
          aria-label="Upp"
          className={`${padButton} col-start-2 row-start-1`}
          {...handlers("up")}
        >
          <PixelArrow className="-rotate-90" />
        </button>
        <button
          type="button"
          aria-label="Vänster"
          className={`${padButton} col-start-1 row-start-2`}
          {...handlers("left")}
        >
          <PixelArrow direction="left" />
        </button>
        <button
          type="button"
          aria-label="Höger"
          className={`${padButton} col-start-3 row-start-2`}
          {...handlers("right")}
        >
          <PixelArrow />
        </button>
        <button
          type="button"
          aria-label="Ner"
          className={`${padButton} col-start-2 row-start-3`}
          {...handlers("down")}
        >
          <PixelArrow className="rotate-90" />
        </button>
      </div>
      <button
        type="button"
        onClick={onPause}
        className="min-h-11 bg-secondary px-4 text-xs text-foreground uppercase"
      >
        Pause
      </button>
      <button
        type="button"
        aria-label="A, prata och välj"
        className="flex size-20 items-center justify-center rounded-full bg-primary text-2xl text-primary-foreground active:translate-y-1"
        {...handlers("a")}
      >
        A
      </button>
    </div>
  );
}
