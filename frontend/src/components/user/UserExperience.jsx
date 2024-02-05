import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function UserExperience() {
  const { auth } = useOutletContext();
  const navigate = useNavigate();
  const [experience, setExperience] = useState();

  if (!auth.token) {
    navigate("/accueil");
  }

  if (!experience || experience.length === 0) {
    return <p>Aucune expérience ajoutée.</p>;
  }

  useEffect(() => {
    if (auth.token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/experience/`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => setExperience(res.data[0]));
    }
  }, [auth]);

  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <ul>
        {experience &&
          experience.map((e) => (
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
