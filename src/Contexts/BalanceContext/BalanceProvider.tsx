import { FC, PropsWithChildren, useState, useCallback, useMemo } from "react";
import { useUser } from "../UserContext/useUser";
import { BalanceContext } from "./BalanceContext";
import { initData } from "@/Telegram";
import { Api } from "@/Api";

export const BalanceProvider: FC<PropsWithChildren> = ({ children }) => {
  const user = useUser();
  const [balance, setBalance] = useState<number | undefined>(user.balance);
  const uId = initData?.user?.id;

  // useEffect(() => {
  //   const getBalance = async () => {
  //     const currentBalance = await Api.balanceController.getUserBalance(
  //       uId as number
  //     );
  //     const cloudBalance = await cloudStorage.get("balance");

  //     if (currentBalance === undefined && cloudBalance != "") {
  //       await Api.balanceController.migrateBalance(
  //         uId as number,
  //         JSON.parse(cloudBalance)
  //       );
  //       cloudStorage.delete("balance");
  //       setBalance(JSON.parse(cloudBalance));
  //     } else if (currentBalance === undefined && cloudBalance == "") {
  //       const initBalance = await Api.balanceController.setInitialBalance(
  //         uId as number
  //       );
  //       setBalance(initBalance);
  //     }

  //     if (currentBalance != undefined) {
  //       setBalance(currentBalance);
  //     }
  //   };

  //   getBalance();
  // }, [uId]);

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
