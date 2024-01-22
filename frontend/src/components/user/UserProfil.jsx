import { useLoaderData } from "react-router-dom";
import style from "../../assets/styles/candidatePage.module.scss";

function UserProfil() {
  const user = useLoaderData();
  return (
    <div className={`${style.profilesection}`}>
      <div className={`${style.userimage}`}>
        {user.map((u) => (
          <img
            src={u.image}
            alt="candidate"
            className={`${style.profilepic}`}
            key={u.id}
          />
        ))}

        <button type="button" className={`${style.buttonspace}`}>
          Changer votre photo
        </button>
      </div>
      <div className={`${style.userinfo}`}>
        {user.map((u) => (
          <div key={u.id}>
            <p> Nom: {u.lastname} </p>
            <p> Prénom: {u.firstname} </p>
            <p> E-mail: {u.email} </p>
            <p> Date de naissance: {u.date_of_birth} </p>
            <p> Date d'inscription: {u.registration_date} </p>
            <p> Téléphone: {u.contact_number} </p>
            <p> Salaire souhaité: {u.wanted_salary} euro/an</p>
          </div>
        ))}

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
