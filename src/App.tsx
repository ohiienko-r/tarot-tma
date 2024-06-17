import { FC } from "react";
import { Router } from "./Router";
import { InitDataProvider } from "./Contexts";

const App: FC = () => {
  return (
    <InitDataProvider>
      <Router />
    </InitDataProvider>
  );
};

export default App;
