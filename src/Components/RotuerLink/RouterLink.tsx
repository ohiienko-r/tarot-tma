import { FC } from "react";
import { Link } from "react-router-dom";
import { haptic } from "@/Telegram";
import { RouterLinkPropTypes } from "./types";
import "./styles.scss";

const RouterLink: FC<RouterLinkPropTypes> = ({
  to,
  title,
  price,
  icon,
  state,
}) => {
  const handleHapticFeedback = () => {
    haptic.impactOccurred("medium");
  };

  return (
    <Link
      to={to}
      className="router-link"
      onClick={handleHapticFeedback}
      state={state && state}
    >
      <div className="router-link__title">
        {icon && <img src={icon} />}
        <p>{title}</p>
      </div>
      {price && <p>{`${price} 🌕`}</p>}
    </Link>
  );
};

export default RouterLink;
