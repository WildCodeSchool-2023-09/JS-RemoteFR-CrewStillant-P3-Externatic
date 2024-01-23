import React from "react";
import { NavLink } from "react-router-dom";
import style from "../assets/styles/candidatePage.module.scss";

function SideSection() {
  return (
    <section className={`${style.sidesection}`}>
      <NavLink to="/candidat/profil/10">Compte</NavLink>
      <NavLink to="/candidat/messages/10"> Messages</NavLink>
      <NavLink> Suivi de candidatures </NavLink>
      <NavLink to="/candidat/activités/10">Historique de candidatures</NavLink>
    </section>
  );
}

export default SideSection;
