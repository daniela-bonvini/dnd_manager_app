import { HandCoins } from "lucide-react";
import React from "react";
import "../components/AddButton/AddButton.css";
import { useEquipmentContext } from "../contexts/EquipmentContext";
import type { ExtentedEquipment } from "../models/EquipmentModel";
import Modal from "./Modal/Modal";
import EquipmentGrid from "./EquipmentGrid/EquipmentGrid";

function RemoveButton({ buttonLabel }: { buttonLabel?: string }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const equipmentContext = useEquipmentContext();

  async function handleRemoveButtonClick(item: ExtentedEquipment) {
    setIsModalOpen(true);
    equipmentContext.removeEquipment(item);
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <button onClick={() => handleOpenModal()} type="button">
        <HandCoins />
        {buttonLabel}
      </button>

      {isModalOpen && (
        <Modal handleDismiss={handleCloseModal}>
          <h3>Sellable equipment</h3>
          {<EquipmentGrid equipmentList={equipmentContext.equipmentInInventory} handleButtonClick={handleRemoveButtonClick} />}
        </Modal>
      )}
    </>
  );
}
export default RemoveButton;
