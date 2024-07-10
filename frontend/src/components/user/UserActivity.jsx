import React, { useEffect, useState } from "react";
import { useOutletContext, NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import style from "../../assets/styles/activityPage.module.scss";

function UserActivity() {
  const { auth } = useOutletContext();
  const [activityUser, setActivityUser] = useState();
  const [offer, setOffer] = useState();

  const singleOffer = (id) => {
    setOffer(activityUser.find((o) => id === o.id));
  };

  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    if (auth?.token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/activity/`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        })
        .then((res) => setActivityUser(res.data));
    }
  }, [auth?.token, activityUser]);

  const deleteActivity = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/activity/${offer.id}`,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setActivityUser(
        (prevActivity) =>
          prevActivity.filter((activity) => activity.id !== offer.id),
        toast.success("Votre Diplôme a bien été supprimé.")
      );
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className={`${style.profileActivity}`}>
      {!activityUser ? (
        <p>Vous n'avez pas de candidature pour le moment.</p>
      ) : (
        <>
          <div className={`${style.sideActivity}`}>
            {Array.isArray(activityUser) &&
              activityUser.map((a) => (
                <div key={a.id}>
                  <NavLink
                    onClick={() => {
                      singleOffer(a.id);
                    }}
                  >
                    <h3>{a.title}</h3>
                  </NavLink>
                  <h4>{a.type}</h4>
                  <h4>{formatDateString(a.applyDate)}</h4>
                  <hr />
                </div>
              ))}
          </div>
          <hr />
          <div className={`${style.selectedActivity}`}>
            {offer ? (
              <>
                <h2>{offer.title}</h2>
                <h4>{offer.type}</h4>
                <h4>{offer.salary} euro/an</h4>
                <p>{formatDateString(offer.applyDate)}</p>
                <p>{offer.description}</p>
                <button
                  type="button"
                  onClick={deleteActivity}
                  className={`${style.deleteButton}`}
                >
                  {" "}
                  supprimer votre candidature
                </button>
              </>
            ) : (
              <h3> Séléctionnez une offre </h3>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default UserActivity;
