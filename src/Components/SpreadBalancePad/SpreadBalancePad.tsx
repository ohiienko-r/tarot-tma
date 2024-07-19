import { FC } from "react";
import { useBalance } from "@/Contexts";
import { useTranslation } from "react-i18next";
import "./styles.scss";

const SpreadBalancePad: FC = () => {
  const { balance } = useBalance();
  const { t } = useTranslation();

  return (
    <div className="spread-balance">
      <p>{t("available")}</p>
      <p className="spread-balance__balance">
        {`${balance}`}
        <span>🌕</span>
      </p>
    </div>
  );
};

export default SpreadBalancePad;
