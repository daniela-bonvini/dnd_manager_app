import { HandCoins } from "lucide-react";
import { useEquipmentContext } from "../../contexts/EquipmentContext";
import type { ExtentedEquipment } from "../../models/EquipmentModel";
import Modal from "../shared/Modal/Modal";
import EquipmentGrid from "../EquipmentGrid/EquipmentGrid";
import Tooltip from "../shared/Tooltip/Tooltip";
import Button from "../shared/Button/Button";
import { useStatsContext } from "../../contexts/StatsContext";
import useToggle from "../../custom-hooks/use-toggle";

function SellEquipment({ buttonLabel }: { buttonLabel?: string }) {
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);

  const equipmentContext = useEquipmentContext();
  const { equipmentInInventory, sellEquipment } = equipmentContext;
  const statsContext = useStatsContext();
  const { money } = statsContext;

  async function handleSellEquipmentClick(item: ExtentedEquipment) {
    sellEquipment(item);
  }

  return (
    <>
      <Tooltip text="You don't have any items to sell. Try buying some." show={equipmentInInventory.length <= 0}>
        <Button buttonLabel={buttonLabel} handleOpenModal={toggleIsModalOpen} disabled={equipmentInInventory.length <= 0}>
          <HandCoins />
        </Button>
      </Tooltip>

      {isModalOpen && (
        <Modal handleDismiss={toggleIsModalOpen}>
          <h3>Sellable equipment. Current money {money}</h3>
          {<EquipmentGrid equipmentList={equipmentInInventory} handleButtonClick={handleSellEquipmentClick} />}
        </Modal>
      )}
    </>
  );
}
export default SellEquipment;
