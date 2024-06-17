import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/Components";
import { useLanguage, useAutoAuth } from "@/Hooks";

const Root: FC = () => {
  useLanguage();
  useAutoAuth();

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Root;
