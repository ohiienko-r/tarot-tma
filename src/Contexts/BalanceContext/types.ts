export type BalanceContextType = {
  balance: number | null;
  isEnough: boolean;
  updateBalance: (updateValue: number) => Promise<void>;
};
