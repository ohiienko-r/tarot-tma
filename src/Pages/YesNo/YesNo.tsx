import { useTranslation } from "react-i18next";

const YesNo = () => {
  const { t } = useTranslation();
  return (
    <>
      <h2>{t("/yes-no")}</h2>
    </>
  );
};

export default YesNo;
