import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import style from "../assets/styles/candidatePage.module.scss";

function SideSection({ user }) {
  return (
    <section className={`${style.sidesection}`}>
      <NavLink to={`/candidat/profil/${user.id}`}>Compte</NavLink>
      <NavLink to={`/candidat/diplôme/${user.id}`}>Mes diplômes</NavLink>
      <NavLink to={`/candidat/expérience/${user.id}`}>Mes expérience</NavLink>
      <NavLink to={`/candidat/compétence/${user.id}`}>
        Mes critères et compétences
      </NavLink>
      <NavLink to={`/candidat/messages/${user.id}`}> Messages</NavLink>
      <NavLink> Suivi de candidatures </NavLink>
      <NavLink to={`/candidat/activités/${user.id}`}>
        Historique de candidatures
      </NavLink>
    </section>
  );
}

SideSection.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default SideSection;
