import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Header,
  Main,
  Balance,
  BalanceCaption,
  SubmitButton,
  BalancePad,
  Page,
  DailyBonusModal,
  Settings,
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
            <BalanceCaption />
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
      <Settings />
    </Page>
  );
};

export default Home;
