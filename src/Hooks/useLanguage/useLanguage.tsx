import { useEffect } from "react";
import { retrieveLaunchParams, cloudStorage } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";

const useLanguage = () => {
  const { initData } = retrieveLaunchParams();
  const { i18n } = useTranslation();

  const userLanguage = initData?.user?.languageCode;

  useEffect(() => {
    const changeLanguage = async () => {
      const preferredLanguage = await cloudStorage.getItem("preferredLanguage");

      if (preferredLanguage === "") {
        i18n.changeLanguage(userLanguage);
        await cloudStorage.setItem("preferredLanguage", userLanguage as string);
      } else {
        i18n.changeLanguage(preferredLanguage);
      }
    };

    changeLanguage();
  }, [userLanguage, i18n]);
};

export default useLanguage;
