/* eslint-disable react/jsx-props-no-spreading */
import { React } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import style from "../../inscriptionCandidat.module.scss";

function ModifyCandidate({ type, setType, auth }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  };

  const onSubmit = async (data) => {
    try {
      const candidateResponse = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/candidate`,
        {
          lastname: data.lastname || type.lastname,
          firstname: data.firstname || type.firstname,
          dateOfBirth: data.dateOfBirth || formatDateString(type.dateOfBirth),
          wantedSalary: data.wantedSalary || type.wantedSalary,
          city: data.city || type.city,
          country: data.country || type.country,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (candidateResponse.status === 200) {
        toast.success("Votre profil a bien été modifié.");
        setType(data);
      }
    } catch (e) {
      console.error(e);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className={`${style.signupCandidate}`}>
        <div className={`${style.signDiv}`}>
          <div>
            <p className={`${style.p}`}>Nom:</p>
            <input
              className={`${style.input}`}
              type="text"
              placeholder="Doe"
              autoComplete="true"
              {...register("lastname", {
                minLength: {
                  value: 3,
                },
              })}
            />
            {errors.lastname && (
              <span className="text-red-500">{errors.lastname?.message}</span>
            )}

            <p className={`${style.p}`}>Prénom:</p>
            <input
              className={`${style.input}`}
              type="text"
              placeholder="John"
              autoComplete="true"
              {...register("firstname", {
                minLength: {
                  value: 3,
                },
              })}
            />
            {errors.firstname && (
              <span className="text-red-500">{errors.firstname?.message}</span>
            )}

            <p className={`${style.p}`}>Date de Naissance:</p>
            <input
              className={`${style.input}`}
              type="date"
              {...register("dateOfBirth", {
                pattern: {
                  value:
                    /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/,
                  message:
                    "Vous devez renseigner une date dans le bon format, ex: AAAA/MM/JJ",
                },
              })}
            />
            {errors.dateOfBirth && (
              <span className="text-red-500">
                {errors.dateOfBirth?.message}
              </span>
            )}
            <p className={`${style.p}`}>Salaire annuel souhaité :</p>
            <input
              className={`${style.input}`}
              type="number"
              min="0"
              placeholder="50000"
              autoComplete="true"
              {...register("wantedSalary", {
                minLength: {
                  value: 1,
                  message: "Vous devez rentrer une valeur",
                },
              })}
            />
            {errors.salary && (
              <span className="text-red-500">{errors.salary?.message}</span>
            )}

            <p className={`${style.p}`}>Ville :</p>
            <input
              className={`${style.input}`}
              type="text"
              placeholder="Ville"
              autoComplete="true"
              {...register("city", {
                minLength: {
                  value: 1,
                  message: "Ce champ ne peut être vide",
                },
              })}
            />
            {errors.city && (
              <span className="text-red-500">{errors.city?.message}</span>
            )}
            <p className={`${style.p}`}>Pays :</p>
            <input
              className={`${style.input}`}
              type="text"
              placeholder="Pays"
              autoComplete="true"
              {...register("country", {
                pattern: {
                  value: /France/gi,
                  message: "Vous devez impérativement être localiser en France",
                },
              })}
            />
            {errors.country && (
              <span className="text-red-500">{errors.country?.message}</span>
            )}
          </div>
        </div>
      </section>

      <button className={`${style.CandidateButton}`} type="submit">
        Modifier votre profil
      </button>
    </form>
  );
}

ModifyCandidate.propTypes = {
  type: PropTypes.shape({
    lastname: PropTypes.string,
    firstname: PropTypes.string,
    dateOfBirth: PropTypes.string,
    wantedSalary: PropTypes.number,
    city: PropTypes.string,
    country: PropTypes.string,
  }).isRequired,
  auth: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
  setType: PropTypes.func.isRequired,
};

export default ModifyCandidate;
