import { Outlet, useOutletContext } from "react-router-dom";
import SideSection from "../../components/SideSection";
import style from "../../assets/styles/candidatePage.module.scss";

export default function ProfilPage() {
  const { auth, user, type } = useOutletContext();

  return (
    <div>
      <div className={`${style.banner}`}>
        <h1 className={`${style.h1}`}>Mon espace</h1>
      </div>

      <div className={`${style.userpage}`}>
        <SideSection auth={auth} />
        <Outlet
          context={{
            auth,
            user,
            type,
          }}
        />
      </div>
    </div>
  );
}
