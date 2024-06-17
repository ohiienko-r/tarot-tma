import { useEffect } from "react";
import { logIn, logOut } from "@/Firebase";

const useAutoAuth = () => {
  useEffect(() => {
    logIn();
    return () => {
      logOut();
      console.log("logged out");
    };
  }, []);
};

export default useAutoAuth;
