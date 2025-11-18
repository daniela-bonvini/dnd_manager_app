import "./AdventurerStats.css";
import { ArrowBigUpDash, PiggyBank, ShieldUser } from "lucide-react";
import { useStatsContext } from "../../contexts/StatsContext";
import { useEffect } from "react";

function AdventurerStats() {
  const statsContext = useStatsContext();
  const { adventurerFinanceState, level, money, setAdventurerFinanceState } = statsContext;

  const getFinanceState = (amount: number): string => {
    if (amount === 0) return "Bankrupt";
    if (amount < 150) return "Poor";
    if (amount < 300) return "Struggling";
    if (amount < 500) return "Wealthy";
    return "Rich";
  };

  useEffect(() => {
    const newState = getFinanceState(money);
    if (newState !== adventurerFinanceState) {
      setAdventurerFinanceState(newState);
    }
  }, [money, adventurerFinanceState, setAdventurerFinanceState]);

  return (
    <>
      <div className="adventurer-stats">
        <div className="stats-item">
          <ShieldUser size={20} />
          <label>NAME: </label>
          <span>
            <i>{adventurerFinanceState}</i> adventurer
          </span>
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
