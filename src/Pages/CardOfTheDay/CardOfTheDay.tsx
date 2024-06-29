import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMainButton, useMainButtonTextAndHandler } from "@/Hooks";
import { Page, SpreadBalancePad } from "@/Components";
import { Headline, Text } from "@telegram-apps/telegram-ui";
import "./styles.scss";

const CardOfTheDay: FC = () => {
  const { mainButtonText, handler } = useMainButtonTextAndHandler(3, 1);
  const { t } = useTranslation();

  useMainButton(mainButtonText, handler, false);

  return (
    <Page>
      <Headline weight="1" className="daily-card__heading">
        {t("/card-of-the-day")}
      </Headline>
      <SpreadBalancePad />
      <Text Component={"p"} className="daily-card__caption">
        {t("card of the day description")}
      </Text>
    </Page>
  );
};

export default CardOfTheDay;
