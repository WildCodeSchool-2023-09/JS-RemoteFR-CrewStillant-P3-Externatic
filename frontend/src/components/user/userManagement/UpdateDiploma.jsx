/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import { React } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import style from "../../inscriptionCandidat.module.scss";

function UpdateDiploma({
  diploma,
  setShowUpdateDiploma,
  userDegree,
  setUserDegree,
  auth,
}) {
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
      const degreeResponse = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/degree/`,
        {
          name: data.name || diploma.degree,
          level: data.level || diploma.level,
          university: data.university || diploma.university,
          startingDate:
            data.startingDate || formatDateString(diploma.startingDate),
          completionDate:
            data.completionDate || formatDateString(diploma.completionDate),
          city: data.city || diploma.city,
          id: diploma.id,
        },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );

      if (degreeResponse.status === 200) {
        toast.success("Votre Diplôme a bien été modifié.");
        setUserDegree({ ...userDegree, data });
        setShowUpdateDiploma(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${style.fieldSet}`}>
      <div className={`${style.signDiv}`}>
        <div>
          <h1> Modifier votre Diplôme </h1>
          <p className={`${style.p}`}>Diplome:</p>
          <input
            className={`${style.input}`}
            type="text"
            placeholder="Ingénieur en informatique"
            autoComplete="true"
            {...register("name", {
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
            {...register("level", {})}
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
            {...register("university", {})}
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
          onClick={() => setShowUpdateDiploma(false)}
        >
          annuler
        </button>
      </div>
    </form>
  );
}

UpdateDiploma.propTypes = {
  diploma: PropTypes.shape({
    id: PropTypes.number,
    degree: PropTypes.string,
    level: PropTypes.string,
    university: PropTypes.string,
    startingDate: PropTypes.string,
    completionDate: PropTypes.string,
    city: PropTypes.string,
  }).isRequired,
  setShowUpdateDiploma: PropTypes.func.isRequired,
  userDegree: PropTypes.shape({
    data: PropTypes.shape({
      name: PropTypes.string,
      level: PropTypes.string,
      university: PropTypes.string,
      startingDate: PropTypes.string,
      completionDate: PropTypes.string,
      city: PropTypes.string,
    }),
  }).isRequired,
  setUserDegree: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    token: PropTypes.string,
  }).isRequired,
};

export default UpdateDiploma;
