import { CardKey, Path } from "@/types";

export type UseSendSpreadPropTypes = {
  fromPath: Path;
  title: string;
  cardsKeys: CardKey[];
  prompt?: string;
  reading: string;
};
