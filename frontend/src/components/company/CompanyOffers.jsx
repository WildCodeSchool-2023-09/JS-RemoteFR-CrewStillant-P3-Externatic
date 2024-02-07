import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
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
  }, [auth]);

  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`${style.profileMessage}`}>
      <div id="2" className={`${style.message}`}>
        {job &&
          job.map((j) => (
            <div>
              <h2>Poste: {j.title}</h2>
              <p>Date: {formatDateString(j.createdDate)}</p>
              <p>Contrat: {j.type}</p>
              <p>Heures travaillés: {j.hoursWorked}</p>
              <p>Salaire: {j.salary}</p>
              {j.skill && j.level ? (
                <p>
                  Compétence: {j.skill} - {j.level}
                </p>
              ) : null}
              <p>Description: {j.description}</p>
              <hr className={`${style.hr}`} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default CompanyOffers;
