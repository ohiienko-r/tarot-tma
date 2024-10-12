import {
  FC,
  PropsWithChildren,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { UserContext } from "./UserContext";
import { initData } from "@/Telegram";
import { Api } from "@/Api";
import { User } from "@/types";

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<number | undefined>(undefined);
  const currentUser = initData?.user;
  const refId = initData?.startParam ? +initData.startParam : undefined;

  useEffect(() => {
    const getUser = async () => {
      const existingUser = await Api.botController.getUserData(
        currentUser?.id as number
      );

      if (existingUser === null || existingUser === undefined) {
        const newUser = await Api.botController.setNewUser({
          uId: currentUser?.id as number,
          firstName: currentUser?.firstName as string,
          userName: currentUser?.username as string,
          languageCode: currentUser?.languageCode as string,
          referrerId: refId,
        });
        setUser(newUser);
        setBalance(newUser.balance);
      } else {
        setUser(existingUser);
        setBalance(existingUser.balance);
      }
    };

    getUser();
  }, [currentUser, refId]);

  const updateBalance = useCallback(
    async (value: number) => {
      if (balance !== undefined) {
        const newBalance = balance + value;
        if (newBalance < 0) {
          setBalance((prev) => prev);
        } else {
          setBalance(newBalance);
          await Api.balanceController.updateUserBalance(
            user?.uId as number,
            value
          );
        }
      }
    },
    [balance, user]
  );

  const providerValue = useMemo(
    () => ({ user, balance, updateBalance }),
    [user, balance, updateBalance]
  );

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
