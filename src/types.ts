import { cards } from "./Cards/cards.dto";
import { ROUTES_NAMES } from "./Router";

export type ValidationResponse = {
  success: boolean;
  message?: string;
};

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

export type FeedbackBody = {
  uId: number | undefined;
  name: string | undefined;
  rating: number;
  feedback: string;
};

export type SendSpreadToUserBody = {
  uId: number;
  title: string;
  prompt?: string;
  cardsKeys: CardKey[];
  reading: string;
};

export type UserData = {
  uId: number;
  firstName: string;
  userName: string;
  languageCode: string;
  referrerId?: number;
};

export type User = {
  balance: number;
  uId: number;
  firstName: string | null;
  userName: string | null;
  languageCode: SystemLanguage | null;
  remind: boolean;
  referred: number | null;
};
