import { useCallback } from "react";
import { useUtils } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";

const useShareBotUrl = () => {
  const utils = useUtils();
  const { t } = useTranslation();

  const shareBotUrl = useCallback(() => {
    utils.shareURL("https://t.me/my_ai_tarot_bot", t("share bot message text"));
  }, [utils, t]);

  return shareBotUrl;
};

export default useShareBotUrl;
