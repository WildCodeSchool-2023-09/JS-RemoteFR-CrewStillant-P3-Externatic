import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
