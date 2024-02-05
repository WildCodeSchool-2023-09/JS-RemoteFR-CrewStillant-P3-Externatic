import React from "react";
import { useOutletContext } from "react-router-dom";

function UserDiploma() {
  const { degrees } = useOutletContext();
  const userDegree = [degrees];

  if (!userDegree.length === 0) {
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
              <li> Début de formation: {formatDateString(d.startingDate)} </li>
              <li> Fin de formation: {formatDateString(d.completionDate)} </li>
              <li> Univeristé: {d.university} </li>
              <li> Ville: {d.city} </li>
              <hr />
            </>
          ))}
      </ul>
    </div>
  );
}

export default UserDiploma;
