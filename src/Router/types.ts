import { ROUTES_NAMES } from "./routes-names";

export type RouteName = (typeof ROUTES_NAMES)[keyof typeof ROUTES_NAMES];
