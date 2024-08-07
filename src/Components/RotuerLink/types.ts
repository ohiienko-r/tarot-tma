import { RouteName } from "@/Router/types";
import { CardKey } from "@/types";

export type RouterLinkPropTypes = {
  to: RouteName;
  title: string;
  icon?: string;
  className?: string;
  state?: { title: string; cardsKeys: CardKey[]; reading: string };
};
