import {
  FC,
  PropsWithChildren,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  popup,
  miniApp,
  initData,
  openTelegramLink,
} from "@telegram-apps/sdk-react";
import { UserContext } from "./UserContext";
import { supabase } from "@/supabase";
import { Api } from "@/Api";
import { User } from "@/types";

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<number | undefined>(undefined);
  const currentUser = initData.user();
  const refId = initData?.startParam() ? initData.startParam() : null;

  useEffect(() => {
    const getUser = async () => {
      console.log(refId);
      //Validate current user's init data to make sure app is launched from TG environment
      const { valid, error: validationError } =
        await Api.botController.isInitDataValild();

      if (validationError) {
        console.error("Failed to validate init data");
      }

      //If it's not valid show a popup with error and on button click close the mini app
      if (!valid) {
        console.error("Init data is invalid!");
        popup
          .open({
            message: "Init data is invalid!",
            title: "Error!",
            buttons: [{ id: "quit", type: "destructive", text: "Quit" }],
          })
          .then((buttonId) => {
            if (buttonId === "quit") {
              miniApp.close();
            }
          });
        return;
      }

      //Get current user data from DB based on tg id which is a primary identifier in DB
      const { data: existingUser, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", currentUser?.id)
        .maybeSingle<User>();

      if (error) {
        popup
          .open({
            message: "Failed to get user data from DB. Please contact support.",
            title: "Error!",
            buttons: [
              { id: "support", type: "default", text: "Contact support" },
            ],
          })
          .then((buttonId) => {
            if (buttonId === "support") {
              openTelegramLink("https://t.me/nam_ro");
            }
          });
        throw new Error(JSON.stringify(error));
      }

      //If user doesn't exist in DB create new user
      if (existingUser === null) {
        const newUser = {
          id: initData.user()?.id as number,
          user_name: initData.user()?.username ?? null,
          first_name: initData.user()?.firstName ?? null,
          balance: 3,
          language_code: initData.user()?.languageCode ?? "en",
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
          ads_disabled_till: null,
          daily_reminder: true,
          ref_id: refId,
        };

        const { data, error } = await supabase
          .from("users")
          .insert(newUser)
          .select("*")
          .single<User>();

        if (error) {
          popup
            .open({
              message: "Failed to create new user. Please contact support.",
              title: "Error!",
              buttons: [
                { id: "support", type: "default", text: "Contact support" },
              ],
            })
            .then((buttonId) => {
              if (buttonId === "support") {
                openTelegramLink("https://t.me/nam_ro");
              }
            });
          throw new Error(JSON.stringify(error));
        }

        setUser(data);

        let userBalance;

        //If referrer id is not null check if the referrer exists
        if (refId) {
          const { data: refData, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", refId)
            .maybeSingle<User>();

          if (error) {
            console.error(
              "Failed to retreive referrer data:",
              JSON.stringify(error)
            );
            setBalance(data.balance);
            return;
          }

          //If referrer exists update both balances: referal and referrer
          if (refData !== null) {
            const { error: refUpdateError } = await supabase
              .from("users")
              .update({ balance: refData.balance + 3 });

            if (refUpdateError) {
              console.error("Failed to update referrer balance");
            }

            userBalance = data.balance + 3;

            //Notify referrer about new referal
            await Api.botController.sendRefNotification(
              +refId,
              data?.user_name ?? data?.first_name ?? JSON.stringify(data?.id)
            );
          }
        } else {
          userBalance = data.balance;
        }

        setBalance(userBalance);
      } else {
        setUser(existingUser);
        setBalance(existingUser.balance);
      }
    };

    getUser();
  }, [currentUser, refId]);

  /**
   * Separate function for updating user balance.
   * @param value - update value which is either positive or negative integer
   */
  const updateBalance = useCallback(
    async (value: number) => {
      if (balance !== undefined) {
        const newBalance = balance + value;
        if (newBalance < 0) {
          setBalance((prev) => prev);
        } else {
          setBalance(newBalance);
          const { error } = await supabase
            .from("users")
            .update({ balance: newBalance })
            .eq("id", user?.id);
          if (error) {
            popup.open({
              message: "Failed to update balance",
              title: "Error!",
            });
            throw new Error(JSON.stringify(error));
          }
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
