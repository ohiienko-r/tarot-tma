import { useState, useEffect } from "react";
import { initCloudStorage } from "@tma.js/sdk-react";
import { UseBalance } from "./types";

const cloudStorage = initCloudStorage();

const useBalance = (): UseBalance => {
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [isEnough, setIsEnough] = useState<boolean>(true);

  useEffect(() => {
    getBalance();
  }, []);

  const getBalance = async () => {
    const cloudBalance = await cloudStorage.get("balance");
    if (!cloudBalance) {
      await setInitialBalance();
    } else {
      setCurrentBalance(JSON.parse(cloudBalance));
    }
  };

  const updateBalance = async (updateValue: number) => {
    if (currentBalance + updateValue < 0) {
      setIsEnough(false);
    } else {
      setIsEnough(true);
      const newBalance = currentBalance + updateValue;
      setCurrentBalance(newBalance);
      await cloudStorage.set("balance", JSON.stringify(newBalance));
    }
  };

  const setInitialBalance = async () => {
    await cloudStorage.set("balance", JSON.stringify(3));
    setCurrentBalance(3);
  };

  return [currentBalance, isEnough, updateBalance];
};

export default useBalance;
