import "./AdventurerStats.css";
import { ArrowBigUpDash, PiggyBank, ShieldUser } from "lucide-react";
import { useStatsContext } from "../../contexts/StatsContext";

function AdventurerStats() {
  const statsContext = useStatsContext();

  const { level, money } = statsContext;
  return (
    <>
      <div className="adventurer-stats">
        <div className="stats-item">
          <ShieldUser size={20} />
          <label>NAME: </label>
          <span>Brave adventurer</span>
        </div>
        <div className="stats-item">
          <ArrowBigUpDash size={20} />
          <label>LEVEL: </label>
          <span>{level}</span>
        </div>
        <div className="stats-item">
          <PiggyBank size={20} />
          <label>MONEY: </label>
          <span>{money}</span>
        </div>
      </div>
    </>
  );
}

export default AdventurerStats;
