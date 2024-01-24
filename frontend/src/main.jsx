import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import CandidatePage from "./pages/CandidatePage";
import UserProfil from "./components/user/UserProfil";
import SignUp from "./pages/SignUp";

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
        path: "/inscription",
        element: <SignUp />,
      },
      {
        path: "/",
        element: <CandidatePage />,
        children: [
          {
            path: "/profil/:id",
            element: <UserProfil />,
            loader: ({ params }) =>
              fetch(
                `${import.meta.env.VITE_BACKEND_URL}/candidate/${params.id}`
              ),
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
