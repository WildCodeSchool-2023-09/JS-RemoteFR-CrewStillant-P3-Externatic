/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import { React } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import style from "../inscriptionEntreprise.module.scss";

function ModifyJob({ auth, type, getJob, job, setJob, setShowModifyJob }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const locationId = 1;
    try {
      const ModifyResponse = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/job/`,
        {
          title: data.title || getJob.title,
          type: data.type || getJob.type,
          description: data.description || getJob.description,
          hoursWorked: data.hoursWorked || getJob.hoursWorked,
          isActive: getJob.isActive,
          salary: data.salary || getJob.salary,
          place: data.place || getJob.place,
          sector: data.sector || getJob.sector,
          locationId,
          companyId: type.id,
          id: getJob.id,
        },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      if (ModifyResponse.status === 200) setShowModifyJob(false);
      setJob({ ...job, data });
      toast.success("Votre offre a bien été modifiée.");
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className={`${style.signUpCompany}`}>
        <div className={`${style.signDiv}`}>
          <div>
            <h1>Modifier votre offre d'emploi</h1>
            <p className={`${style.p}`}>Poste:</p>
            <input
              className={`${style.input}`}
              type="text"
              placeholder="Nom du poste"
              autoComplete="true"
              {...register("title", {
                minLength: { value: 2, message: "Au moins 2 caractères" },
              })}
            />
            {errors.title && (
              <span className="text-red-500">{errors.title?.message}</span>
            )}

            <p className={`${style.p}`}>Secteur:</p>
            <input
              className={`${style.input}`}
              type="text"
              placeholder="Secteur d'activité"
              autoComplete="true"
              {...register("sector", {
                minLength: { value: 2, message: "Au moins 2 caractères" },
              })}
            />
            {errors.sector && (
              <span className="text-red-500">{errors.sector?.message}</span>
            )}

            <p className={`${style.p}`}>type de contrat:</p>
            <select
              name="Degree"
              className={`${style.input}`}
              {...register("type")}
            >
              <option value="">Sélectionnez le type de contrat</option>
              <option value="Contrat à durée indéterminée">
                Contrat à durée indéterminée
              </option>
              <option value="Contrat à durée déterminée">
                Contrat à durée déterminée
              </option>
              <option value="Stage">Stage</option>
              <option value="Alternance">Alternance</option>
            </select>
            {errors.type && (
              <span className="text-red-500">{errors.type?.message}</span>
            )}

            <p className={`${style.p}`}>Heure travaillé :</p>
            <div className={`${style.password}`}>
              <input
                className={`${style.input}`}
                name="password"
                autoComplete="true"
                {...register("hoursWorked")}
              />
              {errors.hoursWorked && (
                <span className="text-red-500">
                  {errors.hoursWorked?.message}
                </span>
              )}
            </div>

            <p className={`${style.p}`}>salaire :</p>
            <input
              className={`${style.input}`}
              type="text"
              autoComplete="true"
              {...register("salary")}
            />
            {errors.salary && (
              <span className="text-red-500">{errors.salary?.message}</span>
            )}

            <p className={`${style.p}`}>Type de travail :</p>
            <select
              name="Degree"
              className={`${style.input}`}
              {...register("place", {})}
            >
              <option value="">Sélectionnez le type de travail</option>
              <option value="Sur site">Sur site</option>
              <option value="Hybride">Hybride</option>
              <option value="A distance">A distance</option>
            </select>
            {errors.website && (
              <span className="text-red-500">{errors.website?.message}</span>
            )}

            <p className={`${style.p}`}>Description:</p>
            <textarea
              className={`${style.inputArea}`}
              type="text"
              placeholder="Entrez la description du poste"
              {...register("description", {
                minLength: {
                  value: 10,
                  message: "Au moins 100 caractères",
                },
              })}
            />
            {errors.description && (
              <span className="text-red-500">
                {errors.description?.message}
              </span>
            )}
          </div>
        </div>
        <div className={`${style.divButton}`}>
          <button className={`${style.companyButton}`} type="submit">
            Soumettre
          </button>
          <button
            className={`${style.companyButton}`}
            type="button"
            onClick={() => setShowModifyJob(false)}
          >
            annuler
          </button>
        </div>
      </section>
    </form>
  );
}

ModifyJob.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  getJob: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    hoursWorked: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    salary: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
    sector: PropTypes.string.isRequired,
  }).isRequired,
  job: PropTypes.shape({
    data: PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      hoursWorked: PropTypes.string.isRequired,
      salary: PropTypes.string.isRequired,
      place: PropTypes.string.isRequired,
      sector: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  setJob: PropTypes.func.isRequired,
  setShowModifyJob: PropTypes.func.isRequired,
};

export default ModifyJob;
