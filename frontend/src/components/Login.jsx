/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import style from "../assets/styles/login.module.scss";

function Login() {
  const { auth, setAuth } = useOutletContext();
  const navigate = useNavigate();
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
          console.info(auth);
        });
      if (auth.userTypeId === 1) {
        navigate(`/candidat/profil}`);
      } else if (auth.userTypeId === 2) {
        navigate(`/entreprise/profil`);
      } else if (auth.userTypeId === 3) {
        navigate(`/admin/profil`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <div className={`${style.profilesection} ${style.banner}`}>
      <div>
        <h3 className={`${style.h3}`}>Bienvenue sur Externatic</h3>

        <p>Connecte toi</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="email"
              placeholder="Adresse mail"
              {...register("email", { required: "Le mail est obligatoire" })}
            />
            {errors.email && <p role="alert">{errors.email?.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              {...register("password", {
                required: "Le mot de passe est obligatoire",
              })}
            />
            {errors.password && <p role="alert">{errors.password?.message}</p>}
          </div>

          <div>
            <button type="submit" className={`${style.buttonspace}`}>
              Connexion
            </button>
          </div>
        </form>
      </div>

      <div>
        <span>Tu n'as pas de compte? Inscris toi.</span>

        <button
          type="button"
          onClick={() => navigate("/inscription")}
          className={`${style.buttonspace}`}
        >
          Inscription
        </button>
      </div>
    </div>
  );
}

export default Login;
