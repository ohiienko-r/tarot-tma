export type BalanceContextType = {
  balance: number | undefined;
  updateBalance: (updateValue: number) => Promise<void>;
};
