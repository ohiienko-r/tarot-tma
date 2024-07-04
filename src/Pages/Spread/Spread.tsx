import { FC } from "react";
import { useMainButton, useMainButtonTextAndHandler } from "@/Hooks";
import { SpreadBalancePad } from "@/Components";
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
  const { pathname } = useLocation();
  const { mainButtonText, handler, disabled } = useMainButtonTextAndHandler(
    spreadPrice as number,
    cardsQty as number,
    pathname as Path
  );

  useMainButton(mainButtonText, handler, disabled);
  return (
    <>
      <Headline weight="1" className="spread__heading">
        {title}
      </Headline>
      <SpreadBalancePad />
      <Text Component={"p"} className="spread__caption">
        {spreadDescription}
      </Text>
    </>
  );
};

export default Spread;
