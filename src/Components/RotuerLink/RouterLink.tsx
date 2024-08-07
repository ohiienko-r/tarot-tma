import { FC } from "react";
import { Link } from "react-router-dom";
import { initHapticFeedback } from "@telegram-apps/sdk-react";
import { RouterLinkPropTypes } from "./types";
import "./styles.scss";

const RouterLink: FC<RouterLinkPropTypes> = ({
  to,
  title,
  icon,
  className,
  state,
}) => {
  const hapticFeedback = initHapticFeedback();

  const handleHapticFeedback = () => {
    hapticFeedback.impactOccurred("medium");
  };

  return (
    <Link
      to={to}
      className={["router-link", className].join(" ")}
      onClick={handleHapticFeedback}
      state={state && state}
    >
      <p>{title}</p>
      {icon && <img src={icon} />}
    </Link>
  );
};

export default RouterLink;
