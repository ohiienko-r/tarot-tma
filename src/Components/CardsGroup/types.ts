import { CardKey } from "@/types";
import { Dispatch, SetStateAction } from "react";

export type CardsGroupPropTypes = {
  cardsKeys: CardKey[];
  cardsFlipped: boolean;
  setCardsFlipped: Dispatch<SetStateAction<boolean>>;
};
