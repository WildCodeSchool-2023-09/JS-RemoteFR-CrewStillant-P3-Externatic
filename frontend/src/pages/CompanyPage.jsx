import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import style from "../assets/styles/candidatePage.module.scss";
import CompanySideBar from "../components/company/CompanySideBar";

function CompanyPage() {
  const company = useLoaderData();
  const messages = useLoaderData();
  const job = useLoaderData();
  const candidats = useLoaderData();
  return (
    <div>
      <div className={`${style.banner}`}>
        <h1 className={`${style.h1}`}>Mon espace</h1>
      </div>

      <div className={`${style.userpage}`}>
        <CompanySideBar company={company} />
        <Outlet context={(company, messages, job, candidats)} />
      </div>
    </div>
  );
}

export default CompanyPage;
