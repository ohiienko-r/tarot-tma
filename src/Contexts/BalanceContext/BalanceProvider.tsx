import {
  FC,
  PropsWithChildren,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { BalanceContext } from "./BalanceContext";
import { cloudStorage, initData } from "@/Telegram";
import { Api } from "@/Api";

export const BalanceProvider: FC<PropsWithChildren> = ({ children }) => {
  const [balance, setBalance] = useState<number | undefined>(undefined);
  const uId = initData?.user?.id;

  useEffect(() => {
    const getBalance = async () => {
      const currentBalance = await Api.balanceController.getUserBalance(
        uId as number
      );
      const cloudBalance = await cloudStorage.get("balance");

      if (currentBalance === null && cloudBalance != "") {
        await Api.balanceController.migrateBalance(
          uId as number,
          JSON.parse(cloudBalance)
        );
        cloudStorage.delete("balance");
        setBalance(JSON.parse(cloudBalance));
      } else if (currentBalance === null && cloudBalance == "") {
        const initBalance = await Api.balanceController.setInitialBalance(
          uId as number
        );
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
          await Api.balanceController.updateUserBalance(uId as number, value);
        }
      }
    },
    [balance, uId]
  );

  const providerValue = useMemo(
    () => ({ balance, updateBalance }),
    [balance, updateBalance]
  );

  return (
    <BalanceContext.Provider value={providerValue}>
      {children}
    </BalanceContext.Provider>
  );
};

export default BalanceProvider;
