import { CardKey } from "@/types";
import { RouteName } from "@/Router/types";

export type LinkState = {
  to: RouteName;
  state: { title: string; cardsKeys: CardKey[]; reading: string } | undefined;
};
