import React from "react";
import PropTypes from "prop-types";
import { NavLink, useOutletContext } from "react-router-dom";
import style from "../assets/styles/candidatePage.module.scss";

function SideSection() {
  const auth = useOutletContext();

  return (
    <section className={`${style.sidesection}`}>
      <NavLink to={`/candidat/profil/${auth.auth.id}`}>Compte</NavLink>
      <NavLink to={`/candidat/diplome/${auth.auth.id}`}>Mes diplômes</NavLink>
      <NavLink to={`/candidat/experience/${auth.auth.id}`}>
        Mes expérience
      </NavLink>
      <NavLink to={`/candidat/competence/${auth.auth.id}`}>
        Mes critères et compétences
      </NavLink>
      <NavLink to={`/candidat/messages/${auth.auth.id}`}> Messages</NavLink>
      <NavLink to={`/candidat/activites/${auth.auth.id}`}>
        Historique de candidatures
      </NavLink>
    </section>
  );
}

SideSection.propTypes = {
  candidate: PropTypes.shape({
    candidate: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default SideSection;
