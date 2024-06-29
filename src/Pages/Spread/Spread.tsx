import { FC } from "react";
import { useMainButton, useMainButtonTextAndHandler } from "@/Hooks";
import { Page, SpreadBalancePad } from "@/Components";
import { Headline, Text } from "@telegram-apps/telegram-ui";
import { SpreadPropTypes } from "./types";
import "./styles.scss";

const Spread: FC<SpreadPropTypes> = ({
  title,
  spreadDescription,
  spreadPrice,
  cardsQty,
}) => {
  const { mainButtonText, handler } = useMainButtonTextAndHandler(
    spreadPrice,
    cardsQty
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
