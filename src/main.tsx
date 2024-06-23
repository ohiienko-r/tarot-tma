import React from "react";
import ReactDOM from "react-dom/client";
import {
  SDKProvider,
  initClosingBehavior,
  initViewport,
} from "@tma.js/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import App from "./App.tsx";
import "../i18n.ts";
import "./reset.scss";
import "./index.scss";
import "@telegram-apps/telegram-ui/dist/styles.css";
import "./mockEnv.ts";

const [viewport] = initViewport();
viewport.then((viewPort) => viewPort.expand());

const [closingBehaviour] = initClosingBehavior();
closingBehaviour.enableConfirmation();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRoot>
      <SDKProvider>
        <App />
      </SDKProvider>
    </AppRoot>
  </React.StrictMode>
);
