import { useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SkillsUser from "./SkillsUser";
import CriteriaUser from "./CriteriaUser";

function UserChoices() {
  const { auth } = useOutletContext();
  const [skills, setSkills] = useState();
  const [criteria, setCriteria] = useState();

  useEffect(() => {
    if (auth?.token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/skill/candidate`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        })
        .then((res) => setSkills(res.data[0]));
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/skill/`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        })
        .then((res) => setCriteria(res.data[0]));
    }
  }, [auth]);

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
