import { FC } from "react";
import { AppRouter } from "./Router";
import { init } from "./init";

const App: FC = () => {
  init();
  return <AppRouter />;
};

export default App;
