import { createContext } from "react";
import { WebAppUser } from "@twa-dev/types";

export const InitDataContext = createContext<WebAppUser | null | undefined>(
  null
);
