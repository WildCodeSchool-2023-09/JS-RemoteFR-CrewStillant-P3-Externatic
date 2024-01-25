import React from "react";
import { useOutletContext } from "react-router-dom";

function UserExperience() {
  const { experience } = useOutletContext();

  if (!experience || experience.length === 0) {
    return <p>Aucune expérience ajoutée.</p>;
  }

  const [
    { jobTitle, companyName, startDate, endDate, description, city, country },
  ] = experience;

  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <ul>
        <li> Poste: {jobTitle} </li>
        <li> Compagnie: {companyName} </li>
        <li> Cité: {city} </li>
        <li> Pays: {country} </li>
        <li>
          {" "}
          Période:
          {formatDateString(startDate)} -{" "}
          {endDate !== null ? (
            formatDateString(endDate)
          ) : (
            <p> Toujours en poste </p>
          )}
        </li>
        <li> Description: {description} </li>
      </ul>{" "}
    </div>
  );
}

export default UserExperience;
