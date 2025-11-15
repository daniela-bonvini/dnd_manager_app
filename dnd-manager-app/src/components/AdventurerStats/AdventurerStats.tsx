import "./AdventurerStats.css";
import { CircleDollarSign, ArrowBigUpDash } from "lucide-react";
import { useStatsContext } from "../../contexts/StatsContext";

function AdventurerStats() {
  const statsContext = useStatsContext();

  const { level, money } = statsContext;
  return (
    <>
      <div className="adventurer-stats">
        <div className="adventurer-stats__item">
          <ArrowBigUpDash size={16} />
          <label>LEVEL: </label>
          <span>{level}</span>
        </div>
        <div className="adventurer-stats__item">
          <CircleDollarSign size={16} />
          <label>MONEY: </label>
          <span>{money}</span>
        </div>
      </div>
    </>
  );
}

export default AdventurerStats;
