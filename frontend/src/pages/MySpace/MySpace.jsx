import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import SideSection from "../../components/SideSection";
import style from "../../assets/styles/candidatePage.module.scss";

export default function MySpace() {
  const { auth, setAuth, user, type, setType } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.token) {
      navigate("/");
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
