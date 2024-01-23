import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import App from "./App";
import HomePage from "./pages/HomePage";
import CandidatePage from "./pages/CandidatePage";
import UserProfil from "./components/user/UserProfil";
import UserMessage from "./components/user/UserMessage";
import UserActivity from "./components/user/UserActivity";

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
        path: "/candidat",
        element: <CandidatePage />,
        loader: async ({ params }) => {
          const user = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/candidate/${params.id}`)
            .then((res) => res.data);
          const messages = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/message/${params.id}`)
            .then((res) => res.data);
          const activity = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/activity/${params.id}`)
            .then((res) => res.data);
          return { user, messages, activity };
        },
        children: [
          {
            path: "profil/:id",
            element: <UserProfil />,
          },
          {
            path: "messages/:id",
            element: <UserMessage />,
          },
          {
            path: "activités/:id",
            element: <UserActivity />,
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
