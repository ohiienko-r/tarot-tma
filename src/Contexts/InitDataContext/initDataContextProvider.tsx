import { FC, PropsWithChildren, useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { WebAppUser } from "@twa-dev/types";
import { InitDataContext } from "./initDataContext";

const InitDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<WebAppUser | null | undefined>(null);

  useEffect(() => {
    const currentUser = WebApp.initDataUnsafe.user;
    setUser(currentUser);
  }, []);

  return (
    <InitDataContext.Provider value={user}>{children}</InitDataContext.Provider>
  );
};

export default InitDataProvider;
