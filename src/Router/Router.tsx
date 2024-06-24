import { useEffect, useMemo } from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { useIntegration } from "@tma.js/react-router-integration";
import {
  initNavigator,
  useMiniApp,
  useThemeParams,
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
} from "@tma.js/sdk-react";
import { useLanguage } from "@/Hooks";
import { ROUTES_NAMES } from "./routes-names";
import { routes } from "./routes";

const AppRouter = () => {
  const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
  const [location, reactNaviator] = useIntegration(navigator);
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  useLanguage();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <Router location={location} navigator={reactNaviator}>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path={"*"} element={<Navigate to={ROUTES_NAMES.HOME} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
