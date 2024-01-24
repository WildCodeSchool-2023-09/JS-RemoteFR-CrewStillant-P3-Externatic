import React from "react";
import { useOutletContext } from "react-router-dom";
import style from "../../assets/styles/candidatePage.module.scss";

function UserMessage() {
  const { messages } = useOutletContext();

  const [{ subject, email, text, receivedDate }] = messages;

  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`${style.profilesection}`}>
      <div id="1" className={`${style.userimage}`}>
        <nav>
          <h3>{subject}</h3>
        </nav>
        <h4>{email}</h4>
      </div>
      <div id="2" className={`${style.userinfo}`}>
        <h2>{subject}</h2>
        <h4>{email}</h4>
        <p>{formatDateString(receivedDate)}</p>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default UserMessage;
