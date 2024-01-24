import React from "react";
import { useOutletContext } from "react-router-dom";

function UserDiploma() {
  const { degrees } = useOutletContext();

  if (!degrees || degrees.length === 0) {
    return <p>Aucun diplôme ajouté.</p>;
  }

  const [{ degree, level, startingDate, completionDate, university, city }] =
    degrees;
  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <ul>
        <li> Diplôme: {degree} </li>
        <li> Niveau: {level} </li>
        <li> Début de formation: {formatDateString(startingDate)} </li>
        <li> Fin de formation{formatDateString(completionDate)} </li>
        <li> Univeristé: {university} </li>
        <li> Ville: {city} </li>
      </ul>
    </div>
  );
}

export default UserDiploma;
