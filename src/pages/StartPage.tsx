import MenuItem from "@/components/pixel/MenuItem";
import PixelPanel from "@/components/pixel/PixelPanel";
import StartScene from "@/components/StartScene";
import { useMenuKeys } from "@/hooks/useMenuKeys";
import { useNavigate } from "react-router";

const menuItems = [
  {
    label: "NEW GAME",
    path: "/save-slot-page",
  },
  {
    label: "CONTINUE",
    path: "/save-slot-page",
  },
  {
    label: "HOW TO PLAY",
    path: "/how-to-play",
  },
  {
    label: "SETTINGS",
    path: "/settings-page",
  },
];

export default function StartPage() {
  const navigate = useNavigate();
  const selected = useMenuKeys(menuItems.length, (i) => {
    navigate(menuItems[i].path);
  });

  return (
    <div className="relative isolate flex min-h-screen w-full flex-col items-center gap-12 px-4 pt-20 pb-24">
      <StartScene />
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl tracking-wide text-primary [text-shadow:6px_6px_0_#a83800,10px_10px_0_#0b0b14] md:text-6xl">
          BROWSER RPG
        </h1>
        <p className="bg-background px-3.5 py-1 font-body text-3xl text-[#f8d8b0]">
          A treasure hunt adventure
        </p>
      </header>

      <PixelPanel
        as="nav"
        tone="gold"
        aria-label="Main menu"
        className="flex w-full max-w-md flex-col gap-2 px-6 py-7"
      >
        {menuItems.map((item, i) => (
          <MenuItem
            key={item.label}
            label={item.label}
            selected={i === selected}
            onSelect={() => navigate(item.path)}
          />
        ))}
      </PixelPanel>

      <p className="absolute bottom-4 font-body text-2xl text-muted-foreground">
        W / S to choose · ENTER to select
      </p>
    </div>
  );
}
