import { FC, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Balance,
  SubmitButton,
  Page,
  Modal,
  Icons,
  SplashScreen,
} from "@/Components";
import { useSettingsButton } from "@/Hooks";
import { hapticFeedback, viewport, popup } from "@telegram-apps/sdk-react";
import { Button } from "@telegram-apps/telegram-ui";
import { useUser } from "@/Contexts";
import { ROUTES_NAMES } from "@/Router";
import { supabase } from "@/supabase";
import character from "@/assets/eva.png";
import "./styles.scss";

const Home: FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { user } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const insetTop = viewport.safeAreaInsetTop();

  useEffect(() => {
    const checkBonusAvailability = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("daily_bonus")
          .eq("id", user.id)
          .maybeSingle<{ daily_bonus: boolean }>();

        if (error) {
          popup.open({
            message:
              "Failed to retreive daily bonus status. Please contact support.",
            title: "Error!",
          });
          throw new Error(JSON.stringify(error));
        }

        if (data) {
          setModalVisible(data?.daily_bonus);
        }
      }
    };

    checkBonusAvailability();
  });

  const handleModalClose = async () => {
    hapticFeedback.impactOccurred("medium");
    navigate(ROUTES_NAMES.PAYMENT);
    setModalVisible(false);
  };

  const handleNavigateToSettings = () => {
    hapticFeedback.impactOccurred("medium");
    navigate(ROUTES_NAMES.SETTINGS);
  };

  useSettingsButton(handleNavigateToSettings);

  return (
    <Page className="home">
      {!user && <SplashScreen />}
      <ul className="home__characters" style={{ top: insetTop }}>
        <img src={character} alt="Eva" className="home__characters-item" />
      </ul>
      <div className="home__head">
        <div>
          <h2 className="home__head-tarologist-name">{t("eva")}</h2>
          <ul className="home__head-indicators-list">
            <li className="home__head-indicators-list-item"></li>
            <li className="home__head-indicators-list-item home__head-indicators-list-item--active"></li>
            <li className="home__head-indicators-list-item"></li>
          </ul>
        </div>
        <div className="home__head__balance-section">
          <div className="home__head__balance-section__pad">
            <Balance />
          </div>
          <SubmitButton
            title={t("buy coins")}
            onPress={() => navigate(ROUTES_NAMES.PAYMENT)}
          />
        </div>
      </div>
      <nav className="home__navigation">
        <ul className="home__navigation-list">
          <Link
            to={ROUTES_NAMES.CARD_OF_THE_DAY}
            onClick={() => hapticFeedback.impactOccurred("medium")}
            className="home__navigation-list-item home__navigation-list-item--first"
          >
            <div className="home__navigation-list-item__caption">
              <CardIcon />
              <p>{t(ROUTES_NAMES.CARD_OF_THE_DAY)}</p>
            </div>
            <p className="home__navigation-list-item__price">
              2
              <Icons.Moon size={16} />
            </p>
          </Link>
          <Link
            to={ROUTES_NAMES.YES_NO}
            onClick={() => hapticFeedback.impactOccurred("medium")}
            className="home__navigation-list-item home__navigation-list-item--second"
          >
            <div className="home__navigation-list-item__caption">
              <CardIcon />
              <p>{t(ROUTES_NAMES.YES_NO)}</p>
            </div>
            <p className="home__navigation-list-item__price">
              3
              <Icons.Moon size={16} />
            </p>
          </Link>
          <Link
            to={ROUTES_NAMES.QUESTION}
            onClick={() => hapticFeedback.impactOccurred("medium")}
            className="home__navigation-list-item home__navigation-list-item--third"
          >
            <div className="home__navigation-list-item__caption">
              <CardIcon />
              <p>{t(ROUTES_NAMES.QUESTION)}</p>
            </div>
            <p className="home__navigation-list-item__price">
              5
              <Icons.Moon size={16} />
            </p>
          </Link>
        </ul>
        <Link
          to={ROUTES_NAMES.ABOUT}
          onClick={() => hapticFeedback.impactOccurred("medium")}
          className="home__faq"
        >
          {t(ROUTES_NAMES.ABOUT)}
          <Icons.QuestionMark fill="rgba(255, 199, 0, 50%)" />
        </Link>
      </nav>
      <Modal.MinContent
        open={modalVisible}
        onClose={handleModalClose}
        title={t("daily bonus heading")}
      >
        <p style={{ textAlign: "center" }}>{`${t(
          "dayli bonus greeting"
        )} \n ${t("here are your coins")}`}</p>
        <Button size="l" stretched onClick={handleModalClose}>
          {t("claim")}
        </Button>
      </Modal.MinContent>
    </Page>
  );
};

const CardIcon = () => {
  return (
    <svg width="32" height="45" viewBox="0 0 32 45" fill="none">
      <g opacity="0.5" filter="url(#filter0_d_765_130)">
        <mask id="path-1-inside-1_765_130" fill="white">
          <rect
            x="0.800781"
            y="0.420898"
            width="29.8448"
            height="43.1579"
            rx="1.75205"
          />
        </mask>
        <rect
          x="0.800781"
          y="0.420898"
          width="29.8448"
          height="43.1579"
          rx="1.75205"
          stroke="white"
          strokeWidth="3.51115"
          shapeRendering="crispEdges"
          mask="url(#path-1-inside-1_765_130)"
        />
        <path
          d="M16.8108 17.3621C18.4837 15.6892 21.196 15.6892 22.8689 17.3621C24.5418 19.035 24.5418 21.7474 22.8689 23.4203L15.7277 30.5615L9.6695 24.5033L16.8108 17.3621Z"
          fill="white"
        />
        <path
          d="M14.6385 17.3621C12.9655 15.6892 10.2532 15.6892 8.58029 17.3621C6.90737 19.035 6.90737 21.7474 8.58029 23.4203L15.7215 30.5615L21.7797 24.5033L14.6385 17.3621Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_765_130"
          x="0.215589"
          y="0.420898"
          width="31.0141"
          height="44.3286"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.585193" />
          <feGaussianBlur stdDeviation="0.292596" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_765_130"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_765_130"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Home;
