import { FC } from "react";
import { useLaunchParams } from "@tma.js/sdk-react";
import { useBalance } from "@/Hooks";
import classes from "./header.module.scss";

const Header: FC = () => {
  const [balance, isEnogh, updateBalance] = useBalance();
  const initData = useLaunchParams().initData;

  const handleUpdateBalance = async (value: number) => {
    await updateBalance(value);
  };

  return (
    <header className={classes.heading}>
      <p>{`Hello, ${initData?.user?.firstName}`}</p>
      <br />
      <p>Balance: {`${balance}`}</p>
      <br />
      <p>Enough money: {`${isEnogh}`}</p>
      <br />
      <button
        onClick={async () => {
          await handleUpdateBalance(-1);
        }}
      >
        -1 Magic Coin
      </button>
      <button
        onClick={async () => {
          await handleUpdateBalance(1);
        }}
      >
        +1 Magic Coin
      </button>
      <button
        onClick={async () => {
          await handleUpdateBalance(-5);
        }}
      >
        -5 Magic Coin
      </button>
    </header>
  );
};

export default Header;
