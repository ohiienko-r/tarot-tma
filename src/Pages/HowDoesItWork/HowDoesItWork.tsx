import { useTranslation } from "react-i18next";

const HowDoesItWork = () => {
  const { t } = useTranslation();
  return (
    <>
      <h2>{t("how does it work")}</h2>
    </>
  );
};

export default HowDoesItWork;
