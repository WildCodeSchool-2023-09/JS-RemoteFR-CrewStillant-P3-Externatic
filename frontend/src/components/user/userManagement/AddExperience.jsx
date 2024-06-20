/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import style from "../../inscriptionCandidat.module.scss";

function AddExperience({
  setShowAddExperience,
  experienceUser,
  setExperienceUser,
  type,
}) {
  const [working, setWorking] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEndDate = () => {
    setWorking(!working);
  };

  const onSubmit = async (data) => {
    try {
      const experienceResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/experience/`,
        {
          jobTitle: data.jobTitle,
          companyName: data.companyName,
          description: data.description,
          startDate: data.startDate,
          endDate: data.endDate ? data.endDate : null,
          city: data.city,
          country: data.country,
          candidateId: type.id,
        }
      );

      if (experienceResponse.status === 201) setShowAddExperience(false);
      setExperienceUser({ ...experienceUser, data });
      toast.success("Votre Expérience a bien été prise en compte.");
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${style.fieldSet}`}>
      <section className={`${style.signupCandidate}`}>
        <div className={`${style.signDiv}`}>
          <div>
            <h1> Ajouter votre Expérience </h1>
            <p className={`${style.p}`}>Votre poste:</p>
            <input
              className={`${style.input}`}
              type="text"
              placeholder="Développeur frontend"
              autoComplete="true"
              {...register("jobTitle")}
            />
            {errors.jobTitle && (
              <span className="text-red-500">{errors.jobTitle?.message}</span>
            )}

            <p className={`${style.p}`}>Entreprise:</p>
            <input
              className={`${style.input}`}
              type="text"
              placeholder="Google"
              autoComplete="true"
              {...register("companyName")}
            />
            {errors.companyName && (
              <span className="text-red-500">
                {errors.companyName?.message}
              </span>
            )}

            <p className={`${style.p}`}>Description :</p>
            <textarea
              className={`${style.inputArea}`}
              placeholder="Décrivez votre poste"
              autoComplete="true"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-red-500">
                {errors.description?.message}
              </span>
            )}
          </div>

          <div>
            <p className={`${style.p}`}>Date de début:</p>
            <input
              className={`${style.input}`}
              type="date"
              {...register("startDate", {
                pattern: {
                  value:
                    /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/,
                  message:
                    "Vous devez renseigner une date dans le bon format, ex: AAAA/MM/JJ",
                },
              })}
            />
            {errors.startDate && (
              <span className="text-red-500">{errors.startDate?.message}</span>
            )}

            <p className={`${style.p}`}>Date de fin:</p>
            <input
              disabled={working}
              className={`${style.input}`}
              type="date"
              {...register("endDate", {
                pattern: {
                  value:
                    /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/,
                  message:
                    "Vous devez renseigner une date dans le bon format, ex: AAAA/MM/JJ",
                },
              })}
            />
            <div className={`${style.checkWork}`}>
              <label>
                J'occupe toujours ce poste
                <input type="checkbox" onChange={handleEndDate} />
              </label>
            </div>
            {errors.endDate && (
              <span className="text-red-500">{errors.endDate?.message}</span>
            )}

            <p className={`${style.p}`}>Ville :</p>
            <input
              className={`${style.input}`}
              type="text"
              placeholder="Ville"
              autoComplete="true"
              {...register("city")}
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
              {...register("country")}
            />
            {errors.country && (
              <span className="text-red-500">{errors.country?.message}</span>
            )}
          </div>
        </div>
      </section>

      <section className={`${style.notification}`}>
        <div className={`${style.divButton}`}>
          <button
            type="button"
            className={`${style.CandidateButton}`}
            onClick={() => setShowAddExperience(false)}
          >
            Annuler
          </button>
          <button className={`${style.CandidateButton}`} type="submit">
            Vailder
          </button>
        </div>
      </section>
    </form>
  );
}

AddExperience.propTypes = {
  setShowAddExperience: PropTypes.func.isRequired,
  experienceUser: PropTypes.shape({
    data: PropTypes.shape({
      jobTitle: PropTypes.string.isRequired,
      companyName: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }),
  }).isRequired,
  setExperienceUser: PropTypes.func.isRequired,
  type: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default AddExperience;
