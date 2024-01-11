import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import externaticLogo from "../../assets/images/EXTERNATIC-LOGO.png";
import externaticLogo2 from "../../assets/images/EXTERNATIC-LOGO2.png";
import styles from "./navBar.module.scss";

function NavBar() {
  return (
    <div className={`${styles.navBar}`}>
      <nav className="d-flex justify-content-space-between align-items-center ">
        <img src={externaticLogo} alt="logo" />
        <div className="d-flex justify-content-flex-end flex-fill">
          <ul className=" d-flex align-items-center mr-30">
            <li className="d-flex justify-content-space-center align-items-center">
              <a href="#connect">Se Connecter</a>
              <img src={externaticLogo2} alt="logo" />
            </li>
            <li>
              <i>
                <FontAwesomeIcon icon={faBars} />
              </i>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
