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
          <ul className=" d-flex align-items-center mr-30">
            <li className="d-flex justify-content-space-center align-items-center">
              {auth ? (
                <p>{auth.email}</p>
              ) : (
                <Link to="/login"> Se connecter </Link>
              )}
              <img src={externaticLogo2} alt="logo" />
            </li>
            <li>
              <i>
                <FontAwesomeIcon icon={faBars} onClick={showSidebar} />
              </i>
            </li>
          </ul>
        </div>
      </nav>
      <SideBar
        sidebar={sidebar}
        showSidebar={showSidebar}
        setAuth={setAuth}
        auth={auth}
      />
    </div>
  );
}

NavBar.propTypes = {
  auth: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number,
    username: PropTypes.string,
  }).isRequired,
  setAuth: PropTypes.func.isRequired,
};

export default NavBar;
