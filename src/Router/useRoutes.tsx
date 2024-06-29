import { useTranslation } from "react-i18next";
import { Home, AskCards, HowDoesItWork, Readings, Spread } from "@/Pages";
import { ROUTES_NAMES } from "./routes-names";
import { SPREAD } from "@/helpers";

const useRoutes = () => {
  const { t } = useTranslation();

  return [
    {
      path: ROUTES_NAMES.HOME,
      element: <Home />,
    },
    {
      path: ROUTES_NAMES.CARD_OF_THE_DAY,
      element: (
        <Spread
          title={t("/card-of-the-day")}
          spreadDescription={t("card of the day description")}
          spreadPrice={SPREAD.CARD_OF_THE_DAY.price}
          cardsQty={SPREAD.CARD_OF_THE_DAY.cardsQty}
        />
      ),
    },
    {
      path: ROUTES_NAMES.YES_NO,
      element: (
        <Spread
          title="Так / Ні"
          spreadDescription="Якийсь опис розкладу"
          spreadPrice={SPREAD.YES_NO.price}
          cardsQty={SPREAD.YES_NO.cardsQty}
        />
      ),
    },
    {
      path: ROUTES_NAMES.ASK_QUESTION,
      element: <AskCards />,
    },

    {
      path: ROUTES_NAMES.HOW_IT_WORKS,
      element: <HowDoesItWork />,
    },
    { path: ROUTES_NAMES.READINGS, element: <Readings /> },
  ];
};

export default useRoutes;
