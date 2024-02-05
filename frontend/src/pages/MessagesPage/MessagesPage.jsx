import React from "react";
import { useOutletContext, NavLink } from "react-router-dom";
import style from "../../assets/styles/messagePage.module.scss";

export default function MessagesPage() {
  const { messages } = useOutletContext();

  if (!messages || messages.length === 0) {
    return <p>Aucun messages.</p>;
  }
  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`${style.profileMessage}`}>
      <div id="1" className={`${style.messageList}`}>
        {messages &&
          messages.map((m) => (
            <>
              <NavLink>
                <h3>{m.subject}</h3>
              </NavLink>
              <h4>{m.email}</h4>
              <hr />
            </>
          ))}
      </div>
      <hr />
      <div id="2" className={`${style.message}`}>
        {messages &&
          messages.map((m) => (
            <>
              <h2>{m.subject}</h2>
              <h4>{m.email}</h4>
              <p>{formatDateString(m.receivedDate)}</p>
              <p>{m.text}</p>
            </>
          ))}
      </div>
    </div>
  );
}
