import { ROUTES_NAMES } from "./routes-names";
import { Root } from "@/Root";
import { CardOfTheDay, YesNo, AskCards, HowDoesItWork } from "@/Pages";

export const routes = [
  {
    path: ROUTES_NAMES.ROOT,
    element: <Root />,
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
];
