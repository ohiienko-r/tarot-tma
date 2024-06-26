export type UseSpreadButton = {
  color: `#${string}`;
  title: string;
  spreadCost?: number;
  onClick: () => Promise<void> | (() => void);
};
