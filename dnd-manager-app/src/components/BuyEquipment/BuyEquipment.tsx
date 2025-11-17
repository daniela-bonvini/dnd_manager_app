import { CircleDollarSign } from "lucide-react";
import Modal from "../shared/Modal/Modal";
import EquipmentGrid from "../EquipmentGrid/EquipmentGrid";
import { useStatsContext } from "../../contexts/StatsContext";
import { useEquipmentContext } from "../../contexts/EquipmentContext";
import Tooltip from "../shared/Tooltip/Tooltip";
import Button from "../shared/Button/Button";
import useToggle from "../../custom-hooks/use-toggle";
import "./BuyEquipment.css";

function BuyEquipment({ buttonLabel }: { buttonLabel?: string }) {
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);

  const statsContext = useStatsContext();
  const { money } = statsContext;
  const equipmentContext = useEquipmentContext();
  const { buyEquipment, buyableEquipment } = equipmentContext;

  return (
    <>
      <Tooltip text="You don't have enough money. Try selling some items." show={money === 0}>
        <Button buttonLabel={buttonLabel} handleButtonClick={toggleIsModalOpen} disabled={money <= 0}>
          <CircleDollarSign />
        </Button>
      </Tooltip>

      {isModalOpen && (
        <Modal handleDismiss={toggleIsModalOpen}>
          <div className="buy-equipment-header">
            <h3>Available equipment under {money} gold</h3>
          </div>
          <EquipmentGrid equipmentList={buyableEquipment || []} handleButtonClick={buyEquipment} />
        </Modal>
      )}
    </>
  );
}
export default BuyEquipment;
