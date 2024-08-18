import { useCallback, useEffect } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { sendSpreadToUser } from "@/API/API";
import { UseSendSpreadPropTypes } from "./types";

const useSendSpread = ({
  fromPath,
  title,
  cardsKeys,
  reading,
}: UseSendSpreadPropTypes) => {
  const { initData } = retrieveLaunchParams();

  const sendSpread = useCallback(async () => {
    try {
      if (fromPath != undefined) {
        await sendSpreadToUser({
          uId: initData?.user?.id as number,
          cardsKeys: cardsKeys,
          title: title,
          reading: reading,
        });
      }
    } catch (error) {
      console.error("Failed to send spread to user:", error);
    }
  }, [cardsKeys, initData?.user?.id, title, reading, fromPath]);

  useEffect(() => {
    sendSpread();
  }, [sendSpread]);
};

export default useSendSpread;
