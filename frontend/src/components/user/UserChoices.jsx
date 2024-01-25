import { useOutletContext } from "react-router-dom";
import React from "react";
import SkillsUser from "./SkillsUser";
import CriteriaUser from "./CriteriaUser";

function UserChoices() {
  const { criteria, skills } = useOutletContext();
  return (
    <div>
      {skills && skills.length > 0 ? (
        <SkillsUser />
      ) : (
        <p>Aucune compétence ajoutée</p>
      )}
      <CriteriaUser criteria={criteria} />
      <CriteriaUser criteria={criteria} />
      <CriteriaUser criteria={criteria} />
      <CriteriaUser criteria={criteria} />
      <CriteriaUser criteria={criteria} />
    </div>
  );
}

export default UserChoices;
