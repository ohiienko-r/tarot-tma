import { useTranslation } from "react-i18next";
import { ReturnButton } from "@/Components";

const YesNo = () => {
  const { t } = useTranslation();
  return (
    <>
      <ReturnButton />
      <h2>{t("/yes-no")}</h2>
    </>
  );
};

export default YesNo;
