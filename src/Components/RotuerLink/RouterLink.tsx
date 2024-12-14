import { FC } from "react";
import { Link } from "react-router-dom";
import { hapticFeedback } from "@telegram-apps/sdk-react";
import { RouterLinkPropTypes } from "./types";
import "./styles.scss";

const RouterLink: FC<RouterLinkPropTypes> = ({
  to,
  title,
  price,
  icon,
  state,
}) => {
  return (
    <Link
      to={to}
      className="router-link"
      onClick={() => hapticFeedback.impactOccurred("medium")}
      state={state && state}
    >
      <div className="router-link__title">
        {icon && <img src={icon} />}
        <p>{title}</p>
      </div>
      {price && <p className="router-link__pricing">{`${price} 🌕`}</p>}
    </Link>
  );
};

export default RouterLink;
