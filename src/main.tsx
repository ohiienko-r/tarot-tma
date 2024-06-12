import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import WebApp from "@twa-dev/sdk";
import "./index.css";

WebApp.ready();
WebApp.enableClosingConfirmation();

const queryParams = new URLSearchParams(window.location.search);
const lang = queryParams.get("lang");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App lang={lang} />
  </React.StrictMode>
);
