import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import style from "../../pages/Admin/admin.module.scss";

function Company() {
  const [companies, setCompanies] = useState();
  const { auth } = useOutletContext();

  useEffect(() => {
    if (auth?.token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/company/all`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        })
        .then((res) => setCompanies(res.data));
    }
  }, [companies]);

  const handleDelete = async (userId) => {
    try {
      const userDelete = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );

      if (userDelete.status === 200) {
        toast.success("L'entreprise a bien été supprimée.");
        setCompanies(companies.filter((c) => c.userId !== userId));
      }
    } catch (e) {
      console.error(e);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className={style.candidate}>
      {companies &&
        companies.map((c) => (
          <div className={style.profile}>
            <div className={style.info}>
              <img src={c?.image} alt="profil" className={style.image} />
              <h3>Nom: {c?.name}</h3>
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
                Supprimer l'entreprise
              </button>
            </div>
          </div>
        ))}{" "}
    </div>
  );
}

export default Company;
