import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import SideSection from "../../components/SideSection";
import style from "../../assets/styles/candidatePage.module.scss";

export default function MySpace() {
  const { auth, setAuth, user, type, setType } = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.token) {
      navigate("/accueil");
    }
  }, []);

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
            setAuth,
            user,
            type,
            setType,
          }}
        />
      </div>
    </div>
  );
}
