import { FC, PropsWithChildren, useState, useEffect } from "react";
import { BalanceContext } from "./BalanceContext";
import { useCloudStorage } from "@tma.js/sdk-react";

const BalanceProvider: FC<PropsWithChildren> = ({ children }) => {
  const cloudStorage = useCloudStorage();
  const [currentBalance, setCurrentBalance] = useState<number | null>(null);
  const [isEnough, setIsEnough] = useState<boolean>(true);

  useEffect(() => {
    getBalance();
  }, []);

  const getBalance = async () => {
    const cloudBalance = await cloudStorage.get("balance");
    if (cloudBalance === null || cloudBalance === undefined) {
      await setInitialBalance();
    } else {
      setCurrentBalance(JSON.parse(cloudBalance));
    }
  };

  const updateBalance = async (updateValue: number) => {
    if (currentBalance || currentBalance === 0) {
      if (currentBalance + updateValue < 0) {
        setIsEnough(false);
      } else {
        setIsEnough(true);
        const newBalance = currentBalance + updateValue;
        setCurrentBalance(newBalance);
        await cloudStorage.set("balance", JSON.stringify(newBalance));
      }
    }
  };

  const setInitialBalance = async () => {
    await cloudStorage.set("balance", JSON.stringify(3));
    setCurrentBalance(3);
  };

  return (
    <BalanceContext.Provider
      value={{ balance: currentBalance, isEnough, updateBalance }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export default BalanceProvider;
