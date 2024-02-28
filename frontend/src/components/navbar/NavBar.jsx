import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import externaticLogo from "../../assets/images/EXTERNATIC-LOGO-ORIGINAL-RVB.png";
import externaticLogo2 from "../../assets/images/EXTERNATIC-LOGO2.png";
import SideBar from "../sidebar/SideNavBar";
import styles from "./navBar.module.scss";

function NavBar({ auth, setAuth, type }) {
  const [bar, setbar] = useState(false);
  const showSidebar = () => setbar(!bar);

  return (
    <div className={`${styles.navBar}`}>
      <nav className="d-flex justify-content-space-evenly align-items-center ">
        <div className={`${styles.linkLogo}`}>
          <Link to="/accueil">
            <img src={externaticLogo} alt="logo" />
          </Link>
          {auth?.userTypeId === 1 ? (
            <Link to="/recherche">
              {" "}
              <p>Trouver votre emploi</p>{" "}
            </Link>
          ) : null}
        </div>

        <div className="d-flex justify-content-flex-end flex-fill">
          {auth?.token ? (
            <ul className=" d-flex align-items-center ">
              <li>
                <p>Bienvenue {type && (type.firstname || type.name)}</p>
              </li>
              <li>
                <img
                  src={externaticLogo2}
                  className={`${styles.connexionImg}`}
                  alt="logo"
                />
              </li>
              <li className="d-flex justify-content-space-center align-items-center">
                <i>
                  <FontAwesomeIcon icon={faBars} onClick={showSidebar} />
                </i>
              </li>
              <li>
                <SideBar
                  bar={bar}
                  showSidebar={showSidebar}
                  setAuth={setAuth}
                  auth={auth}
                />
              </li>
            </ul>
          ) : (
            <ul className=" d-flex align-items-center mr-30">
              <li className="d-flex justify-content-space-center align-items-center">
                <Link to="/connexion" className={`${styles.link}`}>
                  {" "}
                  <u>Se connecter</u>{" "}
                </Link>
                <img
                  className={`${styles.connexionImg}`}
                  src={externaticLogo2}
                  alt="logo"
                />
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}

NavBar.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string.isRequired,
    mail: PropTypes.string.isRequired,
    userTypeId: PropTypes.number.isRequired,
  }).isRequired,
  type: PropTypes.shape({
    firstname: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  setAuth: PropTypes.func.isRequired,
};

export default NavBar;
