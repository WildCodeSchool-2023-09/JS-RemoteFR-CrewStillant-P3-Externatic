import React from "react";
import { Outlet } from "react-router-dom";
import SideSection from "../components/SideSection";
import style from "../assets/styles/candidatePage.module.scss";

function CandidatePage() {
  return (
    <div>
      <div className={`${style.banner}`}>
        <h1 className={`${style.h1}`}>Mon espace</h1>
      </div>

      <div className={`${style.userpage}`}>
        <SideSection />
        <Outlet />
      </div>
    </div>
  );
}

export default CandidatePage;
