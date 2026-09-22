import styles from "./App.module.css";
import GameCanvas from "./components/GameCanvas";

function App() {
  return (
    <main className={styles.app}>
      <GameCanvas />
    </main>
  );
}

export default App;
