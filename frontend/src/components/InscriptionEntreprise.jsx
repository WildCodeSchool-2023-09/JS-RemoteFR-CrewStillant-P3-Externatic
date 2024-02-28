/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import hide from "../assets/images/hide.png";
import show from "../assets/images/show.png";
import success from "../assets/images/success.png";
import style from "./inscriptionEntreprise.module.scss";
import signUpCompany from "../assets/images/signUpCompany.jpg";

export default function InscriptionEntreprise() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const passwordRef = useRef({});
  const [showPassword, setShowPassword] = useState(false);
  const [fileUrls, setFileUrls] = useState(null);
  passwordRef.current = watch("password", "");

  const uploader = Uploader({
    apiKey: "free",
  });

  const options = { multi: true };
  passwordRef.current = watch("password", "");

  const onSubmit = async (data) => {
    try {
      const type = 2;
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        { ...data, type }
      );

      const responseTwo = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/sector`,
        { ...data }
      );

      const { insertId } = response.data;
      const { insertId: insertId2 } = responseTwo.data;

      const responseThree = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/company`,
        { ...data, insertId, insertId2 }
      );

      if (
        response.status === 201 &&
        responseTwo.status === 201 &&
        responseThree.status === 201
      ) {
        toast.success("Votre inscription a bien été prise en compte.");
        setTimeout(() => {
          navigate("/connexion");
        }, 2000);
      }
    } catch (e) {
      console.error(e);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className={`${style.companySection}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className={`${style.signUpCompany}`}>
          <div className={`${style.signDiv}`}>
            <div>
              <p className={`${style.p}`}>Nom:</p>
              <input
                className={`${style.input}`}
                type="text"
                placeholder="Entreprise"
                autoComplete="true"
                {...register("name", {
                  minLength: { value: 2, message: "Au moins 2 caractères" },
                  required: "Ce champ est obligatoire",
                })}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name?.message}</span>
              )}

              <p className={`${style.p}`}>E-mail:</p>
              <input
                className={`${style.input}`}
                type="email"
                placeholder="entreprise@contact.com"
                autoComplete="true"
                {...register("email", {
                  pattern: {
                    value: /^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[.][a-z]+$/i,
                    message: "E-mail invalide",
                  },
                  required: "Ce champ est obligatoire",
                })}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email?.message}</span>
              )}

              <p className={`${style.p}`}>Mot de passe :</p>
              <div className={`${style.password}`}>
                <input
                  className={`${style.input}`}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="true"
                  {...register("password", {
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                      message:
                        "Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
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

              <p className={`${style.p}`}>Site internet :</p>
              <input
                className={`${style.input}`}
                type="text"
                placeholder="www.entreprise.com"
                {...register("website", {
                  minLength: { value: 5, message: "Au moins 5 caractères" },
                  required: "Ce champ est obligatoire",
                })}
              />
              {errors.website && (
                <span className="text-red-500">{errors.website?.message}</span>
              )}

              <p className={`${style.p}`}>Numéro de téléphone :</p>
              <input
                className={`${style.input}`}
                type="text"
                placeholder="06...."
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
            </div>
            <div>
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

              <p className={`${style.p}`}>N° SIRET :</p>
              <input
                className={`${style.input}`}
                type="text"
                placeholder="N° SIRET"
                {...register("siret", {
                  pattern: {
                    value: /[0-9]{14}/,
                    message: "Veuillez rentrer un numéro SIRET en 14 chiffres",
                  },
                })}
              />
              {errors.siret && (
                <span className="text-red-500">{errors.siret?.message}</span>
              )}

              <p className={`${style.p}`}>Date de Création:</p>
              <input
                className={`${style.input}`}
                type="date"
                {...register("establishmentDate", {
                  required: "Ce champs est obligatoire",
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

              <p className={`${style.p}`}>Secteur d'activité :</p>
              <input
                className={`${style.input}`}
                type="text"
                placeholder="Secteur"
                {...register("sector", {
                  minLength: { value: 3, message: "Au moins 3 caractères" },
                  required: "Ce champs est obligatoire",
                })}
              />
              {errors.sector && (
                <span className="text-red-500">{errors.sector?.message}</span>
              )}

              <p className={`${style.p}`}>Description:</p>
              <textarea
                className={`${style.inputArea}`}
                type="text"
                placeholder="Entrez une description"
                {...register("description", {
                  minLength: { value: 100, message: "Au moins 100 caractères" },
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
                  className={`${style.companyButton}`}
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

            <button type="submit" className={`${style.companyButton}`}>
              Inscription
            </button>
          </div>
        </section>
      </form>
      <div className={`${style.divImage}`}>
        <img
          src={signUpCompany}
          alt="Company"
          className={`${style.imageSignup}`}
        />
      </div>
    </div>
  );
}
