import type { ExtentedEquipment } from "../../models/EquipmentModel";
import "./EquipmentGrid.css";

function EquipmentGridCard({ item, handleButtonClick }: { item: ExtentedEquipment; handleButtonClick: (item: ExtentedEquipment) => void }) {
  return (
    <div className="equipment-card" onClick={() => handleButtonClick(item)}>
      <h4>{item.name}</h4>
      <p>{item.cost} gold</p>
    </div>
  );
}

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
        equipmentList.map((item) => <EquipmentGridCard key={item.index} item={item} handleButtonClick={handleItemClick} />)
      )}
    </div>
  );
}

export default EquipmentGrid;
