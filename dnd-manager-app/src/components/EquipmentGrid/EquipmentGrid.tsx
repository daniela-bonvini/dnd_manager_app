import type { ExtentedEquipment } from "../../models/EquipmentModel";
import { useEquipmentContext } from "../../contexts/EquipmentContext";
import "./EquipmentGrid.css";

function EquipmentGrid({ equipmentList, handleDismiss }: { equipmentList: ExtentedEquipment[]; handleDismiss: () => void }) {
  const { addEquipment } = useEquipmentContext();
  function handleItemClick(item: ExtentedEquipment) {
    handleDismiss();
    addEquipment(item);
  }

  return (
    <div className="equipment-grid">
      {equipmentList.map((item) => (
        <div key={item.index} className="equipment-card" onClick={() => handleItemClick(item)}>
          <h4>{item.name}</h4>
          <p>{item.cost} gold</p>
        </div>
      ))}
    </div>
  );
}

export default EquipmentGrid;
