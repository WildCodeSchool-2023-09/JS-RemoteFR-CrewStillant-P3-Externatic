import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import AddDiploma from "./userManagement/AddDiploma";
import UpdateDiploma from "./userManagement/UpdateDiploma";
import style from "../../assets/styles/DegreePage.module.scss";

function UserDiploma() {
  const { auth, type } = useOutletContext();
  const [userDegree, setUserDegree] = useState();
  const [showAddDiploma, setShowAddDiploma] = useState(false);
  const [showUpdateDiploma, setShowUpdateDiploma] = useState(false);
  const [diploma, setDiploma] = useState();

  useEffect(() => {
    if (auth) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/degree/`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => setUserDegree(res.data));
    }
  }, [userDegree]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/degree/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/candidate-degree/${id}`,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );

      setUserDegree((prevDegrees) =>
        prevDegrees.filter((degree) => degree.id !== id)
      );

      toast.success("Votre Diplôme a bien été supprimé.");
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className={`${style.profileDegree}`}>
        {!userDegree || userDegree.length === 0 ? (
          <div>
            <p>Aucun diplôme ajouté.</p>
          </div>
        ) : (
          Array.isArray(userDegree) &&
          userDegree.map((d) => (
            <ul key={d.id}>
              <li> Diplôme: {d.degree} </li>
              <li> Niveau: {d.level} </li>
              <li>
                Début de formation:{" "}
                {d.startingDate && formatDateString(d.startingDate)}{" "}
              </li>
              <li>
                Fin de formation:{" "}
                {d.completionDate && formatDateString(d.completionDate)}{" "}
              </li>
              <li> Université: {d.university} </li>
              <li> Ville: {d.city} </li>
              <hr className={`${style.hr}`} />
              <button
                type="button"
                className={`${style.button}`}
                onClick={() => handleDelete(d.id)}
              >
                Supprimer le diplôme
              </button>
              <button
                type="button"
                className={`${style.button}`}
                onClick={() => {
                  setShowUpdateDiploma(true);
                  setShowAddDiploma(false);
                  setDiploma(d);
                }}
              >
                Modifier le diplôme
              </button>
            </ul>
          ))
        )}
      </div>

      <button
        type="button"
        onClick={() => {
          setShowAddDiploma(true);
          setShowUpdateDiploma(false);
          setDiploma();
        }}
        className={`${style.button}`}
      >
        Ajouter un diplôme
      </button>
      {showAddDiploma && (
        <AddDiploma
          setShowAddDiploma={setShowAddDiploma}
          userDegree={userDegree}
          setUserDegree={setUserDegree}
          type={type}
          auth={auth}
        />
      )}
      {showUpdateDiploma && (
        <UpdateDiploma
          diploma={diploma}
          setShowUpdateDiploma={setShowUpdateDiploma}
          userDegree={userDegree}
          setUserDegree={setUserDegree}
          auth={auth}
        />
      )}
    </div>
  );
}

export default UserDiploma;
