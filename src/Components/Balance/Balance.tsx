import { FC } from "react";
import { useBalance } from "@/Hooks";
import { BalanceCaption } from "@/Components";
import "./styles.scss";

//TODO: implement skeleton instead of loader

const Balance: FC = () => {
  const { balance } = useBalance();

  return (
    <div className="balance">
      <p className="balance__value">
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
      <BalanceCaption />
    </div>
  );
};

export default Balance;
