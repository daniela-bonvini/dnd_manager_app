import { CircleDollarSign } from "lucide-react";
import React from "react";
import Modal from "../shared/Modal/Modal";
import "./BuyEquipment.css";
import EquipmentGrid from "../EquipmentGrid/EquipmentGrid";
import { useStatsContext } from "../../contexts/StatsContext";
import { useEquipmentContext } from "../../contexts/EquipmentContext";
import Tooltip from "../shared/Tooltip/Tooltip";
import Button from "../shared/Button/Button";

function BuyEquipment({ buttonLabel }: { buttonLabel?: string }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const statsContext = useStatsContext();
  const { money } = statsContext;
  const equipmentContext = useEquipmentContext();
  const { buyEquipment, buyableEquipment } = equipmentContext;

  async function handleAddButtonClick() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <Tooltip text="You don't have enough money. Try selling some items." show={money === 0}>
        <Button buttonLabel={buttonLabel} handleOpenModal={handleAddButtonClick} disabled={money <= 0}>
          <CircleDollarSign />
        </Button>
      </Tooltip>

      {isModalOpen && (
        <Modal handleDismiss={handleCloseModal}>
          <h3>Available Equipment under {money} gold</h3>
          <EquipmentGrid equipmentList={buyableEquipment || []} handleButtonClick={buyEquipment} />
        </Modal>
      )}
    </>
  );
}
export default BuyEquipment;
