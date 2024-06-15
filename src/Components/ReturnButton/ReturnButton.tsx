import { FC } from "react";
import { useNavigate } from "react-router-dom";
import returnIco from "@/assets/return_button_ico.svg";
import classes from "./returnButton.module.scss";

const ReturnButton: FC = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleReturn} className={classes.returnButton}>
      <img src={returnIco} alt="Return arrow" />
    </button>
  );
};

export default ReturnButton;
