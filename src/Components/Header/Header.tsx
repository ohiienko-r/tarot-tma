import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@/Hooks";

const Header: FC = () => {
  const { t } = useTranslation();
  const query = useQuery();

  const displayName = query.get("first_name") ?? "User Name";

  return <header>{t("greeting") + " " + displayName}</header>;
};

export default Header;
