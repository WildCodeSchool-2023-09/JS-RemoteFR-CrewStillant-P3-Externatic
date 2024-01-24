/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import style from "../assets/styles/login.module.scss";

function Login() {
  const { auth, setAuth } = useOutletContext();
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/login`, data)
        .then((res) => {
          setAuth(res.data);
          navigate(`/candidat/profil/${auth.id}`);
        });
    } catch (error) {
      setErr(error.response?.data?.message);
    }
  };
  return (
    <div className={`${style.profilesection} ${style.banner}`}>
      <div className={{}}>
        <h3 className={`${style.h3}`}>Bienvenu sur Externatic</h3>

        <p className={{}}>Connecte toi</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={{}}>
            <input
              className={{}}
              type="email"
              placeholder="Adresse mail"
              {...register("email", { required: "L'e-mail est obligatioire" })}
            />
            {errors.mail && (
              <p role="alert" className={{}}>
                {errors.mail?.message}
              </p>
            )}
          </div>

          <div className={{}}>
            <input
              className={{}}
              type="password"
              placeholder="Mot de passe"
              {...register("password", {
                required: "Le mot de passe est obligatoire",
              })}
            />
            {errors.password && (
              <p role="alert" className={{}}>
                {errors.password?.message}
              </p>
            )}
            {err ? (
              <p role="alert" className={{}}>
                {err}
              </p>
            ) : null}
          </div>

          <div className={{}}>
            <button type="submit" className={`${style.buttonspace}`}>
              Connexion
            </button>
          </div>
        </form>
      </div>

      <div className={{}}>
        <span className={{}}>Tu n'as pas de compte? Inscris toi.</span>

        <button
          type="button"
          onClick={() => navigate("/")}
          className={`${style.buttonspace}`}
        >
          Inscription
        </button>
      </div>
    </div>
  );
}

export default Login;
