import { retrieveLaunchParams } from "@tma.js/sdk-react";
import { ValidationResponse } from "./types";

export const validateInitData = async (): Promise<boolean> => {
  const { initDataRaw } = retrieveLaunchParams();

  const response = await fetch(import.meta.env.VITE_INIT_DATA_VALIDATION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `tma ${initDataRaw}`,
    },
  });

  const data: ValidationResponse = await response.json();

  return data.success;
};

export const SPREAD = {
  CARD_OF_THE_DAY: {
    price: 1,
    cardsQty: 1,
  },
  YES_NO: {
    price: 1,
    cardsQty: 1,
  },
  QUESTION_TO_THE_CARDS: {
    price: 3,
    cardsQty: 3,
  },
} as const;
