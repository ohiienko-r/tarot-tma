import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useInitData } from "@/Contexts";
import classes from "./header.module.scss";
import WebApp from "@twa-dev/sdk";

const Header: FC = () => {
  const { t } = useTranslation();
  const user = useInitData();

  const displayName = user?.first_name ?? "User Name";

  return (
    <header className={classes.heading}>
      {t("greeting") + " " + displayName}
    </header>
  );
};

export default Header;
