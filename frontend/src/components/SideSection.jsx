import React from "react";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";
import style from "../assets/styles/candidatePage.module.scss";

function SideSection({ auth }) {
  const navigate = useNavigate();

  if (!auth.token) {
    navigate("/accueil");
  }
  return (
    <section className={`${style.sidesection}`}>
      <NavLink to="/monespace/profil">Profil</NavLink>
      <NavLink to="/monespace/messages">Messages</NavLink>
      {auth.userTypeId === 1 && (
        <>
          <NavLink to="/monespace/diplome">Mes diplômes</NavLink>
          <NavLink to="/monespace/activites">
            Historique de candidatures
          </NavLink>
        </>
      )}
      {auth.userTypeId === 2 && (
        <>
          <NavLink to="/monespace/offres">Mes offres</NavLink>
          <NavLink to="/monespace/nouvelle-offre">Créer une offre</NavLink>
          <NavLink to="/monespace/candidats">Liste des candidats</NavLink>
        </>
      )}
      {auth.userTypeId === 3 && (
        <>
          <NavLink to="/admin/candidats/">Candidats</NavLink>
          <NavLink to="/admin/entreprises/">Entreprises</NavLink>
          <NavLink to="/admin/offres/">Offres</NavLink>
        </>
      )}
    </section>
  );
}

export default SideSection;

SideSection.propTypes = { auth: PropTypes.shape.isRequired };
