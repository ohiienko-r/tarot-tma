import { FC } from "react";
import { Header, Main } from "@/Components";
import { useTranslation } from "react-i18next";
import { useQuery } from "@/Hooks";

const Root: FC = () => {
  const { i18n } = useTranslation();
  const query = useQuery();
  const lang = query.get("lang");

  i18n.changeLanguage(lang ?? "english");

  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export default Root;
