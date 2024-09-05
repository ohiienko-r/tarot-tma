import { ROUTES_NAMES } from "@/Router";
import { prompts } from "./api.dto";
import {
  Card,
  Path,
  SystemLanguage,
  FeedbackBody,
  SendSpreadToUserBody,
} from "@/types";

/**
 *
 * @param {Card[]} card - one of the Tarot cards names;
 * @param {SystemLanguage} systemLanguage - IETF Language code supported by app;
 * @returns LLM response Tarot readings string for the provided card;
 */
const getCardOfTheDayReading = async (
  card: Card[],
  systemLanguage: SystemLanguage
): Promise<string | null> => {
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
    throw new Error(
      `Failed to get a card of the days readings response: ${error}`
    );
  }
};

/**
 *
 * @param {Card[]} card - one of the Tarot cards names;
 * @param {SystemLanguage} systemLanguage - IETF Language code supported by app;
 * @returns LLM response Tarot readings string for the provided card;
 */
const getYesNoReading = async (
  card: Card[],
  systemLanguage: SystemLanguage
): Promise<string | null> => {
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
    throw new Error(`Failed to get a yes/no readings response: ${error}`);
  }
};

/**
 *
 * @param {Card[]} cards - three Tarot cards names;
 * @param {SystemLanguage} systemLanguage - IETF Language code supported by app;
 * @param {string} prompt - user's prompt to LLM represented by so called question to the cards;
 * @returns LLM response Tarot readings string for the provided cards;
 */
const getQuestionReading = async (
  cards: Card[],
  systemLanguage: SystemLanguage,
  prompt: string
): Promise<string | null> => {
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
    throw new Error(
      `Failed to get a question to the cards readings response: ${error}`
    );
  }
};

/**
 * Controller function for calling a function that gets required type of readings according to router path;
 * @param {Card[]} card - one or three Tarot cards names;
 * @param {SystemLanguage} systemLanguage - IETF Language code supported by app;
 * @param {Path} path - router navigation path;
 * @param {string} prompt - user's prompt to LLM represented by so called question to the cards;
 * @returns LLM response Tarot readings string for the provided cards;
 */
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

/**
 * Sends a user's feedback to Bot api server where it's sent to a DB and to admin's personal chat with Bot;
 * @param {FeedbackBody} body - object that contains user's Tg id, first name, rating of app from 1 to 5 and feedback string;
 */
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

/**
 *  Sends a user's whole spread reading and cards keys to Bot API server where it's sent into a private chat with bot to a
 * respective user accirding to uId;
 * @param {SendSpreadToUserBody} body - object that contains user's Tg id, array of cards object keys, spread title,
 * user's prompt (if applicable) and LLM response Tarot readings string;
 */
export const sendSpreadToUser = async ({
  uId,
  cardsKeys,
  title,
  prompt,
  reading,
}: SendSpreadToUserBody) => {
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

/**
 *
 * @param {number} uId - user's Telegram id;
 * @returns user's Magic Coins balance;
 */
export const getUserBalance = async (
  uId: number
): Promise<number | undefined> => {
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
    return undefined;
  }
};

/**
 * Updates user's Magic Coins balance
 * @param {number} uId - user's Telegram id;
 * @param {number} value - balance update value either positive or a negative number;
 */
export const updateUserBalance = async (
  uId: number,
  value: number
): Promise<void> => {
  try {
    const response = await fetch(import.meta.env.VITE_UPD_BALANCE_URL, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uId: uId, value: value }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch balance: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Failed to update user balance", error);
  }
};

/**
 * Sets initial balance for a new user;
 * @param {number} uId - user's Telegram id;
 * @returns new user's initial Magic Coins balance;
 */
export const setInitialBalance = async (
  uId: number
): Promise<number | undefined> => {
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

/**
 * Transfers user's balance from Telegram's CloudStorage to a DB. (During POC stage user's balance used to be stored in CloudStorage
 * as long as it was quick and dirty solution. Function will be depricated next sprint).
 * @param {number} uId - user's Telegram id;
 * @param {number} cloudBalance - user's balance that used to be stored in Telegram Cloud Storage;
 */
export const migrateBalance = async (uId: number, cloudBalance: number) => {
  try {
    const response = await fetch(import.meta.env.VITE_MIGRATE_BALANCE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uId: uId, balance: cloudBalance }),
    });

    if (!response.ok) {
      throw new Error(`Failed to migrate balance: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Failed to migrate balance", error);
  }
};

/**
 *  Sets a date in DB till which user won't be shown any ads neither before spread nor other kind of ads;
 * @param {number} uId - user's Telegram id;
 */
export const setAdsDisabledTill = async (uId: number) => {
  try {
    const response = await fetch(import.meta.env.VITE_DISABLE_ADS_TILL_URL, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uId: uId }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to set ads disable till date: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Failed to set ads disabled till:", error);
  }
};

/**
 *
 * @param {number} uId - user's Telegram id;
 * @returns date till which ads are disabled or null if they're not disabled;
 */
export const getAdsDisabledTill = async (
  uId: number
): Promise<Date | null | undefined> => {
  try {
    const response = await fetch(
      import.meta.env.VITE_GET_ADS_DISABLED_TILL_URL,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uId: uId }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to get ads disabled till date: ${response.statusText}`
      );
    }

    const endDate = await response.json();

    return endDate;
  } catch (error) {
    console.error("Failed to get ads disabled till:", error);
  }
};
