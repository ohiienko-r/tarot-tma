import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBalance } from "@/Contexts";
import { Page } from "@/Components";
import { useSpreadButton } from "@/Hooks";
import { Button, Headline } from "@telegram-apps/telegram-ui";
import { getRandomCards } from "@/Cards/helpers";
import { SystemLanguage, RandomCards } from "@/types";
import "./styles.scss";

const CardOfTheDay: FC = () => {
  const [myCards, setMyCards] = useState<RandomCards>();
  const { balance, updateBalance } = useBalance();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const cards = getRandomCards(1, i18n.language as SystemLanguage);
    setMyCards(cards);
  }, []);

  const handleBalance = async () => {
    await updateBalance(1);
  };

  const handleMainButtonClick = async () => {
    await updateBalance(-3);
  };

  useSpreadButton({
    title: "Get readings",
    color: "#EA850F",
    spreadCost: 3,
    onClick: handleMainButtonClick,
  });

  return (
    <Page>
      <Headline weight="1" className="daily-card__heading">
        {t("/card-of-the-day")}
      </Headline>
      <p>{`${balance} 🌕 ${t("available")}`}</p>
      <p>{myCards?.cardsNames[0]}</p>
      <Button mode="bezeled" size="m" stretched onClick={handleBalance}>
        +1
      </Button>
    </Page>
  );
};

export default CardOfTheDay;
