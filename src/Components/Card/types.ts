import { CardKey } from "@/types";
import { Dispatch, SetStateAction } from "react";

export type CardPropTypes = {
  cardKey: CardKey;
  flipped: boolean;
  setFlipped: Dispatch<SetStateAction<boolean>>;
};
