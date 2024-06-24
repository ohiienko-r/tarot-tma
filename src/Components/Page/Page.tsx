import { FC } from "react";
import { PagePropTypes } from "./types";
import "./styles.scss";

const Page: FC<PagePropTypes> = ({ children, className }) => {
  return (
    <section className={["page", className && className].join(" ")}>
      {children}
    </section>
  );
};

export default Page;
