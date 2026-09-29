import GamePage from "./pages/GamePage";
import HowToPlayPage from "./pages/HowToPlayPage";
import SaveSlotsPage from "./pages/SaveSlotsPage";
import SettingsPage from "./pages/SettingsPage";
import StartPage from "./pages/StartPage";

// TILLFÄLLIGT: välj sida med # i adressen och ladda om (Cmd + R), t.ex.
//   localhost:5173/#how-to-play
// Byts mot React Router, som vi skriver tillsammans.
const pages = {
  start: StartPage,
  "how-to-play": HowToPlayPage,
  saves: SaveSlotsPage,
  settings: SettingsPage,
  game: GamePage,
};

function App() {
  const hash = window.location.hash.slice(1);
  const Page = pages[hash as keyof typeof pages] ?? StartPage;
  return <Page />;
}

export default App;
