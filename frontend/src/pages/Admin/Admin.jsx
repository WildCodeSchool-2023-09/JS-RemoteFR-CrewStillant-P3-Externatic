import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import SideSection from "../../components/SideSection";
import style from "./admin.module.scss";

function Admin() {
  const { auth, setAuth, user, type, setType } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.token) {
      navigate("/");
    }
  }, []);

  return (
    <div className={`${style.admin}`}>
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
  );
}

export default Admin;
