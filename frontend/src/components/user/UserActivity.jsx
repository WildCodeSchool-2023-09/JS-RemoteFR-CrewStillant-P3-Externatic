import React from "react";
import { useOutletContext } from "react-router-dom";
import style from "../../assets/styles/candidatePage.module.scss";

function UserActivity() {
  const { activity } = useOutletContext();

  const [{ applyDate, description, salary, title, type }] = activity;

  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`${style.profilesection}`}>
      <div id="1" className={`${style.userimage}`}>
        <nav>
          <h3>{title}</h3>
        </nav>
        <h4>{type}</h4>
        <h4>{formatDateString(applyDate)}</h4>
      </div>
      <div id="2" className={`${style.userinfo}`}>
        <h2>{title}</h2>
        <h4>{type}</h4>
        <h4>{salary}</h4>
        <p>{formatDateString(applyDate)}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default UserActivity;
