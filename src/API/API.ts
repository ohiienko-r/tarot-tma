import { Card, SystemLanguage } from "@/types";

export const getCardOfTheDayReading = async (
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
        prompt: "Моя карта дня",
      }),
    });

    const responseText = await response.text();
    return responseText;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
