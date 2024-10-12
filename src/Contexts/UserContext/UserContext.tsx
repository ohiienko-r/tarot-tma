import { createContext } from "react";
import { User } from "@/types";

type UserContextValue = {
  user: User | null;
  balance: number | undefined;
  updateBalance: (value: number) => void;
};

export const UserContext = createContext<UserContextValue | null>(null);
