import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import style from "../../pages/Admin/admin.module.scss";

function Candidate() {
  const [candidates, setCandidates] = useState();
  const { auth } = useOutletContext();

  useEffect(() => {
    if (auth?.token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/candidate/all`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        })
        .then((res) => setCandidates(res.data));
    }
  }, [candidates]);

  const handleDelete = async (userId) => {
    try {
      const userDelete = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );

      if (userDelete.status === 200) {
        toast.success("Le profil a bien été supprimé.");
        setCandidates(candidates.filter((c) => c.userId !== userId));
      }
    } catch (e) {
      console.error(e);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className={style.candidate}>
      {candidates &&
        candidates.map((c) => (
          <div key={c.id} className={style.profile}>
            <div className={style.info}>
              <img src={c.image} alt="profil" className={style.image} />
              <h3>
                Nom: {c?.firstname} {c?.lastname}
              </h3>
              <h4>Email: {c?.email}</h4>
              <h4>Téléphone: {c?.contactNumber}</h4>
              <hr />
            </div>
            <div>
              <button
                className={`${style.deleteButton}`}
                type="button"
                onClick={() => handleDelete(c.userId)}
              >
                Supprimer le candidat
              </button>
            </div>
          </div>
        ))}{" "}
    </div>
  );
}

export default Candidate;
