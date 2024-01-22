import React from "react";
import { NavLink } from "react-router-dom";
import style from "../assets/styles/candidatePage.module.scss";

function SideSection() {
  return (
    <section className={`${style.sidesection}`}>
      <NavLink to="/" className={`${style.sidesection.a}`}>
        Compte
      </NavLink>
      <NavLink> Messages</NavLink>
      <NavLink> Suivi de candidatures </NavLink>
      <NavLink> Historique de candidatures </NavLink>
      <NavLink> Paramètres </NavLink>
    </section>
  );
}

export default SideSection;
