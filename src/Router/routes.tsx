import { ROUTES_NAMES } from "./routes-names";
import {
  Home,
  AskCards,
  CardOfTheDay,
  HowDoesItWork,
  YesNo,
  Readings,
} from "@/Pages";

export const routes = [
  {
    path: ROUTES_NAMES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES_NAMES.CARD_OF_THE_DAY,
    element: <CardOfTheDay />,
  },
  {
    path: ROUTES_NAMES.YES_NO,
    element: <YesNo />,
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
