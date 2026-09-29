type Props = {
  direction?: "right" | "left";
  className?: string;
};

// Liten pixelpil (4×4 "pixlar"). Färgen följer textfärgen (currentColor).
export default function PixelArrow({ direction = "right", className }: Props) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 4 4"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
      style={direction === "left" ? { transform: "scaleX(-1)" } : undefined}
    >
      <rect x="0" y="0" width="1" height="4" fill="currentColor" />
      <rect x="1" y="1" width="2" height="2" fill="currentColor" />
    </svg>
  );
}
