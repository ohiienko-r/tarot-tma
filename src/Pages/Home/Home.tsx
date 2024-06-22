import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Header, Main, Balance, SubmitButton } from "@/Components";
import { useLanguage } from "@/Hooks";
import classes from "./home.module.scss";

const Home: FC = () => {
  const { t } = useTranslation();
  useLanguage();

  return (
    <section className={classes.home}>
      <Header />
      <div className={classes.homeBalanceSection}>
        <div>
          <div className={classes.homeBalanceWrapper}>
            <Balance />
          </div>
          <SubmitButton title={t("buy")} onPress={() => {}} />
        </div>
      </div>
      <Main />
    </section>
  );
};

export default Home;
