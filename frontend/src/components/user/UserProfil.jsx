import { useOutletContext } from "react-router-dom";
import style from "../../assets/styles/candidatePage.module.scss";

function UserProfil() {
  const { candidate } = useOutletContext();

  const [
    {
      image,
      lastname,
      firstname,
      email,
      dateOfBirth,
      registrationDate,
      wantedSalary,
      contactNumber,
    },
  ] = candidate;

  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`${style.profilesection}`}>
      <div className={`${style.userimage}`}>
        {image && (
          <img src={image} alt={firstname} className={`${style.profilepic}`} />
        )}
        <button type="button" className={`${style.buttonspace}`}>
          Changer votre photo
        </button>
      </div>
      <div className={`${style.userinfo}`}>
        <div>
          <p> Nom: {lastname} </p>
          <p> Prénom: {firstname} </p>
          <p> E-mail: {email} </p>
          <p> Date de naissance: {formatDateString(dateOfBirth)} </p>
          <p> Date d'inscription: {formatDateString(registrationDate)} </p>
          <p> Téléphone: {contactNumber} </p>
          <p> Salaire souhaité: {wantedSalary} euro/an</p>
        </div>

        <hr />
        <button type="button" className={`${style.buttonspace}`}>
          Modifier votre CV
        </button>
        <button type="button" className={`${style.buttonspace}`}>
          Supprimer votre CV
        </button>
        <button type="button" className={`${style.buttonspace}`}>
          Modifier vos informations
        </button>
      </div>
    </div>
  );
}

export default UserProfil;
