import { cards } from "./cards.dto";
import { SystemLanguage, CardKey, Card, RandomCards } from "@/types";

export const getRandomCards = (
  cardsQty: number,
  language: SystemLanguage
): RandomCards => {
  const randomCardsNames = [] as Card[];
  const randomCardsKeys = [] as CardKey[];

  for (let i = 0; i < cardsQty; i++) {
    const keys = Object.keys(cards[language]);
    const cardKey = keys[Math.floor(Math.random() * keys.length)] as CardKey;
    randomCardsKeys.push(cardKey);
    randomCardsNames.push(cards[language][cardKey]);
  }
  return { cardsNames: randomCardsNames, cardsKeys: randomCardsKeys };
};
