import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function UserDiploma() {
  const { auth } = useOutletContext();
  const navigate = useNavigate();
  const [userDegree, setUserDegree] = useState();

  if (!auth.token) {
    navigate("/accueil");
  }

  useEffect(() => {
    if (auth.token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/degree/`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => setUserDegree([res.data]));
    }
  }, [auth]);

  if (!userDegree) {
    return <p>Aucun diplôme ajouté.</p>;
  }
  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <ul>
        {userDegree &&
          userDegree.map((d) => (
            <>
              <li> Diplôme: {d.degree} </li>
              <li> Niveau: {d.level} </li>
              <li>
                {" "}
                Début de formation:{" "}
                {d.startingDate && formatDateString(d.startingDate)}{" "}
              </li>
              <li>
                {" "}
                Fin de formation:{" "}
                {d.completionDate && formatDateString(d.completionDate)}{" "}
              </li>
              <li> Université: {d.university} </li>
              <li> Ville: {d.city} </li>
              <hr />
            </>
          ))}
      </ul>
    </div>
  );
}

export default UserDiploma;
