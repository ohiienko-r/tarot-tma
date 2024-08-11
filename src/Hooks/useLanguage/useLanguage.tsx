import { useEffect } from "react";
import {
  retrieveLaunchParams,
  useCloudStorage,
} from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";

const useLanguage = () => {
  const { initData } = retrieveLaunchParams();
  const { i18n } = useTranslation();
  const cloudStorage = useCloudStorage();

  const userLanguage = initData?.user?.languageCode;

  useEffect(() => {
    const changeLanguage = async () => {
      const preferredLanguage = await cloudStorage.get("preferredLanguage");

      if (preferredLanguage === "") {
        console.log(preferredLanguage);
        i18n.changeLanguage(userLanguage);
        await cloudStorage.set("preferredLanguage", userLanguage as string);
      } else {
        i18n.changeLanguage(preferredLanguage);
      }
    };

    changeLanguage();
  }, [userLanguage, i18n]);
};

export default useLanguage;
