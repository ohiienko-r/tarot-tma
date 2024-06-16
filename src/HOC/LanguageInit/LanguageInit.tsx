import { FC } from "react";
import { useLanguage } from "@/Hooks";

const LanguageInit = (Component: FC) => {
  return (props: any) => {
    useLanguage();
    return <Component {...props} />;
  };
};

export default LanguageInit;
