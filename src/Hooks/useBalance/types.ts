export type UseBalance = [
  number,
  boolean,
  (updateValue: number) => Promise<void>
];
