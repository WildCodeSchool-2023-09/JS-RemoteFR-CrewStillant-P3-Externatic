import React, { useEffect } from "react";
import { Outlet, useOutletContext, useNavigate } from "react-router-dom";
import SideSection from "../../components/SideSection";
import style from "./admin.module.scss";

function Admin() {
  const { auth, setAuth, user, type, setType } = useOutletContext();
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
