import { useOutletContext } from "react-router-dom";
import style from "../../assets/styles/candidatePage.module.scss";

function CompanyUser() {
  const { company } = useOutletContext();

  const [
    {
      name,
      image,
      description,
      website,
      establishmentDate,
      siret,
      companySector,
      contactNumber,
      registrationDate,
      email,
    },
  ] = company;

  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`${style.profilesection}`}>
      <div className={`${style.userimage}`}>
        <img src={image} alt={name} className={`${style.profilepic}`} />
        <button type="button" className={`${style.buttonspace}`}>
          Changer votre photo
        </button>
      </div>
      <div className={`${style.userinfo}`}>
        <div>
          <p> Nom: {name} </p>
          <p> Téléphone: {contactNumber} </p>
          <p> site internet: {website} </p>
          <p> email: {email} </p>
          <p> Date de création: {formatDateString(establishmentDate)} </p>
          <p> Date d'inscription: {formatDateString(registrationDate)} </p>
          <p> n° de siret: {siret} </p>
          <p> Secteur d'activité: {companySector} </p>
          <p> Description: {description} </p>
        </div>

        <hr />
        <button type="button" className={`${style.buttonspace}`}>
          Modifier vos informations
        </button>
      </div>
    </div>
  );
}

export default CompanyUser;
