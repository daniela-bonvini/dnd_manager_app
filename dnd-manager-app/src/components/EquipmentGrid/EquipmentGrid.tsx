import type { ExtentedEquipment } from "../../models/EquipmentModel";
import "./EquipmentGrid.css";

function EquipmentGrid({
  equipmentList,
  handleButtonClick,
}: {
  equipmentList: ExtentedEquipment[];
  handleButtonClick: (item: ExtentedEquipment) => void;
}) {
  function handleItemClick(item: ExtentedEquipment) {
    handleButtonClick(item);
  }

  return (
    <div className="equipment-grid">
      {equipmentList.length === 0 ? (
        <span>There are no items available for your budget</span>
      ) : (
        equipmentList.map((item) => (
          <div key={item.index} className="equipment-card" onClick={() => handleItemClick(item)}>
            <h4>{item.name}</h4>
            <p>{item.cost} gold</p>
          </div>
        ))
      )}
    </div>
  );
}

export default EquipmentGrid;
