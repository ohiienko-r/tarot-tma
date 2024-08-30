import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  useMiniApp,
  useThemeParams,
  useViewport,
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
} from "@telegram-apps/sdk-react";
import { useLanguage, useDailyBonus, useMyCard } from "@/Hooks";
import useRoutes from "./useRoutes";

const AppRouter = () => {
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();
  useLanguage();
  useDailyBonus();
  useMyCard();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  miniApp.setHeaderColor("#110126");
  miniApp.setBgColor("#110126");

  const routes = useRoutes();

  const router = createBrowserRouter([...routes]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
