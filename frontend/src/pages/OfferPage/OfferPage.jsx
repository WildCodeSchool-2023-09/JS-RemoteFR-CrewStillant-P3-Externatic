import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import style from "./offerpage.module.scss";
import src from "../../assets/images/map.png";

export default function OfferPage() {
  const offer = useLoaderData();
  const { auth, type } = useOutletContext();
  const navigate = useNavigate();

  const onApply = async () => {
    try {
      const applyResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/activity`,
        { jobId: offer.id, candidateId: type.id },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      if (applyResponse.status === 201)
        toast.success("Votre candidature a bien été prise en compte.");
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <section className={`${style.detailledOffer}`}>
      {offer && (
        <>
          <h3>{offer.title}</h3>
          <p>{offer.description}</p>
          <div
            className={
              auth?.token
                ? `${style.smallInformations}`
                : `${style.smallInformations} ${style.blur}`
            }
          >
            <span>
              <b>Type de contrat :</b> {offer.type}
            </span>
            <span>
              <b>Salaire annuel :</b> {offer.salary} €
            </span>
            <span>
              <b>Heures hebdomadaires :</b> {offer.hoursWorked}H
            </span>
            <span>
              <b>Lieu de travail :</b> {offer.place}
            </span>
            <span>
              <b>Adresse :</b> {offer.address}
            </span>
            <span>
              <b>Ville :</b> {offer.city}
            </span>
          </div>
          <div>
            {auth.userTypeId === 1 && (
              <button
                type="button"
                onClick={onApply}
                className={`${style.applyButton}`}
              >
                Envoyer votre candidature
              </button>
            )}
          </div>
          <div>
            {!auth?.token && (
              <button
                className={`${style.visualize}`}
                type="button"
                onClick={() => navigate("/connexion")}
              >
                <u>CONNECTEZ VOUS POUR VISUALISER PLUS D’INFORMATIONS</u>
              </button>
            )}
          </div>
          {auth?.token ? (
            <iframe
              title="Maps Embed Location"
              width="450"
              height="350"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?key=${
                import.meta.env.VITE_GOOGLE_API
              }&q=${offer.city}`}
            />
          ) : (
            <img className={`${style.blur}`} src={src} alt="Maps embed" />
          )}
        </>
      )}
      {!offer && <h2 className={`${style.blank}`}>Aucune offre à afficher</h2>}
    </section>
  );
}
