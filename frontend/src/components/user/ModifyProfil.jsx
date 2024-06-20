import { React } from "react";
import { useOutletContext } from "react-router-dom";
import ModifyUser from "./profile/ModifyUser";
import ModifyCandidate from "./profile/ModifyCandidate";
import ModifyCompany from "./profile/ModifyCompany";
import style from "../../assets/styles/modifyProfile.module.scss";

function ModifyProfil() {
  const { type, setType, user, auth, setAuth } = useOutletContext();

  return (
    <div className={`${style.modify}`}>
      <ModifyUser
        user={user}
        auth={auth}
        setAuth={setAuth}
        type={type}
        setType={setType}
      />
      {user.type === "candidat" ? (
        <ModifyCandidate type={type} setType={setType} auth={auth} />
      ) : (
        <ModifyCompany type={type} setType={setType} auth={auth} />
      )}
    </div>
  );
}

export default ModifyProfil;
