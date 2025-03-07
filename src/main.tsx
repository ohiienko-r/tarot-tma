import { UserProvider, LanguageProvider } from "./Contexts/index.ts";
import ReactDOM from "react-dom/client";
import { init } from "./init.ts";
import { AppRoot } from "@telegram-apps/telegram-ui";
import App from "./App.tsx";
import { PostHogProvider } from "posthog-js/react";
import "../i18n.ts";
import "./reset.scss";
import "./index.scss";
import "@telegram-apps/telegram-ui/dist/styles.css";

init();

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PostHogProvider
    apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
    options={options}
  >
    <AppRoot>
      <UserProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </UserProvider>
    </AppRoot>
  </PostHogProvider>
);
