import { Card, Path } from "@/types";

export type UseSendSpreadPropTypes = {
  fromPath: Path;
  title: string;
  cardsKeys: Card[];
  prompt?: string;
  reading: string;
};
