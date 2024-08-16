import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { cloudStorage } from "@/Telegram";
import { ROUTES_NAMES } from "@/Router";
import { LinkState } from "./types";
import cardOfTheDay from "@/assets/one_card.png";
import yesNo from "@/assets/two_cards.png";
import question from "@/assets/three_cards.png";
import questionMark from "@/assets/question_mark.svg";

const useNavigation = () => {
  const [linkState, setLinkState] = useState<LinkState>({
    to: ROUTES_NAMES.CARD_OF_THE_DAY,
    state: undefined,
  });
  const { t } = useTranslation();

  useEffect(() => {
    const handleCardOfTheDayRoute = async () => {
      const routeState = await cloudStorage.get("myCard");

      if (routeState !== "") {
        const state = JSON.parse(routeState);
        setLinkState({ to: ROUTES_NAMES.READINGS, state: state });
      } else {
        setLinkState({
          to: ROUTES_NAMES.CARD_OF_THE_DAY,
          state: undefined,
        });
      }
    };

    handleCardOfTheDayRoute();
  }, []);

  const navigation = [
    {
      id: 0,
      to: linkState.to,
      title: t(ROUTES_NAMES.CARD_OF_THE_DAY),
      price: 2,
      icon: cardOfTheDay,
      state: linkState.state,
    },
    {
      id: 1,
      to: ROUTES_NAMES.YES_NO,
      title: t(ROUTES_NAMES.YES_NO),
      price: 3,
      icon: yesNo,
    },
    {
      id: 2,
      to: ROUTES_NAMES.QUESTION,
      title: t(ROUTES_NAMES.QUESTION),
      price: 5,
      icon: question,
    },
    {
      id: 3,
      to: ROUTES_NAMES.ABOUT,
      title: t(ROUTES_NAMES.ABOUT),
      icon: questionMark,
      class: "main-section__faq-link",
    },
  ];

  return navigation;
};

export default useNavigation;
