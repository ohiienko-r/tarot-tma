import { FC } from "react";
import { useMainButton, useMainButtonTextAndHandler } from "@/Hooks";
import { Page, SpreadBalancePad } from "@/Components";
import { Headline, Text } from "@telegram-apps/telegram-ui";
import { useLocation } from "react-router-dom";
import { SpreadPropTypes } from "./types";
import { Path } from "@/types";
import "./styles.scss";

const Spread: FC<SpreadPropTypes> = ({
  title,
  spreadDescription,
  spreadPrice,
  cardsQty,
}) => {
  const location = useLocation();
  const { mainButtonText, handler } = useMainButtonTextAndHandler(
    spreadPrice,
    cardsQty,
    location.pathname as Path
  );
  useMainButton(mainButtonText, handler, false);
  return (
    <Page>
      <Headline weight="1" className="spread__heading">
        {title}
      </Headline>
      <SpreadBalancePad />
      <Text Component={"p"} className="spread__caption">
        {spreadDescription}
      </Text>
    </Page>
  );
};

export default Spread;
