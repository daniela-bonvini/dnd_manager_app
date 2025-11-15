import { CircleDollarSign } from "lucide-react";
import React from "react";
import { getAllEquipment } from "../../services/dndApiService";
import type { ExtentedEquipment } from "../../models/EquipmentModel";
import Modal from "../Modal/Modal";
import "./BuyEquipment.css";
import EquipmentGrid from "../EquipmentGrid/EquipmentGrid";
import { useStatsContext } from "../../contexts/StatsContext";
import { useEquipmentContext } from "../../contexts/EquipmentContext";
import Spinner from "../Spinner/Spinner";
import Tooltip from "../Tooltip/Tooltip";

function BuyEquipment({ buttonLabel }: { buttonLabel?: string }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [equipmentList, setEquipmentList] = React.useState<ExtentedEquipment[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const statsContext = useStatsContext();
  const { money } = statsContext;
  const equipmentContext = useEquipmentContext();
  const { buyEquipment } = equipmentContext;

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
      <Tooltip text="You don't have enough money. Try selling some items." show={money === 0}>
        <button onClick={handleAddButtonClick} type="button" disabled={money === 0}>
          <CircleDollarSign />
          {buttonLabel}
        </button>
      </Tooltip>

      {isModalOpen && (
        <Modal handleDismiss={handleCloseModal}>
          <h3>Available Equipment under {money} gold</h3>
          {isLoading ? <Spinner /> : <EquipmentGrid equipmentList={equipmentList} handleButtonClick={buyEquipment} />}
        </Modal>
      )}
    </>
  );
}
export default BuyEquipment;
