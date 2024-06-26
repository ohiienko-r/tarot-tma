export type UseSpreadButton = {
  color: `#${string}`;
  title: string;
  disabled?: boolean;
  spreadCost?: number;
  onClick: () => Promise<void> | (() => void);
};
