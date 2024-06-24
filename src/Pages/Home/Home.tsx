import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  Header,
  Main,
  Balance,
  SubmitButton,
  BalancePad,
  Page,
} from "@/Components";
import "./styles.scss";

const Home: FC = () => {
  const { t } = useTranslation();

  return (
    <Page className="home">
      <Header />
      <div className="home__balance-section">
        <div>
          <BalancePad>
            <Balance />
          </BalancePad>
          <SubmitButton title={t("buy")} onPress={() => {}} disabled={true} />
        </div>
      </div>
      <Main />
    </Page>
  );
};

export default Home;
