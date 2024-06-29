import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { Home, AskCards, About, Readings, Spread } from "@/Pages";
import { ROUTES_NAMES } from "./routes-names";
import { SPREADS } from "@/helpers";

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
          spreadPrice={SPREADS.CARD_OF_THE_DAY.PRICE}
          cardsQty={SPREADS.CARD_OF_THE_DAY.CARDS_QTY}
        />
      ),
    },
    {
      path: ROUTES_NAMES.YES_NO,
      element: (
        <Spread
          title="Так / Ні"
          spreadDescription="Якийсь опис розкладу"
          spreadPrice={SPREADS.YES_NO.PRICE}
          cardsQty={SPREADS.YES_NO.CARDS_QTY}
        />
      ),
    },
    {
      path: ROUTES_NAMES.ASK_QUESTION,
      element: <AskCards />,
    },

    {
      path: ROUTES_NAMES.ABOUT,
      element: <About />,
    },
    { path: ROUTES_NAMES.READINGS, element: <Readings /> },
    { path: "*", element: <Navigate to={ROUTES_NAMES.HOME} /> },
  ];
};

export default useRoutes;
