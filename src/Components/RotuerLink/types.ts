import { RouteName } from "@/Router/types";

export type RouterLinkPropTypes = {
  to: RouteName;
  className?: string;
  price?: number;
  icon?: boolean;
};
