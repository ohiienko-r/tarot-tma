import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Header, Main, Balance, SubmitButton } from "@/Components";
import { useLanguage } from "@/Hooks";

const Home: FC = () => {
  const { t } = useTranslation();
  useLanguage();

  return (
    <section className="home">
      <Header />
      <div className="home__balance-section">
        <div>
          <div className="home__balance-wrapper">
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
