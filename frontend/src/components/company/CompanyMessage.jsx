import React from "react";
import { useOutletContext, NavLink } from "react-router-dom";
import style from "../../assets/styles/messagePage.module.scss";

function CompanyMessage() {
  const { messages } = useOutletContext();

  const [{ subject, email, text, receivedDate }] = messages;

  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`${style.profileMessage}`}>
      <div id="1" className={`${style.messageList}`}>
        <NavLink>
          <h3>{subject}</h3>
        </NavLink>
        <h4>{email}</h4>
      </div>
      <hr />
      <div id="2" className={`${style.message}`}>
        <h2>{subject}</h2>
        <h4>{email}</h4>
        <p>{formatDateString(receivedDate)}</p>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default CompanyMessage;
