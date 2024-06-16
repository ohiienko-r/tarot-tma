import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@/Hooks";
import classes from "./header.module.scss";

const Header: FC = () => {
  const { t } = useTranslation();
  const query = useQuery();

  const displayName = query.get("first_name") ?? "User Name";

  return (
    <header className={classes.heading}>
      {t("greeting") + " " + displayName}
    </header>
  );
};

export default Header;
