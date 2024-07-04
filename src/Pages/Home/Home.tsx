import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Header,
  Main,
  Balance,
  SubmitButton,
  BalancePad,
  Page,
  DailyBonusModal,
} from "@/Components";
import { ROUTES_NAMES } from "@/Router";
import "./styles.scss";

const Home: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigateToPayment = () => {
    navigate(ROUTES_NAMES.PAYMENT);
  };

  return (
    <Page className="home">
      <Header />
      <div className="home__balance-section">
        <div>
          <BalancePad>
            <Balance />
          </BalancePad>
          <SubmitButton
            title={t("buy")}
            onPress={handleNavigateToPayment}
            disabled={false}
          />
        </div>
      </div>
      <Main />
      <DailyBonusModal />
    </Page>
  );
};

export default Home;
