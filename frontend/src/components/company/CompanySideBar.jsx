import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import style from "../../assets/styles/candidatePage.module.scss";

function CompanySideBar({ company }) {
  return (
    <section className={`${style.sidesection}`}>
      <NavLink to={`/entreprise/profil/${company.id}`}> Profil</NavLink>
      <NavLink to={`/entreprise/messages/${company.id}`}> Messages</NavLink>
      <NavLink to={`/entreprise/offres/${company.id}`}>Mes offres</NavLink>
      <NavLink to={`/entreprise/candidats/${company.id}`}>
        Liste des candidats
      </NavLink>
    </section>
  );
}

CompanySideBar.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default CompanySideBar;
