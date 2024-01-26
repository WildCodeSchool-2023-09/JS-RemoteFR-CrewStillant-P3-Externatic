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
        path: "/accueil/:id",
        element: <HomePage />,
        loader: () => fetch(`${import.meta.env.VITE_BACKEND_URL}/job`),
      },
      {
        path: "/connexion",
        element: <Login />,
      },
      {
        path: "/inscription",
        element: <SignUp />,
      },
      {
        path: "/candidat",
        element: <CandidatePage />,
        loader: async ({ params }) => {
          const candidate = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/candidate/${params.id}`)
            .then((res) => res.data);
          const messages = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/message/${params.id}`)
            .then((res) => res.data);
          const activity = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/activity/${params.id}`)
            .then((res) => res.data);
          const degrees = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/degree/${params.id}`)
            .then((res) => res.data);
          const experience = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/experience/${params.id}`)
            .then((res) => res.data);
          const skills = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/skill/${params.id}`)
            .then((res) => res.data);
          const criteria = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/skill/`)
            .then((res) => res.data);
          return {
            candidate,
            messages,
            activity,
            degrees,
            experience,
            skills,
            criteria,
          };
        },
        children: [
          {
            path: "profil/:id",
            element: <UserProfil />,
          },
          {
            path: "diplome/:id",
            element: <UserDiploma />,
          },
          {
            path: "experience/:id",
            element: <UserExperience />,
          },
          {
            path: "competence/:id",
            element: <UserChoices />,
          },
          {
            path: "messages/:id",
            element: <UserMessage />,
          },
          {
            path: "activites/:id",
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
            path: "profil/:id",
            element: <CompanyUser />,
          },
          {
            path: "messages/:id",
            element: <CompanyMessage />,
          },
          {
            path: "offres/:id",
            element: <CompanyOffers />,
          },
          {
            path: "candidats/:id",
            element: <CandidatList />,
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
