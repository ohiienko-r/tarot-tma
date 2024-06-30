import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCloudStorage } from "@tma.js/sdk-react";
import { useDailyActivity } from "@/Hooks";
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
  const { activityAvailable } = useDailyActivity();
  const cloudStorage = useCloudStorage();

  useEffect(() => {
    const handleCardOfTheDayRoute = async () => {
      const routeState = await cloudStorage.get("myCard");
      if (!activityAvailable && routeState !== "") {
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
  }, [activityAvailable]);

  const navigation = [
    {
      id: 0,
      to: linkState.to,
      title: t(ROUTES_NAMES.CARD_OF_THE_DAY),
      icon: cardOfTheDay,
      state: linkState.state,
    },
    {
      id: 1,
      to: ROUTES_NAMES.YES_NO,
      title: t(ROUTES_NAMES.YES_NO),
      icon: yesNo,
    },
    {
      id: 2,
      to: ROUTES_NAMES.ASK_QUESTION,
      title: t(ROUTES_NAMES.ASK_QUESTION),
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
