import { CircleDollarSign } from "lucide-react";
import Modal from "../shared/Modal/Modal";
import EquipmentGrid from "../EquipmentGrid/EquipmentGrid";
import { useStatsContext } from "../../contexts/StatsContext";
import { useEquipmentContext } from "../../contexts/EquipmentContext";
import Tooltip from "../shared/Tooltip/Tooltip";
import Button from "../shared/Button/Button";
import useToggle from "../../custom-hooks/use-toggle";

function BuyEquipment({ buttonLabel }: { buttonLabel?: string }) {
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);

  const statsContext = useStatsContext();
  const { money } = statsContext;
  const equipmentContext = useEquipmentContext();
  const { buyEquipment, buyableEquipment } = equipmentContext;

  return (
    <>
      <Tooltip text="You don't have enough money. Try selling some items." show={money === 0}>
        <Button buttonLabel={buttonLabel} handleOpenModal={toggleIsModalOpen} disabled={money <= 0}>
          <CircleDollarSign />
        </Button>
      </Tooltip>

      {isModalOpen && (
        <Modal handleDismiss={toggleIsModalOpen}>
          <h3>Available Equipment under {money} gold</h3>
          <EquipmentGrid equipmentList={buyableEquipment || []} handleButtonClick={buyEquipment} />
        </Modal>
      )}
    </>
  );
}
export default BuyEquipment;
