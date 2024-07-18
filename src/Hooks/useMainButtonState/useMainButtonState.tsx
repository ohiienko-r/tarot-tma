import { useState, useEffect } from "react";
import { useCloudStorage } from "@telegram-apps/sdk-react";
import { ROUTES_NAMES } from "@/Router";
import { Path } from "@/types";

const useMainButtonState = (path: Path, prompt?: string) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const cloudStorage = useCloudStorage();

  useEffect(() => {
    const handleMainButtonDisabled = async () => {
      const myCard = await cloudStorage.get("myCard");
      if (path === ROUTES_NAMES.CARD_OF_THE_DAY && myCard !== "") {
        setDisabled(true);
      } else if (prompt?.length === 0) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    };

    handleMainButtonDisabled();
  }, [cloudStorage, path, prompt]);

  return disabled;
};

export default useMainButtonState;
