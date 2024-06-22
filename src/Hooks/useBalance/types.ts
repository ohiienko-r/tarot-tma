export type UseBalance = {
  balance: number | null;
  isEnough: boolean;
  updateBalance: (updateValue: number) => Promise<void>;
};
