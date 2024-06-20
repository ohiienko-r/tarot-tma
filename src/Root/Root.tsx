import { FC } from "react";
import { Header, Main } from "@/Components";
import { useLanguage } from "@/Hooks";

const Root: FC = () => {
  useLanguage();

  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export default Root;
