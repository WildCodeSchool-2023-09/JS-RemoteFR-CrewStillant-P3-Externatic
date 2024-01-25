/* eslint-disable react/jsx-props-no-spreading */

import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";

function CompanyInscription() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    console.info(data);
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
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="grid">
        <section className="signupEnterprise">
          <div>
            <p>Nom:</p>
            <input
              type="text"
              placeholder="Toto Corp."
              {...register("name", {
                minLength: { value: 3, message: "Ce champ est obligatoire" },
              })}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div>
            <p>E-mail:</p>
            <input
              type="email"
              placeholder="toto@gmail.com"
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

          <div>
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
          </div>

          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "😀" : "😎"}
          </button>

          <div>
            <p>Website:</p>
            <input
              type="text"
              placeholder="www.toto.com"
              {...register("website", {
                minLength: { value: 10, message: "Ce champ est obligatoire" },
              })}
            />
            {errors.website && (
              <span className="text-red-500">{errors.website.message}</span>
            )}
          </div>

          <div>
            <p>Phone Number:</p>
            <input
              type="text"
              placeholder="0123456789"
              {...register("contactNumber", {
                minLength: { value: 10, message: "Ce champ est obligatoire" },
              })}
            />
            {errors.contact_number && (
              <span className="text-red-500">
                {errors.contact_number.message}
              </span>
            )}
          </div>

          <div>
            <p>Ville:</p>
            <input
              type="text"
              placeholder="New York"
              {...register("city", {
                minLength: { value: 3, message: "Ce champ est obligatoire" },
              })}
            />
            {errors.city && (
              <span className="text-red-500">{errors.city.message}</span>
            )}
          </div>

          <div>
            <p>Pays:</p>
            <input
              type="text"
              placeholder="Trouver une offre"
              {...register("country", {
                minLength: { value: 3, message: "Ce champ est obligatoire" },
              })}
            />
            {errors.country && (
              <span className="text-red-500">{errors.country.message}</span>
            )}
          </div>

          <div>
            <p>N° SIRET:</p>
            <input
              type="text"
              placeholder="Trouver une offre"
              {...register("siret", {
                minLength: { value: 14, message: "Ce champ est obligatoire" },
              })}
            />
            {errors.siret && (
              <span className="text-red-500">{errors.siret.message}</span>
            )}
          </div>

          <div className="formGrid">
            <p>Date de Création:</p>
            <input
              type="date"
              {...register("establishmentDate", {
                required: "Ce champs est obligatoire",
                pattern: {
                  value:
                    /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/,
                  message:
                    "Vous devez renseigner une date dans le bon format, ex: AAAA/MM/JJ",
                },
              })}
            />
            {errors.establishment_date && (
              <span className="text-red-500">
                {errors.establishment_date.message}
              </span>
            )}
          </div>

          <div>
            <p>Secteur:</p>
            <input
              type="text"
              placeholder="Trouver une offre"
              {...register("sector", {
                minLength: { value: 3, message: "Ce champ est obligatoire" },
              })}
            />
            {errors.company_sector_id && (
              <span className="text-red-500">
                {errors.company_sector_id.message}
              </span>
            )}
          </div>

          <div>
            <p>Description:</p>
            <textarea
              type="text"
              placeholder="Trouver une offre"
              {...register("description", {
                minLength: { value: 150, message: "Ce champ est obligatoire" },
              })}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>

          <label
            htmlFor="smsNotification"
            id="smsNotification"
            className="smsNotification"
          >
            SMS Notification
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
            E-mail Notification
          </label>
          <input
            type="checkbox"
            id="emailNotification"
            className="emailNotification"
            {...register("emailNotificationActive")}
          />
        </section>

        <div className="confirmButtonEnterprise">
          <button type="submit">Confirmer Inscription</button>
        </div>
      </section>
    </form>
  );
}

export default CompanyInscription;
