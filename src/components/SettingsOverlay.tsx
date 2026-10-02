import SettingsContent from "@/components/SettingsContent";
import { useBackKey } from "@/hooks/useBackKey";
import { type Settings } from "@/services/settingService";

type Props = {
  open: boolean;
  onBack: () => void;
  onChange?: (settings: Settings) => void;
};

export default function SettingsOverlay({ open, onBack, onChange }: Props) {
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
      <SettingsContent compact onBack={onBack} onChange={onChange} />
    </div>
  );
}
