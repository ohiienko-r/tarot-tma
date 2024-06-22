import { ROUTES_NAMES } from "@/Router/routes-names";
import cardOfTheDay from "@/assets/card_of_the_day.svg";
import yesNo from "@/assets/yes_no.svg";
import question from "@/assets/question.png";

export const spreadsList = [
  { id: 0, name: ROUTES_NAMES.CARD_OF_THE_DAY, icon: cardOfTheDay },
  { id: 1, name: ROUTES_NAMES.YES_NO, icon: yesNo },
  { id: 2, name: ROUTES_NAMES.ASK_QUESTION, icon: question },
];
