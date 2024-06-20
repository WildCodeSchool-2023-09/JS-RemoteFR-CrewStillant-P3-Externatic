import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import style from "../../pages/Admin/admin.module.scss";

function Job() {
  const [jobs, setJobs] = useState();
  const { auth } = useOutletContext();

  useEffect(() => {
    if (auth?.token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/job/all/`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        })
        .then((res) => setJobs(res.data));
    }
  }, [jobs]);

  const handleDelete = async (jobId) => {
    try {
      const userDelete = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/job/job/${jobId}`,
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );

      if (userDelete.status === 200) {
        toast.success("L'entreprise a bien été supprimée.");
        setJobs(jobs.filter((j) => j.id !== jobId));
      }
    } catch (e) {
      console.error(e);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className={style.candidate}>
      {jobs &&
        jobs.map((j) => (
          <div className={style.profile}>
            <div className={style.info}>
              <img src={j?.image} alt="profil" className={style.image} />
              <h3>Nom: {j?.title}</h3>
              <h4>Entreprise: {j?.company}</h4>
              <h4>Salaire: {j.salary} euro/an </h4>
              <h4>Contrat: {j?.type}</h4>
              <hr />
            </div>
            <div>
              <button
                className={`${style.deleteButton}`}
                type="button"
                onClick={() => handleDelete(j.id)}
              >
                Supprimer l'entreprise
              </button>
            </div>
          </div>
        ))}{" "}
    </div>
  );
}

export default Job;
