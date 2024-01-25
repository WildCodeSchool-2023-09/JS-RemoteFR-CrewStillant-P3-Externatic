/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import { React, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";

import "./inscriptionCandidat.scss";

export default function InscriptionCandidat() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [file, setFile] = useState([]);
  const [cv, setCv] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    console.info("data", data);
    console.info("avatar", file);
    console.info("cv", cv);
    try {
      const type = 1;
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        { ...data, file, type },
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const { insertId } = response.data;

      const responseTwo = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/candidate`,
        { ...data, cv, insertId },
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201 && responseTwo.status === 201) {
        toast.success(response.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setFile(e.target.files);
  };
  const handleUploadCV = (e) => {
    e.preventDefault();
    setCv(e.target.files);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Boolean(file.length) && (
        <img
          className="avatar"
          src={URL.createObjectURL(file[0])}
          alt="avatar"
        />
      )}
      <p>Téléchargez votre photo de profil (500ko max, format .jpeg/.png)</p>
      <input
        required
        name="file"
        type="file"
        onChange={handleUpload}
        accept="image/jpeg, image/png"
      />
      {Boolean(cv.length) && (
        <a
          className="curriculumVitae"
          href={URL.createObjectURL(cv[0])}
          target="_blank"
          rel="noopener noreferrer"
          alt="cv"
        >
          C.V.
        </a>
      )}
      <p>Téléchargez votre CV (500ko max, format .pdf/.docx/.odt)</p>
      <input
        required
        name="cv"
        type="file"
        onChange={handleUploadCV}
        accept="file/pdf, file/odt, file/docx"
      />
      <section className="signupCandidate">
        <div className="formGrid">
          <p>Nom:</p>
          <input
            type="text"
            placeholder="Doe"
            {...register("lastname", {
              minLength: { value: 3, message: "Ce champ est obligatoire" },
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="formGrid">
          <p>Prénom:</p>
          <input
            type="text"
            placeholder="John"
            {...register("firstname", {
              minLength: { value: 3, message: "Ce champ est obligatoire" },
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="formGrid">
          <p>E-mail:</p>
          <input
            type="email"
            placeholder="johndoe@gmail.com"
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[.][a-z]+$/i,
                message: "Champ email invalide",
              },
              required: "Ce champ est obligatoire",
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="formGrid">
          <p>Password:</p>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
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
            <span className="text-red-500">{errors.password.message}</span>
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
            autoComplete
            {...register("confirmPassword", {
              required: "Vous devez confirmer votre mot de passe",
              validate: (value) =>
                value === useWatch("password") ||
                "Mots de passe non identiques",
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
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
          {errors.name && (
            <span className="text-red-500">{errors.dateOfBirth.message}</span>
          )}
        </div>

        <div className="formGrid">
          <p>Numéro de téléphone :</p>
          <input
            type="text"
            placeholder="0123456789"
            {...register("contactNumber", {
              minLength: { value: 10, message: "Format invalide" },
              required: "Ce champ est obligatoire",
            })}
          />
          {errors.contact_number && (
            <span className="text-red-500">
              {errors.contact_number.message}
            </span>
          )}
        </div>

        <div className="formGrid">
          <p>Ville :</p>
          <input
            type="text"
            placeholder="Ville"
            {...register("city", {
              minLength: {
                value: 1,
                message: "Ce champ ne peut être vide",
              },
              required: "Ce champ est obligatoire",
            })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </div>

        <div className="formGrid">
          <p>Pays :</p>
          <input
            type="text"
            placeholder="Pays"
            {...register("country", {
              pattern: {
                value: /France/gi,
                message: "Vous devez impérativement être localiser en France",
              },
              required: "Ce champ est obligatoire",
            })}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
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
