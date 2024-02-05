import { useNavigate, useOutletContext } from "react-router-dom";
// import axios from "axios";
import style from "../../assets/styles/candidatePage.module.scss";
// import EditInfoModal from "../EditInfoModal/EditInfoModal";

function UserProfil() {
  const { user, type, auth } = useOutletContext();
  const navigate = useNavigate();
  // const [userData, setUserData] = useState(user);
  // const [typeData, setTypeData] = useState(type);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  console.info("profilData", user, type);

  if (!auth.token) {
    navigate("/accueil");
  }

  console.info("type", type);

  const formatDateString = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // const handleEdit = () => {
  //   setIsModalOpen(true);
  // };
  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <div className={`${style.profilesection}`}>
      {type.image != null && (
        <div className={`${style.userimage}`}>
          <img
            src={type.image}
            alt={type.firstname}
            className={`${style.profilepic}`}
          />
          <button type="button" className={`${style.buttonspace}`}>
            Changer votre photo
          </button>
        </div>
      )}
      {user.type === "candidat" && (
        <div className={`${style.userinfo}`}>
          <div>
            <p> Nom: {type.lastname} </p>
            <p> Prénom: {type.firstname} </p>
            <p> E-mail: {type.email} </p>
            <p> Date de naissance: {formatDateString(type.dateOfBirth)} </p>
            <p>
              {" "}
              Date d'inscription: {formatDateString(type.registrationDate)}{" "}
            </p>
            <p> Téléphone: {type.contactNumber} </p>
            <p> Salaire souhaité: {type.wantedSalary} €/an</p>
          </div>
          <hr />
          <button type="button" className={`${style.buttonspace}`}>
            Modifier vos informations
          </button>
        </div>
      )}
      {user.type === "entreprise" && (
        <div className={`${style.userinfo}`}>
          <div>
            <p> Nom: {type.name} </p>
            <p> Téléphone: {type.contactNumber} </p>
            <p> site internet: {type.website} </p>
            <p> email: {type.email} </p>
            <p>
              {" "}
              Date de création: {formatDateString(type.establishmentDate)}{" "}
            </p>
            <p>
              {" "}
              Date d'inscription: {formatDateString(type.registrationDate)}{" "}
            </p>
            <p> n° de siret: {type.siret} </p>
            <p> Secteur d'activité: {type.companySector} </p>
            <p> Description: {type.description} </p>
          </div>
          <hr />
          <button type="button" className={`${style.buttonspace}`}>
            Modifier vos informations
          </button>
        </div>
      )}
      {/* <EditInfoModal
        type={user.type}
        isOpen={isModalOpen}
        onClose={closeModal}
        currentInfo={typeData}
      /> */}
    </div>
  );
}

export default UserProfil;
