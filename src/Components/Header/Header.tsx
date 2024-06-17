import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@/Hooks";
import classes from "./header.module.scss";
import WebApp from "@twa-dev/sdk";

const Header: FC = () => {
  const { t } = useTranslation();
  const query = useQuery();

  const user = WebApp.initDataUnsafe.user;

  const displayName = query.get("first_name") ?? "User Name";

  return (
    <header className={classes.heading}>
      {t("greeting") + " " + displayName}
      {user?.first_name}
    </header>
  );
};

export default Header;
