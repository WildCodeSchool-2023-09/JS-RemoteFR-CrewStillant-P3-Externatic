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
    path: "/monespace/messages",
    icon: <AiIcons.AiOutlineMessage />,
    cName: "nav-text",
  },
  {
    title: "Mes offres",
    path: "/monespace/activites",
    icon: <MdIcons.MdOutlineWorkOutline />,
    cName: "nav-text",
  },
  {
    title: "Mon Profil",
    path: "/monespace/profil",
    icon: <PiIcons.PiStudentLight />,
    cName: "nav-text",
  },
  {
    title: "Recrutement interne",
    path: "https://www.welcometothejungle.com/fr/companies/externatic",
    icon: <PiIcons.PiShareNetwork />,
    cName: "nav-text",
  },
];

export default sidebarData;
