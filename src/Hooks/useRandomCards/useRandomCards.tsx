import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { cards } from "@/Cards";
import { shuffle } from "@/helpers";
import { SystemLanguage, CardKey, RandomCards } from "@/types";

const useRandomCards = (cardsQty: number) => {
  const [randomCards, setRandomCards] = useState<RandomCards>({
    cardsNames: [],
    cardsKeys: [],
  });
  const { i18n } = useTranslation();

  useEffect(() => {
    const getRandomCards = () => {
      const currentLanguage = i18n.language as SystemLanguage;

      const keys = Object.keys(cards[currentLanguage]) as CardKey[];

      const shuffledKeys = shuffle(keys);
      console.log("keys shuffled");

      const selectedKeys = shuffledKeys.slice(0, cardsQty) as CardKey[];

      const randomCardsNames = selectedKeys.map(
        (key) => cards[currentLanguage][key]
      );

      const randomCardsKeys = selectedKeys;

      setRandomCards({
        cardsNames: randomCardsNames,
        cardsKeys: randomCardsKeys,
      });
    };

    getRandomCards();
  }, [cardsQty, i18n.language]);

  return {
    cardsNames: randomCards.cardsNames,
    cardsKeys: randomCards.cardsKeys,
  };
};

export default useRandomCards;
