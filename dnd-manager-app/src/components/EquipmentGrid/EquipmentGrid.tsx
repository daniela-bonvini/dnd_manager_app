import type { ExtentedEquipment } from "../../models/EquipmentModel";
import "./EquipmentGrid.css";

function EquipmentGrid({ equipmentList }: { equipmentList: ExtentedEquipment[] }) {
  return (
    <div className="equipment-grid">
      {equipmentList.map((item) => (
        <div key={item.index} className="equipment-card">
          <h4>{item.name}</h4>
          <p>{item.cost} gold</p>
        </div>
      ))}
    </div>
  );
}

export default EquipmentGrid;
