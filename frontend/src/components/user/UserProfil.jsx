import { useLoaderData } from "react-router-dom";

import("../../assets/styles/candidatePage.scss");

function UserProfil() {
  const user = useLoaderData();
  return (
    <div className="profile-section">
      <div className="user-image">
        {user &&
          user.map((u) => (
            <img
              src={u.image}
              alt="candidate"
              className="profile-pic"
              key={u.id}
            />
          ))}

        <button type="button" className="button-space">
          Changer votre photo
        </button>
      </div>
      <div className="user-info">
        {user &&
          user.map((u) => (
            <div key={u.id}>
              <p> Nom: {u.lastname} </p>
              <p> Prénom: {u.firstname} </p>
              <p> E-mail: {u.email} </p>
              <p> Date de naissance: {u.date_of_birth} </p>
              <p> Date d'inscription: {u.registration_date} </p>
              <p> Téléphone: {u.contact_number} </p>
              <p> Salaire souhaité: {u.wanted_salary} </p>
            </div>
          ))}

        <hr />
        <button type="button" className="button-space">
          Modifier votre CV
        </button>
        <button type="button" className="button-space">
          Supprimer votre CV
        </button>
        <button type="button" className="button-space">
          Modifier vos informations
        </button>
      </div>
    </div>
  );
}

export default UserProfil;
