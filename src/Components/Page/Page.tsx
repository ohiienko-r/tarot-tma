import { FC, ReactNode } from "react";
import { viewport } from "@telegram-apps/sdk-react";
import "./styles.scss";

type PagePropTypes = {
  children: ReactNode | undefined;
  className?: string;
};

const Page: FC<PagePropTypes> = ({ children, className }) => {
  const insetTop = viewport.safeAreaInsetTop();
  const insetBottom = viewport.safeAreaInsetBottom();

  return (
    <section
      className={["page", className].join(" ")}
      style={{
        paddingTop: insetTop,
        paddingBottom: insetBottom,
      }}
    >
      {children}
    </section>
  );
};

export default Page;
