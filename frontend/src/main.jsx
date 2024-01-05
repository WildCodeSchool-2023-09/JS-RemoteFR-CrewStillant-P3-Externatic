import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import CandidatePage from "./pages/CandidatePage";
import UserProfile from "./components/userSpace/UserProfile";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: () => fetch(`${import.meta.env.VITE_BACKEND_URL}/job`),
      },
      {
        path: "/candidat",
        element: <CandidatePage />,
        children: [
          {
            path: "profil",
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
