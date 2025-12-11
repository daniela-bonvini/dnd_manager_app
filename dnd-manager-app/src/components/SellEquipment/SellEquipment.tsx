import { HandCoins } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useEquipmentContext } from "../../contexts/EquipmentContext";
import { useSoundContext } from "../../contexts/SoundContext";
import type { ExtentedEquipment } from "../../models/EquipmentModel";
import { audioService } from "../../services/audioService";
import Modal from "../shared/Modal/Modal";
import ModalHeader from "../shared/ModalHeader/ModalHeader";
import EquipmentGrid from "../EquipmentGrid/EquipmentGrid";
import Tooltip from "../shared/Tooltip/Tooltip";
import Button from "../shared/Button/Button";
import SoundToggleButton from "../shared/SoundToggleButton/SoundToggleButton";
import { useStatsContext } from "../../contexts/StatsContext";
import useToggle from "../../custom-hooks/use-toggle";
import "./SellEquipment.css";

function SellEquipment({ buttonLabel }: { buttonLabel?: string }) {
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);
  const { isSoundEnabled } = useSoundContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) return;
    audioRef.current = audioService.loadAudio("/assets/cash-register-sound.mp3", 0.1);
  }, []);

  const equipmentContext = useEquipmentContext();
  const { equipmentInInventory, sellEquipment } = equipmentContext;
  const statsContext = useStatsContext();
  const { money } = statsContext;

  const handleSellEquipmentClick = useCallback(
    (item: ExtentedEquipment) => {
      sellEquipment(item);
      if (isSoundEnabled && audioRef.current) {
        audioService.play(audioRef.current);
      }
    },
    [sellEquipment, isSoundEnabled]
  );

  return (
    <>
      <Tooltip text="You don't have any items to sell. Try buying some." show={equipmentInInventory.length <= 0}>
        <Button buttonLabel={buttonLabel} handleButtonClick={toggleIsModalOpen} disabled={equipmentInInventory.length <= 0}>
          <HandCoins />
        </Button>
      </Tooltip>

      {isModalOpen && (
        <Modal handleDismiss={toggleIsModalOpen}>
          <ModalHeader
            title="Sellable equipment"
            onClose={toggleIsModalOpen}
            rightContent={
              <>
                <h3 style={{ marginRight: "0.5rem" }}>Current money: {money}</h3>
                <SoundToggleButton />
              </>
            }
          />
          {<EquipmentGrid equipmentList={equipmentInInventory} handleButtonClick={handleSellEquipmentClick} />}
        </Modal>
      )}
    </>
  );
}
export default SellEquipment;
