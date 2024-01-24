import React from "react";
import { NavLink } from "react-router-dom";
import style from "../assets/styles/candidatePage.module.scss";

function SideSection() {
  return (
    <section className={`${style.sidesection}`}>
      <NavLink to="/candidat/profil/20">Compte</NavLink>
      <NavLink to="/candidat/diplôme/20">Mes diplômes</NavLink>
      <NavLink to="/candidat/expérience/20">Mes expérience</NavLink>
      <NavLink to="/candidat/compétence/20">
        Mes critères et compétences
      </NavLink>
      <NavLink to="/candidat/messages/20"> Messages</NavLink>
      <NavLink> Suivi de candidatures </NavLink>
      <NavLink to="/candidat/activités/20">Historique de candidatures</NavLink>
    </section>
  );
}

export default SideSection;
