import { createContext } from "react";
import { BalanceContextType } from "./types";

export const BalanceContext = createContext<BalanceContextType | null>(null);
