import Login from "./pages/auth/Login";
import NotFound from "./pages/Page404";

import {
  useRoutes,
  Navigate
} from "react-router-dom";
import LogoOnlyLayout from "./components/Layout/LogoOnlyLayout";


export default function Router() {
  // RequireAuth();
  return useRoutes([

    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "/", element: <Navigate to="/login" /> },
        { path: "login", element: <Login /> },
        // { path: "register", element: <Register /> },
        { path: "404", element: <NotFound /> }
        // { path: "*", element: <Navigate to="/404" /> }
      ]
    },
    { path: "*", element: <Navigate to="/404" replace /> }
  ]);

}

