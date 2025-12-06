import { Volume2, VolumeX } from "lucide-react";
import { useSoundContext } from "../../../contexts/SoundContext";
import Button from "../Button/Button";

interface SoundToggleButtonProps {
  buttonLabel?: string;
}

function SoundToggleButton({ buttonLabel }: SoundToggleButtonProps) {
  const { isSoundEnabled, toggleSound } = useSoundContext();

  return (
    <Button buttonLabel={buttonLabel || (isSoundEnabled ? "Disable sound" : "Enable sound")} handleButtonClick={toggleSound}>
      {isSoundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </Button>
  );
}

export default SoundToggleButton;
