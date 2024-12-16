import { FC } from "react";
import { useMainButton, useMainButtonHandler, useBackButton } from "@/Hooks";
import { useTranslation } from "react-i18next";
import { Page, SpreadBalancePad, Preloader } from "@/Components";
import { useLocation } from "react-router-dom";
import { SpreadPropTypes } from "./types";
import { Path } from "@/types";
import { ROUTES_NAMES } from "@/Router";
import "./styles.scss";

const Spread: FC<SpreadPropTypes> = ({
  title,
  spreadDescription,
  spreadPrice,
  cardsQty,
}) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const handler = useMainButtonHandler(spreadPrice, cardsQty, pathname as Path);
  const loading = useMainButton({
    title: `${t("get spread")} ${spreadPrice} 🌕`,
    onClick: handler,
  });
  useBackButton();

  return (
    <>
      {pathname != ROUTES_NAMES.QUESTION && loading && <Preloader />}
      <Page className="spread">
        <h2 className="spread__heading">{title}</h2>
        <SpreadBalancePad />
        <p className="spread__caption">{spreadDescription}</p>
      </Page>
    </>
  );
};

export default Spread;
