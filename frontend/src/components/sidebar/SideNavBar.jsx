import PropTypes from "prop-types";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import sidebarData from "./sideBarData";
import styles from "./sideBar.module.scss";

function SideBar({ bar, showSidebar, setAuth, auth }) {
  const navigate = useNavigate();

  if (!auth?.token) {
    navigate("/accueil");
  }

  const handleSignOut = () => {
    setAuth(null);
    navigate("/accueil");
    setTimeout(() => {
      toast.success("Déconnexion réussie, à bientôt !");
    }, 1000);
  };

  return (
    <aside className={styles.aside}>
      <nav className={bar ? "nav-menu active" : "nav-menu"}>
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
              <Link
                to={
                  auth.userTypeId === 2 && item.title === "Mes offres"
                    ? "/monespace/offres"
                    : item.path
                }
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}

          <li>
            <button
              type="button"
              onClick={handleSignOut}
              className={`${styles.disconnect}`}
            >
              {AiIcons.AiOutlineLogout()}
              <span>Se déconnecter</span>
            </button>
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
  bar: PropTypes.bool.isRequired,
  setAuth: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    token: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
    userTypeId: PropTypes.number.isRequired,
  }).isRequired,
  type: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
export default SideBar;
