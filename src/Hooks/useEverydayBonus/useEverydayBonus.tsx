import { useState, useEffect } from "react";
import { cloudStorage } from "@/helpers";

const useEverydayBonus = () => {
  const [lastLogIn, setLastLogIn] = useState<Date | null>(null);
  const [bonusAvailable, setBonusAvailable] = useState<boolean>(false);
  const today = new Date();

  const getLastLogIn = async () => {
    const lastLogDate = await cloudStorage.get("last_login");

    if (!lastLogDate) {
      setLastLogIn(today);
      await cloudStorage.set("last_login", today.toISOString());
    } else {
      setLastLogIn(new Date(lastLogDate));
    }
  };

  const compareDates = () => {
    if (lastLogIn) {
      const lastLoginDate = new Date(lastLogIn);
      const lastLoginYear = lastLoginDate.getFullYear();
      const lastLoginMonth = lastLoginDate.getMonth();
      const lastLoginDay = lastLoginDate.getDate();

      const todayYear = today.getFullYear();
      const todayMonth = today.getMonth();
      const todayDay = today.getDate();

      const isDifferentDay =
        todayYear > lastLoginYear ||
        (todayYear === lastLoginYear && todayMonth > lastLoginMonth) ||
        (todayYear === lastLoginYear &&
          todayMonth === lastLoginMonth &&
          todayDay > lastLoginDay);

      if (isDifferentDay) {
        setBonusAvailable(true);
        setLastLogIn(today);
        cloudStorage.set("last_login", today.toISOString());
      } else {
        setBonusAvailable(false);
      }
    }
  };

  useEffect(() => {
    getLastLogIn();
  }, []);

  useEffect(() => {
    if (lastLogIn !== null) {
      compareDates();
    }
  }, [lastLogIn]);

  return { bonusAvailable };
};

export default useEverydayBonus;
