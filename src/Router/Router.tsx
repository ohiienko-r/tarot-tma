import { useEffect, useMemo } from "react";
import { Route, Router, Routes } from "react-router-dom";
import { useIntegration } from "@telegram-apps/react-router-integration";
import {
  initNavigator,
  useMiniApp,
  useThemeParams,
  useViewport,
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
} from "@telegram-apps/sdk-react";
import { useLanguage } from "@/Hooks";
import useRoutes from "./useRoutes";

const AppRouter = () => {
  const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
  const [location, reactNaviator] = useIntegration(navigator);
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();
  useLanguage();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  const routes = useRoutes();

  // import("eruda").then((lib) => lib.default.init());

  return (
    <Router location={location} navigator={reactNaviator}>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
};

export default AppRouter;
