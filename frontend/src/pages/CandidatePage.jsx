import React from "react";
import { Outlet } from "react-router-dom";
import "../assets/styles/candidatePage.scss";
import SideSection from "../components/SideSection";

function CandidatePage() {
  return (
    <>
      <div className="h1">
        <h1>Mon espace</h1>
      </div>

      <div className="user-page">
        <SideSection />
        <Outlet />
      </div>
    </>
  );
}

export default CandidatePage;
