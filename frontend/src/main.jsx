import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import ReactDOM from "react-dom/client";
import App from "./App";
import HomePage from "./pages/HomePage";
import CandidatePage from "./pages/CandidatePage";
import UserProfil from "./components/user/UserProfil";
import SignUp from "./pages/SignUp";
import SearchPage from "./pages/SearchPage/SearchPage";
import UserMessage from "./components/user/UserMessage";
import UserActivity from "./components/user/UserActivity";
import UserDiploma from "./components/user/UserDiploma";
import UserExperience from "./components/user/UserExperience";
import UserChoices from "./components/user/UserChoices";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "accueil",
        element: <HomePage />,
        loader: () => fetch(`${import.meta.env.VITE_BACKEND_URL}/job`),
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
        path: "candidat",
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
            user,
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
            path: "diplôme/:id",
            element: <UserDiploma />,
          },
          {
            path: "expérience/:id",
            element: <UserExperience />,
          },
          {
            path: "compétence/:id",
            element: <UserChoices />,
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
