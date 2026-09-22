import { useEffect, useRef } from "react";
import { screenHeight, screenWidth, tileSize } from "../game/constants";
import styles from "./GameCanvas.module.css";

function GameCanva() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, screenWidth, screenHeight);

    ctx.fillStyle = "white";
    ctx.fillRect(tileSize, tileSize, tileSize, tileSize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      height={screenHeight}
      width={screenWidth}
      className={styles.canvas}
    />
  );
}

export default GameCanva;
