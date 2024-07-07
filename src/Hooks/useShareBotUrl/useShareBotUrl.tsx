import { useCallback } from "react";
import { useUtils } from "@telegram-apps/sdk-react";

const useShareBotUrl = () => {
  const utils = useUtils();

  const shareBotUrl = useCallback(() => {
    utils.shareURL("https://t.me/my_ai_tarot_bot");
  }, [utils]);

  return shareBotUrl;
};

export default useShareBotUrl;
