import "./AdventurerStats.css";
import { ArrowBigUpDash, PiggyBank, ShieldUser } from "lucide-react";
import { useStatsContext } from "../../contexts/StatsContext";
import { useEffect } from "react";

function AdventurerStats() {
  const statsContext = useStatsContext();
  const { adventurerFinanceState, level, money } = statsContext;

  useEffect(() => {
    if (money >= 300) {
      statsContext.setAdventurerFinanceState("Wealthy");
    } else if (money >= 150) {
      statsContext.setAdventurerFinanceState("Struggling");
    } else if (money === 0) {
      statsContext.setAdventurerFinanceState("Bankrupt");
    } else {
      statsContext.setAdventurerFinanceState("Poor");
    }
  }, [money, statsContext]);

  return (
    <>
      <div className="adventurer-stats">
        <div className="stats-item">
          <ShieldUser size={20} />
          <label>NAME: </label>
          <span>{adventurerFinanceState} adventurer</span>
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
