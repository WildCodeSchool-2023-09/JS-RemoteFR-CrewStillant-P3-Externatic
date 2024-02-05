import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import ReactDOM from "react-dom/client";
import App from "./App";
import HomePage from "./pages/HomePage";
import UserProfil from "./components/user/UserProfil";
import SearchPage from "./pages/SearchPage/SearchPage";
import UserActivity from "./components/user/UserActivity";
import UserDiploma from "./components/user/UserDiploma";
import UserChoices from "./components/user/UserChoices";
import Login from "./components/Login";
import SignUp from "./pages/SignUp/SignUp";
import CompanyOffers from "./components/company/CompanyOffers";
import CandidatList from "./components/company/CandidatList";
import NotFound from "./pages/NotFound/NotFound";
import MySpace from "./pages/MySpace/MySpace";
import UserMessage from "./components/user/UserMessage";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/accueil",
        element: <HomePage />,
        loader: async () => {
          const job = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/job`)
            .then((res) => res.data);
          const count = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/job/count`)
            .then((res) => res.data);
          return { job, count };
        },
      },
      {
        path: "/inscription",
        element: <SignUp />,
      },
      {
        path: "/recherche",
        element: <SearchPage />,
      },
      {
        path: "/connexion",
        element: <Login />,
      },
      {
        path: "/monespace",
        element: <MySpace />,
        children: [
          {
            path: "profil",
            element: <UserProfil />,
          },
          {
            path: "diplome",
            element: <UserDiploma />,
          },
          {
            path: "competence",
            element: <UserChoices />,
          },
          {
            path: "messages",
            element: <UserMessage />,
          },
          {
            path: "activites",
            element: <UserActivity />,
          },
          {
            path: "offres",
            element: <CompanyOffers />,
          },
          {
            path: "candidats",
            element: <CandidatList />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
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
