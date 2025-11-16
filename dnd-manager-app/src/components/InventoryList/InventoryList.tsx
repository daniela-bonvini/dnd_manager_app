import type { ExtentedEquipment } from "../../models/EquipmentModel";
import "./InventoryList.css";

function InventoryList({ equipmentList }: { equipmentList: ExtentedEquipment[] }) {
  return (
    <div className="inventory-list-wrapper">
      {equipmentList.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul className="inventory-list">
          {equipmentList.map((item) => (
            <li key={item.index} className="inventory-item">
              {item.name} : {item.cost} gold
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default InventoryList;
