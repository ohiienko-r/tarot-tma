import { useEffect } from "react";
import { initData } from "@/Telegram";
import { Api } from "@/Api";

const useNewUser = () => {
  useEffect(() => {
    const setNewUser = async () => {
      const user = initData?.user;

      Api.botController.setNewUser({
        uId: user?.id as number,
        firstName: user?.firstName as string,
        userName: user?.username as string,
        languageCode: user?.languageCode as string,
      });
    };

    setNewUser();
  }, []);
};

export default useNewUser;
