import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useBalance } from "@/Hooks";
import questionMark from "@/assets/plain_question_mark.svg";

const Balance: FC = () => {
  const { t } = useTranslation();
  const { balance } = useBalance();

  return (
    <div className="balance">
      <p className="balance__caption">
        {balance ? (
          balance
        ) : (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            width="46"
            height="46"
            style={{
              shapeRendering: "auto",
              display: "block",
              background: "transparent",
            }}
          >
            <g>
              <circle
                strokeDasharray="164.93361431346415 56.97787143782138"
                r="35"
                strokeWidth="10"
                stroke="#ea850f"
                fill="none"
                cy="50"
                cx="50"
              >
                <animateTransform
                  keyTimes="0;1"
                  values="0 50 50;360 50 50"
                  dur="1s"
                  repeatCount="indefinite"
                  type="rotate"
                  attributeName="transform"
                ></animateTransform>
              </circle>
              <g></g>
            </g>
          </svg>
        )}
        <span>🌕</span>
      </p>
      <div className="balance__currency-caption">
        <p className="balance__currency-name">{t("magic coins")}</p>
        <button className="balance__hint-button">
          <img src={questionMark} />
        </button>
      </div>
    </div>
  );
};

export default Balance;
