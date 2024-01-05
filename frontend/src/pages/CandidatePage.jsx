import React from "react";
import { Outlet } from "react-router-dom";
import SideSection from "../Components/SideSection";

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
