import { FC, PropsWithChildren, useState, useEffect } from "react";
import { BalanceContext } from "./BalanceContext";
import { cloudStorage } from "@/Telegram";

const BalanceProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentBalance, setCurrentBalance] = useState<number | null>(null);

  useEffect(() => {
    const setInitialBalance = async () => {
      await cloudStorage.set("balance", JSON.stringify(3));
      setCurrentBalance(3);
    };

    const getBalance = async () => {
      const cloudBalance = await cloudStorage.get("balance");
      if (cloudBalance === "" || cloudBalance === undefined) {
        await setInitialBalance();
      } else {
        setCurrentBalance(JSON.parse(cloudBalance));
      }
    };

    getBalance();
  }, []);

  const updateBalance = async (updateValue: number) => {
    if (currentBalance !== null) {
      const newBalance = currentBalance + updateValue;
      if (newBalance < 0) {
        setCurrentBalance((prev) => prev);
      } else {
        setCurrentBalance(newBalance);
        await cloudStorage.set("balance", JSON.stringify(newBalance));
      }
    }
  };

  return (
    <BalanceContext.Provider value={{ balance: currentBalance, updateBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export default BalanceProvider;
