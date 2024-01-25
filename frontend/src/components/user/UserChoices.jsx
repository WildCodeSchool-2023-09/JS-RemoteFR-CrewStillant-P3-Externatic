import { useOutletContext } from "react-router-dom";
import React from "react";
import SkillsUser from "./SkillsUser";
import CriteriaUser from "./CriteriaUser";

function UserChoices() {
  const { criteria } = useOutletContext();
  return (
    <div>
      <SkillsUser />
      <CriteriaUser criteria={criteria} />
      <CriteriaUser criteria={criteria} />
      <CriteriaUser criteria={criteria} />
      <CriteriaUser criteria={criteria} />
      <CriteriaUser criteria={criteria} />
    </div>
  );
}

export default UserChoices;
