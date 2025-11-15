import { CircleDollarSign, Frown } from "lucide-react";
import React from "react";
import { getAllEquipment } from "../../services/dndApiService";
import type { ExtentedEquipment } from "../../models/EquipmentModel";
import Modal from "../Modal/Modal";
import "./BuyEquipment.css";
import EquipmentGrid from "../EquipmentGrid/EquipmentGrid";
import { useStatsContext } from "../../contexts/StatsContext";
import { useEquipmentContext } from "../../contexts/EquipmentContext";
import Spinner from "../Spinner/Spinner";

function BuyEquipment({ buttonLabel }: { buttonLabel?: string }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [equipmentList, setEquipmentList] = React.useState<ExtentedEquipment[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const statsContext = useStatsContext();
  const equipmentContext = useEquipmentContext();

  async function handleAddButtonClick() {
    setIsModalOpen(true);
    setIsLoading(true);
    try {
      const allEquipment = await getAllEquipment();
      const affordableEquipment = allEquipment.filter((item: ExtentedEquipment) => item.cost <= statsContext.money);
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
      {statsContext.money === 0 ? (
        <p>
          <span>
            You have no more money. <Frown />
          </span>
          <br />
          <span>Try selling some items.</span>
        </p>
      ) : (
        <button onClick={handleAddButtonClick} type="button">
          <CircleDollarSign />
          {buttonLabel}
        </button>
      )}

      {isModalOpen && (
        <Modal handleDismiss={handleCloseModal}>
          <h3>Available Equipment under {statsContext.money} gold</h3>
          {isLoading ? <Spinner /> : <EquipmentGrid equipmentList={equipmentList} handleButtonClick={equipmentContext.buyEquipment} />}
        </Modal>
      )}
    </>
  );
}
export default BuyEquipment;
