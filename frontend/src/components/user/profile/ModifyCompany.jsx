/* eslint-disable react/jsx-props-no-spreading */
import { React } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import style from "../../inscriptionCandidat.module.scss";

function ModifyCompany({ type, setType, auth }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      return null;
    }
    return date.toISOString().slice(0, 10);
  };

  const onSubmit = async (data) => {
    try {
      const candidateResponse = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/company/`,
        {
          name: data.name || type.name,
          image: type.image,
          description: data.description || type.description,
          website: data.website || type.website,
          establishmentDate:
            data.establishmentDate || formatDateString(type.establishmentDate),
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
              placeholder="Entreprise"
              autoComplete="true"
              {...register("name", {
                minLength: {
                  value: 2,
                  message: "Au moins 2 caractères",
                },
              })}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name?.message}</span>
            )}

            <p className={`${style.p}`}>Description:</p>
            <textarea
              className={`${style.input}`}
              type="text"
              placeholder="Entrez une description"
              {...register("description", {
                minLength: { value: 100, message: "Au moins 100 caractères" },
              })}
            />
            {errors.description && (
              <span className="text-red-500">
                {errors.description?.message}
              </span>
            )}

            <p className={`${style.p}`}>Site web :</p>
            <input
              className={`${style.input}`}
              type="text"
              placeholder="www.entreprise.com"
              autoComplete="true"
              {...register("website", {
                pattern: {
                  minLength: { value: 5, message: "Au moins 5 caractères" },
                },
              })}
            />
            {errors.country && (
              <span className="text-red-500">{errors.country?.message}</span>
            )}

            <p className={`${style.p}`}>Date de Création:</p>
            <input
              className={`${style.input}`}
              type="date"
              {...register("establishmentDate", {
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
        </div>
      </section>

      <button className={`${style.CandidateButton}`} type="submit">
        Modifier votre profil
      </button>
    </form>
  );
}

ModifyCompany.propTypes = {
  type: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    establishmentDate: PropTypes.string.isRequired,
  }).isRequired,
  setType: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
};

export default ModifyCompany;
