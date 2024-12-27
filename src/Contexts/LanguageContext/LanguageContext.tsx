import { createContext } from "react";
import { SystemLanguage } from "@/types";

type LanguageContextType = {
  language: SystemLanguage;
  changeLanguage: (lng: SystemLanguage) => Promise<void>;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  changeLanguage: async () => {},
});
