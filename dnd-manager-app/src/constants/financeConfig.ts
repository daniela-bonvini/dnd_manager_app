export const financialStates: Record<string, string> = {
  Bankrupt: "Bankrupt",
  Poor: "Poor",
  Struggling: "Struggling",
  Wealthy: "Wealthy",
  Rich: "Rich",
};

export const financeBands = [
  { max: 0, label: financialStates.Bankrupt },
  { max: 150, label: financialStates.Poor },
  { max: 300, label: financialStates.Struggling },
  { max: 500, label: financialStates.Wealthy },
  { max: Infinity, label: financialStates.Rich },
];

export function getFinanceState(amount: number): string {
  for (const band of financeBands) {
    if (amount <= band.max) return band.label;
  }
  return financialStates.Rich;
}
