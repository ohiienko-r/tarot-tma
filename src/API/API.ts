import { ROUTES_NAMES } from "@/Router";
import { prompts } from "./api.dto";
import { Card, Path, SystemLanguage, FeedbackBody } from "@/types";

const getCardOfTheDayReading = async (
  card: Card[],
  systemLanguage: SystemLanguage
) => {
  try {
    const response = await fetch(import.meta.env.VITE_CARD_OF_THE_DAY_SPREAD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: systemLanguage,
        cards: card,
        prompt: prompts[systemLanguage].cardOfTheDay,
      }),
    });

    const responseText = await response.text();
    return responseText;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getYesNoReading = async (
  card: Card[],
  systemLanguage: SystemLanguage
) => {
  try {
    const response = await fetch(import.meta.env.VITE_CARD_OF_THE_DAY_SPREAD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: systemLanguage,
        cards: card,
        prompt: prompts[systemLanguage].yesNo,
      }),
    });

    const responseText = await response.text();
    return responseText;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getQuestionReading = async (
  cards: Card[],
  systemLanguage: SystemLanguage,
  prompt: string
) => {
  try {
    const response = await fetch(import.meta.env.VITE_CARD_OF_THE_DAY_SPREAD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: systemLanguage,
        cards: cards,
        prompt: prompt,
      }),
    });

    const responseText = await response.text();
    return responseText;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getReadings = async (
  card: Card[],
  systemLanguage: SystemLanguage,
  path: Path,
  prompt?: string
) => {
  switch (path) {
    case ROUTES_NAMES.CARD_OF_THE_DAY:
      return await getCardOfTheDayReading(card, systemLanguage);
    case ROUTES_NAMES.YES_NO:
      return await getYesNoReading(card, systemLanguage);
    case ROUTES_NAMES.QUESTION_INPUT:
      return await getQuestionReading(
        card,
        systemLanguage,
        prompt ?? prompts[systemLanguage].fallBackPrompt
      );
    default:
      return "Please provide the correct path";
  }
};

export const sendFeedback = async (body: FeedbackBody) => {
  try {
    await fetch(import.meta.env.VITE_SEND_FEEDBACK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("Failed to send feedback to server:", error);
  }
};

export const sendSpreadToUser = async ({
  uId,
  cardsKeys,
  title,
  prompt,
  reading,
}: {
  uId: number;
  title: string;
  prompt?: string;
  cardsKeys: Card[];
  reading: string;
}) => {
  try {
    await fetch(import.meta.env.VITE_SEND_SPREAD_TO_USER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uId: uId,
        cardsKeys: cardsKeys,
        prompt: prompt,
        title: title,
        reading: reading,
      }),
    });
  } catch (error) {
    console.error("Failed to send spread to user:", error);
  }
};

export const getUserBalance = async (uId: number) => {
  try {
    const response = await fetch(import.meta.env.VITE_GET_BALANCE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch balance: ${response.statusText}`);
    }

    const balance = await response.json();
    return balance;
  } catch (error) {
    console.error("Failed to get user's balance:", error);
    return null;
  }
};

export const updateUserBalance = async (uId: number, value: number) => {
  try {
    const response = await fetch(import.meta.env.VITE_UPD_BALANCE_URL, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uId: uId, value: value }),
    });

    return await response.json();
  } catch (error) {
    console.error("Failed to update user balance", error);
  }
};

export const setInitialBalance = async (uId: number) => {
  try {
    const response = await fetch(import.meta.env.VITE_SET_BALANCE_URL, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uId: uId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to set initial balance: ${response.statusText}`);
    }

    const balance = await response.json();
    return balance;
  } catch (error) {
    console.error("Failed to set user balance", error);
  }
};

export const migrateBalance = async (uId: number, cloudBalance: number) => {
  try {
    await fetch(import.meta.env.VITE_MIGRATE_BALANCE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uId: uId, balance: cloudBalance }),
    });
  } catch (error) {
    console.error("Failed to migrate balance", error);
  }
};

export const setAdsDisabledTill = async (uId: number) => {
  try {
    await fetch(import.meta.env.VITE_DISABLE_ADS_TILL_URL, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uId: uId }),
    });
  } catch (error) {
    console.error("Failed to set ads disabled till:", error);
  }
};

export const getAdsDisabledTill = async (uId: number) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_GET_ADS_DISABLED_TILL_URL,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uId: uId }),
      }
    );

    const endDate = await response.json();

    return endDate;
  } catch (error) {
    console.error("Failed to get ads disabled till:", error);
  }
};
