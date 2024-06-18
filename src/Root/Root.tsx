import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/Components";
import { useLanguage } from "@/Hooks";

const Root: FC = () => {
  useLanguage();

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Root;
