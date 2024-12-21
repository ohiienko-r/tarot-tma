import { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { viewport, retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/Hooks";
import { Home, Spread, Question, About, Readings, Payment } from "@/Pages";
import { unsupportedFullScreenPlatforms } from "@/helpers";
import { ROUTES_NAMES } from "./routes-names";

const AppRouter = () => {
  const { t } = useTranslation();
  const lp = retrieveLaunchParams();
  useLanguage();

  useEffect(() => {
    const enterFullScreen = async () => {
      if (unsupportedFullScreenPlatforms.includes(lp.platform)) {
        return;
      }

      if (viewport.requestFullscreen.isAvailable()) {
        await viewport.requestFullscreen();
      }
    };

    enterFullScreen();
  }, [lp.platform]);

  const router = createBrowserRouter([
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
          spreadPrice={2}
          cardsQty={1}
        />
      ),
    },
    {
      path: ROUTES_NAMES.YES_NO,
      element: (
        <Spread
          title={t("/yes-no")}
          spreadDescription={t("yes no description")}
          spreadPrice={3}
          cardsQty={1}
        />
      ),
    },
    {
      path: ROUTES_NAMES.QUESTION,
      element: (
        <Spread
          title={t("/question")}
          spreadDescription={t("question to the cards description")}
          spreadPrice={5}
          cardsQty={3}
        />
      ),
    },
    {
      path: ROUTES_NAMES.QUESTION_INPUT,
      element: <Question />,
    },
    { path: ROUTES_NAMES.PAYMENT, element: <Payment /> },
    {
      path: ROUTES_NAMES.ABOUT,
      element: <About />,
    },
    { path: ROUTES_NAMES.READINGS, element: <Readings /> },
    { path: "*", element: <Navigate to={ROUTES_NAMES.HOME} /> },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
