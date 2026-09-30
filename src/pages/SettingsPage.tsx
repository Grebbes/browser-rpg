import SettingsContent from "@/components/SettingsContent";
import ScreenBackground from "@/components/pixel/ScreenBackground";
import { useBackKey } from "@/hooks/useBackKey";
import { useNavigate } from "react-router";

export default function SettingsPage() {
  const navigate = useNavigate();

  useBackKey(() => navigate("/"));
  return (
    <div className="relative isolate flex min-h-screen w-full flex-col gap-11 px-6 py-12 md:px-20 md:py-16">
      <ScreenBackground src="/ui/menu-bg.png" />

      <h1 className="text-3xl text-primary [text-shadow:4px_4px_0_#a83800] md:text-4xl">
        SETTINGS
      </h1>

      <SettingsContent onBack={() => navigate("/")} />
    </div>
  );
}
