import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import style from "../assets/styles/candidatePage.module.scss";

function SideSection({ candidate }) {
  console.info(candidate);
  return (
    <section className={`${style.sidesection}`}>
      <NavLink to={`/candidat/${candidate.id}/profil/`}>Compte</NavLink>
      <NavLink to={`/candidat/${candidate.id}/diplome/`}>Mes diplômes</NavLink>
      <NavLink to={`/candidat/${candidate.id}/experience/`}>
        Mes expérience
      </NavLink>
      <NavLink to={`/candidat/${candidate.id}/competence/`}>
        Mes critères et compétences
      </NavLink>
      <NavLink to={`/candidat/${candidate.id}/messages/`}> Messages</NavLink>
      <NavLink to={`/candidat/${candidate.id}/activites/`}>
        Historique de candidatures
      </NavLink>
    </section>
  );
}

SideSection.propTypes = {
  candidate: PropTypes.shape.isRequired,
};

export default SideSection;
