import { useState, useEffect, useCallback } from "react";
import { cloudStorage } from "@/Telegram";

const useDailyActivity = () => {
  const [activityAvailable, setActivityAvailable] = useState<boolean>(false);

  const compareDates = useCallback(
    async (lastLogInDate: string, today: Date) => {
      const lastLoginDate = new Date(lastLogInDate);

      lastLoginDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      const isDifferentDay = today.getTime() > lastLoginDate.getTime();

      if (isDifferentDay) {
        setActivityAvailable(true);
        await cloudStorage.set("last_login", today.toISOString());
      } else {
        setActivityAvailable(false);
      }
    },
    []
  );

  const getLastLogIn = useCallback(async () => {
    const today = new Date();
    const lastLogDate = await cloudStorage.get("last_login");

    if (!lastLogDate) {
      await cloudStorage.set("last_login", today.toISOString());
    } else {
      compareDates(lastLogDate, today);
    }
  }, [compareDates]);

  useEffect(() => {
    const fetchLastLogIn = async () => {
      try {
        await getLastLogIn();
      } catch (error) {
        console.error("Failed to fetch last login date:", error);
      }
    };

    fetchLastLogIn();
  }, [getLastLogIn]);

  return { activityAvailable };
};

export default useDailyActivity;
