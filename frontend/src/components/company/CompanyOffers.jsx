import React, { useEffect, useState } from "react";
import { useOutletContext, NavLink } from "react-router-dom";
import axios from "axios";
import style from "../../assets/styles/messagePage.module.scss";

function CompanyOffers() {
  const { auth } = useOutletContext();
  const [job, setJob] = useState();

  useEffect(() => {
    if (auth.token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/job/companyoffers`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => setJob(res.data));
    }
  }, [auth.token]);

  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`${style.profileMessage}`}>
      <div id="1" className={`${style.messageList}`}>
        {job &&
          job.map((j) => (
            <>
              <NavLink>
                <h3>{j.title}</h3>
              </NavLink>
              <h4>{j.type}</h4>
              <h4>{formatDateString(j.createdDate)}</h4>
              <hr />
            </>
          ))}
      </div>
      <hr />
      <div id="2" className={`${style.message}`}>
        {job &&
          job.map((j) => (
            <>
              <h2>{j.title}</h2>
              <p>{formatDateString(j.createdDate)}</p>
              <p>{j.type}</p>
              <p>{j.hoursWorked}</p>
              <p>{j.salary}</p>
              {j.skill && j.level ? (
                <p>
                  {j.skill} : {j.level}
                </p>
              ) : null}
              <p>{j.description}</p>
            </>
          ))}
      </div>
    </div>
  );
}

export default CompanyOffers;
