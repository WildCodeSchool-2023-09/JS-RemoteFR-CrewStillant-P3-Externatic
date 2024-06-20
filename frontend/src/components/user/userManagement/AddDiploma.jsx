/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import { React } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import style from "../../inscriptionCandidat.module.scss";

function AddDiploma({
  setShowAddDiploma,
  userDegree,
  setUserDegree,
  type,
  auth,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const degreeResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/degree`,
        {
          name: data.name,
          level: data.level,
          university: data.university,
          startingDate: data.startingDate,
          completionDate: data.completionDate,
          city: data.city,
        },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );

      const { insertId: degreeId } = degreeResponse.data;
      const candidateDegreeResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/candidate-degree`,
        { candidateId: type.id, degreeId },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      if (
        degreeResponse.status === 201 &&
        candidateDegreeResponse.status === 201
      )
        setShowAddDiploma(false);
      setUserDegree({ ...userDegree, data });
      toast.success("Votre Diplôme a bien été pris en compte.");
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${style.fieldSet}`}>
      <div className={`${style.signDiv}`}>
        <div>
          <h1> Ajouter votre Diplôme </h1>
          <p className={`${style.p}`}>Diplome:</p>
          <input
            className={`${style.input}`}
            type="text"
            placeholder="Ingénieur en informatique"
            autoComplete="true"
            {...register("name", {
              required: "Ce champ est obligatoire",
              minLength: {
                value: 6,
                message: "Veuillez renseigner un diplôme valide",
              },
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name?.message}</span>
          )}
          <p className={`${style.p}`}>Niveau:</p>
          <select
            name="Degree"
            className={`${style.input}`}
            {...register("level", {
              required: "Ce champ est obligatoire",
            })}
          >
            <option value="">Sélectionnez votre niveau</option>
            <option value="BTS">Bac+2</option>
            <option value="Licence">Bac+3</option>
            <option value="Master">Bac+5</option>
            <option value="Doctorat">Bac+8</option>
          </select>

          {errors.level && (
            <span className="text-red-500">{errors.level?.message}</span>
          )}

          <p className={`${style.p}`}>Univsité ou école :</p>
          <input
            className={`${style.input}`}
            type="text"
            placeholder="Univsité"
            autoComplete="true"
            {...register("university", {
              required: "Ce champ est obligatoire",
            })}
          />
          {errors.university && (
            <span className="text-red-500">{errors.university?.message}</span>
          )}
        </div>
        <div>
          <p className={`${style.p}`}>Date de début:</p>
          <input
            className={`${style.input}`}
            type="date"
            {...register("startingDate", {
              required: "Ce champs est obligatoire",
              pattern: {
                value:
                  /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/,
                message:
                  "Vous devez renseigner une date dans le bon format, ex: AAAA/MM/JJ",
              },
            })}
          />
          {errors.startingDate && (
            <span className="text-red-500">{errors.startingDate?.message}</span>
          )}

          <p className={`${style.p}`}>Date de fin:</p>
          <input
            className={`${style.input}`}
            type="date"
            {...register("completionDate", {
              required: "Ce champs est obligatoire",
              pattern: {
                value:
                  /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/,
                message:
                  "Vous devez renseigner une date dans le bon format, ex: AAAA/MM/JJ",
              },
            })}
          />
          {errors.completionDate && (
            <span className="text-red-500">
              {errors.completionDate?.message}
            </span>
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
              required: "Ce champ est obligatoire",
            })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city?.message}</span>
          )}
        </div>
      </div>

      <div className={`${style.divButton}`}>
        <button className={`${style.CandidateButton}`} type="submit">
          valider
        </button>
        <button
          className={`${style.CandidateButton}`}
          type="button"
          onClick={() => setShowAddDiploma(false)}
        >
          annuler
        </button>
      </div>
    </form>
  );
}

AddDiploma.propTypes = {
  setShowAddDiploma: PropTypes.func.isRequired,
  userDegree: PropTypes.shape({
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
      university: PropTypes.string.isRequired,
      startingDate: PropTypes.string.isRequired,
      completionDate: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
    }),
  }).isRequired,
  setUserDegree: PropTypes.func.isRequired,
  type: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  auth: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
};

export default AddDiploma;
