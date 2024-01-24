import React from "react";
import { useOutletContext, NavLink } from "react-router-dom";
import style from "../../assets/styles/activityPage.module.scss";

function UserActivity() {
  const { activity } = useOutletContext();

  const [{ applyDate, description, salary, title, type }] = activity;

  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`${style.profileActivity}`}>
      <div id="1" className={`${style.sideActivity}`}>
        <NavLink>
          <h3>{title}</h3>
        </NavLink>
        <h4>{type}</h4>
        <h4>{formatDateString(applyDate)}</h4>
      </div>
      <hr />
      <div id="2" className={`${style.selectedActivity}`}>
        <h2>{title}</h2>
        <h4>{type}</h4>
        <h4>{salary} euro/an</h4>
        <p>{formatDateString(applyDate)}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default UserActivity;
