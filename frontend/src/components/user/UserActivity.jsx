import React from "react";
import { useOutletContext, NavLink } from "react-router-dom";
import style from "../../assets/styles/activityPage.module.scss";

function UserActivity() {
  const { activity } = useOutletContext();

  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`${style.profileActivity}`}>
      <div id="1" className={`${style.sideActivity}`}>
        {activity &&
          activity.map((a) => (
            <>
              <NavLink>
                <h3>{a.title}</h3>
              </NavLink>
              <h4>{a.type}</h4>
              <h4>{formatDateString(a.applyDate)}</h4>
            </>
          ))}
      </div>
      <hr />
      <div id="2" className={`${style.selectedActivity}`}>
        {activity &&
          activity.map((a) => (
            <>
              <h2>{a.title}</h2>
              <h4>{a.type}</h4>
              <h4>{a.salary} euro/an</h4>
              <p>{formatDateString(a.applyDate)}</p>
              <p>{a.description}</p>
            </>
          ))}
      </div>
    </div>
  );
}

export default UserActivity;
