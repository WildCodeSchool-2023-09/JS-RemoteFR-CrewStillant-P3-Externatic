import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import HomePage from "./pages/HomePage";
import CandidatePage from "./pages/CandidatePage";
import UserProfil from "./components/user/UserProfil";
import SearchPage from "./pages/SearchPage/SearchPage";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/accueil",
        element: <HomePage />,
        loader: () => fetch(`${import.meta.env.VITE_BACKEND_URL}/job`),
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "/candidate",
        element: <CandidatePage />,
        children: [
          {
            path: "profil/:id",
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
