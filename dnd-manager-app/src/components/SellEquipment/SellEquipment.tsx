import { HandCoins, Volume2, VolumeX } from "lucide-react";
import React from "react";
import { useEquipmentContext } from "../../contexts/EquipmentContext";
import type { ExtentedEquipment } from "../../models/EquipmentModel";
import Modal from "../shared/Modal/Modal";
import ModalHeader from "../shared/ModalHeader/ModalHeader";
import EquipmentGrid from "../EquipmentGrid/EquipmentGrid";
import Tooltip from "../shared/Tooltip/Tooltip";
import Button from "../shared/Button/Button";
import { useStatsContext } from "../../contexts/StatsContext";
import useToggle from "../../custom-hooks/use-toggle";
import "./SellEquipment.css";
import { getSoundEnabled, setSoundEnabled } from "../../services/localStorageService";

function SellEquipment({ buttonLabel }: { buttonLabel?: string }) {
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);
  const [isSoundEnabled, setIsSoundEnabled] = React.useState(() => {
    return getSoundEnabled();
  });
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    if (audioRef.current) return;

    const audio = new Audio("/assets/cash-register-sound.mp3");
    audio.preload = "auto";
    audio.volume = 0.1;
    audioRef.current = audio;
  }, []);

  const equipmentContext = useEquipmentContext();
  const { equipmentInInventory, sellEquipment } = equipmentContext;
  const statsContext = useStatsContext();
  const { money } = statsContext;

  function toggleSound() {
    const newState = !isSoundEnabled;
    setIsSoundEnabled(newState);
    setSoundEnabled(newState);
  }

  async function handleSellEquipmentClick(item: ExtentedEquipment) {
    sellEquipment(item);
    if (isSoundEnabled) {
      playSound();
    }
  }

  function playSound() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error: Error) => console.log("Audio play failed:", error));
    }
  }

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
                <Button buttonLabel={isSoundEnabled ? "Disable sound" : "Enable sound"} handleButtonClick={toggleSound}>
                  {isSoundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </Button>
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
