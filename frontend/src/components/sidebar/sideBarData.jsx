import * as CiIcons from "react-icons/ci";
import * as PiIcons from "react-icons/pi";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";

const sidebarData = [
  {
    title: "Home",
    path: "/accueil",
    icon: <CiIcons.CiHome />,
    cName: "nav-text",
  },
  {
    title: "Espace messagerie",
    path: "/accueil",
    icon: <AiIcons.AiOutlineMessage />,
    cName: "nav-text",
  },
  {
    title: "Mes offres",
    path: "/accueil",
    icon: <MdIcons.MdOutlineWorkOutline />,
    cName: "nav-text",
  },
  {
    title: "Candidat",
    path: "/candidat/profil/15",
    icon: <PiIcons.PiStudentLight />,
    cName: "nav-text",
  },
];

export default sidebarData;
