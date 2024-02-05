/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./createoffer.module.scss";

function CreateOffer() {
  const { type } = useOutletContext;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (type !== "entreprise") {
    navigate("/accueil");
  }

  const onSubmit = () => {};

  return (
    <form className={styles.createJobForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGroup}>
        <h1>Créer une Offre d'Emploi</h1>
        <p>Titre du poste:</p>
        <input
          type="text"
          name="jobTitle"
          {...register("title", {
            minLength: { value: 3, message: "Ce champ est obligatoire" },
          })}
        />
        <span className={styles.error}>
          {errors.jobTitle && errors.jobTitle.message}
        </span>
      </div>

      <div className={styles.formGroup}>
        <p>Description du poste:</p>
        <select
          defaultValue="none"
          name="jobType"
          {...register("jobType", { required: true })}
        >
          <option value="none">---</option>
          <option value="cdi">Contrat à durée indéterminée</option>
          <option value="cdd">Contrat à durée déterminée</option>
          <option value="alternance">Alternance</option>
          <option value="interim">Intérim</option>
        </select>
        <span className={styles.error}>
          {errors.jobDescription && errors.jobDescription.message}
        </span>
      </div>

      <div className={styles.formGroup}>
        <h1>Créer une Offre d'Emploi</h1>
        <p>Titre du poste:</p>
        <input
          type="text"
          name="jobTitle"
          {...register("title", {
            minLength: { value: 3, message: "Ce champ est obligatoire" },
          })}
        />
        <span className={styles.error}>
          {errors.jobTitle && errors.jobTitle.message}
        </span>
      </div>

      <div className={styles.formGroup}>
        <h1>Créer une Offre d'Emploi</h1>
        <p>Titre du poste:</p>
        <input
          type="text"
          name="jobTitle"
          {...register("title", {
            minLength: { value: 3, message: "Ce champ est obligatoire" },
          })}
        />
        <span className={styles.error}>
          {errors.jobTitle && errors.jobTitle.message}
        </span>
      </div>

      <div className={styles.formGroup}>
        <h1>Créer une Offre d'Emploi</h1>
        <p>Titre du poste:</p>
        <input
          type="text"
          name="jobTitle"
          {...register("title", {
            minLength: { value: 3, message: "Ce champ est obligatoire" },
          })}
        />
        <span className={styles.error}>
          {errors.jobTitle && errors.jobTitle.message}
        </span>
      </div>

      <div className={styles.formGroup}>
        <h1>Créer une Offre d'Emploi</h1>
        <p>Titre du poste:</p>
        <input
          type="text"
          name="jobTitle"
          {...register("title", {
            minLength: { value: 3, message: "Ce champ est obligatoire" },
          })}
        />
        <span className={styles.error}>
          {errors.jobTitle && errors.jobTitle.message}
        </span>
      </div>

      <div className={styles.formGroup}>
        <h1>Créer une Offre d'Emploi</h1>
        <p>Titre du poste:</p>
        <input
          type="text"
          name="jobTitle"
          {...register("title", {
            minLength: { value: 3, message: "Ce champ est obligatoire" },
          })}
        />
        <span className={styles.error}>
          {errors.jobTitle && errors.jobTitle.message}
        </span>
      </div>

      <button type="submit">Créer Offre d'Emploi</button>
    </form>
  );
}

export default CreateOffer;
