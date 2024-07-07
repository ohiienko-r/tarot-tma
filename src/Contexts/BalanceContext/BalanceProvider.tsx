import { FC, PropsWithChildren, useState, useEffect } from "react";
import { BalanceContext } from "./BalanceContext";
import { useCloudStorage } from "@telegram-apps/sdk-react";

const BalanceProvider: FC<PropsWithChildren> = ({ children }) => {
  const cloudStorage = useCloudStorage();
  const [currentBalance, setCurrentBalance] = useState<number | null>(null);

  useEffect(() => {
    const setInitialBalance = async () => {
      await cloudStorage.set("balance", JSON.stringify(3));
      setCurrentBalance(3);
      console.log("balance set");
    };

    const getBalance = async () => {
      const cloudBalance = await cloudStorage.get("balance");
      if (cloudBalance === null || cloudBalance === undefined) {
        await setInitialBalance();
      } else {
        setCurrentBalance(JSON.parse(cloudBalance));
      }
      console.log("got the balance");
    };

    getBalance();
  }, [cloudStorage]);

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
