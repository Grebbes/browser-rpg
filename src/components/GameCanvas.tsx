import { useEffect, useRef } from "react";
import { screenHeight, screenWidth } from "../game/constants";
import { Game } from "../game/game";
import styles from "./GameCanvas.module.css";

function GameCanva() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const game = new Game(ctx);
    game.draw();
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
