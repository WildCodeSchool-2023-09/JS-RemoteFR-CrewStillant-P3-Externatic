/* eslint-disable react/jsx-props-no-spreading */

import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function CandidateInscription() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.info(data);
    try {
      const type = 2;
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        { ...data, type }
      );

      if (response.status === 201) {
        toast.success(response.data.message);
      }
    } catch (e) {
      console.error(e);
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
        </div>

        <div className="formGrid">
          <p>Ville:</p>
          <input
            type="text"
            placeholder="Detroit"
            {...register("city", {
              minLength: { value: 3, message: "Ce champ est obligatoire" },
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="formGrid">
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
      </section>

      <section className="confirmButtonCandidate">
        <button type="button">
          Déposer
          <br /> C.V.
        </button>

        <button type="submit">
          Confirmer <br /> Inscription
        </button>
      </section>
    </form>
  );
}

export default CandidateInscription;
