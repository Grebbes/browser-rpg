import { Navigate, Route, Routes } from "react-router";
import GamePage from "./pages/GamePage";
import HowToPlayPage from "./pages/HowToPlayPage";
import SaveSlotsPage from "./pages/SaveSlotsPage";
import SettingsPage from "./pages/SettingsPage";
import StartPage from "./pages/StartPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/play" element={<GamePage />} />
      <Route path="/how-to-play" element={<HowToPlayPage />} />
      <Route path="/save-slot-page" element={<SaveSlotsPage />} />
      <Route path="/settings-page" element={<SettingsPage />} />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
