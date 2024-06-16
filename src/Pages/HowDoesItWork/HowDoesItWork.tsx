import { useTranslation } from "react-i18next";
import { ReturnButton } from "@/Components";

const HowDoesItWork = () => {
  const { t } = useTranslation();
  return (
    <>
      <ReturnButton />
      <h2>{t("how does it work")}</h2>
    </>
  );
};

export default HowDoesItWork;
