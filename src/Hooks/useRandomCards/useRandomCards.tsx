import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { cards } from "@/Cards";
import { SystemLanguage, CardKey, Card, RandomCards } from "@/types";

const useRandomCards = (cardsQty: number) => {
  const [randomCards, setRandomCards] = useState<RandomCards>({
    cardsNames: [],
    cardsKeys: [],
  });
  const { i18n } = useTranslation();

  useEffect(() => {
    const getRandomCards = () => {
      const currentLanguage = i18n.language as SystemLanguage;
      const randomCardsNames = [] as Card[];
      const randomCardsKeys = [] as CardKey[];

      for (let i = 0; i < cardsQty; i++) {
        const keys = Object.keys(cards[currentLanguage]);
        const cardKey = keys[
          Math.floor(Math.random() * keys.length)
        ] as CardKey;
        randomCardsKeys.push(cardKey);
        randomCardsNames.push(cards[currentLanguage][cardKey]);
      }
      setRandomCards({
        cardsNames: randomCardsNames,
        cardsKeys: randomCardsKeys,
      });
    };

    getRandomCards();
  }, [cardsQty, i18n]);

  return {
    cardsNames: randomCards.cardsNames,
    cardsKeys: randomCards.cardsKeys,
  };
};

export default useRandomCards;
