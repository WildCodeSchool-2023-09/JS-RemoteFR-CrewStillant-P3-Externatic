import React, { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import axios from "axios";
import SideSection from "../components/SideSection";
import style from "../assets/styles/candidatePage.module.scss";

function CandidatePage() {
  // const { messages, activity, degrees, experience, skills, criteria } =
  //   useLoaderData();

  const { auth } = useOutletContext();
  const [candidate, setCandidate] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/candidate/`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => setCandidate(res.data));
  }, []);

  console.info("candidate", candidate);
  return (
    <div>
      <div className={`${style.banner}`}>
        <h1 className={`${style.h1}`}>Mon espace</h1>
      </div>

      <div className={`${style.userpage}`}>
        <SideSection candidate={candidate} />
        <Outlet
          context={{
            candidate,
          }}
        />
      </div>
    </div>
  );
}

export default CandidatePage;
