import { FC } from "react";
import {
  useMainButton,
  useMainButtonHandler,
  useMainButtonState,
} from "@/Hooks";
import { useTranslation } from "react-i18next";
import { Page, SpreadBalancePad, BackgroundLayer } from "@/Components";
import { Headline, Text } from "@telegram-apps/telegram-ui";
import { useLocation } from "react-router-dom";
import { SpreadPropTypes } from "./types";
import { Path } from "@/types";
import backgroundImage from "@/assets/spread_background.jpg";
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
  const disabled = useMainButtonState(pathname as Path);
  useMainButton(`${t("get spread")} ${spreadPrice} 🌕`, handler, disabled);

  return (
    <BackgroundLayer image={backgroundImage}>
      <Page className="spread">
        <Headline weight="1" className="spread__heading">
          {title}
        </Headline>
        <SpreadBalancePad />
        <Text Component={"p"} className="spread__caption">
          {spreadDescription}
        </Text>
      </Page>
    </BackgroundLayer>
  );
};

export default Spread;
