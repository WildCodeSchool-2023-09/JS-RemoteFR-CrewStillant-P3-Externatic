import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import ReactDOM from "react-dom/client";
import App from "./App";
import HomePage from "./pages/HomePage";
import CandidatePage from "./pages/CandidatePage";
import UserProfil from "./components/user/UserProfil";
import SearchPage from "./pages/SearchPage/SearchPage";
import UserMessage from "./components/user/UserMessage";
import UserActivity from "./components/user/UserActivity";
import UserDiploma from "./components/user/UserDiploma";
import UserExperience from "./components/user/UserExperience";
import UserChoices from "./components/user/UserChoices";
import Login from "./components/Login";
import SignUp from "./pages/SignUp";
import CompanyPage from "./pages/CompanyPage";
import CompanyUser from "./components/company/CompanyUser";
import CompanyMessage from "./components/company/CompanyMessage";
import CompanyOffers from "./components/company/CompanyOffers";
import CandidatList from "./components/company/CandidatList";
import NotFound from "./pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "accueil/",
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
        path: "/accueil/:id",
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
        path: "inscription",
        element: <SignUp />,
      },
      {
        path: "recherche",
        element: <SearchPage />,
      },
      {
        path: "/connexion",
        element: <Login />,
      },
      {
        path: "/candidat/",
        element: <CandidatePage />,
        // loader: async ({ params }) => {
        // const messages = await axios
        //   .get(`${import.meta.env.VITE_BACKEND_URL}/message/${params.id}`)
        //   .then((res) => res.data);
        // const activity = await axios
        //   .get(`${import.meta.env.VITE_BACKEND_URL}/activity/${params.id}`)
        //   .then((res) => res.data);
        // const degrees = await axios
        //   .get(`${import.meta.env.VITE_BACKEND_URL}/degree/${params.id}`)
        //   .then((res) => res.data);
        // const experience = await axios
        //   .get(`${import.meta.env.VITE_BACKEND_URL}/experience/${params.id}`)
        //   .then((res) => res.data);
        // const skills = await axios
        //   .get(`${import.meta.env.VITE_BACKEND_URL}/skill/${params.id}`)
        //   .then((res) => res.data);
        // const criteria = await axios
        //   .get(`${import.meta.env.VITE_BACKEND_URL}/skill/`)
        //   .then((res) => res.data);
        // return {
        //   messages,
        //   activity,
        //   degrees,
        //   experience,
        //   skills,
        //   criteria,
        // };
        // },
        children: [
          {
            path: "profil/",
            element: <UserProfil />,
          },
          {
            path: "diplome/",
            element: <UserDiploma />,
          },
          {
            path: "experience/",
            element: <UserExperience />,
          },
          {
            path: "competence/",
            element: <UserChoices />,
          },
          {
            path: "messages/",
            element: <UserMessage />,
          },
          {
            path: "activites/",
            element: <UserActivity />,
          },
        ],
      },
      {
        path: "/entreprise",
        element: <CompanyPage />,
        loader: async ({ params }) => {
          const company = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/company/${params.id}`)
            .then((res) => res.data);
          const messages = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/message/${params.id}`)
            .then((res) => res.data);
          const job = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/job/${params.id}`)
            .then((res) => res.data);
          const candidats = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/candidate`)
            .then((res) => res.data);
          return {
            company,
            messages,
            job,
            candidats,
          };
        },
        children: [
          {
            path: "profil/",
            element: <CompanyUser />,
          },
          {
            path: "messages/",
            element: <CompanyMessage />,
          },
          {
            path: "offres/",
            element: <CompanyOffers />,
          },
          {
            path: "candidats/",
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
