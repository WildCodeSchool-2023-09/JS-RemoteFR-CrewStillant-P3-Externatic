import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import style from "../../assets/styles/candidatePage.module.scss";

function UserProfil() {
  const { user, type, auth } = useOutletContext();
  const userData = user;
  const typeData = type;
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.token) {
      navigate("/accueil");
    }
  }, []);

  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`${style.profilesection}`}>
      {typeData?.image && typeData?.image != null && (
        <div className={`${style.userimage}`}>
          <img
            src={typeData.image}
            alt={typeData.firstname}
            className={`${style.companyPic}`}
          />{" "}
        </div>
      )}
      {userData && userData.type === "candidat" && (
        <div className={`${style.userinfo}`}>
          <div>
            <p> Nom: {typeData.lastname} </p>
            <p> Prénom: {typeData.firstname} </p>
            <p> E-mail: {typeData.email} </p>
            <p> Date de naissance: {formatDateString(typeData.dateOfBirth)} </p>
            <p>
              {" "}
              Date d'inscription: {formatDateString(
                typeData.registrationDate
              )}{" "}
            </p>
            <p> Téléphone: {typeData.contactNumber} </p>
            <p> Salaire souhaité: {typeData.wantedSalary} €/an</p>
          </div>
          <hr className={`${style.hr}`} />
        </div>
      )}
      {userData && userData.type === "entreprise" && (
        <div className={`${style.userinfo}`}>
          <div>
            <p> Nom: {typeData.name} </p>
            <p> Téléphone: {typeData.contactNumber} </p>
            <p> site internet: {typeData.website} </p>
            <p> email: {typeData.email} </p>
            <p>
              {" "}
              Date de création: {formatDateString(
                typeData.establishmentDate
              )}{" "}
            </p>
            <p>
              {" "}
              Date d'inscription: {formatDateString(
                typeData.registrationDate
              )}{" "}
            </p>
            <p> n° de siret: {typeData.siret} </p>
            <p> Secteur d'activité: {typeData.companySector} </p>
            <p> Description: {typeData.description} </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfil;
