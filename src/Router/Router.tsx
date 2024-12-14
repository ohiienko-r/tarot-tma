import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useLanguage, useDailyBonus, useMyCard } from "@/Hooks";
import useRoutes from "./useRoutes";

const AppRouter = () => {
  useLanguage();
  useDailyBonus();
  useMyCard();

  const routes = useRoutes();

  const router = createBrowserRouter([...routes]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
