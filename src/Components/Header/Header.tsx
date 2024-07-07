import { FC } from "react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import "./styles.scss";

const Header: FC = () => {
  const initData = useLaunchParams().initData;
  const { t } = useTranslation();

  const userName = initData?.user?.firstName ?? t("username");

  return (
    <header className="heading">
      <p>{`${t("greeting")} ${userName}!`}</p>
    </header>
  );
};

export default Header;
