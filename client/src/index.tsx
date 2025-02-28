import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PATHS } from "./paths";
import Home from "./pages/home";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Contact from "./pages/contact";
import Video from "./pages/video";
import Weddings from "./pages/weddings";
import Err404 from "./pages/404";
import PortfolioPage from "./pages/portfolio";

const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: <Home />,
  },
  {
    path: PATHS.contact,
    element: <Contact />,
  },
  {
    path: PATHS.video,
    element: <Video />,
  },
  {
    path: PATHS.weddings,
    element: <Weddings />,
  },
  {
    path: `${PATHS.weddingOne}/:id`,
    element: <PortfolioPage />,
  },
  {
    path: "*",
    element: <Err404 />,
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
