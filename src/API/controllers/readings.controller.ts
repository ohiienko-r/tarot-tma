import { ROUTES_NAMES } from "@/Router";
import { prompts } from "../api.dto";
import { Card, SystemLanguage, Path } from "@/types";

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
const getReadings = async (
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

export default getReadings;
