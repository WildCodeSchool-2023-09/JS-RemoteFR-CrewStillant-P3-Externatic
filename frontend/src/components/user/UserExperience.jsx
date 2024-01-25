import React from "react";
import { useOutletContext } from "react-router-dom";

function UserExperience() {
  const { experience } = useOutletContext();

  if (!experience || experience.length === 0) {
    return <p>Aucune expérience ajoutée.</p>;
  }

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
