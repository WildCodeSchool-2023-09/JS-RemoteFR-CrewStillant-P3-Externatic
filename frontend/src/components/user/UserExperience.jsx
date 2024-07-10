import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import AddExperience from "./userManagement/AddExperience";
import UpdateExperience from "./userManagement/UpdateExperience";
import style from "../../assets/styles/DegreePage.module.scss";

function UserExperience() {
  const { auth, type } = useOutletContext();
  const [experienceUser, setExperienceUser] = useState();
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [showUpdateExperience, setShowUpdateExperience] = useState(false);
  const [experiences, setExperiences] = useState();

  useEffect(() => {
    if (auth?.token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/experience/`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        })
        .then((res) => setExperienceUser(res.data));
    }
  }, [experienceUser]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/experience/${id}`,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );

      setExperienceUser((prevExperience) =>
        prevExperience.filter((experience) => experience.id !== id)
      );

      toast.success("Votre expérience a bien été supprimée.");
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
        {!experienceUser || experienceUser.length === 0 ? (
          <div>
            <p>Aucune expérience ajoutée.</p>
          </div>
        ) : (
          Array.isArray(experienceUser) &&
          experienceUser.map((e) => (
            <ul key={e.id}>
              <li> Poste: {e.jobTitle} </li>
              <li> Compagnie: {e.companyName} </li>
              <li> Cité: {e.city} </li>
              <li> Pays: {e.country} </li>
              <li>
                Période:
                {formatDateString(e.startDate)} -{" "}
                {e.endDate !== null ? (
                  formatDateString(e.endDate)
                ) : (
                  <p> Toujours en poste </p>
                )}
              </li>
              <li>
                {" "}
                <p>Description: {e.description}</p>{" "}
              </li>
              <hr />
              <button
                type="button"
                className={`${style.button}`}
                onClick={() => handleDelete(e.id)}
              >
                Supprimer l'expérience
              </button>
              <button
                type="button"
                className={`${style.button}`}
                onClick={() => {
                  setShowUpdateExperience(true);
                  setShowAddExperience(false);
                  setExperiences(e);
                }}
              >
                Modifier l'expérience
              </button>
            </ul>
          ))
        )}
      </div>
      <button
        type="button"
        onClick={() => {
          setShowAddExperience(true);
          setShowUpdateExperience(false);
          setExperiences();
        }}
        className={`${style.button}`}
      >
        Ajouter une expérience
      </button>
      {showAddExperience && (
        <AddExperience
          setShowAddExperience={setShowAddExperience}
          experienceUser={experienceUser}
          setExperienceUser={setExperienceUser}
          type={type}
        />
      )}
      {showUpdateExperience && (
        <UpdateExperience
          experiences={experiences}
          setShowUpdateExperience={setShowUpdateExperience}
          experienceUser={experienceUser}
          setExperienceUser={setExperienceUser}
          auth={auth}
        />
      )}
    </div>
  );
}

export default UserExperience;
