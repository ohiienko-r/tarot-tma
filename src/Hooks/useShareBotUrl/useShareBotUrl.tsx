import { useCallback } from "react";
import { useUtils } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import { shareMessage } from "./helpers";

const useShareBotUrl = () => {
  const utils = useUtils();
  const { i18n } = useTranslation();

  const shareBotUrl = useCallback(() => {
    utils.shareURL(
      "https://t.me/my_ai_tarot_bot",
      shareMessage[i18n.language] ?? shareMessage.english
    );
  }, [utils, i18n]);

  return shareBotUrl;
};

export default useShareBotUrl;
