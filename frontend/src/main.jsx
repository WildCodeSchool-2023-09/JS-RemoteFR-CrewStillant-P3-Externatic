import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import CandidatePage from "./pages/CandidatePage";
import UserProfile from "./Components/UserSpace/UserProfile";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/candidat",
        element: <CandidatePage />,
        children: [
          {
            path: "/profile",
            element: <UserProfile />,
          },
        ],
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
