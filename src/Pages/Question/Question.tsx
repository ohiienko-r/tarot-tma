import { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useMainButtonHandler,
  useMainButton,
  useMainButtonState,
} from "@/Hooks";
import { Headline } from "@telegram-apps/telegram-ui";
import { Path } from "@/types";
import "./styles.scss";
import { Page } from "@/Components";

const Question: FC = () => {
  const [prompt, setPrompt] = useState("");
  const { pathname, state } = useLocation();
  const { t } = useTranslation();
  const handler = useMainButtonHandler(
    state.spreadPrice,
    state.cardsQty,
    pathname as Path,
    prompt
  );
  const disabled = useMainButtonState(pathname as Path, prompt);
  useMainButton(
    `${t("get spread")} ${state.spreadPrice} 🌕`,
    handler,
    disabled
  );

  return (
    <Page>
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
    </Page>
  );
};

export default Question;
