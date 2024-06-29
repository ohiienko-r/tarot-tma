import { useState, useEffect } from "react";
import { useCloudStorage } from "@tma.js/sdk-react";

const useDailyBonus = () => {
  const cloudStorage = useCloudStorage();
  const [bonusAvailable, setBonusAvailable] = useState<boolean>(false);

  const getLastLogIn = async () => {
    const today = new Date();
    const lastLogDate = await cloudStorage.get("last_login");

    if (!lastLogDate) {
      await cloudStorage.set("last_login", today.toISOString());
    } else {
      compareDates(lastLogDate, today);
    }
  };

  const compareDates = async (lastLogInDate: string, today: Date) => {
    const lastLoginDate = new Date(lastLogInDate);

    lastLoginDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const isDifferentDay = today.getTime() > lastLoginDate.getTime();

    if (isDifferentDay) {
      setBonusAvailable(true);
      await cloudStorage.set("last_login", today.toISOString());
    } else {
      setBonusAvailable(false);
    }
  };

  useEffect(() => {
    const fetchLastLogIn = async () => {
      try {
        await getLastLogIn();
      } catch (error) {
        console.error("Failed to fetch last login date:", error);
      }
    };

    fetchLastLogIn();
  }, []);

  return { bonusAvailable, setBonusAvailable };
};

export default useDailyBonus;
