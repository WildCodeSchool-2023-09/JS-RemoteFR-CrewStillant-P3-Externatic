import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import style from "../assets/styles/candidatePage.module.scss";

function SideSection({ candidat }) {
  return (
    <section className={`${style.sidesection}`}>
      <NavLink to={`/candidat/profil/${candidat.id}`}>Compte</NavLink>
      <NavLink to={`/candidat/diplome/${candidat.id}`}>Mes diplômes</NavLink>
      <NavLink to={`/candidat/experience/${candidat.id}`}>
        Mes expérience
      </NavLink>
      <NavLink to={`/candidat/competence/${candidat.id}`}>
        Mes critères et compétences
      </NavLink>
      <NavLink to={`/candidat/messages/${candidat.id}`}> Messages</NavLink>
      <NavLink> Suivi de candidatures </NavLink>
      <NavLink to={`/candidat/activites/${candidat.id}`}>
        Historique de candidatures
      </NavLink>
    </section>
  );
}

SideSection.propTypes = {
  candidat: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default SideSection;
