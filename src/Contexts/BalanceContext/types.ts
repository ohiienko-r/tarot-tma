export type BalanceContextType = {
  balance: number | null;
  updateBalance: (updateValue: number) => Promise<void>;
};
