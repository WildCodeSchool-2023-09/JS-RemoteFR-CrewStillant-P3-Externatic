import React, { useEffect, useState } from "react";
import { useOutletContext, NavLink } from "react-router-dom";
import axios from "axios";
import style from "../../assets/styles/messagePage.module.scss";

function CandidatList() {
  const { auth } = useOutletContext();
  const [candidates, setCandidates] = useState();
  const [candidate, setCandidate] = useState();

  useEffect(() => {
    if (auth?.token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/candidate/all`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => setCandidates(res.data));
    }
  }, [auth?.token]);

  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`${style.profileMessage}`}>
      <div className={`${style.messageList}`}>
        {candidates &&
          candidates.map((c) => (
            <>
              <NavLink onClick={() => setCandidate(c)}>
                <h3>
                  {c?.firstname} {c?.lastname}
                </h3>
              </NavLink>
              <h4>{c?.email}</h4>
              <h4>{c?.contactNumber}</h4>
              <hr />
            </>
          ))}
      </div>
      <hr />
      <div className={`${style.message}`}>
        {candidate ? (
          <>
            <img src={candidate.image} alt={candidate.firstname} />
            <h2>
              {candidate.firstname} {candidate.lastname}
            </h2>
            <p>{formatDateString(candidate.dateOfBirth)}</p>
            <p>{candidate.email}</p>
            <p>{candidate.contactNumber}</p>
          </>
        ) : (
          <h3> Séléctionnez un candidat </h3>
        )}
      </div>
    </div>
  );
}

export default CandidatList;
