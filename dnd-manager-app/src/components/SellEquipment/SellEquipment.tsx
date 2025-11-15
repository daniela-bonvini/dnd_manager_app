import { HandCoins } from "lucide-react";
import React from "react";
import { useEquipmentContext } from "../../contexts/EquipmentContext";
import type { ExtentedEquipment } from "../../models/EquipmentModel";
import Modal from "../Modal/Modal";
import EquipmentGrid from "../EquipmentGrid/EquipmentGrid";
import Tooltip from "../Tooltip/Tooltip";

function SellEquipment({ buttonLabel }: { buttonLabel?: string }) {
  const equipmentContext = useEquipmentContext();
  const { equipmentInInventory, sellEquipment } = equipmentContext;

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function handleSellEquipmentClick(item: ExtentedEquipment) {
    setIsModalOpen(true);
    sellEquipment(item);
  }

  return (
    <>
      <Tooltip text="You don't have any items to sell. Try buying some." show={equipmentInInventory.length === 0}>
        <button onClick={() => handleOpenModal()} type="button" disabled={equipmentInInventory.length === 0}>
          <HandCoins />
          {buttonLabel}
        </button>
      </Tooltip>

      {isModalOpen && (
        <Modal handleDismiss={handleCloseModal}>
          <h3>Sellable equipment</h3>
          {<EquipmentGrid equipmentList={equipmentInInventory} handleButtonClick={handleSellEquipmentClick} />}
        </Modal>
      )}
    </>
  );
}
export default SellEquipment;
