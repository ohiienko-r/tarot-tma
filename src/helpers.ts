import { retrieveLaunchParams } from "@tma.js/sdk-react";
import { ValidationResponse } from "./types";

export const validateInitData = async (): Promise<boolean> => {
  const { initDataRaw } = retrieveLaunchParams();

  try {
    const response = await fetch(
      import.meta.env.VITE_INIT_DATA_VALIDATION_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `tma ${initDataRaw}`,
        },
      }
    );

    const data: ValidationResponse = await response.json();

    return data.success;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const SPREADS = {
  CARD_OF_THE_DAY: {
    PRICE: 2,
    CARDS_QTY: 1,
  },
  YES_NO: {
    PRICE: 3,
    CARDS_QTY: 1,
  },
  QUESTION_TO_THE_CARDS: {
    PRICE: 5,
    CARDS_QTY: 3,
  },
} as const;
