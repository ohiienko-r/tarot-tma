import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useLanguage, useDailyBonus } from "@/Hooks";
import useRoutes from "./useRoutes";

const AppRouter = () => {
  useLanguage();
  useDailyBonus();

  const routes = useRoutes();

  const router = createBrowserRouter([...routes]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
