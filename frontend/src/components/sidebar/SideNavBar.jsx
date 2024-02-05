import PropTypes from "prop-types";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import sidebarData from "./sideBarData";
import styles from "./sideBar.module.scss";

function SideBar({ sidebar, showSidebar, setAuth, auth }) {
  const navigate = useNavigate();

  if (!auth.token) {
    navigate("/accueil");
  }

  const handleSignOut = () => {
    setAuth("");
    navigate("/accueil");
    toast.success("Déconnexion réussie. A bientôt !");
  };

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
          <li>
            <Link
              to="/accueil"
              onClick={handleSignOut}
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
  sidebarData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    cName: PropTypes.string,
  }).isRequired,
  showSidebar: PropTypes.func.isRequired,
  sidebar: PropTypes.bool.isRequired,
  setAuth: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    token: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
  }).isRequired,
};
export default SideBar;
