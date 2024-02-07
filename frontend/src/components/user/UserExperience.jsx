import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function UserExperience() {
  const { auth } = useOutletContext();
  const navigate = useNavigate();
  const [experienceUser, setExperienceUser] = useState();

  if (!auth?.token) {
    navigate("/accueil");
  }

  useEffect(() => {
    if (auth?.token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/experience/`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        })
        .then((res) => setExperienceUser([res.data]));
    }
  }, [auth?.token]);

  if (!experienceUser) {
    return <p>Aucune expérience ajoutée.</p>;
  }
  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <ul>
        {experienceUser &&
          experienceUser.map((e) => (
            <>
              <li> Poste: {e.jobTitle} </li>
              <li> Compagnie: {e.companyName} </li>
              <li> Cité: {e.city} </li>
              <li> Pays: {e.country} </li>
              <li>
                Période:
                {formatDateString(e.startDate)} -
                {e.endDate !== null ? (
                  formatDateString(e.endDate)
                ) : (
                  <p> Toujours en poste </p>
                )}
              </li>
              <li> Description: {e.description} </li>
              <hr />
            </>
          ))}
      </ul>
    </div>
  );
}

export default UserExperience;
