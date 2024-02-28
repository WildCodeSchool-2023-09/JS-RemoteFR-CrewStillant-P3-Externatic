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
import WhoWeAre from "./pages/WhoWeAre/WhoWeAre";
import OfferPage from "./pages/OfferPage/OfferPage";
import RGPD from "./pages/RGPD/RGPD";
import ModifyProfil from "./components/user/ModifyProfil";
import UserExperience from "./components/user/UserExperience";

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
        path: "/offre/:id",
        element: <OfferPage />,
        loader: async ({ params }) => {
          const offer = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/job/${params.id}`)
            .then((res) => res.data);
          return offer;
        },
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
            path: "modifier",
            element: <ModifyProfil />,
          },
          {
            path: "diplome",
            element: <UserDiploma />,
          },
          {
            path: "experience",
            element: <UserExperience />,
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
        path: "/qui-sommes-nous",
        element: <WhoWeAre />,
      },
      {
        path: "/rgpd",
        element: <RGPD />,
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
