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
