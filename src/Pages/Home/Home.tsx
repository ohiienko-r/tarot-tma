import { FC } from "react";
import { Header, Main } from "@/Components";
import { useLanguage } from "@/Hooks";

const Home: FC = () => {
  useLanguage();

  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export default Home;
