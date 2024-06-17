import { useContext } from "react";
import { InitDataContext } from "./initDataContext";

export const useInitData = () => useContext(InitDataContext);
