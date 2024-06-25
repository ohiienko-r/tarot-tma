import { useState, useEffect } from "react";
import { useBalance } from "@/Contexts";
import { cloudStorage } from "@/helpers";

const useEverydayBonus = () => {
  const { updateBalance } = useBalance();
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
      updateBalance(3);
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

  return { bonusAvailable };
};

export default useEverydayBonus;