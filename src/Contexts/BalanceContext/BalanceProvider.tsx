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
import {
  getUserBalance,
  setInitialBalance,
  updateUserBalance,
  migrateBalance,
} from "@/API/API";

export const BalanceProvider: FC<PropsWithChildren> = ({ children }) => {
  const [balance, setBalance] = useState<number | null>(null);
  const uId = initData?.user?.id;
  console.log(uId);

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

      if (currentBalance) {
        setBalance(currentBalance);
      }
    };

    getBalance();
  }, [uId]);

  const updateBalance = useCallback(
    async (value: number) => {
      if (balance !== null) {
        const newBalance = balance + value;
        if (newBalance < 0) {
          setBalance((prev) => prev);
        } else {
          setBalance(newBalance);
          const upd = await updateUserBalance(uId as number, value);
          console.log(upd);
        }
      }
    },
    [balance, uId]
  );

  const balanceValueObj = useMemo(() => {
    return { balance, updateBalance };
  }, [balance, updateBalance]);

  return (
    <BalanceContext.Provider value={balanceValueObj}>
      {children}
    </BalanceContext.Provider>
  );
};

export default BalanceProvider;
