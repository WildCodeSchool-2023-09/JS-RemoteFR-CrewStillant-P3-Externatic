import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/styles/candidatePage.scss";

function SideSection() {
  return (
    <section className="side-section">
      <NavLink to="/"> Compte </NavLink>
      <NavLink> Messages</NavLink>
      <NavLink> Suivi de candidatures </NavLink>
      <NavLink> Historique de candidatures </NavLink>
      <NavLink> Paramètres </NavLink>
    </section>
  );
}

export default SideSection;
