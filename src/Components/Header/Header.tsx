import { FC } from "react";
import { useLaunchParams } from "@tma.js/sdk-react";
import { useTranslation } from "react-i18next";
import classes from "./header.module.scss";

const Header: FC = () => {
  const initData = useLaunchParams().initData;
  const { t } = useTranslation();

  const userName = initData?.user?.firstName ?? t("username");

  return (
    <header className={classes.heading}>
      <p>{`${t("greeting")} ${userName}!`}</p>
    </header>
  );
};

export default Header;
