import { BalanceProvider } from "./Contexts/index.ts";
import ReactDOM from "react-dom/client";
import {
  SDKProvider,
  initClosingBehavior,
  initViewport,
} from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import App from "./App.tsx";
import "../i18n.ts";
import "./reset.scss";
import "./index.scss";
import "@telegram-apps/telegram-ui/dist/styles.css";

import "../mockEnv.ts";

const [viewport] = initViewport();
viewport.then((viewPort) => viewPort.expand());

const [closingBehaviour] = initClosingBehavior();
closingBehaviour.enableConfirmation();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppRoot>
    <SDKProvider>
      <BalanceProvider>
        <App />
      </BalanceProvider>
    </SDKProvider>
  </AppRoot>
);
