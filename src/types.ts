import { cards } from "./Cards/cards.dto";
import { ROUTES_NAMES } from "./Router";

export type ValidationResponse = {
  success: boolean;
  message?: string;
};

export type SystemLanguage = "english" | "ukrainian" | "russian";

export type CardKey = keyof (typeof cards)[SystemLanguage];

export type Card =
  (typeof cards)[SystemLanguage][keyof (typeof cards)[SystemLanguage]];

export type RandomCards = {
  cardsNames: Card[];
  cardsKeys: CardKey[];
};

export type Path = (typeof ROUTES_NAMES)[keyof typeof ROUTES_NAMES];

export type ImageModule = {
  default: string;
};
