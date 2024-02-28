/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import { React, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import hide from "../assets/images/hide.png";
import show from "../assets/images/show.png";
import success from "../assets/images/success.png";
import signUpCandidate from "../assets/images/Sign up_candidate.jpg";
import style from "./inscriptionCandidat.module.scss";

export default function InscriptionCandidat() {
  // Handling Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const passwordRef = useRef({});
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [fileUrls, setFileUrls] = useState(null);
  const [currentForm, setCurrentForm] = useState("form1");
  const [isDisabled, setIsDisabled] = useState(false);
  const [working, setWorking] = useState(false);

  // Handling Image Upload
  const uploader = Uploader({
    apiKey: "free",
  });

  const options = { multi: true };
  passwordRef.current = watch("password", "");

  // Handling Form pages
  const handleNext1 = (e) => {
    e.preventDefault();
    setCurrentForm("form2");
  };

  const handlePrev1 = (e) => {
    e.preventDefault();
    setCurrentForm("form1");
  };

  const handleNext2 = (e) => {
    e.preventDefault();
    setCurrentForm("form3");
  };

  const handlePrev2 = (e) => {
    e.preventDefault();
    setCurrentForm("form2");
  };

  // Handling Checkbox on experience
  const handleCheckboxClick = () => {
    setIsDisabled(!isDisabled);
  };

  // Handling Checkbox on EndDate
  const handleEndDate = () => {
    setWorking(!working);
  };

  // Handling Form Submit
  const onSubmit = async (data) => {
    try {
      const type = 1;
      const userResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        { ...data, type }
      );

      const { insertId } = userResponse.data;

      const candidateResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/candidate`,
        { ...data, insertId }
      );

      const { insertId: candidateId } = candidateResponse.data;

      const degreeResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/degree`,
        { ...data, candidateId }
      );

      const { insertId: degreeId } = degreeResponse.data;

      const candidateDegreeResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/candidate-degree`,
        { candidateId, degreeId }
      );

      const newData = { ...data };
      if (isDisabled === false || working === true) {
        newData.endDate = null;
      }

      const experienceResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/experience`,
        { ...newData, candidateId }
      );

      if (
        (userResponse.status === 201 &&
          candidateResponse.status === 201 &&
          degreeResponse.status === 201 &&
          candidateDegreeResponse.status === 201) ||
        experienceResponse.status === 201
      ) {
        toast.success("Votre inscription a bien été prise en compte.");
        setTimeout(() => {
          navigate("/accueil");
        }, 2000);
      }
    } catch (e) {
      console.error(e);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`${style.candidateSection}`}>
        {currentForm === "form1" && (
          <fieldset className={`${style.fieldSet}`}>
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
                        message: "Ce champ est obligatoire",
                      },
                    })}
                  />
                  {errors.lastname && (
                    <span className="text-red-500">
                      {errors.lastname?.message}
                    </span>
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
                        message: "Ce champ est obligatoire",
                      },
                    })}
                  />
                  {errors.firstname && (
                    <span className="text-red-500">
                      {errors.firstname?.message}
                    </span>
                  )}

                  <p className={`${style.p}`}>E-mail:</p>
                  <input
                    className={`${style.input}`}
                    type="email"
                    placeholder="johndoe@gmail.com"
                    autoComplete="true"
                    {...register("email", {
                      pattern: {
                        value: /^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[.][a-z]+$/i,
                        message: "Champ email invalide",
                      },
                      required: "Ce champ est obligatoire",
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-500">
                      {errors.email?.message}
                    </span>
                  )}

                  <p className={`${style.p}`}>Password:</p>
                  <div className={`${style.password}`}>
                    <input
                      className={`${style.input}`}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      autoComplete="true"
                      {...register("password", {
                        minLength: {
                          value: 8,
                          message: "Minimum 8 caractères",
                        },
                        maxLength: {
                          value: 16,
                          message: "Maximum 16 caractères",
                        },
                        required: "Ce champ est obligatoire",
                      })}
                    />
                    {errors.password && (
                      <span className="text-red-500">
                        {errors.password?.message}
                      </span>
                    )}
                    <div>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`${style.showPassword}`}
                      >
                        {showPassword ? (
                          <img src={show} alt="show" />
                        ) : (
                          <img src={hide} alt="hide" />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className={`${style.p}`}>Confirmez mot de passe :</p>
                  <input
                    className={`${style.input}`}
                    type="password"
                    name="confirmPassword"
                    autoComplete="true"
                    {...register("confirmPassword", {
                      required: "Vous devez confirmer votre mot de passe",
                      validate: (value) =>
                        value === passwordRef.current ||
                        "Les mots de passe ne correspondent pas",
                    })}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500">
                      {errors.confirmPassword?.message}
                    </span>
                  )}
                </div>

                <div>
                  <p className={`${style.p}`}>Date de Naissance:</p>
                  <input
                    className={`${style.input}`}
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
                    {...register("salary", {
                      minLength: {
                        value: 1,
                        message: "Vous devez rentrer une valeur",
                      },
                      required: "Ce champs est obligatoire",
                    })}
                  />
                  {errors.salary && (
                    <span className="text-red-500">
                      {errors.salary?.message}
                    </span>
                  )}
                  <p className={`${style.p}`}>Numéro de téléphone :</p>
                  <input
                    className={`${style.input}`}
                    type="text"
                    placeholder="06........"
                    autoComplete="true"
                    {...register("contactNumber", {
                      minLength: { value: 10, message: "Format invalide" },
                      required: "Ce champ est obligatoire",
                    })}
                  />
                  {errors.contactNumber && (
                    <span className="text-red-500">
                      {errors.contactNumber?.message}
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
                  <p className={`${style.p}`}>Pays :</p>
                  <input
                    className={`${style.input}`}
                    type="text"
                    placeholder="Pays"
                    autoComplete="true"
                    {...register("country", {
                      pattern: {
                        value: /France/gi,
                        message:
                          "Vous devez impérativement être localiser en France",
                      },
                      required: "Ce champ est obligatoire",
                    })}
                  />
                  {errors.country && (
                    <span className="text-red-500">
                      {errors.country?.message}
                    </span>
                  )}
                </div>
              </div>
            </section>

            <section className={`${style.notification}`}>
              <div>
                <label htmlFor="smsNotification" id="smsNotification">
                  Notifications SMS :
                </label>
                <input
                  type="checkbox"
                  id="smsNotification"
                  {...register("smsNotificationActive")}
                />
              </div>

              <div>
                <label htmlFor="emailNotification" id="emailNotification">
                  Notification E-mail :
                </label>
                <input
                  type="checkbox"
                  id="emailNotification"
                  {...register("emailNotificationActive")}
                />
              </div>

              <div className={`${style.divButton}`}>
                <UploadButton
                  uploader={uploader}
                  options={options}
                  onComplete={(image) => {
                    const urls = image.map((x) => x.fileUrl).join("\n");
                    setValue("image", urls);
                    setFileUrls(urls);
                  }}
                >
                  {({ onClick }) => (
                    <button
                      className={`${style.CandidateButton}`}
                      type="button"
                      onClick={onClick}
                    >
                      Photo de profil
                    </button>
                  )}
                </UploadButton>
                {fileUrls ? (
                  <img
                    src={success}
                    alt="success"
                    className={`${style.checkPicture}`}
                  />
                ) : null}

                <button
                  type="button"
                  className={`${style.CandidateButton}`}
                  onClick={handleNext1}
                >
                  Suivant
                </button>
              </div>
            </section>
          </fieldset>
        )}

        {currentForm === "form2" && (
          <fieldset className={`${style.fieldSet}`}>
            <section className={`${style.signupCandidate}`}>
              <div className={`${style.signDiv}`}>
                <div>
                  <p className={`${style.p}`}>Diplome:</p>
                  <input
                    className={`${style.input}`}
                    type="text"
                    placeholder="Ingénieur en informatique"
                    autoComplete="true"
                    {...register("name", {
                      minLength: {
                        value: 3,
                        message: "Ce champ est obligatoire",
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
                    <span className="text-red-500">
                      {errors.level?.message}
                    </span>
                  )}

                  <p className={`${style.p}`}>Univsité ou école :</p>
                  <input
                    className={`${style.input}`}
                    type="text"
                    placeholder="Univsité"
                    autoComplete="true"
                    {...register("university", {
                      pattern: {
                        value: /France/gi,
                        message: "Vous devez écrire le nom d'une université",
                      },
                      required: "Ce champ est obligatoire",
                    })}
                  />
                  {errors.university && (
                    <span className="text-red-500">
                      {errors.university?.message}
                    </span>
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
                    <span className="text-red-500">
                      {errors.startingDate?.message}
                    </span>
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
            </section>

            <section className={`${style.notification}`}>
              <div className={`${style.divButton}`}>
                <button
                  type="button"
                  className={`${style.CandidateButton}`}
                  onClick={handlePrev1}
                >
                  Précédent
                </button>
                <button
                  type="button"
                  className={`${style.CandidateButton}`}
                  onClick={handleNext2}
                >
                  Suivant
                </button>
              </div>
            </section>
          </fieldset>
        )}

        {currentForm === "form3" && (
          <fieldset className={`${style.fieldSet}`}>
            <div className={`${style.notification}`}>
              <label>
                Je n'ai pas d'expérence professionnelle
                <input type="checkbox" onChange={handleCheckboxClick} />
              </label>
            </div>
            <section className={`${style.signupCandidate}`}>
              <div className={`${style.signDiv}`}>
                <div>
                  <p className={`${style.p}`}>Votre poste:</p>
                  <input
                    disabled={isDisabled}
                    className={`${style.input}`}
                    type="text"
                    placeholder="Développeur frontend"
                    autoComplete="true"
                    {...register("jobTitle")}
                  />
                  {errors.jobTitle && (
                    <span className="text-red-500">
                      {errors.jobTitle?.message}
                    </span>
                  )}

                  <p className={`${style.p}`}>Entreprise:</p>
                  <input
                    disabled={isDisabled}
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
                    disabled={isDisabled}
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
                    disabled={isDisabled}
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
                    <span className="text-red-500">
                      {errors.startDate?.message}
                    </span>
                  )}

                  <p className={`${style.p}`}>Date de fin:</p>
                  <input
                    disabled={isDisabled || working}
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
                    <span className="text-red-500">
                      {errors.endDate?.message}
                    </span>
                  )}

                  <p className={`${style.p}`}>Ville :</p>
                  <input
                    disabled={isDisabled}
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
                    disabled={isDisabled}
                    className={`${style.input}`}
                    type="text"
                    placeholder="Pays"
                    autoComplete="true"
                    {...register("country")}
                  />
                  {errors.country && (
                    <span className="text-red-500">
                      {errors.country?.message}
                    </span>
                  )}
                </div>
              </div>
            </section>

            <section className={`${style.notification}`}>
              <div className={`${style.divButton}`}>
                <button
                  type="button"
                  className={`${style.CandidateButton}`}
                  onClick={handlePrev2}
                >
                  Précédent
                </button>
                <button className={`${style.CandidateButton}`} type="submit">
                  Inscription
                </button>
              </div>
            </section>
          </fieldset>
        )}

        <div className={`${style.divImage}`}>
          <img
            src={signUpCandidate}
            alt="Candidate"
            className={`${style.imageSignup}`}
          />
        </div>
      </div>
    </form>
  );
}
