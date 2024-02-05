import React, { useEffect, useState } from "react";
import { useOutletContext, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "../../assets/styles/activityPage.module.scss";

function UserActivity() {
  const { auth } = useOutletContext();
  const navigate = useNavigate();
  const [activityUser, setActivityUser] = useState();

  if (!auth.token) {
    navigate("/accueil");
  }

  useEffect(() => {
    if (auth.token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/activity/`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => setActivityUser(res.data[0]));
    }
  }, [auth]);

  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`${style.profileActivity}`}>
      <div id="1" className={`${style.sideActivity}`}>
        {activityUser &&
          activityUser.map((a) => (
            <>
              <NavLink>
                <h3>{a.title}</h3>
              </NavLink>
              <h4>{a.type}</h4>
              <h4>{formatDateString(a.applyDate)}</h4>
              <hr />
            </>
          ))}
      </div>
      <hr />
      <div id="2" className={`${style.selectedActivity}`}>
        {activityUser &&
          activityUser.map((a) => (
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
