import PropTypes from "prop-types";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import sidebarData from "./sideBarData";
import styles from "./sideBar.module.scss";

function SideBar({ sidebar, showSidebar, setAuth, auth }) {
  return (
    <aside className={styles.aside}>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul
          className="nav-menu-items"
          onClick={showSidebar}
          onKeyDown={showSidebar}
          role="menu"
          tabIndex={0}
        >
          <li className="navbar-toggle">
            <button
              type="button"
              className={styles.button}
              aria-label="Close Sidebar"
            >
              <AiIcons.AiOutlineClose />
            </button>
          </li>
          {sidebarData.map((item) => (
            <li key={item.title} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
          {!auth ? (
            ""
          ) : (
            <li>
              <Link
                to="/accueil"
                onClick={() => setAuth("")}
                className={styles.disconnect}
              >
                Se déconnecter
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/accueil"
              onClick={() => setAuth("")}
              className={styles.disconnect}
            >
              Se déconnecter
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
SideBar.propTypes = {
  showSidebar: PropTypes.func.isRequired,
  sidebar: PropTypes.bool.isRequired,
  setAuth: PropTypes.func.isRequired,
  auth: PropTypes.string.isRequired,
};
export default SideBar;
