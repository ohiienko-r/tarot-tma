export type UseBalance = [
  number | null,
  boolean,
  (updateValue: number) => Promise<void>
];
