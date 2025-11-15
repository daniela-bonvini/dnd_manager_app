import { Loader, Plus } from "lucide-react";
import React from "react";
import { getAllEquipment } from "../../services/dndApiService";
import type { ExtentedEquipment } from "../../models/EquipmentModel";
import Modal from "../Modal/Modal";
import "./AddButton.css";
import EquipmentGrid from "../EquipmentGrid/EquipmentGrid";

function AddButton({ buttonLabel, money }: { buttonLabel?: string; money: number }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [equipmentList, setEquipmentList] = React.useState<ExtentedEquipment[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleAddButtonClick() {
    setIsModalOpen(true);
    setIsLoading(true);
    try {
      const allEquipment = await getAllEquipment();
      const affordableEquipment = allEquipment.filter((item: ExtentedEquipment) => item.cost <= money);
      setEquipmentList(affordableEquipment);
    } catch (error) {
      console.error("Error fetching equipment:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <button onClick={handleAddButtonClick} type="button">
        <Plus />
        {buttonLabel}
      </button>

      {isModalOpen && (
        <Modal handleDismiss={handleCloseModal}>
          <h3>Available Equipment under {money} gold</h3>
          {isLoading ? (
            <span className="loading-indicator">
              <Loader className="spinner" />
              Loading...
            </span>
          ) : (
            <EquipmentGrid equipmentList={equipmentList} />
          )}
        </Modal>
      )}
    </>
  );
}
export default AddButton;
