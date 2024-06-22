import { FC } from "react";
import { useLaunchParams } from "@tma.js/sdk-react";
import classes from "./header.module.scss";

const Header: FC = () => {
  const initData = useLaunchParams().initData;

  return (
    <header className={classes.heading}>
      <p>{`Hello, ${initData?.user?.firstName}`}</p>
    </header>
  );
};

export default Header;
