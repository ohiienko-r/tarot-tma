import { FC, PropsWithChildren, useState, useEffect, useCallback } from "react";
import { BalanceContext } from "./BalanceContext";
import { cloudStorage, initData } from "@/Telegram";
import {
  getUserBalance,
  setInitialBalance,
  updateUserBalance,
  migrateBalance,
} from "@/API/API";

export const BalanceProvider: FC<PropsWithChildren> = ({ children }) => {
  const [balance, setBalance] = useState<number | undefined>(undefined);
  const uId = initData?.user?.id;

  useEffect(() => {
    const getBalance = async () => {
      const currentBalance = await getUserBalance(uId as number);
      const cloudBalance = await cloudStorage.get("balance");

      if (currentBalance === null && cloudBalance != "") {
        await migrateBalance(uId as number, JSON.parse(cloudBalance));
        cloudStorage.delete("balance");
        setBalance(JSON.parse(cloudBalance));
      } else if (currentBalance === null && cloudBalance == "") {
        const initBalance = await setInitialBalance(uId as number);
        setBalance(initBalance);
      }

      if (currentBalance != null) {
        setBalance(currentBalance);
      }
    };

    getBalance();
  }, [uId]);

  const updateBalance = useCallback(
    async (value: number) => {
      if (balance !== undefined) {
        const newBalance = balance + value;
        if (newBalance < 0) {
          setBalance((prev) => prev);
        } else {
          setBalance(newBalance);
          await updateUserBalance(uId as number, value);
        }
      }
    },
    [balance, uId]
  );

  return (
    <BalanceContext.Provider value={{ balance, updateBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export default BalanceProvider;
