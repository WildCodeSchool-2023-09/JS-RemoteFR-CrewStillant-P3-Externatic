import React from "react";
import { useOutletContext } from "react-router-dom";

function SkillsUser() {
  const { skills } = useOutletContext();

  if (!skills || skills.length === 0) {
    return <p>Aucune compétence ajoutée.</p>;
  }

  return (
    <div>
      {skills &&
        skills.map((s) => (
          <ul key={s.id}>
            <li> {s.name} </li>
            <li> {s.level} </li>
          </ul>
        ))}
    </div>
  );
}

export default SkillsUser;
