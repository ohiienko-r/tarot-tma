import { useEffect } from "react";
import { cloudStorage } from "@/Telegram";
import { CardKey, Path } from "@/types";
import { ROUTES_NAMES } from "@/Router";

const useSaveSpreadState = (
  fromPath: Path,
  title: string,
  cardsKeys: CardKey[],
  reading: string
) => {
  useEffect(() => {
    const saveSpreadState = async () => {
      if (fromPath && fromPath === ROUTES_NAMES.CARD_OF_THE_DAY) {
        const myCardOfTheDaySpreadState = {
          title: title,
          cardsKeys: cardsKeys,
          reading: reading,
        };
        await cloudStorage.set(
          "myCard",
          JSON.stringify(myCardOfTheDaySpreadState)
        );
      }
    };

    saveSpreadState();
  }, [fromPath, title, cardsKeys, reading]);
};

export default useSaveSpreadState;
