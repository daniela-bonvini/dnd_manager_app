import { CircleDollarSign } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import Modal from "../shared/Modal/Modal";
import ModalHeader from "../shared/ModalHeader/ModalHeader";
import EquipmentGrid from "../EquipmentGrid/EquipmentGrid";
import { useStatsContext } from "../../contexts/StatsContext";
import { useEquipmentContext } from "../../contexts/EquipmentContext";
import { useSoundContext } from "../../contexts/SoundContext";
import { audioService } from "../../services/audioService";
import Tooltip from "../shared/Tooltip/Tooltip";
import Button from "../shared/Button/Button";
import useToggle from "../../custom-hooks/use-toggle";
import "./BuyEquipment.css";
import SoundToggleButton from "../shared/SoundToggleButton/SoundToggleButton";
import type { ExtentedEquipment } from "../../models/EquipmentModel";
import { AUDIO_PATHS, AUDIO_VOLUMES } from "../../constants/audioConfig";

function BuyEquipment({ buttonLabel }: { buttonLabel?: string }) {
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);
  const { isSoundEnabled } = useSoundContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) return;
    audioRef.current = audioService.loadAudio(AUDIO_PATHS.CASH_REGISTER, AUDIO_VOLUMES.CASH_REGISTER);
  }, []);

  const statsContext = useStatsContext();
  const { money } = statsContext;
  const equipmentContext = useEquipmentContext();
  const { buyEquipment, buyableEquipment } = equipmentContext;

  const handleBuyEquipment = useCallback(
    (item: ExtentedEquipment) => {
      buyEquipment(item);
      if (isSoundEnabled && audioRef.current) {
        audioService.play(audioRef.current);
      }
    },
    [buyEquipment, isSoundEnabled]
  );

  const isDisabled = money <= 0 || !buyableEquipment || buyableEquipment.length === 0;
  const tooltipText =
    money === 0
      ? "You don't have any money. Try selling some items."
      : "All items are either too expensive or already owned.";

  return (
    <>
      <Tooltip text={tooltipText} show={isDisabled}>
        <Button buttonLabel={buttonLabel} handleButtonClick={toggleIsModalOpen} disabled={isDisabled}>
          <CircleDollarSign />
        </Button>
      </Tooltip>

      {isModalOpen && (
        <Modal handleDismiss={toggleIsModalOpen}>
          <ModalHeader
            title={`Available equipment under ${money} gold`}
            onClose={toggleIsModalOpen}
            rightContent={<SoundToggleButton />}
          />
          <EquipmentGrid equipmentList={buyableEquipment || []} handleButtonClick={handleBuyEquipment} />
        </Modal>
      )}
    </>
  );
}
export default BuyEquipment;
