import React from "react";

export const StatsContext = React.createContext<
  { level: number; setLevel: (level: number) => void; money: number; setMoney: (money: number) => void } | undefined
>(undefined);

export function useStatsContext() {
  const context = React.useContext(StatsContext);
  if (!context) {
    throw new Error("useStatsContext must be used within StatsContext.Provider");
  }
  return context;
}
