import { UserProvider } from "./Contexts/index.ts";
import ReactDOM from "react-dom/client";
import { init } from "./init.ts";
import { AppRoot } from "@telegram-apps/telegram-ui";
import App from "./App.tsx";
import "../i18n.ts";
import "./reset.scss";
import "./index.scss";
import "@telegram-apps/telegram-ui/dist/styles.css";

init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppRoot>
    <UserProvider>
      <App />
    </UserProvider>
  </AppRoot>
);
