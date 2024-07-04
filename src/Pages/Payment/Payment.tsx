import { FC } from "react";
import { Balance, BalancePad } from "@/Components";

const Payment: FC = () => {
  return (
    <>
      <div>
        <BalancePad>
          <Balance />
        </BalancePad>
      </div>
      <h2>Get for free</h2>
      <ul>
        <li>For inviting a friend</li>
        <li>For watching add</li>
      </ul>
      <h2>Recharge</h2>
      <ul>
        <li>Buy 5 for...</li>
        <li>Buy 20 for...</li>
        <li>Buy 100 for...</li>
      </ul>
    </>
  );
};

export default Payment;
