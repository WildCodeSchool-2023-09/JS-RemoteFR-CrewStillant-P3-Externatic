import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Addjob from "./Addjob";
import ModifyJob from "./ModifyJob";
import style from "../../assets/styles/companyOffers.module.scss";

function CompanyOffers() {
  const { auth, type } = useOutletContext();
  const [job, setJob] = useState();
  const [showAddJob, setShowAddJob] = useState(false);
  const [showModifyJob, setShowModifyJob] = useState(false);
  const [getJob, setGetJob] = useState();

  useEffect(() => {
    if (auth?.token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/job/companyoffers`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        })
        .then((res) => setJob(res.data));
    }
  }, [auth?.token, job]);

  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/job/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      setJob((prevjobs) => prevjobs.filter((w) => w.id !== id));

      toast.success("Votre offre a bien été supprimé.");
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className={`${style.company}`}>
      <div className={`${style.jobList}`}>
        <div className={`${style.job}`}>
          {Array.isArray(job) &&
            job.map((j) => (
              <div key={j.id}>
                <h2>Poste: {j.title}</h2>
                <p>Date: {formatDateString(j.createdDate)}</p>
                <p>Contrat: {j.type}</p>
                <p>Heures travaillés: {j.hoursWorked} heures</p>
                <p>Salaire: {j.salary} euro/an</p>
                {j.skill && j.level ? (
                  <p>
                    Compétence: {j.skill} - {j.level}
                  </p>
                ) : null}
                <p>Description: {j.description}</p>
                <div className={`${style.divButton}`}>
                  <button
                    type="button"
                    onClick={() => handleDelete(j.id)}
                    className={`${style.jobButton}`}
                  >
                    {" "}
                    Supprimer cette offre
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModifyJob(true);
                      setShowAddJob(false);
                      setGetJob(j);
                    }}
                    className={`${style.jobButton}`}
                  >
                    {" "}
                    Modifier cette offre
                  </button>
                </div>

                <hr className={`${style.hr}`} />
              </div>
            ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          setShowAddJob(true);
          setShowModifyJob(false);
        }}
        className={`${style.jobButton}`}
      >
        Ajouter une offre
      </button>
      {showAddJob && (
        <Addjob
          auth={auth}
          type={type}
          job={job}
          setJob={setJob}
          setShowAddJob={setShowAddJob}
        />
      )}
      {showModifyJob && (
        <ModifyJob
          auth={auth}
          type={type}
          getJob={getJob}
          job={job}
          setJob={setJob}
          setShowModifyJob={setShowModifyJob}
        />
      )}
    </div>
  );
}

export default CompanyOffers;
