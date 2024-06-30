import { FC } from "react";
import { useBalance } from "@/Contexts";
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
import "./styles.scss";

const Home: FC = () => {
  const { t } = useTranslation();
  const { updateBalance } = useBalance();

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
            onPress={async () => {
              await updateBalance(1);
            }}
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
