/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./inscriptionEntreprise.module.scss";

export default function InscriptionEntreprise() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwordRef = useRef({});
  const [showPassword, setShowPassword] = useState(false);
  passwordRef.current = watch("password", "");

  const onSubmit = async (data) => {
    try {
      const type = 2;
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        { ...data, type }
      );

      const responseTwo = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/sector`,
        { ...data }
      );

      const { insertId } = response.data;
      const { insertId: insertId2 } = responseTwo.data;

      const responseThree = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/company`,
        { ...data, insertId, insertId2 }
      );

      if (
        response.status === 201 &&
        responseTwo.status === 201 &&
        responseThree.status === 201
      ) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/connexion");
        }, 2000);
      }
    } catch (e) {
      console.error(e);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className={`${style.grid}`}>
        <section className={`${style.signupCompany}`}>
          <div className={`${style.formGrid}`}>
            <p>Nom:</p>
            <input
              type="text"
              placeholder="Toto SARL"
              autoComplete="true"
              {...register("name", {
                minLength: { value: 2, message: "Au moins 2 caractères" },
                required: "Ce champ est obligatoire",
              })}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name?.message}</span>
            )}
          </div>

          <div className={`${style.formGrid}`}>
            <p>E-mail:</p>
            <input
              type="email"
              placeholder="toto@gmail.com"
              autoComplete="true"
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[.][a-z]+$/i,
                  message: "E-mail invalide",
                },
                required: "Ce champ est obligatoire",
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email?.message}</span>
            )}
          </div>

          <div className={`${style.formGridPassword}`}>
            <p>Mot de passe :</p>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="true"
              {...register("password", {
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message:
                    "Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
                },
                required: "Ce champ est obligatoire",
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password?.message}</span>
            )}
            <button
              type="button"
              className={`${style.showButton}`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "😀" : "😎"}
            </button>
          </div>

          <div className={`${style.formGridPassword}`}>
            <p>Confirmez mot de passe :</p>
            <input
              type="password"
              name="confirmPassword"
              autoComplete="true"
              {...register("confirmPassword", {
                required: "Vous devez confirmer votre mot de passe",
                validate: (value) =>
                  value === passwordRef.current ||
                  "Les mots de passe ne correspondent pas",
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword?.message}
              </span>
            )}
            <button
              type="button"
              className={`${style.showButton}`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "😀" : "😎"}
            </button>
          </div>

          <div className={`${style.formGrid}`}>
            <p>Site internet :</p>
            <input
              type="text"
              placeholder="www.toto.com"
              {...register("website", {
                minLength: { value: 5, message: "Au moins 5 caractères" },
                required: "Ce champ est obligatoire",
              })}
            />
            {errors.website && (
              <span className="text-red-500">{errors.website?.message}</span>
            )}
          </div>

          <div className={`${style.formGrid}`}>
            <p>Numéro de téléphone :</p>
            <input
              type="text"
              placeholder="0123456789"
              autoComplete="true"
              {...register("contactNumber", {
                minLength: { value: 10, message: "Format invalide" },
                required: "Ce champ est obligatoire",
              })}
            />
            {errors.contactNumber && (
              <span className="text-red-500">
                {errors.contactNumber?.message}
              </span>
            )}
          </div>

          <div className={`${style.formGrid}`}>
            <p>Ville :</p>
            <input
              type="text"
              placeholder="Ville"
              autoComplete="true"
              {...register("city", {
                minLength: {
                  value: 1,
                  message: "Ce champ ne peut être vide",
                },
                required: "Ce champ est obligatoire",
              })}
            />
            {errors.city && (
              <span className="text-red-500">{errors.city?.message}</span>
            )}
          </div>

          <div className={`${style.formGrid}`}>
            <p>Pays :</p>
            <input
              type="text"
              placeholder="Pays"
              autoComplete="true"
              {...register("country", {
                pattern: {
                  value: /France/gi,
                  message: "Vous devez impérativement être localiser en France",
                },
                required: "Ce champ est obligatoire",
              })}
            />
            {errors.country && (
              <span className="text-red-500">{errors.country?.message}</span>
            )}
          </div>

          <div className={`${style.formGrid}`}>
            <p>N° SIRET :</p>
            <input
              type="text"
              placeholder="N° SIRET"
              {...register("siret", {
                pattern: {
                  value: /[0-9]{14}/,
                  message: "Veuillez rentrer un numéro SIRET en 14 chiffres",
                },
              })}
            />
            {errors.siret && (
              <span className="text-red-500">{errors.siret?.message}</span>
            )}
          </div>

          <div className={`${style.formGrid}`}>
            <p>Date de Création:</p>
            <input
              type="date"
              {...register("establishmentDate", {
                required: "Ce champs est obligatoire",
                pattern: {
                  value:
                    /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/,
                  message:
                    "Veuillez renseigner une date au bon format, ex: AAAA/MM/JJ",
                },
              })}
            />
            {errors.establishmentDate && (
              <span className="text-red-500">
                {errors.establishmentDate?.message}
              </span>
            )}
          </div>

          <div className={`${style.formGrid}`}>
            <p>Secteur d'activité :</p>
            <input
              type="text"
              placeholder="Secteur"
              {...register("sector", {
                minLength: { value: 3, message: "Au moins 3 caractères" },
                required: "Ce champs est obligatoire",
              })}
            />
            {errors.sector && (
              <span className="text-red-500">{errors.sector?.message}</span>
            )}
          </div>

          <div className={`${style.formGrid}`}>
            <p>Description:</p>
            <textarea
              type="text"
              placeholder="Entrez une description"
              {...register("description", {
                minLength: { value: 100, message: "Au moins 100 caractères" },
                required: "Ce champs est obligatoire",
              })}
            />
            {errors.description && (
              <span className="text-red-500">
                {errors.description?.message}
              </span>
            )}
          </div>

          <section className={`${style.notification}`}>
            <label
              htmlFor="smsNotification"
              id="smsNotification"
              className={`${style.smsNotification}`}
            >
              SMS Notification
            </label>
            <input
              type="checkbox"
              id="smsNotification"
              className={`${style.smsNotification}`}
              {...register("smsNotificationActive")}
            />

            <label
              htmlFor="emailNotification"
              id="emailNotification"
              className={`${style.emailNotification}`}
            >
              E-mail Notification
            </label>
            <input
              type="checkbox"
              id="emailNotification"
              className={`${style.emailNotification}`}
              {...register("emailNotificationActive")}
            />
          </section>

          <div className={`${style.confirmButtonCompany}`}>
            <button type="submit">
              Confirmer
              <br /> Inscription
            </button>
          </div>
        </section>
      </section>
    </form>
  );
}
