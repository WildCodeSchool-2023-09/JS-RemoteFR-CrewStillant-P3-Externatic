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

  const uploader = Uploader({
    apiKey: "free",
  });

  const options = { multi: true };
  passwordRef.current = watch("password", "");

  const onSubmit = async (data) => {
    console.info(data);
    try {
      const type = 1;
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        { ...data, type }
      );

      const { insertId } = response.data;

      const responseTwo = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/candidate`,
        { ...data, insertId }
      );

      if (response.status === 201 && responseTwo.status === 201) {
        toast.success(response.data.message);
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
    <div className={`${style.candidateSection}`}>
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
                  minLength: { value: 3, message: "Ce champ est obligatoire" },
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
                  minLength: { value: 3, message: "Ce champ est obligatoire" },
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
                <span className="text-red-500">{errors.email?.message}</span>
              )}

              <p className={`${style.p}`}>Password:</p>
              <div className={`${style.password}`}>
                <input
                  className={`${style.input}`}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="true"
                  {...register("password", {
                    minLength: { value: 8, message: "Minimum 8 caractères" },
                    maxLength: { value: 16, message: "Maximum 16 caractères" },
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
                <span className="text-red-500">{errors.salary?.message}</span>
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
                <span className="text-red-500">{errors.country?.message}</span>
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
            {fileUrls ? <img src={success} alt="success" /> : null}
            <button className={`${style.CandidateButton}`} type="submit">
              Inscription
            </button>
          </div>
        </section>
      </form>
      <div className={`${style.divImage}`}>
        <img
          src={signUpCandidate}
          alt="Candidate"
          className={`${style.imageSignup}`}
        />
      </div>
    </div>
  );
}
