import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@/Hooks";
import { RouterLink, FaqLink } from "@/Components";
import "./styles.scss";

const Main: FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <main className="main-section">
      <h2>{t("spreads")}</h2>
      <ul className="main-section__navigation">
        {navigation.map((spread) => (
          <RouterLink
            key={spread.id}
            to={spread.to}
            title={spread.title}
            price={spread.price}
            icon={spread.icon}
            state={spread.state}
          />
        ))}
        <FaqLink />
      </ul>
    </main>
  );
};

export default Main;
