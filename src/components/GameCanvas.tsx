import { useEffect, useRef } from "react";
import { screenHeight, screenWidth } from "../game/constants";
import { Game } from "../game/Game";
import styles from "./GameCanvas.module.css";

function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const game = new Game(ctx);
    game.start();

    return () => game.stop();
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

export default GameCanvas;
