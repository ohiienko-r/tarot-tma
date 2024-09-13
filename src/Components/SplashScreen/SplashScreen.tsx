import { FC } from "react";
import { Icons } from "..";
import "./styles.scss";

const SplashScreen: FC = () => {
  return (
    <div className="splash-screen">
      <Icons.Logo />
    </div>
  );
};

export default SplashScreen;
