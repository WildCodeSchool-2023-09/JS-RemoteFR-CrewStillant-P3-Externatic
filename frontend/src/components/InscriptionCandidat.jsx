/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import { React, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./inscriptionCandidat.module.scss";

export default function InscriptionCandidat() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwordRef = useRef({});
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  passwordRef.current = watch("password", "");

  const onSubmit = async (data) => {
    try {
      const type = 1;
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        { ...data, type }
      );

      const { insertId } = response.data;

      const responseTwo = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/candidate`,
        { ...data, insertId }
      );

      if (response.status === 201 && responseTwo.status === 201) {
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
      <section className="signupCandidate">
        <div className="formGrid">
          <p>Nom:</p>
          <input
            type="text"
            placeholder="Doe"
            autoComplete="true"
            {...register("lastname", {
              minLength: { value: 3, message: "Ce champ est obligatoire" },
            })}
          />
          {errors.lastname && (
            <span className="text-red-500">{errors.lastname?.message}</span>
          )}
        </div>

        <div className="formGrid">
          <p>Prénom:</p>
          <input
            type="text"
            placeholder="John"
            autoComplete="true"
            {...register("firstname", {
              minLength: { value: 3, message: "Ce champ est obligatoire" },
            })}
          />
          {errors.firstname && (
            <span className="text-red-500">{errors.firstname?.message}</span>
          )}
        </div>

        <div className="formGrid">
          <p>E-mail:</p>
          <input
            type="email"
            placeholder="johndoe@gmail.com"
            autoComplete="true"
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[.][a-z]+$/i,
                message: "Champ email invalide",
              },
              required: "Ce champ est obligatoire",
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email?.message}</span>
          )}
        </div>

        <div className="formGrid">
          <p>Password:</p>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="true"
            {...register("password", {
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/i,
                message: "Doit contenir au minimum 8 - 16 caractères",
              },
              required: "Ce champ est obligatoire",
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password?.message}</span>
          )}
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "😀" : "😎"}
          </button>
        </div>
        <div>
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
        </div>

        <div className="formGrid">
          <p>Date de Naissance:</p>
          <input
            type="date"
            {...register("dateOfBirth", {
              required: "Ce champs est obligatoire",
              pattern: {
                value:
                  /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/,
                message:
                  "Vous devez renseigner une date dans le bon format, ex: AAAA/MM/JJ",
              },
            })}
          />
          {errors.dateOfBirth && (
            <span className="text-red-500">{errors.dateOfBirth?.message}</span>
          )}
        </div>

        <div className="formGrid">
          <p>Salaire annuel souhaité :</p>
          <input
            type="number"
            placeholder="50000"
            autoComplete="true"
            {...register("salary", {
              minLength: { value: 1, message: "Vous devez rentrer une valeur" },
              required: "Ce champs est obligatoire",
            })}
          />
          {errors.salary && (
            <span className="text-red-500">{errors.salary?.message}</span>
          )}
        </div>

        <div className="formGrid">
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

        <div className="formGrid">
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

        <div className="formGrid">
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

        <label
          htmlFor="smsNotification"
          id="smsNotification"
          className="smsNotification"
        >
          Notifications SMS
        </label>
        <input
          type="checkbox"
          id="smsNotification"
          className="smsNotification"
          {...register("smsNotificationActive")}
        />

        <label
          htmlFor="emailNotification"
          id="emailNotification"
          className="emailNotification"
        >
          Notifications par e-mail
        </label>
        <input
          type="checkbox"
          id="emailNotification"
          className="emailNotification"
          {...register("emailNotificationActive")}
        />
      </section>

      <section className="confirmButtonCandidate">
        <button type="submit">S'inscrire</button>
      </section>
    </form>
  );
}
