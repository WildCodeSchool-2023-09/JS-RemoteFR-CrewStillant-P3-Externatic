import React from "react";
import { useOutletContext, NavLink } from "react-router-dom";
import style from "../../assets/styles/messagePage.module.scss";

function CandidatList() {
  const { candidats } = useOutletContext();

  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`${style.profileMessage}`}>
      <div id="1" className={`${style.messageList}`}>
        {candidats &&
          candidats.map((c) => (
            <>
              <NavLink>
                <h3>
                  {c.firstname} {c.lastname}
                </h3>
              </NavLink>
              <h4>{c.email}</h4>
              <h4>{c.contactNumber}</h4>
              <hr />
            </>
          ))}
      </div>
      <hr />
      <div id="2" className={`${style.message}`}>
        {candidats &&
          candidats.map((c) => (
            <>
              <img src={c.image} alt={c.firstname} />
              <h2>
                {c.firstname} {c.lastname}
              </h2>
              <p>{formatDateString(c.dateOfBirth)}</p>
              <p>{c.email}</p>
              <p>{c.contactNumber}</p>
              <hr />
            </>
          ))}
      </div>
    </div>
  );
}

export default CandidatList;
