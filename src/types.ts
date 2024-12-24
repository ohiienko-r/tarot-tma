import { cards } from "./Cards/cards.dto";
import { ROUTES_NAMES } from "./Router";

export type SystemLanguage = "en" | "uk" | "ru";

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

export type User = {
  id: number;
  user_name: string | null;
  first_name: string | null;
  balance: number;
  language_code: string | null;
  created_at: string | null;
  last_login: string | null;
  ads_disabled_till: Date | null;
  daily_reminder: boolean;
  ref_id: number | null;
  daily_bonus: boolean;
};
