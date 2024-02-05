import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import externaticLogo from "../../assets/images/EXTERNATIC-LOGO.png";
import externaticLogo2 from "../../assets/images/EXTERNATIC-LOGO2.png";
import SideBar from "../sidebar/SideNavBar";
import styles from "./navBar.module.scss";

function NavBar({ auth, setAuth }) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <div className={`${styles.navBar}`}>
      <nav className="d-flex justify-content-space-between align-items-center ">
        <Link to="/accueil">
          <img src={externaticLogo} alt="logo" />
        </Link>
        <div className="d-flex justify-content-flex-end flex-fill">
          {auth.token ? (
            <ul className=" d-flex align-items-center mr-30">
              <li>
                <p>Bienvenue {auth.mail}!</p>
              </li>
              <li className="d-flex justify-content-space-center align-items-center">
                <img src={externaticLogo2} alt="logo" />
              </li>
              <li className="d-flex justify-content-space-center align-items-center">
                <i>
                  <FontAwesomeIcon icon={faBars} onClick={showSidebar} />
                </i>
              </li>
              <li>
                <SideBar
                  sidebar={sidebar}
                  showSidebar={showSidebar}
                  setAuth={setAuth}
                  auth={auth}
                />
              </li>
            </ul>
          ) : (
            <ul className=" d-flex align-items-center mr-30">
              <li className="d-flex justify-content-space-center align-items-center">
                <Link to="/connexion">
                  {" "}
                  <u>Se connecter</u>{" "}
                </Link>
                <img src={externaticLogo2} alt="logo" />
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
  }).isRequired,
  setAuth: PropTypes.func.isRequired,
};

export default NavBar;
