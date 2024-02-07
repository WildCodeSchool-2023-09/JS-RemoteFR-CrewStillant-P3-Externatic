import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import style from "../../assets/styles/DegreePage.module.scss";

function UserDiploma() {
  const { auth } = useOutletContext();
  const [userDegree, setUserDegree] = useState();

  useEffect(() => {
    if (auth?.token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/degree/`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        })
        .then((res) => setUserDegree([res.data]));
    }
  }, [auth?.token]);

  if (!userDegree) {
    return <p>Aucun diplôme ajouté.</p>;
  }

  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`${style.profileDegree}`}>
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
              <hr className={`${style.hr}`} />
            </>
          ))}
      </ul>
    </div>
  );
}

export default UserDiploma;
