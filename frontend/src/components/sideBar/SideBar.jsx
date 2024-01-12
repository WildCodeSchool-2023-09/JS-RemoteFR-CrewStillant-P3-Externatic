import PropTypes from "prop-types";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import SidebarData from "./sideBarData";
import styles from "./sideBar.module.scss";

function SideBar({ sidebar, showSidebar }) {
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
            <Link to="/" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item) => {
            return (
              <li key={item.title} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
SideBar.propTypes = {
  showSidebar: PropTypes.func.isRequired,
  sidebar: PropTypes.bool.isRequired,
};
export default SideBar;
