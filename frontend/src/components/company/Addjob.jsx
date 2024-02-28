/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import { React } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import style from "../inscriptionEntreprise.module.scss";

function Addjob({ auth, type, job, setJob, setShowAddJob }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const locationId = 1;

    try {
      const addResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/job/`,
        {
          title: data.title,
          type: data.type,
          description: data.description,
          hoursWorked: data.hoursWorked,
          isActive: 1,
          salary: data.salary,
          place: data.place,
          sector: data.sector,
          locationId,
          companyId: type.id,
        },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      if (addResponse.status === 201) setShowAddJob(false);
      setJob({ ...job, data });
      toast.success("Votre offre a bien été créée.");
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
            <h1>Ajouter votre offre d'emploi</h1>
            <p className={`${style.p}`}>Poste:</p>
            <input
              className={`${style.input}`}
              type="text"
              placeholder="Nom du poste"
              autoComplete="true"
              {...register("title", {
                minLength: { value: 2, message: "Au moins 2 caractères" },
                required: "Ce champ est obligatoire",
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
                required: "Ce champ est obligatoire",
              })}
            />
            {errors.sector && (
              <span className="text-red-500">{errors.sector?.message}</span>
            )}

            <p className={`${style.p}`}>type de contrat:</p>
            <select
              name="Degree"
              className={`${style.input}`}
              {...register("type", {
                required: "Ce champ est obligatoire",
              })}
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
                {...register("hoursWorked", {
                  required: "Ce champ est obligatoire",
                })}
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
              {...register("salary", {
                required: "Ce champ est obligatoire",
              })}
            />
            {errors.salary && (
              <span className="text-red-500">{errors.salary?.message}</span>
            )}

            <p className={`${style.p}`}>Type de travail :</p>
            <select
              name="Degree"
              className={`${style.input}`}
              {...register("place", {
                required: "Ce champ est obligatoire",
              })}
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
                required: "Ce champs est obligatoire",
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
            onClick={() => setShowAddJob(false)}
          >
            annuler
          </button>
        </div>
      </section>
    </form>
  );
}

Addjob.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.shape({
    id: PropTypes.number.isRequired,
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
  setShowAddJob: PropTypes.func.isRequired,
};

export default Addjob;
