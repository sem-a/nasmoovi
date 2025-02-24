import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PATHS } from "./paths";
import Home from "./pages/home";
import "./index.css";

const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: <Home />,
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
