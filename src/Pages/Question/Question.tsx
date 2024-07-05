import { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMainButtonTextAndHandler, useMainButton } from "@/Hooks";
import { Headline } from "@telegram-apps/telegram-ui";
import { Path } from "@/types";
import "./styles.scss";

const Question: FC = () => {
  const [prompt, setPrompt] = useState("");
  const { pathname, state } = useLocation();
  const { t } = useTranslation();
  const { mainButtonText, handler, disabled } = useMainButtonTextAndHandler(
    state.spreadPrice,
    state.cardsQty,
    pathname as Path,
    prompt
  );
  useMainButton(mainButtonText, handler, disabled);
  return (
    <>
      <Headline weight="1" className="question__heading">
        {t(pathname)}
      </Headline>
      <div className="question__input-container">
        <label htmlFor="question-input">{t("input label")}</label>
        <input
          id="question-input"
          type="text"
          placeholder={t("input placeholder")}
          value={prompt}
          onChange={(e) => setPrompt(e.currentTarget.value)}
          className="question__input"
        />
      </div>
    </>
  );
};

export default Question;
