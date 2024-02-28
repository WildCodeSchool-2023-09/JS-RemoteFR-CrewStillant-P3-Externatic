/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import style from "../../inscriptionCandidat.module.scss";

function UpdateExperience({
  experiences,
  setShowUpdateExperience,
  experienceUser,
  setExperienceUser,
  auth,
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

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  };

  const onSubmit = async (data) => {
    try {
      const experienceResponse = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/experience/`,

        {
          jobTitle: data.jobTitle || experiences.jobTitle,
          companyName: data.companyName || experiences.companyName,
          description: data.description || experiences.description,
          startDate: data.startDate || formatDateString(experiences.startDate),
          endDate: data.endDate || formatDateString(experiences.endDate),
          city: data.city || experiences.city,
          country: data.country || experiences.country,
          id: experiences.id,
        },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );

      if (experienceResponse.status === 200) setShowUpdateExperience(false);
      setExperienceUser({ ...experienceUser, data });
      toast.success("Votre Expérience a bien été modifiée.");
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
            <h1> Modifier votre Expérience </h1>
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
            onClick={() => setShowUpdateExperience(false)}
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

UpdateExperience.propTypes = {
  experiences: PropTypes.shape({
    id: PropTypes.number,
    jobTitle: PropTypes.string,
    companyName: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
  }).isRequired,
  setShowUpdateExperience: PropTypes.func.isRequired,
  experienceUser: PropTypes.shape({
    data: PropTypes.shape({
      jobTitle: PropTypes.string,
      companyName: PropTypes.string,
      description: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      city: PropTypes.string,
      country: PropTypes.string,
    }),
  }).isRequired,
  setExperienceUser: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpdateExperience;
