import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const [prompt, setPrompt] = useState("");
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { mainButtonText, handler, disabled } = useMainButtonTextAndHandler(
    spreadPrice,
    cardsQty,
    pathname as Path,
    prompt
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
      {pathname === "/question" && (
        <div className="spread__input-container">
          <label htmlFor="question_input">{t("input label")}</label>
          <input
            value={prompt}
            id="question_input"
            className="spread__input"
            type="text"
            placeholder={t("input placeholder")}
            onChange={(e) => setPrompt(e.currentTarget.value)}
          />
        </div>
      )}
    </>
  );
};

export default Spread;
