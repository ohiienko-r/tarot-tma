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
  BackgroundLayer,
} from "@/Components";
import { ROUTES_NAMES } from "@/Router";
import backgroundImage from "@/assets/background.jpg";
import "./styles.scss";

const Home: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigateToPayment = () => {
    navigate(ROUTES_NAMES.PAYMENT);
  };

  return (
    <BackgroundLayer image={backgroundImage} position={{ x: 0, y: -100 }}>
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
    </BackgroundLayer>
  );
};

export default Home;
