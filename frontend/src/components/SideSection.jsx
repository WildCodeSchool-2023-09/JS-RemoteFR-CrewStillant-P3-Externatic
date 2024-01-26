import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import style from "../assets/styles/candidatePage.module.scss";

function SideSection({ candidate }) {
  return (
    <section className={`${style.sidesection}`}>
      <NavLink to={`/candidat/profil/${candidate.candidate[0].id}`}>
        Compte
      </NavLink>
      <NavLink to={`/candidat/diplome/${candidate.candidate[0].id}`}>
        Mes diplômes
      </NavLink>
      <NavLink to={`/candidat/experience/${candidate.candidate[0].id}`}>
        Mes expérience
      </NavLink>
      <NavLink to={`/candidat/competence/${candidate.candidate[0].id}`}>
        Mes critères et compétences
      </NavLink>
      <NavLink to={`/candidat/messages/${candidate.candidate[0].id}`}>
        {" "}
        Messages
      </NavLink>
      <NavLink to={`/candidat/activites/${candidate.candidate[0].id}`}>
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
