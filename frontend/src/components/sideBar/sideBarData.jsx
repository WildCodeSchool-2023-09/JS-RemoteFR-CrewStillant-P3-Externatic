import * as CiIcons from "react-icons/ci";
import * as PiIcons from "react-icons/pi";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";

const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <CiIcons.CiHome />,
    cName: "nav-text",
  },
  {
    title: "Espace messagerie",
    path: "/",
    icon: <AiIcons.AiOutlineMessage />,
    cName: "nav-text",
  },
  {
    title: "Mes offres",
    path: "/",
    icon: <MdIcons.MdOutlineWorkOutline />,
    cName: "nav-text",
  },
  {
    title: "Candidat",
    path: "/candidat",
    icon: <PiIcons.PiStudentLight />,
    cName: "nav-text",
  },
  {
    title: "Se déconnecter",
    path: "/",
    icon: <RiIcons.RiLogoutCircleLine />,
    cName: "nav-text",
  },
];
export default SidebarData;
