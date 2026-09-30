import SettingsContent from "@/components/SettingsContent";
import { useBackKey } from "@/hooks/useBackKey";

type Props = {
  open: boolean;
  onBack: () => void;
};

export default function SettingsOverlay({ open, onBack }: Props) {
  useBackKey(onBack, open);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
      className="absolute inset-0 flex flex-col gap-5 overflow-y-auto bg-background/90 p-6"
    >
      <h2
        id="settings-title"
        className="text-2xl text-primary [text-shadow:4px_4px_0_#a83800]"
      >
        SETTINGS
      </h2>
      <SettingsContent compact onBack={onBack} />
    </div>
  );
}
