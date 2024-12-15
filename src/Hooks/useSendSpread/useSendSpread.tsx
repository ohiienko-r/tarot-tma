import { useCallback, useEffect } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { Api } from "@/Api";
import { Path, CardKey } from "@/types";

type UseSendSpreadPropTypes = {
  fromPath: Path;
  title: string;
  cardsKeys: CardKey[];
  prompt?: string;
  reading: string;
};

const useSendSpread = ({
  fromPath,
  title,
  cardsKeys,
  prompt,
  reading,
}: UseSendSpreadPropTypes) => {
  const { initData } = retrieveLaunchParams();

  const sendSpread = useCallback(async () => {
    try {
      if (fromPath != undefined) {
        await Api.botController.sendSpreadToUser({
          uId: initData?.user?.id as number,
          cardsKeys: cardsKeys,
          title: title,
          prompt: prompt,
          reading: reading,
        });
      }
    } catch (error) {
      console.error("Failed to send spread to user:", error);
    }
  }, [cardsKeys, initData?.user?.id, title, reading, fromPath, prompt]);

  useEffect(() => {
    sendSpread();
  }, [sendSpread]);
};

export default useSendSpread;
